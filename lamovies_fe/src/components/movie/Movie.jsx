import React from "react"
import { Link } from "react-router-dom"
import "./style.css"

const Movie = ({ item: { id, urlImg, name, time, view, minAge, quality } }) => {
  return (
        <li>
            <div class="movie-card">
                
                <Link to={`/singlepage/${id}`}>
                    <a href="#">
                        <figure class="card-banner">
                            <img src={urlImg} alt="Morbius movie poster"/>
                        </figure>
                    </a>
                    <div class="title-wrapper text-center">
                    <a href="#">
                        <h3 class="card-title">{name}</h3>
                    </a>
                </div>
                </Link>
                <div class="card-meta text-center">
                    <div class="badge-old badge-outline-old">{view} view</div>

                    <div class="badge-movie badge-outline">{time}</div>

                    <div class="badge-time badge-outline-time">{minAge} +</div>

                    <div class="badge-old badge-outline-old">{quality}</div>
                </div>

            </div>
        </li>
  )
}

export default Movie
