import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuAppBar from "../components/auth/MenuAppBar";
import Fox from "../components//Fox";
import Prince from "../components//Prince";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const Home = () => {
  const [user, setUser] = useState([]);

  // useEffect(() => {
  //   displayUsers();
  // }, []); // Sans les crochets ça tourne en boucle

  // const displayUsers = async () => {
  //   await axios
  //     .get("http://localhost:8000/api/current-user", {
  //       headers: {
  //         Authorization: "Bearer" + localStorage.getItem("access_token"),
  //       },
  //     })
  //     .then((res) => {
  //       setUser(res.data);
  //       // console.log(res.data);
  //     });
  // };

  return (
    <div>
      <MenuAppBar />
      <Box className="main">
        <CssBaseline />
        <Container className="containerHome">
          {/* <h1 className="titleHome">KURASSMAT</h1> */}
          <Box className="boxHome overlay">
            <p className="typed-out">
              Vous êtes nounou, assistante maternelle ou encore une MAM ( maison
              d'assistante maternelle ). Notre solution repensant la garde
              d'enfants est faite pour vous. Créez/modifiez/supprimez des
              enfants avec toutes les informations nécessaires.
              Créez/modifiez/supprimez les menus d'une semaine à l'autre.
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
