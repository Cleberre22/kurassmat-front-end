import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import MessageIcon from "@mui/icons-material/Message";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";

import IconButton from "@mui/material/IconButton";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from '@mui/icons-material/Visibility';

import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import MenuAppBar from "../../components/auth/MenuAppBar";
import Fox from "../../components//Fox";
import Prince from "../../components/Prince";
import UpdateImage from "../../components/UpdateImage";
import CardProfile from "../../components/CardProfile";
import SummaryForm from "../../components/SummaryForm";
import PictureForm from "../../components/PictureForm";
import EmployerForm from "../../components/EmployerForm";
import BackToTop from "../../components/BackToTop";

const ShowChild = () => {
  const { child } = useParams();

  const navigate = useNavigate();

  // const [idChildSummary, setIdChildSummary] = useState([]);
  const [idChild, setIdChild] = useState("");
  const [firstnameChild, setFirstnameChild] = useState("");
  const [lastnameChild, setLastnameChild] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [imageChild, setImageChild] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState([]);
  const [users_id, setUsers_id] = useState([]);
  const [contentDaySummary, setContentDaySummary] = useState([]);
  const [DSCreated_at, setDSCreated_at] = useState([]);
  const [parents, setParents] = useState([]);
  const [lastDaySummaries, setLastDaySummaries] = useState([]);

  useEffect(() => {
    getChild();
    getLastDaySummary();
    getChildShowUser();
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  // GET - Récupère les valeurs de la fiche avec l'API
  const getChild = async () => {
    await axios
      .get(`http://localhost:8000/api/childs/${child}`)
      .then((res) => {
        console.log(res.data);
        setIdChild(res.data.data[0].idChild);
        setFirstnameChild(res.data.data[0].firstnameChild);
        setLastnameChild(res.data.data[0].lastnameChild);
        setBirthDate(res.data.data[0].birthDate);
        setImageChild(res.data.data[0].imageChild);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(child);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getLastDaySummary = async () => {
    await axios
      .get(`http://localhost:8000/api/childLastDaySummary/${child}`)
      .then((res) => {
        console.log(res.data);
        setLastDaySummaries(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(child);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getChildShowUser = async () => {
    await axios
      .get(`http://localhost:8000/api/childShowUser/${child}`)
      .then((res) => {
        console.log(res.data.data);
        setParents(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(setFirstname);

  const displayUsers = async () => {
    await axios
      .get("http://localhost:8000/api/current-user", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUser(res.data);
        setRole(res.data.role);
        // console.log(res.data.role);
      });
  };
  // console.log(role);

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

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

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

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const userRole = user.role;
  // console.log(userRole);

  return (
    <div className="indexChild">
      <MenuAppBar />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil">
          <h1 className="titleProfil" id="backToTop">
            {firstnameChild} {lastnameChild}
          </h1>
          <Box className="boxProfil boxProfilChild">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {/* ------------------------- INFORMATION CHILD ------------------------- */}
              <Grid item xs={12}>
                <Box className="childCardTop">
                  <Avatar
                    className="avatarShowChild"
                    sx={{ width: 140, height: 140 }}
                    src={`http://localhost:8000/thumbnail/${imageChild}`}
                  />

                  <Box className="childCardTopRight">
                    <p>Prénom: {firstnameChild}</p>
                    <p>Nom: {lastnameChild}</p>
                    <p>Date de naissance: {birthDate}</p>
                  </Box>
                </Box>
              </Grid>

              {/* ------------------------- INFORMATION PARENTS ------------------------- */}
              <Grid item xs={12} className="boxParent">
                <Container className="containerCardParent">
                  <Box className="childCardParentTop">
                    <Box className="childCardParentTopLeft">
                      <h2 className="titleParent">Parents:</h2>
                    </Box>

                    <Box className="childCardParentTopRight buttonShowChild">
                      {userRole == "assmat" ? (
                        <Button onClick={handleOpen3} component="a">
                          <span>
                            Ajouter un parent
                            <EscalatorWarningIcon
                              sx={{ width: 20, height: 20, mt: 0.4, ml: 0.7 }}
                            />
                          </span>
                        </Button>
                      ) : (
                        <Box></Box>
                      )}
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open3}
                        onClose={handleClose3}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={open3}>
                          <Box sx={style}>
                            <EmployerForm idChild={idChild} />
                          </Box>
                        </Fade>
                      </Modal>
                    </Box>
                  </Box>

                  <Grid item xs={12}>
                    <Grid className="parentBox">
                      {parents.map((parent) => (
                        <Grid className="parentData" item xs={6}>
                          <p>
                            {parent.firstname} {parent.lastname}
                          </p>
                          <p>{parent.email}</p>
                          <p>
                            {parent.address}, {parent.postalCode} {parent.city}
                          </p>
                          <p>{parent.phone}</p>
                          {/* <p>role: {parent.role}</p> */}
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Container>
              </Grid>

              {/* ------------------------- DAY SUMMARY ------------------------- */}
              <Grid item xs={12} className="boxDaySummary">
                <Container className="containerCardDaySummary">
                  <Box className="childCardDaySummaryTop">
                    <Box className="childCardDaySummaryTopLeft">
                      <h2>Derniers messages:</h2>
                    </Box>

                    <Box className="childCardDaySummaryTopRight buttonShowChild">
                      {userRole == "assmat" ? (
                        <Box>
                          <Button
                            className="buttonModal"
                            onClick={handleOpen}
                            component="a"
                          >
                            <span>
                              Ajouter un message
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
                            className="buttonModal"
                            idChildSummary={idChild}
                            component="a"
                            href={`/indexDaySummariesChild/${idChild}`}
                          >
                            <span>
                              Voir tout les messages
                              <VisibilityIcon
                                sx={{
                                  width: 18,
                                  height: 18,
                                  mt: 0.4,
                                  ml: 0.7,
                                }}
                              />
                            </span>
                          </Button>
                        </Box>
                      ) : (
                        <Button
                          className="buttonModal"
                          idChildSummary={idChild}
                          component="a"
                          href={`/indexDaySummariesChild/${idChild}`}
                        >
                          <span>
                            Voir tout les messages
                            <VisibilityIcon
                              sx={{
                                width: 16,
                                height: 16,
                                mt: 0.4,
                                ml: 0.7,
                              }}
                            />
                          </span>
                        </Button>
                      )}
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={open}>
                          <Box sx={style}>
                            <SummaryForm idChild={idChild} />
                          </Box>
                        </Fade>
                      </Modal>
                    </Box>
                  </Box>

                  <Grid item xs={12}>
                    <Grid className="parentBox">
                      {lastDaySummaries.map((lastDaySummary) => (
                        <Grid className="daySummaryData" item xs={6}>
                          <p>{lastDaySummary.contentDaySummary}</p>
                          <p>{lastDaySummary.DSCreated_at}</p>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  {/* <Box className="daySummaryCard">
                  
                          {userRole == "assmat" ? (
                            <Box className="actionDaySummaryShowChild">
                              <Button
                                className="buttonModal"
                                onClick={handleOpen}
                              >
                                <span>
                                  Ajouter un message
                                  <MessageIcon
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
                                className="buttonModal"
                                idChildSummary={idChild}
                                component="a"
                                href={`/indexDaySummariesChild/${idChild}`}
                              >
                                <span>
                                  Voir tout les messages
                                  <MessageIcon
                                    sx={{
                                      width: 16,
                                      height: 16,
                                      mt: 0.4,
                                      ml: 0.7,
                                    }}
                                  />
                                </span>
                              </Button>

                            </Box>
                          ) : (
                            <Button
                              className="buttonModal"
                              idChildSummary={idChild}
                              component="a"
                              href={`/indexDaySummariesChild/${idChild}`}
                            >
                              <span>
                                Voir tout les messages
                                <MessageIcon
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    mt: 0.4,
                                    ml: 0.7,
                                  }}
                                />
                              </span>
                            </Button>
                          )}
                          <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                              timeout: 500,
                            }}
                          >
                            <Fade in={open}>
                              <Box sx={style}>
                                <SummaryForm idChild={idChild} />
                              </Box>
                            </Fade>
                          </Modal>
                        </div>
                      </Box>

                      {lastDaySummaries.map((lastDaySummary) => (
                        <Box className="daySummaryShow" sx={{ mb: 2 }}>
                          <p>Message: {lastDaySummary.contentDaySummary}</p>

                          <p>Reçu le: {lastDaySummary.DSCreated_at}</p>
                        </Box>
                      ))}
                      <Box className="userCardMiddle" sx={{ mb: 3 }}>
                        <div className="divButtonModal">
                          <Button
                            className="buttonModal"
                            idChildPicture={idChild}
                            component="a"
                            href={`/indexPicturesChild/${idChild}`}
                          >
                            <span>
                              Voir toutes les photos
                              <MessageIcon
                                sx={{ width: 16, height: 16, mt: 0.4, ml: 0.7 }}
                              />
                            </span>
                          </Button>
                          <Button className="buttonModal" onClick={handleOpen2}>
                            <span>
                              Ajouter une photo
                              <MessageIcon
                                sx={{ width: 16, height: 16, mt: 0.4, ml: 0.7 }}
                              />
                            </span>
                          </Button>
                          <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open2}
                            onClose={handleClose2}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                              timeout: 500,
                            }}
                          >
                            <Fade in={open2}>
                              <Box sx={style}>
                                <PictureForm idChild={idChild} />
                              </Box>
                            </Fade>
                          </Modal>
                        </div>

                        <div className="divButtonModal"></div>
                      </Box>
                    </Box> */}
                  {/* </Box> */}
                </Container>
              </Grid>
            </Grid>
          </Box>
        </Container>

        <Fox />
        <Prince />
        <BackToTop />
      </Box>
    </div>
  );
};

export default ShowChild;
