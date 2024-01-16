import axiosClient from "../api/axiosClient";

const END_POINT = {
    PRICINGS: "pricings",
};

const GetPricingAPI = () => {
    return axiosClient.get(`${END_POINT.PRICINGS}`);
};
const GetUserPricing = () => {
    return axiosClient.get(`userPricings`);
};
export { GetUserPricing, GetPricingAPI };
