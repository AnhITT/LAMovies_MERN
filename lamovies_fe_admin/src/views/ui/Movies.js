import React, { useState, useEffect } from "react";
import { Row, Col, Table, Card, CardTitle, CardBody, Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactPaginate from "react-paginate";
import {
    // UpdateMovieAPI,
    // ShowDetail,
    AddMovieAPI,
    // DeleteMovieAPI,
    GetMovieAPI,
} from "../../api/movie";
import { GetGenreAPI } from "../../api/genre";
import { GetActorAPI } from "../../api/actor";

import _ from "lodash";
import "../../assets/scss/paging.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
const Movies = () => {
    const [items, setItems] = useState([]);
    const [movieIdToDelete, setMovieIdToDelete] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [addMovieModal, setAddMovieModal] = useState(false);
    const [error, setError] = useState([]);
    const [successModal, setSuccessModal] = useState(false);
    const [genreOptions, setGenreOptions] = useState([]);
    const [actorOptions, setActorOptions] = useState([]);
    const [editUserModal, setEditUserModal] = useState(false);
    const [edit, setEdit] = useState("");
    const [newMovie, setNewMovie] = useState({
        name: "",
        description: "",
        urlTrailer: "",
        urlImg: "",
        urlImgCover: "",
        subLanguage: "",
        minAge: "",
        quality: "",
        time: "",
        yearCreate: "",
        type: "",
        view: "",
        actors: [],
        genres: [],
        oddmovie: "",
        seriesmovie: [],
    });
    const [editMovie, setEditMovie] = useState({
        Id: "",
        Name: "",
        Description: "",
        UrlTrailer: "",
        UrlImg: "",
        UrlImgCover: "",
        SubLanguage: "",
        MinAge: "",
        Quality: "",
        Time: "",
        YearCreate: "",
        Type: "",
        View: 0,
        Episodes: "",
        Genres: [],
        Actor: [],
    });
    useEffect(() => {
        fetchData();
    }, []);
    const validateForm = () => {
        const errors = [];
        if (!newMovie.Name) {
            errors.push("Name is required");
        }
        if (!newMovie.Description) {
            errors.push("Description is required");
        }
        if (!newMovie.UrlTrailer) {
            errors.push("UrlTrailer is required");
        }
        if (!newMovie.UrlImg) {
            errors.push("UrlImg is required");
        }
        if (!newMovie.UrlImgCover) {
            errors.push("UrlImgCover is required");
        }
        if (!newMovie.MinAge) {
            errors.push("MinAge is required");
        }
        if (!newMovie.Episodes) {
            errors.push("Episodes is required");
        }
        if (!newMovie.Time) {
            errors.push("Time is required");
        }
        if (!newMovie.YearCreate) {
            errors.push("YearCreate is required");
        }
        if (!newMovie.Quality) {
            errors.push("Quality is required");
        }
        if (!newMovie.SubLanguage) {
            errors.push("SubLanguage is required");
        }
        if (!newMovie.Type) {
            errors.push("Type is required");
        }
        if (newMovie.Genres.length === 0) {
            errors.push("Genres are required");
        }
        if (newMovie.Actor.length === 0) {
            errors.push("Actor is required");
        }
        setError(errors);
        return errors.length === 0;
    };

    const fetchData = async () => {
        const movie = await GetMovieAPI();
        setItems(movie.data);
    };
    const fetchDataAddEdit = async () => {
        const genre = await GetGenreAPI();
        setGenreOptions(genre.data);
        const actor = await GetActorAPI();
        setActorOptions(actor.data);
        const movie = await GetMovieAPI();
        setItems(movie.data);
    };
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };
    const pageCount = Math.ceil(items.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = items.slice(offset, offset + itemsPerPage);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        const filteredResults = items.filter((item) =>
            item.name.toLowerCase().includes(term.toLowerCase())
        );

        setSearchResults(filteredResults);
        setCurrentPage(1);
    };
    const HandleSort = (sortOrder, sortField) => {
        const sortedMovies = _.orderBy(items, [sortField], [sortOrder]);
        setItems(sortedMovies);
    };
    const confirmDeleteMovie = async () => {
        try {
            //await DeleteMovieAPI(movieIdToDelete);
            fetchData();
            setConfirmationModal(false);
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };
    const toggleAddMovieModal = () => {
        fetchDataAddEdit();
        setAddMovieModal(!addMovieModal);
    };
    const handleAddUser = async () => {
        if (validateForm()) {
            await AddMovieAPI(newMovie);
            toggleAddMovieModal();
            fetchData();
            toggleSuccessModal();
        }
    };
    const toggleSuccessModal = () => {
        setSuccessModal(!successModal);
    };
    const handleEditUser = async (id) => {
        try {
            fetchDataAddEdit();
            //const movie = await ShowDetail(id);
            // setEditMovie({
            //     Id: movie.id,
            //     Name: movie.name,
            //     Description: movie.description,
            //     UrlTrailer: movie.urlTrailer,
            //     UrlImg: movie.urlImg,
            //     UrlImgCover: movie.urlImgCover,
            //     SubLanguage: movie.subLanguage,
            //     MinAge: movie.minAge,
            //     Quality: movie.quality,
            //     Time: movie.time,
            //     YearCreate: movie.yearCreate,
            //     Type: movie.type,
            //     View: movie.view,
            //     Episodes: movie.episodes,
            //     Genres: movie.genres,
            //     Actor: movie.actor,
            // });
            setEdit(id);
            setEditUserModal(true);
        } catch (error) {
            console.error("Error fetching user data for edit:", error);
        }
    };
    const handleUpdateUser = async () => {
        try {
            //await UpdateMovieAPI(editMovie);
            setEditUserModal(false);
            fetchData();
            toggleSuccessModal();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    const toggleEditUserModal = () => {
        setEditUserModal(!editUserModal);
    };
    const displayItems = searchTerm !== "" ? searchResults : currentItems;
    return (
        <Row>
            <Col lg="12">
                <div>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Quản lý phim</CardTitle>
                            <div className="row">
                                <div className="col-4 my-1 pt-1">
                                    <input
                                        className="form-control"
                                        placeholder="Search movie by name"
                                        onChange={(event) =>
                                            handleSearch(event)
                                        }
                                    />
                                </div>
                                <div className="col-1 "></div>
                                <div className="col-6 my-1 pt-1 d-flex justify-content-end">
                                    <Button
                                        className="btn"
                                        color="success"
                                        onClick={toggleAddMovieModal}
                                    >
                                        Add new movie
                                    </Button>
                                </div>
                            </div>

                            <Table
                                className="no-wrap mt-3 align-middle"
                                responsive
                                borderless
                            >
                                <thead>
                                    <tr>
                                        <th className="sort">
                                            <div>
                                                <span>Name</span>
                                                <span className="p-2">
                                                    <i
                                                        className="fa-solid fa-arrow-down-long"
                                                        onClick={() =>
                                                            HandleSort(
                                                                "desc",
                                                                "name"
                                                            )
                                                        }
                                                    ></i>
                                                    <i
                                                        className="fa-solid fa-arrow-up-long"
                                                        onClick={() =>
                                                            HandleSort(
                                                                "asc",
                                                                "name"
                                                            )
                                                        }
                                                    ></i>
                                                </span>
                                            </div>
                                        </th>

                                        <th className="sort">
                                            <div>
                                                <span>Time</span>
                                                <span className="p-2">
                                                    <i
                                                        className="fa-solid fa-arrow-down-long"
                                                        onClick={() =>
                                                            HandleSort(
                                                                "desc",
                                                                "time"
                                                            )
                                                        }
                                                    ></i>
                                                    <i
                                                        className="fa-solid fa-arrow-up-long"
                                                        onClick={() =>
                                                            HandleSort(
                                                                "asc",
                                                                "time"
                                                            )
                                                        }
                                                    ></i>
                                                </span>
                                            </div>
                                        </th>
                                        <th className="sort">
                                            <div>
                                                <span>View</span>
                                                <span className="p-2">
                                                    <i
                                                        className="fa-solid fa-arrow-down-long"
                                                        onClick={() =>
                                                            HandleSort(
                                                                "desc",
                                                                "view"
                                                            )
                                                        }
                                                    ></i>
                                                    <i
                                                        className="fa-solid fa-arrow-up-long"
                                                        onClick={() =>
                                                            HandleSort(
                                                                "asc",
                                                                "view"
                                                            )
                                                        }
                                                    ></i>
                                                </span>
                                            </div>
                                        </th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayItems.map((item, index) => (
                                        <tr key={index} className="border-top">
                                            <td>
                                                <div className="d-flex align-items-center p-2">
                                                    <img
                                                        src={item.urlImg}
                                                        className="rounded-circle"
                                                        alt="avatar"
                                                        width="45"
                                                        height="45"
                                                    />
                                                    <div className="ms-3">
                                                        <h6 className="mb-0">
                                                            {item.name}
                                                        </h6>
                                                        <span className="text-muted">
                                                            {item.quality}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item.time}</td>
                                            <td>{item.view}</td>

                                            <td className="d-flex justify-content-center action pt-4">
                                                <Button
                                                    className="btn"
                                                    color="primary"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleEditUser(item.id)
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    className="btn"
                                                    color="danger"
                                                    size="sm"
                                                    onClick={() => {
                                                        setMovieIdToDelete(
                                                            item.id
                                                        );
                                                        setConfirmationModal(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <div className="pagination-container">
                                    <ReactPaginate
                                        previousLabel={"Previous"}
                                        nextLabel={"Next"}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName={
                                            "pagination justify-content-center"
                                        }
                                        subContainerClassName={
                                            "pages pagination"
                                        }
                                        activeClassName={"active"}
                                    />
                                </div>
                            </Table>
                        </CardBody>
                    </Card>
                    <Modal
                        isOpen={confirmationModal}
                        toggle={() => setConfirmationModal(false)}
                    >
                        <ModalBody>
                            <p className="text-center text-danger">
                                Are you sure you want to delete this movie?
                            </p>
                            <div className="d-flex justify-content-center">
                                <div className="col-2">
                                    <Button
                                        className="btn"
                                        color="danger"
                                        onClick={confirmDeleteMovie}
                                    >
                                        Delete
                                    </Button>
                                </div>
                                <div className="col-1">
                                    <Button
                                        className="btn"
                                        color="secondary"
                                        onClick={() =>
                                            setConfirmationModal(false)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={addMovieModal} toggle={toggleAddMovieModal}>
                        <ModalHeader toggle={toggleAddMovieModal}>
                            Add New Movie
                        </ModalHeader>
                        <ModalBody>
                            <form>
                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="form-label"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Name"
                                        value={newMovie.name}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="description"
                                        className="form-label"
                                    >
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        value={newMovie.description}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="urlTrailer"
                                        className="form-label"
                                    >
                                        UrlTrailer
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="urlTrailer"
                                        value={newMovie.urlTrailer}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                urlTrailer: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="urlImg"
                                        className="form-label"
                                    >
                                        UrlImg
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="urlImg"
                                        value={newMovie.urlImg}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                urlImg: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="urlImgCover"
                                        className="form-label"
                                    >
                                        UrlImgCover
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="urlImgCover"
                                        value={newMovie.urlImgCover}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                urlImgCover: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="minAge"
                                        className="form-label"
                                    >
                                        MinAge
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="minAge"
                                        value={newMovie.minAge}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                minAge: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="episodes"
                                        className="form-label"
                                    >
                                        Episodes
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="episodes"
                                        value={newMovie.episodes}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                episodes: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="time"
                                        className="form-label"
                                    >
                                        Time
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="time"
                                        value={newMovie.time}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                time: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="yearCreate"
                                        className="form-label"
                                    >
                                        Year Create
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="yearCreate"
                                        value={newMovie.yearCreate}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                yearCreate: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="quality"
                                        className="form-label"
                                    >
                                        Quality
                                    </label>
                                    <select
                                        className="form-select"
                                        id="quality"
                                        value={newMovie.quality}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                quality: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">
                                            --Select Quality--
                                        </option>
                                        <option value="HD">HD</option>
                                        <option value="FHD">FHD</option>
                                        <option value="2K">2K</option>
                                        <option value="4K">4K</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="subLanguage"
                                        className="form-label"
                                    >
                                        Language
                                    </label>
                                    <select
                                        className="form-select"
                                        id="subLanguage"
                                        value={newMovie.subLanguage}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                subLanguage: e.target.value,
                                            })
                                        }
                                    >
                                        <option selected>
                                            --Select Country--
                                        </option>
                                        <option value="VietNam">VietNam</option>
                                        <option value="America">America</option>
                                        <option value="Korea">Korea</option>
                                        <option value="China">China</option>
                                        <option value="Japan">Japan</option>
                                        <option value="India">India</option>
                                        <option value="England">England</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="type"
                                        className="form-label"
                                    >
                                        Type
                                    </label>
                                    <select
                                        className="form-select"
                                        id="type"
                                        value={newMovie.type}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                type: e.target.value,
                                            })
                                        }
                                    >
                                        <option selected>
                                            --Select Type--
                                        </option>
                                        <option value="seriesMovies">
                                            Series Movies
                                        </option>
                                        <option value="oddMovies">
                                            Odd Movies
                                        </option>
                                    </select>
                                </div>
                                {/* <div className="mb-3">
                                    <label
                                        htmlFor="genres"
                                        className="form-label"
                                    >
                                        Genres
                                    </label>
                                    <select
                                        className="form-select"
                                        id="genres"
                                        value={newMovie.genres}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                genres: Array.from(
                                                    e.target.selectedOptions,
                                                    (option) =>
                                                        parseInt(
                                                            option.value,
                                                            10
                                                        )
                                                ),
                                            })
                                        }
                                        multiple
                                    >
                                        {genreOptions.map((genre) => (
                                            <option
                                                key={genre._id}
                                                value={genre._id}
                                            >
                                                {genre.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span
                                        className="text-danger"
                                        asp-validation-for="Genres"
                                    ></span>
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="Actor"
                                        className="form-label"
                                    >
                                        Actor
                                    </label>
                                    <select
                                        className="form-select"
                                        id="Actor"
                                        value={newMovie.actors}
                                        onChange={(e) =>
                                            setNewMovie({
                                                ...newMovie,
                                                actors: Array.from(
                                                    e.target.selectedOptions,
                                                    (option) =>
                                                        parseInt(
                                                            option.value,
                                                            10
                                                        )
                                                ),
                                            })
                                        }
                                        multiple
                                    >
                                        {actorOptions.map((genre) => (
                                            <option
                                                key={genre._id}
                                                value={genre._id}
                                            >
                                                {genre.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span
                                        className="text-danger"
                                        asp-validation-for="Actor"
                                    ></span>
                                </div> */}
                            </form>
                            {error.map((error, index) => (
                                <p
                                    key={index}
                                    className="error-message text-danger"
                                >
                                    {error}
                                </p>
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={handleAddUser}>
                                Add Movie
                            </Button>
                            <Button
                                color="secondary"
                                onClick={toggleAddMovieModal}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={editUserModal} toggle={toggleEditUserModal}>
                        <ModalHeader toggle={toggleEditUserModal}>
                            Edit Movie
                        </ModalHeader>
                        <ModalBody>
                            <form>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Name"
                                        className="form-label"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Name"
                                        value={editMovie.Name}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                Name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Description"
                                        className="form-label"
                                    >
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Description"
                                        value={editMovie.Description}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                Description: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="UrlTrailer"
                                        className="form-label"
                                    >
                                        UrlTrailer
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="UrlTrailer"
                                        value={editMovie.UrlTrailer}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                UrlTrailer: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="UrlImg"
                                        className="form-label"
                                    >
                                        UrlImg
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="UrlImg"
                                        value={editMovie.UrlImg}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                UrlImg: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="UrlImgCover"
                                        className="form-label"
                                    >
                                        UrlImgCover
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="UrlImgCover"
                                        value={editMovie.UrlImgCover}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                UrlImgCover: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="MinAge"
                                        className="form-label"
                                    >
                                        MinAge
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="MinAge"
                                        value={editMovie.MinAge}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                MinAge: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Episodes"
                                        className="form-label"
                                    >
                                        Episodes
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Episodes"
                                        value={editMovie.Episodes}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                Episodes: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Time"
                                        className="form-label"
                                    >
                                        Time
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Time"
                                        value={editMovie.Time}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                Time: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="YearCreate"
                                        className="form-label"
                                    >
                                        Year Create
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="YearCreate"
                                        value={editMovie.YearCreate}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                YearCreate: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Quality"
                                        className="form-label"
                                    >
                                        Quality
                                    </label>
                                    <select
                                        className="form-select"
                                        id="Quality"
                                        value={editMovie.Quality}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                Quality: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">
                                            --Select Quality--
                                        </option>
                                        <option value="HD">HD</option>
                                        <option value="FHD">FHD</option>
                                        <option value="2K">2K</option>
                                        <option value="4K">4K</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="SubLanguage"
                                        className="form-label"
                                    >
                                        Language
                                    </label>
                                    <select
                                        className="form-select"
                                        id="SubLanguage"
                                        value={editMovie.SubLanguage}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                SubLanguage: e.target.value,
                                            })
                                        }
                                    >
                                        <option selected>
                                            --Select Country--
                                        </option>
                                        <option value="VietNam">VietNam</option>
                                        <option value="America">America</option>
                                        <option value="Korea">Korea</option>
                                        <option value="China">China</option>
                                        <option value="Japan">Japan</option>
                                        <option value="India">India</option>
                                        <option value="England">England</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Type"
                                        className="form-label"
                                    >
                                        Type
                                    </label>
                                    <select
                                        className="form-select"
                                        id="Type"
                                        value={editMovie.Type}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                Type: e.target.value,
                                            })
                                        }
                                    >
                                        <option selected>
                                            --Select Type--
                                        </option>
                                        <option value="seriesMovies">
                                            Series Movies
                                        </option>
                                        <option value="oddMovies">
                                            Odd Movies
                                        </option>
                                    </select>
                                </div>
                                {/* <div className="mb-3">
                                    <label
                                        htmlFor="Genres"
                                        className="form-label"
                                    >
                                        Genres
                                    </label>
                                    <select
                                        className="form-select"
                                        id="Genres"
                                        value={editMovie.Genres}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                Genres: Array.from(
                                                    e.target.selectedOptions,
                                                    (option) =>
                                                        parseInt(
                                                            option.value,
                                                            10
                                                        )
                                                ),
                                            })
                                        }
                                        multiple
                                    >
                                        {genreOptions.map((genre) => (
                                            <option
                                                key={genre._id}
                                                value={genre._id}
                                            >
                                                {genre.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span
                                        className="text-danger"
                                        asp-validation-for="Genres"
                                    ></span>
                                </div> */}

                                {/* <div className="mb-3">
                                    <label
                                        htmlFor="Actor"
                                        className="form-label"
                                    >
                                        Actor
                                    </label>
                                    <select
                                        className="form-select"
                                        id="Actor"
                                        value={editMovie.Actor}
                                        onChange={(e) =>
                                            setEditMovie({
                                                ...editMovie,
                                                Actor: Array.from(
                                                    e.target.selectedOptions,
                                                    (option) =>
                                                        parseInt(
                                                            option.value,
                                                            10
                                                        ) // Parse value as integer
                                                ),
                                            })
                                        }
                                        multiple
                                    >
                                        {actorOptions.map((genre) => (
                                            <option
                                                key={genre.id}
                                                value={genre.id}
                                            >
                                                {genre.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span
                                        className="text-danger"
                                        asp-validation-for="Actor"
                                    ></span>
                                </div> */}
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={handleUpdateUser}>
                                Update Movie
                            </Button>
                            <Button
                                color="secondary"
                                onClick={toggleEditUserModal}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={successModal} toggle={toggleSuccessModal}>
                        <ModalBody>
                            <p className="text-center text-success">
                                Movie added successfully!
                            </p>
                        </ModalBody>
                    </Modal>
                </div>
            </Col>
        </Row>
    );
};

export default Movies;
