import React from 'react';
import MenuAppBar from "../components/auth/MenuAppBar";
import RegisterFormEmployer from "../components/auth/RegisterFormEmployer";
import Box from "@mui/material/Box";
import Fox from '../components/Fox';

const RegisterEmployer = () => {

 

    return (
        <div>
            <MenuAppBar />
            <Box className="mainLoginRegister">
                <Box >
                <RegisterFormEmployer />
                <Fox />
                </Box>
            </Box>
        </div>
    );
};

export default RegisterEmployer;