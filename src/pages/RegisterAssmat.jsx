import React from 'react';
import MenuHeader from "../components/auth/MenuHeader";
import RegisterFormAssmat from "../components/auth/RegisterFormAssmat";
import Box from "@mui/material/Box";
import Fox from '../components/Fox';

const RegisterAssmat = () => {

 

    return (
        <div>
            <MenuHeader />
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