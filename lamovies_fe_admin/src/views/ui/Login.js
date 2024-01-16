import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./login.css";

const Login = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validate = () => {
        if (!userName && !password) {
            setError({ error: "Please enter username and password!" });
            return false;
        } else if (!userName) {
            setError({ error: "Please enter a username!" });
            return false;
        } else if (!password) {
            setError({ error: "Please enter a password!" });
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post(
                    "http://localhost:3000/authen/loginadmin",
                    { userName, password },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    navigate("/");
                } else {
                    setError({ error: response.data });
                }
            } catch (error) {
                if (error.response) {
                    setError({ error: error.response.data.data });
                } else {
                    console.log("Error:", error.message);
                }
            }
        }
    };

    return (
        <div className="login-container">
            <h1 className="text-center">Login Admin</h1>
            <Form>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <p className="error-message">{error.error}</p>

                <Button
                    color="primary"
                    className="d-flex justify-content-center align-items-center"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;
