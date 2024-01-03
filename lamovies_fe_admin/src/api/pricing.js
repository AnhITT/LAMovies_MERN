import axiosClient from "../api/axiosClient";

const END_POINT = {
    PRICINGS: "Pricing",
    GetUserPricing: "GetUserPricing",
};

const GetPricingAPI = () => {
    return axiosClient.get(`${END_POINT.PRICINGS}`);
};
const GetUserPricing = () => {
    return axiosClient.get(`${END_POINT.PRICINGS}/${END_POINT.GetUserPricing}`);
};
export { GetUserPricing, GetPricingAPI };
