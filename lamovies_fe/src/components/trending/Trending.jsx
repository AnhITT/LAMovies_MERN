import React, { useState, useEffect } from "react"
import { GetMovieAPI } from "~/api/homes/home"
import Home from "../homes/Home"
import "./style.css"

const Trending = () => {
  const [movie, setMovie] = useState([]);
  useEffect(()=>{
    fetchData();
  }, []);
  const fetchData = async () => {
    setMovie(await GetMovieAPI());
  }
  return (
    <>
      <section className='trending'>
        <Home items={movie} />
      </section>
    </>
  )
}

export default Trending
