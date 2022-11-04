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
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import MenuHeader from "../../components/auth/MenuHeader";
import Fox from "../../components//Fox";
import Prince from "../../components/Prince";
import UpdateImage from "../../components/UpdateImage";
import CardProfile from "../../components/CardProfile";

const ShowChild = () => {
  const { child } = useParams();
  const navigate = useNavigate();

  const [firstnameChild, setFirstnameChild] = useState("");
  const [lastnameChild, setLastnameChild] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [imageChild, setImageChild] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("")
  const [address, setAddress] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [user, setUser] = useState([]);
  const [users_id, setUsers_id] = useState([]);

  useEffect(() => {
    getChild();
  }, []); // Sans les crochets ça tourne en boucle

  // GET - Récupère les valeurs de la fiche avec l'API
  const getChild = async () => {
    await axios
      .get(`http://localhost:8000/api/childs/${child}`)
      .then((res) => {
        console.log(res.data);
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
        setRole(res.data.data[0].role);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="indexChild">
      <MenuHeader />
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
                        // src={`http://localhost:8000/storage/uploads/${imageChild}`}
                        src={`http://localhost:8000/storage/uploads/${imageChild}`}
                        // src={`http://localhost:8000/storage/uploads/${article.image}`}
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
                      <p>Role: {role}</p>
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
                        href="/addChild"
                        id="style-2"
                        data-replace="Modifier mon profil"
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
                      ))}  */}

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

export default ShowChild;
