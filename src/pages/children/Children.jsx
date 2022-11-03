import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Fade from "@mui/material/Fade";

import MenuHeader from "../../components/auth/MenuHeader";
import Fox from "../../components//Fox";
import Prince from "../../components/Prince";

const Children = () => {
  const [children, setChildren] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    displayChildren();
  }, []); // Sans les crochets ça tourne en boucle

  const displayChildren = async () => {
    await axios.get("http://localhost:8000/api/childs").then((res) => {
      setChildren(res.data.data);
      // console.log(res.data.data);
    });
  };
  // console.log(articles);

  const deleteChild = (id) => {
    axios
      .delete(`http://localhost:8000/api/childs/${id}`)
      .then(displayChildren);
  };

  function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      );

      if (anchor) {
        anchor.scrollIntoView({
          block: "center",
        });
      }
    };

    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: "fixed", bottom: 30, right: 40 }}
        >
          {children}
        </Box>
      </Fade>
    );
  }

  ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

  return (
    <div className="indexChild">
      <MenuHeader />
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
                        <span><p>Ajouter un enfant <AddCircleIcon className="iconAddIndexChild"/></p></span>
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
                              src={`http://localhost:8000/storage/uploads/${child.imageChild}`}
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

        <ScrollTop className="BackToTop">
          <Fab
            className="BackToTop"
            size="small"
            aria-label="scroll back to top"
          >
            <KeyboardArrowUpIcon className="iconBackToTop" />
          </Fab>
        </ScrollTop>
      </Box>
      <Fox />
      <Prince />
    </div>
  );
};

export default Children;
