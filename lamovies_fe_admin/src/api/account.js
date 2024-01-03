import axiosClient from "../api/axiosClient";

const END_POINT = {
    ACCOUNT: "Account",
    SHOWACCOUNT: "ShowAccount",
    DISABLEACCOUNT: "ChangeStatus",
    DELETEACCOUNT: "DeleteAccount",
    ADDACCOUNT: "AddAccount",
    ROLES: "getAllRoles",
    GETBYID: "DetailAccount",
    UPDATEACCOUNT: "UpdateAccount",
};

const GetAccountAPI = () => {
    return axiosClient.get(`${END_POINT.ACCOUNT}/${END_POINT.SHOWACCOUNT}`);
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
        `${END_POINT.ACCOUNT}/${END_POINT.DELETEACCOUNT}?id=${id}`
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
    return axiosClient.get(
        `${END_POINT.ACCOUNT}/${END_POINT.GETBYID}?id=${id}`
    );
};
const UpdateUserAPI = (data) => {
    return axiosClient.patch(
        `${END_POINT.ACCOUNT}/${END_POINT.UPDATEACCOUNT}`,
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
