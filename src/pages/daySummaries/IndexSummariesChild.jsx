import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import MenuAppBar from "../../components/auth/MenuAppBar";
import Fox from "../../components//Fox";
import Prince from "../../components/Prince";
import BackToTop from "../../components/BackToTop";

const DaySummariesChild = () => {
  const { idChildSummary } = useParams();
  const [daySummaries, setDaySummaries] = useState([]);
  const [firstnameChild, setFirstnameChild] = useState("");
  const [lastnameChild, setLastnameChild] = useState("");
  const [imageChild, setImageChild] = useState("");

  useEffect(() => {
    displayDaySummaries();
    getChild();
    getUserAuth();
  }, []); // Sans les crochets ça tourne en boucle

  const displayDaySummaries = async () => {
    await axios
      .get(`https://kurassmat.charleyleberre.fr/api/daysummaryindexChild/${idChildSummary}`)
      .then((res) => {
        setDaySummaries(res.data);
        console.log(res.data);
      });
  };
  //   console.log(articles);

  const deleteDaySummary = (id) => {
    axios
      .delete(`https://kurassmat.charleyleberre.fr/api/daysummary/${id}`)
      .then(displayDaySummaries);
  };

  // GET - Récupère les valeurs de la fiche avec l'API
  const getChild = async () => {
    await axios
      .get(`https://kurassmat.charleyleberre.fr/api/childs/${idChildSummary}`)
      .then((res) => {
        console.log(res.data);
        setFirstnameChild(res.data.data[0].firstnameChild);
        setLastnameChild(res.data.data[0].lastnameChild);
        setImageChild(res.data.data[0].imageChild);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [user, setUserAuth] = useState("");

  // GET - Récupère les valeurs de la fiche avec l'API
  const getUserAuth = async () => {
    await axios
      .get("https://kurassmat.charleyleberre.fr/api/current-user", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUserAuth(res.data);
      });
  };

    // Modal Update Image
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const ExpandMore = styled((props) => {
      const { expand, ...other } = props;
      return <IconButton {...other} />;
    })(({ theme, expand }) => ({
      transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    }));

  const userRole = user.role;
  // console.log(userRole);

  return (
    <div className="indexDaySummary">
      <MenuAppBar />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil" sx={{ mt: 25 }}>
          <h1 id="back-to-top-anchor" className="titleDaySummary">
            Liste des récapitulatifs de {firstnameChild} {lastnameChild}
          </h1>

          <Box className="boxProfil">
            <Box className="indexDaySummaryTop">
              <Avatar
                className="avatar"
                sx={{ width: 120, height: 120 }}
                src={`https://kurassmat.charleyleberre.fr/storage/uploads/${imageChild}`}
              />
            </Box>
            {daySummaries.map((daySummary) => (
              <Box className="indexDaySummaryCard">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={10}>
                    <Box className="cardIndexDaySummary">
                      <p>{daySummary.contentDaySummary}</p>
                      <p> Envoyé le: {daySummary.created_at}</p>
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
                            key="three"
                            href="#"
                            onClick={() => {
                              deleteDaySummary(daySummary.id);
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        {/* {userRole == "assmat" ? (
                          <Box>
                            <Button
                            className="buttonModal"
                            onClick={handleOpen}
                            component="a"
                          >
                            <span>
                             modal Ajouter un message
                              <CreateIcon
                                sx={{
                                  width: 16,
                                  height: 16,
                                  mt: 0.4,
                                  ml: 0.7,
                                }}
                              />
                            </span>
                          </Button>
                            <Button
                              className="actionButtonIndexChild"
                              key="two"
                              // href={`/children/edit/${child.id}`}
                            >
                              poi
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
                        ) : (
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
                        )} */}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
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

export default DaySummariesChild;
