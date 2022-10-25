import React from 'react';
import MenuHeader from "../components/auth/MenuHeader";
import RegisterForm from "../components/auth/RegisterFormEmployer";
import Box from "@mui/material/Box";
import Fox from '../components/Fox';

const RegisterAssmat = () => {

 

    return (
        <div>
            <MenuHeader />
            <Box className="mainLoginRegister">
                <Box >
                <RegisterForm />
                <Fox />
                </Box>
            </Box>
        </div>
    );
};

export default RegisterAssmat;