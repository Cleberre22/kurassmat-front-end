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
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

import Alert from "@mui/material/Box";
import { GroupSharp } from "@mui/icons-material";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import MenuHeader from "../../components/auth/MenuHeader";
import Fox from "../../components//Fox";
import Prince from "../../components/Prince";

const AddChild = () => {
  const navigate = useNavigate();

  const [firstnameChild, setFirstnameChild] = useState("toto");
  const [lastnameChild, setLastnameChild] = useState("toto");
  const [birthDate, setBirthDate] = useState("1999-02-02");
  const [imageChild, setImageChild] = useState("ggjfj");
  const [users_id, setUsers_id] = useState(1);

  // const [birthDate, setValue] = React.useState(null);

  const [validationError, setValidationError] = useState({});

  

  // const changeHandler = (event) => {
  //   setImageChild(event.target.files[0]);
  // };

  //Fonction d'ajout d'une fiche enfant
  const AddChild = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("firstnameChild", firstnameChild);
    formData.append("lastnameChild", lastnameChild);
    formData.append("birthDate", birthDate);
    formData.append("imageChild", imageChild);
    formData.append("users_id", users_id);

    await axios
      .post(`http://localhost:8000/api/childs`, formData)
      .then(navigate("/home"))
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
          <h1 className="titleProfil">Ajouter un enfant</h1>

          <Box className="boxProfil">
            <Box component="form" onSubmit={AddChild}>
              {/* <Box className="userCardTopEdit" sx={{ mb: 4 }}>
                <Avatar sx={{ width: 100, height: 100 }} src="avatar.png" />
                <button type="submit" className="button-87" role="button">
                  Ajouter une photo
                </button>
              </Box> */}

              <Grid container spacing={2}>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    value={firstnameChild}
                            onChange={(event) => {
                              setFirstnameChild(event.target.value);
                            }}
                    id="firstnameChild"
                    label="Prénom"
                    autoFocus
                  />
                </Grid> */}

                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    value={lastnameChild}
                            onChange={(event) => {
                              setLastnameChild(event.target.value);
                            }}
                    id="lastnameChild"
                    label="Nom"
                    autoFocus
                  />
                </Grid> */}

                {/* <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      inputFormat="MM/DD/YYYY"
                      label="Date de naissance"
                      id="birthDate"
                      // value={firstnameChild}
                      //       onChange={(event) => {
                      //         setFirstnameChild(event.target.value);
                      //       }}
                      value={birthDate}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid> */}

                {/* <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={changeHandler}
                          // value={imageChild}
                          //   onChange={(event) => {
                          //     setImageChild(event.target.value);
                          //   }}
                        id="imageChild"
                      />
                      <PhotoCamera />
                    </IconButton>
                  </Stack>
                </Grid> */}
              </Grid>

              <Grid
                container
                justifyContent="center"
                sx={{ mt: 4 }}
                className="buttonAddChild"
              >
                <button type="submit" className="button-877" role="button">
                  Ajouter un enfant
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
