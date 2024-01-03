import React, { useState, useEffect } from "react";
import { Row, Col, Table, Card, CardTitle, CardBody, Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactPaginate from "react-paginate";
import {
    UpdateActorAPI,
    GetActorById,
    DeleteActorAPI,
    AddActorAPI,
    GetActorAPI,
} from "../../api/actor";
import "../../assets/scss/paging.css";
const Actor = () => {
    const [items, setItems] = useState([]);
    const [addUserModal, setAddUserModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [accountIdToDelete, setAccountIdToDelete] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [error, setError] = useState([]);
    const [editUserModal, setEditUserModal] = useState(false);
    const [edit, setEdit] = useState("");

    const [newActor, setNewActor] = useState({
        name: "",
        avarta: "",
        description: "",
    });
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setItems(await GetActorAPI());
    };
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };
    const pageCount = Math.ceil(items.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = items.slice(offset, offset + itemsPerPage);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + "...";
        }
        return description;
    };

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        const filteredResults = items.filter((item) =>
            item.name.toLowerCase().includes(term.toLowerCase())
        );

        setSearchResults(filteredResults);
        setCurrentPage(1);
    };
    const toggleAddUserModal = () => {
        setAddUserModal(!addUserModal);
    };
    const toggleSuccessModal = () => {
        setSuccessModal(!successModal);
    };
    const validate = () => {
        const errors = [];

        if (!newActor.name) {
            errors.push("Username is required.");
        }
        if (!newActor.avarta) {
            errors.push("Avarta is required.");
        }
        if (!newActor.description) {
            errors.push("Description is required.");
        }
        if (errors.length > 0) {
            setError(errors);
            return false;
        }
        return true;
    };
    const handleAddUser = async () => {
        if (validate()) {
            await AddActorAPI(newActor);
            toggleAddUserModal();
            fetchData();
            toggleSuccessModal();
        }
    };
    const confirmDeleteAccount = async () => {
        try {
            await DeleteActorAPI(accountIdToDelete);
            fetchData();
            setConfirmationModal(false);
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };
    const handleEditUser = async (userId) => {
        try {
            const user = await GetActorById(userId);

            setNewActor({
                name: user.name,
                avarta: user.avarta,
                description: user.description,
            });
            setEdit(userId);
            setEditUserModal(true);
        } catch (error) {
            console.error("Error fetching user data for edit:", error);
        }
    };
    const handleUpdateUser = async () => {
        try {
            // Gọi API để cập nhật thông tin người dùng
            await UpdateActorAPI(edit, newActor);

            // Đóng form chỉnh sửa
            setEditUserModal(false);

            // Làm mới danh sách người dùng
            fetchData();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    const toggleEditUserModal = () => {
        setEditUserModal(!editUserModal);
    };
    const displayItems = searchTerm !== "" ? searchResults : currentItems;
    return (
        <Row>
            <Col lg="12">
                <div>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Quản lý diễn viên</CardTitle>
                            <div className="row">
                                <div className="col-4 my-1 pt-1">
                                    <input
                                        className="form-control"
                                        placeholder="Search actor by name"
                                        onChange={(event) =>
                                            handleSearch(event)
                                        }
                                    />
                                </div>
                                <div className="col-1 "></div>
                                <div className="col-6 my-1 pt-1 d-flex justify-content-end">
                                    <Button
                                        className="btn"
                                        color="success"
                                        onClick={toggleAddUserModal}
                                    >
                                        Add new actor
                                    </Button>
                                    <Modal
                                        isOpen={addUserModal}
                                        toggle={toggleAddUserModal}
                                    >
                                        <ModalHeader
                                            toggle={toggleAddUserModal}
                                        >
                                            Add New User
                                        </ModalHeader>
                                        <ModalBody>
                                            <form>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="username"
                                                        className="form-label"
                                                    >
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="username"
                                                        value={newActor.name}
                                                        onChange={(e) =>
                                                            setNewActor({
                                                                ...newActor,
                                                                name: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="password"
                                                        className="form-label"
                                                    >
                                                        Avatar
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="avarta"
                                                        value={newActor.avarta}
                                                        onChange={(e) =>
                                                            setNewActor({
                                                                ...newActor,
                                                                avarta: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="fullname"
                                                        className="form-label"
                                                    >
                                                        Description
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="description"
                                                        value={
                                                            newActor.description
                                                        }
                                                        onChange={(e) =>
                                                            setNewActor({
                                                                ...newActor,
                                                                description:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </form>
                                            {error.map((error, index) => (
                                                <p
                                                    key={index}
                                                    className="error-message text-danger"
                                                >
                                                    {error}
                                                </p>
                                            ))}
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button
                                                color="primary"
                                                onClick={handleAddUser}
                                            >
                                                Add Actor
                                            </Button>
                                            <Button
                                                color="secondary"
                                                onClick={toggleAddUserModal}
                                            >
                                                Cancel
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                    <Modal
                                        isOpen={successModal}
                                        toggle={toggleSuccessModal}
                                    >
                                        <ModalBody>
                                            <p className="text-center text-success">
                                                User added successfully!
                                            </p>
                                        </ModalBody>
                                    </Modal>
                                </div>
                            </div>

                            <Table
                                className="no-wrap mt-3 align-middle"
                                responsive
                                borderless
                            >
                                <thead>
                                    <tr>
                                        <th>Actor</th>
                                        <th>Description</th>

                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayItems.map((item, index) => (
                                        <tr key={index} className="border-top">
                                            <td>
                                                <div className="d-flex align-items-center p-2">
                                                    <img
                                                        src={item.avarta}
                                                        className="rounded-circle"
                                                        alt="avatar"
                                                        width="45"
                                                        height="45"
                                                    />
                                                    <div className="ms-3">
                                                        <h6 className="mb-0">
                                                            {item.name}
                                                        </h6>
                                                        <span className="text-muted"></span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {truncateDescription(
                                                    item.description,
                                                    50
                                                )}
                                            </td>

                                            <td className="d-flex justify-content-center action pt-4">
                                                <Button
                                                    className="btn"
                                                    color="primary"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleEditUser(item.id)
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    color="danger"
                                                    size="sm"
                                                    onClick={() => {
                                                        setAccountIdToDelete(
                                                            item.id
                                                        );
                                                        setConfirmationModal(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <div className="pagination-container">
                                    <ReactPaginate
                                        previousLabel={"Previous"}
                                        nextLabel={"Next"}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName={
                                            "pagination justify-content-center"
                                        }
                                        subContainerClassName={
                                            "pages pagination"
                                        }
                                        activeClassName={"active"}
                                    />
                                </div>
                            </Table>
                        </CardBody>
                    </Card>
                    <Modal
                        isOpen={confirmationModal}
                        toggle={() => setConfirmationModal(false)}
                    >
                        <ModalBody>
                            <p className="text-center text-danger">
                                Are you sure you want to delete this actor?
                            </p>
                            <div className="d-flex justify-content-center">
                                <div className="col-2">
                                    <Button
                                        className="btn"
                                        color="danger"
                                        onClick={confirmDeleteAccount}
                                    >
                                        Delete
                                    </Button>
                                </div>
                                <div className="col-1">
                                    <Button
                                        className="btn"
                                        color="secondary"
                                        onClick={() =>
                                            setConfirmationModal(false)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={editUserModal} toggle={toggleEditUserModal}>
                        <ModalHeader toggle={toggleEditUserModal}>
                            Edit User
                        </ModalHeader>
                        <ModalBody>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={newActor.name}
                                        onChange={(e) =>
                                            setNewActor({
                                                ...newActor,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Avarta
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="avarta"
                                            value={newActor.avarta}
                                            onChange={(e) =>
                                                setNewActor({
                                                    ...newActor,
                                                    avarta: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            value={newActor.description}
                                            onChange={(e) =>
                                                setNewActor({
                                                    ...newActor,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={handleUpdateUser}>
                                Update User
                            </Button>
                            <Button
                                color="secondary"
                                onClick={toggleEditUserModal}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Col>
        </Row>
    );
};

export default Actor;
