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

import MenuHeader from "../../components/auth/MenuHeader";
import Fox from "../../components/Fox";
import Prince from "../../components/prince";

const AddChild = () => {
  const navigate = useNavigate();

  const [firstnameChild, setFirstnameChild] = useState("");
  const [lastnameChild, setLastnameChild] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [imageChild, setImageChild] = useState("");

//   const [users, setUsers] = useState("");
//   const [user_id, setUser_id] = useState("");

  const [validationError, setValidationError] = useState({});

//   const changeHandler = (event) => {
//     setImage(event.target.files[0]);
//   };

  //Fonction d'ajout d'une fiche enfant
  const addChild = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("firstnameChild", firstnameChild);
    formData.append("lastnameChild", lastnameChild);
    formData.append("birthDate", birthDate);
    formData.append("imageChild", imageChild);
    // formData.append("user_id", user_id);
    

  //   await axios.get("http://127.0.0.1:8000/users", {
  //     "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
  // }).then((actualData) => { setUsers(actualData.data.data) });
  // console.log(localStorage);

    await axios
      .post(`http://localhost:8000/api/childs`, formData)
      .then(navigate("/children/children"))
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
          <h1 className="titleProfil">Ajouter une fiche enfant</h1>

          <Box className="boxProfil">
            <Box component="form" onSubmit={addChild}>
              <Box className="userCardTopEdit" sx={{ mb: 4 }}>
              <Avatar
                        sx={{ width: 100, height: 100 }}
                        src="avatar.png"
                      />
                <button type="submit" className="button-87" role="button">
                  Ajouter une photo de profil
                </button>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  Prénom:
                  <TextField
                    {...addChild("firstnameChild", {
                      required: true,
                      maxLength: {
                        value: 20,
                        message: "Prénom: Longueur maximale de 20 caractères",
                      },
                    })}
                    value={firstnameChild}
                    onChange={(event) => {
                      setFirstnameChild(event.target.value);
                    }}
                    required
                    fullWidth
                    id="firstnameChild"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  Nom:
                  <TextField
                    {...addChild("lastnameChild", {
                      required: true,
                      maxLength: {
                        value: 20,
                        message: "Nom: Longueur maximale de 20 caractères",
                      },
                    })}
                    value={lastnameChild}
                    onChange={(event) => {
                      setLastnameChild(event.target.value);
                    }}
                    required
                    fullWidth
                    id="lastnameChild"
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
                  Date de naissance:
                  <TextField
                    // {...EditProfil("birthDate", {
                    //   required: true,
                    //   maxLength: {
                    //     value: 20,
                    //     message: "Prénom: Longueur maximale de 20 caractères",
                    //   },
                    // })}
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

export default AddChild;
