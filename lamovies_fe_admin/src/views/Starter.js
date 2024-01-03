import { Col, Row } from "reactstrap";
import React, { useState, useEffect } from "react";
import TopCards from "../components/dashboard/TopCards";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import { ThongKe } from "../api/movie";
const Starter = () => {
    const [thongke, setThongke] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setThongke(await ThongKe());
    };
    return (
        <div>
            {/***Top Cards***/}
            <Row>
                <Col sm="6" lg="3">
                    <TopCards
                        bg="bg-light-success text-success"
                        title="Profit"
                        subtitle="Total Movies"
                        earning={thongke.countMovies}
                        icon="bi bi-wallet"
                    />
                </Col>
                <Col sm="6" lg="3">
                    <TopCards
                        bg="bg-light-danger text-danger"
                        title="Refunds"
                        subtitle="Total Accounts"
                        earning={thongke.countAccount}
                        icon="bi bi-coin"
                    />
                </Col>
                <Col sm="6" lg="3">
                    <TopCards
                        bg="bg-light-warning text-warning"
                        title="New Project"
                        subtitle="Total Actors"
                        earning={thongke.countActor}
                        icon="bi bi-basket3"
                    />
                </Col>
                <Col sm="6" lg="3">
                    <TopCards
                        bg="bg-light-info text-into"
                        title="Sales"
                        subtitle="Total Genres"
                        earning={thongke.countGenre}
                        icon="bi bi-bag"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="6" lg="3">
                    <TopCards
                        bg="bg-light-success text-success"
                        title="Profit"
                        subtitle="Top 1 view Movies"
                        earning={thongke.top1Movie}
                        icon="bi bi-wallet"
                    />
                </Col>
                <Col sm="6" lg="3">
                    <TopCards
                        bg="bg-light-danger text-danger"
                        title="Refunds"
                        subtitle="Total Movies Series"
                        earning={thongke.countMoviesSeries}
                        icon="bi bi-coin"
                    />
                </Col>
                <Col sm="6" lg="3">
                    <TopCards
                        bg="bg-light-warning text-warning"
                        title="New Project"
                        subtitle="Total Movies Odd"
                        earning={thongke.countMoviesOdd}
                        icon="bi bi-basket3"
                    />
                </Col>
                <Col sm="6" lg="3">
                    <TopCards
                        bg="bg-light-info text-into"
                        title="Sales"
                        subtitle="Total User Use Services"
                        earning={thongke.countAccountUseService}
                        icon="bi bi-bag"
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Starter;
