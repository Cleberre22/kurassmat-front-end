import React, { useEffect, useState } from "react";
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
import Fox from "../../components//Fox";
import Prince from "../../components/Prince";
import BackToTop from "../../components/BackToTop";

const DaySummaries = () => {
  const [daySummaries, setDaySummaries] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    displayDaySummaries();
  }, []); // Sans les crochets ça tourne en boucle

  const displayDaySummaries = async () => {
    await axios.get("http://localhost:8000/api/daysummary").then((res) => {
      setDaySummaries(res.data);
      console.log(res.data);
    });
  };
//   console.log(articles);

  const deleteDaySummary = (id) => {
    axios
      .delete(`http://localhost:8000/api/daysummary/${id}`)
      .then(displayDaySummaries);
  };

  return (
    <div className="indexChild">
      <MenuAppBar />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil" sx={{ mt: 25 }}>
          <h1 id="back-to-top-anchor" className="titleProfil">
            Liste des récapitulatifs
          </h1>

          <Box className="boxProfil">
            {daySummaries.map((daySummary) => (
              <Box className="userCard">
                <Box className="boxIndexChild">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={10}>
                      <Box className="cardIndexChild">
                        <Box className="avatarIndexChild">
                        <Avatar
                            className="avatar"
                            sx={{ width: 100, height: 100 }}
                            src={`http://localhost:8000/storage/uploads/${daySummary.imageChild}`}
                          />
                        </Box>
                        <Box className="boxInfoIndexChild">
                          <Box className="boxNameIndexChild">
                           
                          </Box>
                          <p>Prénom de l'enfant: {daySummary.firstnameChild}</p>
                          <p>Prénom de l'enfant: {daySummary.firstnameChild}</p>
                          <p>Nom de l'enfant: {daySummary.lastnameChild}</p>
                          <p>Contenu de la note: {daySummary.contentDaySummary}</p>
                          <p>Date de création: {daySummary.created_at}</p>
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

                          <Button
                            className="actionButtonIndexChild"
                            key="three"
                            href="#"
                            onClick={() => {
                              deleteDaySummary(daySummary.id);
                            }}
                          >
                            <DeleteIcon />
                          </Button>
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

export default DaySummaries;