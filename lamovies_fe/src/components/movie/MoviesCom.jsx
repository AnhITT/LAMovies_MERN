import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Movie from './Movie';
import './style.css';
import ReactPaginate from 'react-paginate';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MoviesCom = ({ items, title }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;

    // Lọc phim dựa trên tìm kiếm

    // Tính toán các giá trị phân trang
    const offset = currentPage * itemsPerPage;
    const currentItems = items.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Xử lý sự kiện khi người dùng chuyển trang
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    return (
        <>
            <section className="list-movies">
                <div className="container">
                    <div className="heading flexSB">
                        <h1>{title}</h1>
                        <Link to="/listmovie">View All</Link>
                    </div>

                    <ul className="movies-list">
                        {currentItems.map((item) => (
                            <Movie key={item.id} item={item} />
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

export default MoviesCom;
