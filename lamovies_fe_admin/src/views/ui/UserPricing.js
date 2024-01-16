import React, { useState, useEffect } from "react";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import { GetUserPricing } from "../../api/pricing";
import { GetUserByIdAPI } from "../../api/account";

const UserPricing = () => {
    const [items, setItems] = useState([]);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await GetUserPricing();
        setItems(data.data);

        const promises = data.data.map(async (item) => {
            const userDetail = await getUserDetails(item.users);
            setUserDetails((prevDetails) => ({
                ...prevDetails,
                [item.users]: userDetail,
            }));
        });

        await Promise.all(promises);
    };

    const getUserDetails = async (userId) => {
        const userData = await GetUserByIdAPI(userId);
        return userData.data;
    };

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const formattedDateTime = dateTime.toLocaleString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        });
        return formattedDateTime;
    };

    const calculateRemainingTime = (endTime) => {
        const currentTime = new Date();
        const endDateTime = new Date(endTime);
        let remainingMilliseconds = endDateTime - currentTime;

        if (remainingMilliseconds < 0) {
            return "Hết hạn";
        }

        const days = Math.floor(remainingMilliseconds / (24 * 60 * 60 * 1000));
        remainingMilliseconds %= 24 * 60 * 60 * 1000;

        const hours = Math.floor(remainingMilliseconds / (60 * 60 * 1000));
        remainingMilliseconds %= 60 * 60 * 1000;

        const minutes = Math.floor(remainingMilliseconds / (60 * 1000));

        return `${days}d ${hours}h ${minutes}m`;
    };

    return (
        <Row>
            <Col lg="12">
                <div>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Quản lý hoá đơn</CardTitle>

                            <Table
                                className="no-wrap mt-3 align-middle"
                                responsive
                                borderless
                            >
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Full Name</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Remaining Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index} className="border-top">
                                            <td>
                                                {
                                                    userDetails[item.users]
                                                        ?.userName
                                                }
                                            </td>
                                            <td>
                                                {
                                                    userDetails[item.users]
                                                        ?.fullName
                                                }
                                            </td>
                                            <td>
                                                {formatDateTime(item.startTime)}
                                            </td>
                                            <td>
                                                {formatDateTime(item.endTime)}
                                            </td>
                                            <td>
                                                {calculateRemainingTime(
                                                    item.endTime
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

export default UserPricing;
