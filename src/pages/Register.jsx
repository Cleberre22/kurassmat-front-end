import React from 'react';
import MenuHeader from "../components/auth/MenuHeader";
import RegisterForm from "../components/auth/RegisterForm";
import Box from "@mui/material/Box";

const Register = () => {

 

    return (
        <div>
            <MenuHeader />
            <Box className="mainLoginRegister">
                <Box >
                <RegisterForm />
                </Box>
            </Box>
        </div>
    );
};

export default Register;