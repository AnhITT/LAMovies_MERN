import axiosClient from "../api/axiosClient";

const END_POINT = {
    ACCOUNT: "users",
    DISABLEACCOUNT: "ChangeStatus",
    DELETEACCOUNT: "delete",
    ADDACCOUNT: "add",
    ROLES: "getAllRoles",
    UPDATEACCOUNT: "edit",
};

const GetAccountAPI = () => {
    return axiosClient.get(`${END_POINT.ACCOUNT}`);
};
const GetAllRolesAPI = () => {
    return axiosClient.get(`${END_POINT.ACCOUNT}/${END_POINT.ROLES}`);
};
const DisabledAccountAPI = (id, status) => {
    return axiosClient.patch(
        `${END_POINT.ACCOUNT}/${END_POINT.DISABLEACCOUNT}?id=${id}&status=${status}`
    );
};
const DeleteAccountAPI = (id) => {
    return axiosClient.delete(
        `${END_POINT.ACCOUNT}/${END_POINT.DELETEACCOUNT}/${id}`
    );
};
const AddAccountAPI = (accountData) => {
    return axiosClient.post(
        `${END_POINT.ACCOUNT}/${END_POINT.ADDACCOUNT}`,
        accountData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};
const GetUserByIdAPI = (id) => {
    return axiosClient.get(`${END_POINT.ACCOUNT}/${id}`);
};
const UpdateUserAPI = (id, data) => {
    return axiosClient.put(
        `${END_POINT.ACCOUNT}/${END_POINT.UPDATEACCOUNT}/${id}`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};
export {
    UpdateUserAPI,
    GetUserByIdAPI,
    GetAllRolesAPI,
    AddAccountAPI,
    DeleteAccountAPI,
    GetAccountAPI,
    DisabledAccountAPI,
};
