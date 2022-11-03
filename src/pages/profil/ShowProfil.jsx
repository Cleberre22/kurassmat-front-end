import React, { useEffect, useState } from "react";
import axios from "axios";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";


import MenuHeader from "../../components/auth/MenuHeader";
import Fox from "../../components/Fox";
import Prince from "../../components/Prince";

const Profil = () => {
  const [user, setUser] = useState([]);
  // const [childs, setChild] = useState([]);

  useEffect(() => {
    displayUsers();
    // displayChild();
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
      });
  };

  // const displayChild = async () => {
  //   await axios.get("http://localhost:8000/api/childs").then((res) => {
  //     setChild(res.data);
  //     console.log(res.data);
  //     console.log(childs);
  //   });
  // };

  return (
    <div>
      <MenuHeader />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil">
          <h1 className="titleProfil">{user.firstname} {user.lastname}</h1>
          <Box className="boxProfil">
            <Box>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Box className="userCard">
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
                        sx={{ width: 100, height: 100 }}
                        src="avatar.png"
                      />
                    </Box>

                    <Box className="userCardMiddle" sx={{ mb: 3 }}>
                      <p>
                        {user.firstname} {user.lastname}
                      </p>
                      <p>Email: {user.email}</p>
                      <p>
                        Adresse: {user.address}, {user.postalCode} {user.city}
                      </p>
                      <p>Téléphone: {user.phone}</p>
                    </Box>
                  </Box>

                  <Box className="userCard">
                    <Box className="userCardTop" sx={{ mt: 3 }}>
                      <h2>Personne à prevenir:</h2>
                    </Box>

                    <Box className="userCardMiddle" sx={{ mb: 3 }}>
                      <p>
                        {user.firstname} {user.lastname}
                      </p>
                      <p>Email: {user.email}</p>
                      <p>
                        Adresse: {user.address}, {user.postalCode} {user.city}
                      </p>
                      <p>Téléphone: {user.phone}</p>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box className="childCard">
                    <Box className="boxAction">
                      <a
                        className="linkEditProfil"
                        href="/children/add"
                        id="style-2"
                        data-replace="Ajouter un enfant"
                      >
                        <span>Ajouter un enfant</span>
                      </a>
                    </Box>
                    <Box className="userCardTop" sx={{ mb: 2 }}>
                      <Avatar
                        sx={{ width: 80, height: 80 }}
                        src="avatar-2.png"
                      />
                    </Box>

                    <Box className="userCardMiddle" sx={{ mb: 3 }}>
                      {/* {childs.map((child) => (
                        <p>
                          {child.firstname} {child.lastname}
                        </p>
                      ))} */}

                      <p>Email: {user.email}</p>
                      <p>
                        Adresse: {user.address}, {user.postalCode} {user.city}
                      </p>
                      <p>Téléphone: {user.phone}</p>
                    </Box>
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
