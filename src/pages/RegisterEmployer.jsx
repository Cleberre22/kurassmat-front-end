import React from 'react';
import MenuHeader from "../components/auth/MenuHeader";
import RegisterFormEmployer from "../components/auth/RegisterFormEmployer";
import Box from "@mui/material/Box";
import Fox from '../components/Fox';

const RegisterEmployer = () => {

 

    return (
        <div>
            <MenuHeader />
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