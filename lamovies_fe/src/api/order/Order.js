import axiosClient from '~/api/axios/axiosClient';

const END_POINT = {
    ORDER: 'userPricings',
    CreateOrder: 'add',
};
const CreateOrder = (data) => {
    return axiosClient.post(
        `${END_POINT.ORDER}/${END_POINT.CreateOrder}`,
        {
            users: data.users,
            pricings: data.pricings,
            startTime: data.startTime,
            endTime: data.endTime,
            totalAmount: data.totalAmount,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
};
const Check = (id) => {
    return axiosClient.get(`${END_POINT.ORDER}/check/${id}`);
};
export { CreateOrder, Check };
