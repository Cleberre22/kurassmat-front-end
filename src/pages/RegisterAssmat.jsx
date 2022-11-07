import React from 'react';
import MenuAppBar from "../components/auth/MenuAppBar";
import RegisterFormAssmat from "../components/auth/RegisterFormAssmat";
import Box from "@mui/material/Box";
import Fox from '../components/Fox';

const RegisterAssmat = () => {

 

    return (
        <div>
            <MenuAppBar />
            <Box className="mainLoginRegister">
                <Box >
                <RegisterFormAssmat />
                <Fox />
                </Box>
            </Box>
        </div>
    );
};

export default RegisterAssmat;