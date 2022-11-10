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

  useEffect(() => {
    getChild();
    displayUsers();
    // displayDaySummaries();
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
        setFirstname(res.data.data[0].firstname);
        setLastname(res.data.data[0].lastname);
        setEmail(res.data.data[0].email);
        setPhone(res.data.data[0].phone);
        setAddress(res.data.data[0].address);
        setPostalCode(res.data.data[0].postalCode);
        setCity(res.data.data[0].city);
        // setRole(res.data.data[0].role);
        setContentDaySummary(res.data.data[0].contentDaySummary);
        setDSCreated_at(res.data.data[0].DSCreated_at);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(child);
  

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

  return (
    <div className="indexChild">
      <MenuAppBar />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil">
          <h1 className="titleProfil">
            {firstnameChild} {lastnameChild}
          </h1>
          <Box className="boxProfil">
            <Box>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Box className="userCard">
                    {/* <Box className="boxAction">
                      <a
                        className="linkEditProfil"
                        href="/children/edit/${idChild}"
                        id="style-2"
                        data-replace="Modifier le profil"
                      >
                        <span>Modifier le profil </span>
                      </a>
                    </Box> */}

                    <Box className="userCardTop" sx={{ mb: 2 }}>
                      <Avatar
                        className="avatarShowChild"
                        sx={{ width: 100, height: 100 }}
                        src={`http://localhost:8000/storage/uploads/${imageChild}`}
                      />
                    </Box>

                    <Box className="userCardMiddle" sx={{ mb: 3 }}>
                      <p>Prénom: {firstnameChild}</p>
                      <p>Nom: {lastnameChild}</p>
                      <p>Date de naissance: {birthDate}</p>
                      <p>
                        Parent: {firstname} {lastname}
                      </p>
                      <p>Email: {email}</p>
                      <p>téléphone: {phone}</p>
                      <p>
                        Adresse: {address} {postalCode}, {city}
                      </p>
                      <p>Role: {user.role}</p>
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

                      <p>role: {user.role}</p>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box className="daySummaryCard">
                    <Box className="boxAction">
                      {/* {roleUser ? (
                        <div className="divButtonModal">
                        <Button className="buttonModal" onClick={handleOpen}>
                        <span>Voir les récaps
                          <MessageIcon
                            sx={{ width: 16, height: 16, mt: 0.40, ml: 0.7 }}
                          /></span>
                        </Button>
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
                      ) : ( */}
                      <div className="divButtonModal">
                      <Button className="buttonModal"
                      idChildSummary={idChild}
                      component="a"
                      href={`/indexDaySummariesChild/${idChild}`}
                      >
                          <span>
                            Voir tout les messages
                            <MessageIcon
                              sx={{ width: 16, height: 16, mt: 0.4, ml: 0.7 }}
                            />
                          </span>
                        </Button>
                        <Button className="buttonModal" onClick={handleOpen}>
                          <span>
                            Ajouter un message
                            <MessageIcon
                              sx={{ width: 16, height: 16, mt: 0.4, ml: 0.7 }}
                            />
                          </span>
                        </Button>
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
                      {/* )}
                       */}
                    </Box>
                    <Box className="daySummaryShow" sx={{ mb: 2 }}>
                      <p>Message: {contentDaySummary}</p>

                      <p>Reçu le: {DSCreated_at}</p>
                    </Box>

                    <Box className="userCardMiddle" sx={{ mb: 3 }}><div className="divButtonModal">
                      <Button className="buttonModal"
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
                      </div></Box>
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

export default ShowChild;
