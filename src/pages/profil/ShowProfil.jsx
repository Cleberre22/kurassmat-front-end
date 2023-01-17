import React, { useEffect, useState } from "react";
import axios from "axios";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

import MenuAppBar from "../../components/auth/MenuAppBar";
import Fox from "../../components/Fox";
import Prince from "../../components/Prince";

const Profil = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  const displayUsers = async () => {
    await axios
      .get("https://kurassmat.charleyleberre.fr/api/current-user", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  };

  return (
    <div>
      <MenuAppBar />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil">
          <h1 className="titleProfil">
            {user.firstname} {user.lastname}
          </h1>
          <Box className="boxProfil">
            <Box>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12}>
                  <Box className="userCard">
                    <Container>
                      <Box className="boxAction">
                        <a
                          className="linkEditProfil"
                          href="/editProfil/"
                          id="style-2"
                          data-replace="Modifier mon profil"
                        >
                          <span>Modifier mon profil </span>
                        </a>
                      </Box>

                      <Box className="userCardTop" sx={{ mb: 2 }}>
                        <Avatar
                        className="avatarShowProfil"
                          sx={{ width: 120, height: 120 }}
                          src="avatar.png"
                        />

                        <Box className="userCardMiddle" sx={{ mb: 3 }}>
                          <p>
                            {user.firstname} {user.lastname}
                          </p>
                          <p>Email: {user.email}</p>
                          <p>
                            Adresse: {user.address}, {user.postalCode}{" "}
                            {user.city}
                          </p>
                          <p>Téléphone: {user.phone}</p>
                        </Box>
                      </Box>
                    </Container>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>

        <Fox />
        <Prince />
      </Box>
    </div>
  );
};

export default Profil;
