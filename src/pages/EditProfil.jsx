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

import Alert from "@mui/material/Box";
import { GroupSharp } from "@mui/icons-material";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";

import MenuHeader from "../components/auth/MenuHeader";
import Fox from "../components//Fox";
import Prince from "../components/prince";

const EditProfil = () => {
  // const { user  } = useParams();

  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [userId, setUserId] = useState();
  const [city, setCity] = useState("");

  const [validationError, setValidationError] = useState({});

  const {
    editProfil,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  useEffect(() => {
    getUsers();
  }, []); // Sans les crochets ça tourne en boucle

  // GET - Récupère les valeurs de la fiche avec l'API
  const getUsers = async () => {
    await axios
      .get("http://localhost:8000/api/current-user", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        setFirstname(res.data.firstname);
        setLastname(res.data.lastname);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setAddress(res.data.address);
        setPostalCode(res.data.postalCode);
        setCity(res.data.city);
        setUserId(res.data.id);
        console.log(res.data.id);
        const idTruc = res.data.id;
      });
  };
  // console.log('http://localhost:8000/api/users/' + {userId});
  // console.log(idTruc);
  //Fonction de modification d'un utilisateur
  const EditProfil = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("postalCode", postalCode);
    formData.append("city", city);





    await axios
      .post(`http://localhost:8000/api/users/{id}`, formData)
      // .then(navigate("/home"))
      // .then(navigate(-1))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div>
      <MenuHeader />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil">
          <h1 className="titleProfil">Modifier mon profil</h1>

          <Box className="boxProfil">
            <Box component="form" onSubmit={EditProfil}>
              <Box className="userCardTopEdit" sx={{ mb: 4 }}>
                <Avatar sx={{ width: 100, height: 100 }} src="avatar.png" />
                {/* <button type="submit" className="button-87" role="button">
                  Modifier ma photo de profil
                </button> */}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...EditProfil("firstname", {
                      required: true,
                      maxLength: {
                        value: 20,
                        message: "Prénom: Longueur maximale de 20 caractères",
                      },
                    })}
                    value={userId}
                    onChange={(event) => {
                      setFirstname(event.target.value);
                    }}
                    required
                    fullWidth
                    id="firstname"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    {...EditProfil("lastname", {
                      required: true,
                      maxLength: {
                        value: 20,
                        message: "Nom: Longueur maximale de 20 caractères",
                      },
                    })}
                    value={lastname}
                    onChange={(event) => {
                      setLastname(event.target.value);
                    }}
                    required
                    fullWidth
                    id="lastname"
                    autoFocus
                  />
                </Grid>

                {/* {errors.firstname ? (
                  <Alert
                    className="errorsMessage"
                    sx={{ mt: 2, p: 0, pl: 2 }}
                    severity="error"
                  >
                    {errors.firstname?.message}
                  </Alert>
                ) : (
                  ""
                )}
                {errors.lastname ? (
                  <Alert
                    className="errorsMessage"
                    sx={{ mt: 2, p: 0, pl: 2 }}
                    severity="error"
                  >
                    {errors.lastname?.message}
                  </Alert>
                ) : (
                  ""
                )} */}

                <Grid item xs={12} sm={6}>
                  Email:
                  <TextField
                    {...EditProfil("email", {
                      required: true,
                      maxLength: {
                        value: 20,
                        message: "Prénom: Longueur maximale de 20 caractères",
                      },
                    })}
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    required
                    fullWidth
                    id="email"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  Téléphone:
                  <TextField
                    // {...EditProfil("phone", {
                    //   required: true,
                    //   maxLength: {
                    //     value: 20,
                    //     message: "Nom: Longueur maximale de 20 caractères",
                    //   },
                    // })}
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                    required
                    fullWidth
                    id="phone"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  Adresse:
                  <TextField
                    // {...EditProfil("address", {
                    //   required: true,
                    //   maxLength: {
                    //     value: 20,
                    //     message: "Code postal: Longueur maximale de 5 caractères",
                    //   },
                    // })}
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                    required
                    fullWidth
                    id="address"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  Code postal:
                  <TextField
                    {...EditProfil("postalCode", {
                      required: true,
                      maxLength: {
                        value: 20,
                        message:
                          "Code postal: Longueur maximale de 5 caractères",
                      },
                    })}
                    value={postalCode}
                    onChange={(event) => {
                      setPostalCode(event.target.value);
                    }}
                    required
                    fullWidth
                    id="postalCode"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  Ville:
                  <TextField
                    {...EditProfil("city", {
                      required: true,
                      maxLength: {
                        value: 20,
                        message: "Ville: Longueur maximale de 20 caractères",
                      },
                    })}
                    value={city}
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                    required
                    fullWidth
                    id="city"
                    // autoFocus
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent="center"
                sx={{ mt: 4 }}
                className="buttonEditProfil"
              >
                <button type="submit" className="button-877" role="button">
                  Modifier mon profil
                </button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
      <Fox />
      <Prince />
    </div>
  );
};

export default EditProfil;
