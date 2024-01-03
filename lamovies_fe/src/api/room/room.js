import axiosClient from '~/api/axios/axiosClient';

const END_POINT = {
    Room: 'Room',
};
const CreateRoom = (roomName, userId) => {
    return axiosClient.post(`${END_POINT.Room}?userID=${userId}&roomName=${roomName}`);
};
export { CreateRoom };
