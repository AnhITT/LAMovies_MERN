import axiosClient from '~/api/axios/axiosClient';

const END_POINT = {
    ORDER: 'Order',
    CreateOrder: 'CreateOrder',
};
const CreateOrder = (idUser, idPricing) => {
    return axiosClient.post(`${END_POINT.ORDER}/${END_POINT.CreateOrder}?idUser=${idUser}&idPricing=${idPricing}`);
};
export { CreateOrder };
