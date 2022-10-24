import React from 'react';
import MenuHeader from "../components/auth/MenuHeader";
import LoginForm from "../components/auth/LoginForm";
import Box from "@mui/material/Box";

const Login = () => {
    return (
        <div>
            <MenuHeader />
            <Box className="mainLoginRegister">
                <Box >
                <LoginForm />
                </Box>
            </Box>
        </div>
    );
};

export default Login;