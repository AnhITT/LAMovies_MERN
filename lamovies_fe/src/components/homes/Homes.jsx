import React, { useEffect, useState } from "react"
import "./home.css"
import Home from "./Home"
import { GetMovieAPI } from "~/api/homes/home"

const Homes = () => {
  const [movie, setMovie] = useState([]);
  useEffect(()=>{
    fetchData();
  }, []);
  const fetchData = async () => {
    setMovie(await GetMovieAPI());
  }
  return (
    <>
      <section className='home'>
        <Home items={movie} />
      </section>
      <div className='mragin'></div>
    </>
  )
}

export default Homes
