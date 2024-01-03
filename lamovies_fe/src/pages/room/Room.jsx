import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetMovieByID, GetURLOddMovie } from '~/api/homes/home';
import { CheckPricing } from '~/api/pricing/pricing';
import AuthService from '~/service/auth/auth-service';
import './style.css';
import Peer from 'peerjs';
import Modal from 'react-modal'; // Import thư viện react-modal
import { HubConnectionBuilder } from '@microsoft/signalr';
const Room = () => {
    const { idRoom, id } = useParams();
    const [movie, setMovie] = useState([]);
    const [url, setUrl] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [check, setCheck] = useState();
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            if (AuthService.getCurrentUser()) {
                setCurrentUser(await AuthService.getCurrentUser());
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchPricing = async () => {
            if (currentUser) {
                setCheck(await CheckPricing(currentUser.Id));
            }
        };

        fetchPricing();
    }, [currentUser]);

    useEffect(() => {
        const fetchData = async () => {
            const movieData = await GetMovieByID(id);
            setMovie(movieData);
            if (check) {
                const data = await GetURLOddMovie(movieData.id);
                setUrl(data);
            }
        };

        fetchData();
    }, [check, id]);
    useEffect(() => {
        const initializePeer = async () => {
            const peer = new Peer();

            peer.on('open', (id) => {
                setPeerId(id);
            });

            // Get user media
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            // Display current user video
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.onloadedmetadata = () => {
                currentUserVideoRef.current.play();
            };

            // Answer calls
            peer.on('call', (call) => {
                call.answer(mediaStream);
                handleCall(call);
            });

            peerInstance.current = peer;
        };

        initializePeer();
    }, []);
    const handleCall = (call) => {
        call.on('stream', (remoteStream) => {
            // Display remote user video
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.onloadedmetadata = () => {
                remoteVideoRef.current.play();
            };
        });
    };

    const call = (remotePeerId) => {
        const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        getUserMedia({ video: true, audio: true }, (mediaStream) => {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.onloadedmetadata = () => {
                currentUserVideoRef.current.play();
            };

            const call = peerInstance.current.call(remotePeerId, mediaStream);
            handleCall(call);
        });
    };

    const [isModalOpen, setModalOpen] = useState(false);

    // State để lưu giá trị nhập liệu từ ô username trong form
    const [inviteUsername, setInviteUsername] = useState('');

    // Hàm mở modal
    const openModal = () => {
        setModalOpen(true);
    };

    // Hàm đóng modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Hàm xử lý khi click vào nút "Invite friend"
    const handleInviteFriend = () => {
        openModal();
    };

    // Hàm xử lý khi submit form
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Thực hiện xử lý với giá trị inviteUsername
        // ...

        // Sau khi xử lý xong, đóng modal
        closeModal();
    };
    return (
        <div>
            {check === true ? (
                <>
                    <div className="singleHeading">
                        <h1>Movie {movie.name} </h1> <span> | {movie.time} | </span> <span> {movie.quality} </span>
                    </div>
                    <div className="main">
                        <iframe
                            src={url.url}
                            width="85%"
                            height="750px"
                            frameBorder="0"
                            allowFullScreen
                            title="Embedded Content"
                        ></iframe>
                        <div className="sidebar">
                            <video ref={currentUserVideoRef} />
                            <button className="btn-play primary-btn" onClick={handleInviteFriend}>
                                Invite friend
                            </button>
                            <Modal
                                isOpen={isModalOpen}
                                onRequestClose={closeModal}
                                contentLabel="Invite Friend Modal"
                                style={{
                                    overlay: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Màu nền đen với độ trong suốt
                                    },
                                    content: {
                                        backgroundColor: '#1c1c1c', // Màu nền cho nội dung modal
                                        color: 'white', // Màu chữ cho nội dung modal
                                        width: '300px', // Độ rộng của modal
                                        height: '200px', //
                                        margin: 'auto', // Canh giữa
                                    },
                                }}
                            >
                                <h2 style={{ textAlign: 'center' }}>Invite Friend</h2>
                                <form onSubmit={handleFormSubmit}>
                                    <label style={{ display: 'block', marginBottom: '10px' }}>
                                        Username:
                                        <input
                                            type="text"
                                            value={inviteUsername}
                                            onChange={(e) => setInviteUsername(e.target.value)}
                                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                                        />
                                    </label>
                                    <button
                                        type="submit"
                                        style={{
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            padding: '10px',
                                            width: '100%',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Submit
                                    </button>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </>
            ) : (
                <section className="singlePage">
                    <div className="singleHeading">
                        <h1>Movie {movie.name} </h1> <span> | {movie.time} | </span> <span> {movie.quality} </span>
                    </div>
                    <div className="container">
                        <div className="para">
                            <div className="singleHeading">
                                <h1>PLEASE REGISTER TO USE THE SERVICE TO WATCH MOVIES</h1>
                            </div>
                        </div>

                        <div className="para">
                            <h3>Description:</h3>
                            <p>{movie.description}</p>
                        </div>
                        <div className="soical">
                            <h3>Share : </h3>
                            <img src="https://img.icons8.com/color/48/000000/facebook-new.png" />
                            <img src="https://img.icons8.com/fluency/48/000000/twitter-circled.png" />
                            <img src="https://img.icons8.com/fluency/48/000000/linkedin-circled.png" />
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Room;
