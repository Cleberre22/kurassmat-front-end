import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import MenuAppBar from "../../components/auth/MenuAppBar";
import Fox from "../../components/Fox";
import Prince from "../../components/Prince";
import BackToTop from "../../components/BackToTop";
import Sliders from "../../components/Sliders";
import { Carousel } from "react-responsive-carousel";

const PicturesChild = () => {
  const { idChildPicture } = useParams();
  const [pictures, setPictures] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    displayPictures();
  }, []); // Sans les crochets ça tourne en boucle

  const displayPictures = async () => {
    await axios
      .get(`http://localhost:8000/api/picturesIndexChild/${idChildPicture }`)
      .then((res) => {
        setPictures(res.data);
        console.log(res.data);
      });
  };
    console.log(pictures);

  const deletePicture = (id) => {
    axios
      .delete(`http://localhost:8000/api/picture/${id}`)
      .then(displayPictures);
  };

  const [idChild, setIdChild] = useState("");
  const [firstnameChild, setFirstnameChild] = useState("");
  const [lastnameChild, setLastnameChild] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [imageChild, setImageChild] = useState("");
  const [urlPicture, setUrlPicture] = useState("");
  const [namePicture, setNamePicture] = useState("");

  useEffect(() => {
    getChild();

    // displayDaySummaries();
  }, []); // Sans les crochets ça tourne en boucle

  // GET - Récupère les valeurs de la fiche avec l'API
  const getChild = async () => {
    await axios
      .get(`http://localhost:8000/api/childs/${idChildPicture}`)
      .then((res) => {
        console.log(res.data);
        setIdChild(res.data.data[0].idChild);
        setFirstnameChild(res.data.data[0].firstnameChild);
        setLastnameChild(res.data.data[0].lastnameChild);
        setBirthDate(res.data.data[0].birthDate);
        setImageChild(res.data.data[0].imageChild);
        setUrlPicture(res.data.data[0].urlPicture);
        setNamePicture(res.data.data[0].namePicture);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="indexChild">
      <MenuAppBar />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil" sx={{ mt: 25 }}>
          <h1 id="back-to-top-anchor" className="titleProfil">
            Liste des photos de {firstnameChild}
          </h1>

          <Box className="boxProfil">
            <Sliders />
            {pictures.map((picture) => (
              <Box className="userCard" key={picture.id}>
                <Box className="boxIndexChild">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={10}>
                      <Box className="cardIndexChild">
                        <Box className="avatarIndexChild">
                        <Avatar
                            className="avatar"
                            sx={{ width: 100, height: 100 }}
                            src={`http://localhost:8000/thumbnail/${picture.urlPicture}`}
                          />
                        </Box>
                        <Box className="boxInfoIndexChild">
                          <Box className="boxNameIndexChild"></Box>

                          <p>Description: {picture.namePicture}</p>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Box>
                        <Box
                          className="buttonGroupIndexChild"
                          orientation="vertical"
                          variant="text"
                          sx={{ m: 2 }}
                        >
                          <Button
                            className="actionButtonIndexChild"
                            // href={`/children/show/${child.id}`}
                            key="one"
                          >
                            <VisibilityIcon />
                          </Button>

                          <Button
                            className="actionButtonIndexChild"
                            key="two"
                            // href={`/children/edit/${child.id}`}
                          >
                            <ModeEditIcon />
                          </Button>

                          {/* <Button
                            className="actionButtonIndexChild"
                            key="three"
                            href="#"
                            onClick={() => {
                              deleteDaySummary(daySummary.id);
                            }}
                          >
                            <DeleteIcon />
                          </Button> */}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ))}
          </Box>
          {/* ) : ( */}
          {/* <p>pas de correspondance</p> */}
          {/* )} */}
        </Container>
      </Box>
      <Fox />
      <Prince />
      <BackToTop />
    </div>
  );
};

export default PicturesChild;
