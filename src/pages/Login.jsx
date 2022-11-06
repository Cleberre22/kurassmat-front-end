import React from 'react';
import MenuAppBar from "../components/auth/MenuAppBar";
import LoginForm from "../components/auth/LoginForm";
import Box from "@mui/material/Box";
import Fox from '../components//Fox';

const Login = () => {
    return (
        <div>
            <MenuAppBar />
            <Box className="mainLoginRegister">
                <Box >
                <LoginForm />
                <Fox />
                </Box>
            </Box>
        </div>
    );
};

export default Login;