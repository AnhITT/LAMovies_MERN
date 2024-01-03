import React, { useState , useEffect} from "react"
import { GetMovieAPI } from "~/api/homes/home"
import Movies from "~/components/movie/Movies"

const ListMovie = () => {
    const [movie, setMovie] = useState([]);
    useEffect(()=>{
      fetchData();
    }, []);
    const fetchData = async () => {
      setMovie(await GetMovieAPI());
    }
  return (
    <>
      <Movies items={movie} title='List Movie' />
    </>
  )
}

export default ListMovie
