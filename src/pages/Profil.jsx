import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuHeader from "../components/auth/MenuHeader";
import Fox from "../components//Fox";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const Profil = () => {
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
      <MenuHeader />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil">
          <h1 className="titleProfil">
            Mon profil: {user.firstname} {user.lastname}
          </h1>
          <Box className="boxProfil">
            <Box>
              <Avatar sx={{ width: 100, height: 100 }} src="avatar.png" />
              <p className="">
                Prénom: {user.firstname} Nom: {user.lastname}
                Email: {user.email} Adresse: {user.address}
                {user.postalCode} {user.city} Téléphone:{user.phone}
                
              </p>
              <p>Modifier mon mot de passe: ICI</p>
            </Box>

            <Box>
              <p>Ajouter un enfant:</p>
              <Box>
                <p>
                  <Avatar sx={{ width: 70, height: 70 }} src="avatar-2.png" />
                </p>
                <p className="">
                  Prénom: {user.firstname} Nom: {user.lastname}
                  Email: {user.email} Adresse: {user.address}
                  {user.postalCode} {user.city} Téléphone:{user.phone}
                  
                </p>
              </Box>
            </Box>

          </Box>
        </Container>

        <Fox />
      </Box>
    </div>
  );
};

export default Profil;
