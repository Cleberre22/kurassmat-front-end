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
          <Box className="boxHome overlay">
            <p className="typed-out">
              Vous êtes nounou, assistante maternelle ou encore une MAM ( maison
              d'assistante maternelle ).
            </p>{" "}
            <p>
              Notre solution repensant la garde d'enfants est faite pour vous.
            </p>{" "}
            <p>
              Créez/modifiez/supprimez des fiches enfants avec toutes les
              informations nécessaires.
            </p>{" "}
            <p>
              Envoyez aux parents le récapitulatifs et les photos prisent lors
              des journées des enfants a votre charge.
            </p>
            <Box className="boxButtonHome">
              <Button href="/registerAssmat" className="button-87 button">
               créer mon compte
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
