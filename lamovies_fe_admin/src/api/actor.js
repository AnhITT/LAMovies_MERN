import axiosClient from "../api/axiosClient";

const END_POINT = {
    ACTORS: "actors",
    CreateActor: "add",
};

const GetActorAPI = () => {
    return axiosClient.get(`${END_POINT.ACTORS}`);
};
const AddActorAPI = (accountData) => {
    return axiosClient.post(
        `${END_POINT.ACTORS}/${END_POINT.CreateActor}`,
        accountData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};
const GetActorById = (id) => {
    return axiosClient.get(`${END_POINT.ACTORS}/${id}`);
};
const DeleteActorAPI = (id) => {
    return axiosClient.delete(`${END_POINT.ACTORS}/delete/${id}`);
};
const UpdateActorAPI = (id, data) => {
    return axiosClient.put(`${END_POINT.ACTORS}/edit/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
export {
    UpdateActorAPI,
    GetActorById,
    DeleteActorAPI,
    AddActorAPI,
    GetActorAPI,
};
