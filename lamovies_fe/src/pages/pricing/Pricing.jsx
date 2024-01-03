import React, { useState , useEffect} from "react"
import { GetPricingAPI } from "~/api/pricing/pricing"
import Pricings from "~/components/pricing/Pricings"

const Pricing = () => {
    const [pricing, setPricing] = useState([]);
    useEffect(()=>{
      fetchData();
    }, []);
    const fetchData = async () => {
      setPricing(await GetPricingAPI());
    }
  return (
    <>
      <Pricings items={pricing} title='List Pricing' />
    </>
  )
}

export default Pricing
