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

const Children = () => {
  const [children, setChildren] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    displayChildren();
  }, []); // Sans les crochets ça tourne en boucle

  const displayChildren = async () => {
    await axios.get("http://localhost:8000/api/childs").then((res) => {
      setChildren(res.data.data);
      console.log(res.data.data);
    });
  };
  // console.log(children);

  const deleteChild = (id) => {
    axios
      .delete(`http://localhost:8000/api/childs/${id}`)
      .then(displayChildren);
  };

  return (
    <div className="indexChild">
      <MenuAppBar />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil" sx={{ mt: 25 }}>
          <h1 id="back-to-top-anchor" className="titleProfil">
            Liste des enfants
          </h1>
          <Box className="boxActionIndexChild">
            <a
              className="linkEditProfil"
              href="/children/add"
              id="style-2"
              data-replace="Ajouter un enfant"
            >
              <span>
                <p>
                  Ajouter un enfant{" "}
                  <AddCircleIcon
                    className="iconAddIndexChild"
                    sx={{ width: 20, height: 20, mt: 0.63, ml: 0.4 }}
                  />
                </p>
              </span>
            </a>
          </Box>

          {/* {user.id / user.id ? ( */}

          <Box className="boxProfil">
            {children.map((child) => (
              <Box className="userCard">
                <Box className="boxIndexChild">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={10}>
                      <Box className="cardIndexChild">
                        <Box className="avatarIndexChild">
                          <Avatar
                            className="avatar"
                            sx={{ width: 100, height: 100 }}
                            src={`http://localhost:8000/public/thumbnail/${child.imageChild}`}
                          />
                        </Box>
                        <Box className="boxInfoIndexChild">
                          <Box className="boxNameIndexChild">
                            <p>Nom et prénom: {child.lastnameChild} </p>
                            <p> {child.firstnameChild}</p>
                          </Box>

                          <p>Date de naissance: {child.birthDate}</p>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Box>
                        {" "}
                        <Box
                          className="buttonGroupIndexChild"
                          orientation="vertical"
                          variant="text"
                          sx={{ m: 2 }}
                        >
                          <Button
                            className="actionButtonIndexChild"
                            href={`/children/show/${child.id}`}
                            key="one"
                          >
                            <VisibilityIcon />
                          </Button>

                          <Button
                            className="actionButtonIndexChild"
                            key="two"
                            href={`/children/edit/${child.id}`}
                          >
                            <ModeEditIcon />
                          </Button>

                          <Button
                            className="actionButtonIndexChild"
                            key="three"
                            href="#"
                            onClick={() => {
                              deleteChild(child.id);
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

export default Children;
