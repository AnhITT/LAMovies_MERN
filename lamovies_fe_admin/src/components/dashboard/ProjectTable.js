import { Card, CardBody, CardTitle, Button, Table } from "reactstrap";
import user5 from "../../assets/images/users/user5.jpg";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../../assets/scss/paging.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
    UpdateUserAPI,
    GetUserByIdAPI,
    GetAllRolesAPI,
    AddAccountAPI,
    DeleteAccountAPI,
    DisabledAccountAPI,
    GetAccountAPI,
} from "../../api/account";

const ProjectTables = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [accountIdToDelete, setAccountIdToDelete] = useState(null);
    const [addUserModal, setAddUserModal] = useState(false);
    const [error, setError] = useState([]);
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        fullName: "",
        dateBirthday: "",
        role: "",
    });
    const [successModal, setSuccessModal] = useState(false);
    const [roles, setRoles] = useState([]);
    const [editUser, setEditUser] = useState({
        id: "",
        userName: "",
        email: "",
        fullName: "",
        dateBirthday: "",
        status: null,
        role: [],
    });
    const [editUserModal, setEditUserModal] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setItems(await GetAccountAPI());
        setRoles(await GetAllRolesAPI());
    };
    const itemsPerPage = 5;
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };
    const pageCount = Math.ceil(items.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = items.slice(offset, offset + itemsPerPage);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        const filteredResults = items.filter(
            (item) =>
                item.email.toLowerCase().includes(term.toLowerCase()) ||
                item.fullName.toLowerCase().includes(term.toLowerCase()) ||
                item.userName.toLowerCase().includes(term.toLowerCase())
        );

        setSearchResults(filteredResults);
        setCurrentPage(1);
    };
    const ChangeStatus = async (id, status) => {
        try {
            await DisabledAccountAPI(id, status);
            fetchData();
        } catch (error) {
            console.error("Error changing status:", error);
        }
    };
    const confirmDeleteAccount = async () => {
        try {
            await DeleteAccountAPI(accountIdToDelete);
            fetchData();
            setConfirmationModal(false);
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };
    const validate = () => {
        const errors = [];

        if (!newUser.username) {
            errors.push("Username is required.");
        } else if (newUser.username.length < 6) {
            errors.push("Username must be at least 6 characters.");
        }
        if (!newUser.password) {
            errors.push("Password is required.");
        } else if (!isValidPassword(newUser.password)) {
            errors.push(
                "Minimum length 6 and must contain  1 Uppercase,1 lowercase, 1 special character and 1 digit"
            );
        }

        if (!newUser.dateBirthday) {
            errors.push("Date of Birth is required.");
        }

        if (!newUser.email) {
            errors.push("Email is required.");
        } else if (!isValidEmail(newUser.email)) {
            errors.push("Invalid email format.");
        }

        if (!newUser.fullName) {
            errors.push("Full Name is required.");
        }

        if (errors.length > 0) {
            setError(errors);
            return false;
        }

        return true;
    };
    const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[#$^+=!*()@%&]).{6,}$/;

    const isValidPassword = (password) => {
        return passwordRegex.test(password);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };

    const toggleAddUserModal = () => {
        setAddUserModal(!addUserModal);
    };
    const handleAddUser = async () => {
        if (validate()) {
            await AddAccountAPI(newUser);
            toggleAddUserModal();
            fetchData();
            toggleSuccessModal();
        }
    };
    const toggleSuccessModal = () => {
        setSuccessModal(!successModal);
    };
    const handleEditUser = async (userId) => {
        try {
            const user = await GetUserByIdAPI(userId);

            setEditUser({
                id: user.id,
                userName: user.userName,
                email: user.email,
                fullName: user.fullName,
                dateBirthday: user.dateBirthday,
                status: user.status,
                role: user.role,
            });
            console.log(editUser.role);
            setEditUserModal(true);
        } catch (error) {
            console.error("Error fetching user data for edit:", error);
        }
    };
    const convertRoleToArray = (user) => {
        return {
            ...user,
            role: user.role ? [user.role] : [],
        };
    };
    const convertStatusToBool = (user) => {
        return {
            ...user,
            status:
                user.status === "true"
                    ? true
                    : user.status === "false"
                    ? false
                    : null,
        };
    };
    const handleUpdateUser = async () => {
        try {
            // Gọi API để cập nhật thông tin người dùng
            await UpdateUserAPI(editUser);

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
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Quản lý tài khoản</CardTitle>
                    <div className="row">
                        <div className="col-4 my-1 pt-1">
                            <input
                                className="form-control"
                                placeholder="Search user by email"
                                onChange={(event) => handleSearch(event)}
                            />
                        </div>
                        <div className="col-1 "></div>
                        <div className="col-6 my-1 pt-1 d-flex justify-content-end">
                            <Button
                                className="btn"
                                color="success"
                                onClick={toggleAddUserModal}
                            >
                                Add new user
                            </Button>
                        </div>
                    </div>

                    <Table
                        className="no-wrap mt-3 align-middle"
                        responsive
                        borderless
                    >
                        <thead>
                            <tr>
                                <th>Account</th>
                                <th>Full Name</th>
                                <th>Roles</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayItems.map((item, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <div className="d-flex align-items-center p-2">
                                            <img
                                                src={user5}
                                                className="rounded-circle"
                                                alt="avatar"
                                                width="45"
                                                height="45"
                                            />
                                            <div className="ms-3">
                                                <h6 className="mb-0">
                                                    {item.userName}
                                                </h6>
                                                <span className="text-muted">
                                                    {item.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.fullName}</td>
                                    <td>
                                        {item.role.map((role, index) => (
                                            <span key={index}>
                                                {role}
                                                {index < item.role.length - 1 &&
                                                    ", "}
                                            </span>
                                        ))}
                                    </td>

                                    <td>
                                        {item.status === true ? (
                                            <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                                        ) : (
                                            <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                                        )}
                                    </td>
                                    <td className="d-flex justify-content-around pt-3">
                                        {item.status === true ? (
                                            <Button
                                                className="btn"
                                                color="secondary"
                                                size="sm"
                                                onClick={() =>
                                                    ChangeStatus(item.id, false)
                                                }
                                            >
                                                Disabled
                                            </Button>
                                        ) : (
                                            <Button
                                                className="btn"
                                                color="success"
                                                size="sm"
                                                onClick={() =>
                                                    ChangeStatus(item.id, true)
                                                }
                                            >
                                                Enable
                                            </Button>
                                        )}

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
                                                setAccountIdToDelete(item.id);
                                                setConfirmationModal(true);
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
                                subContainerClassName={"pages pagination"}
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
                        Are you sure you want to delete this account?
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
                                onClick={() => setConfirmationModal(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={addUserModal} toggle={toggleAddUserModal}>
                <ModalHeader toggle={toggleAddUserModal}>
                    Add New User
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={newUser.username}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        username: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={newUser.password}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        password: e.target.value,
                                        passwordConfirm: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fullname" className="form-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullname"
                                value={newUser.fullName}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        fullName: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={newUser.email}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="dateBirthday"
                                className="form-label"
                            >
                                dateBirthday
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="dateBirthday"
                                value={newUser.dateBirthday}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        dateBirthday: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">
                                Role
                            </label>
                            <select
                                id="role"
                                className="form-select"
                                value={newUser.role}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        role: e.target.value,
                                    })
                                }
                            >
                                <option value="" disabled>
                                    Select a role
                                </option>
                                {roles.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </form>
                    {error.map((error, index) => (
                        <p key={index} className="error-message text-danger">
                            {error}
                        </p>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddUser}>
                        Add User
                    </Button>
                    <Button color="secondary" onClick={toggleAddUserModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={successModal} toggle={toggleSuccessModal}>
                <ModalBody>
                    <p className="text-center text-success">
                        User added successfully!
                    </p>
                </ModalBody>
            </Modal>
            <Modal isOpen={editUserModal} toggle={toggleEditUserModal}>
                <ModalHeader toggle={toggleEditUserModal}>
                    Edit User
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={editUser.userName}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={editUser.email}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fullname"
                                    value={editUser.fullName}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            fullName: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dateBirthday"
                                    value={
                                        editUser.dateBirthday
                                            ? editUser.dateBirthday.substring(
                                                  0,
                                                  10
                                              )
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            dateBirthday: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select
                                    id="status"
                                    className="form-select"
                                    value={editUser.status}
                                    onChange={(e) =>
                                        setEditUser((prevEditUser) => ({
                                            ...prevEditUser,
                                            ...convertStatusToBool({
                                                status: e.target.value,
                                            }),
                                        }))
                                    }
                                >
                                    <option value={true}>Active</option>
                                    <option value={false}>Inactive</option>
                                </select>
                            </div>

                            <label className="form-label">Role</label>
                            <div className="mb-3">
                                <select
                                    id="role"
                                    className="form-select"
                                    value={editUser.role}
                                    onChange={(e) =>
                                        setEditUser((prevEditUser) => ({
                                            ...prevEditUser,
                                            ...convertRoleToArray({
                                                role: e.target.value,
                                            }),
                                        }))
                                    }
                                >
                                    <option value="" disabled>
                                        Select a role
                                    </option>
                                    {roles.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdateUser}>
                        Update User
                    </Button>
                    <Button color="secondary" onClick={toggleEditUserModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ProjectTables;
