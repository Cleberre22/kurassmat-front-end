import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuAppBar from "../components/auth/MenuAppBar";
import Fox from "../components//Fox";
import Prince from "../components//Prince";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';


const Home = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  const displayUsers = async () => {
    await axios
      .get("http://localhost:8000/api/current-user", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUser(res.data);
        // console.log(res.data);
      });
  };

  return (
    <div>
      <MenuAppBar />
      <Box className="main">
        <CssBaseline />
        <Container className="containerHome">
          {/* <h1 className="titleHome">KURASSMAT</h1> */}
          <Box className="boxHome overlay">
            <p className="typed-out">
              Vivamus feugiat laoreet magna, a iaculis lorem lacinia eget. Morbi
              pulvinar auctor mauris sit amet dictum. Pellentesque maximus
              facilisis orci ac semper. Mauris facilisis faucibus libero at
              fringilla. Suspendisse nec arcu eu velit dictum molestie. Morbi
              volutpat risus sem, vel euismod quam egestas quis. Aliquam erat
              volutpat. Cras lobortis nisi ac odio luctus vestibulum. Donec non
              bibendum nunc, eu rutrum augue.
            </p>
            <p>
              Inscrivez-vous en tant que parents ou en tant qu'assistante
              maternelle:
            </p>
           <Box className="boxButtonHome">
           <Button href="/registerAssmat" className="button-87 button">
              ASSMAT
            </Button>
            <Button href="/registerEmployer" className="button-87">
              PARENTS
            </Button>
           </Box>
            
           
          </Box>
        </Container>

        <Fox />
        <Prince />
      </Box>
    </div>
  );
};

export default Home;
