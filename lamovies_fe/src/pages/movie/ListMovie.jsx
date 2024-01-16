import React, { useState, useEffect } from 'react';
import { GetMovieAPI } from '~/api/homes/home';
import Movies from '~/components/movie/Movies';
import ReactPaginate from 'react-paginate';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import Movie from './../../components/movie/Movie';
import './../../components/movie/style.css';
const ListMovie = () => {
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const data = await GetMovieAPI();
                setMovieData(data);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchMovieData();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;
    const filteredMovies = (movieData.data || []).filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const offset = currentPage * itemsPerPage;
    const currentItems = filteredMovies.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredMovies.length / itemsPerPage);
    console.log(currentItems);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };
    return (
        <>
            <section className="list-movies">
                <div className="container">
                    <div className="heading flexSB">
                        <h1>List Movie</h1>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search by movie name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Link to="/listmovie">View All</Link>
                    </div>

                    <ul className="movies-list">
                        {currentItems.map((item) => (
                            <Movie key={item._id} item={item} />
                        ))}
                    </ul>
                    <div className="pagination-container">
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default ListMovie;
