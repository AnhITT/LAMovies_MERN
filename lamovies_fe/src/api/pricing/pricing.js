import axiosClient from '~/api/axios/axiosClient';

const END_POINT = {
    PRICINGS: 'pricings',
    CheckPricing: 'CheckPricing?id=',
    GetInfoPricing: 'GetInfoPricing?id=',
};
const GetPricingAPI = () => {
    return axiosClient.get(`${END_POINT.PRICINGS}`);
};
const GetPricingByIdAPI = (id) => {
    return axiosClient.get(`${END_POINT.PRICINGS}/${id}`);
};
const CheckPricing = (id) => {
    return axiosClient.get(`${END_POINT.PRICINGS}/${END_POINT.CheckPricing}${id}`);
};
const GetInfoPricing = (id) => {
    return axiosClient.get(`${END_POINT.PRICINGS}/${END_POINT.GetInfoPricing}/${id}`);
};
export { GetInfoPricing, CheckPricing, GetPricingAPI, GetPricingByIdAPI };
