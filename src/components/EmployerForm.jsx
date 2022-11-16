import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Box";
import { GroupSharp } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";



const theme = createTheme();

export default function SignUp({idChild}) {
  const navigate = useNavigate();

  const [childs_id, setChilds_id] = useState("");
  const [users_id, setUsers_id] = useState("");

  console.log(idChild);

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitSuccessful },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => console.log(data);

  const email = watch("email", "");
  const password = watch("password", "");
  const lastname = watch("lastname", "");
  const firstname = watch("firstname", "");

  // const [values, setValues] = React.useState({
  //   amount: "",
  //   password: "",
  //   weight: "",
  //   weightRange: "",
  //   showPassword: false,
  // });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    if (!showPassword) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  const [validationError, setValidationError] = useState({});

  //Fonction d'ajout de Employer
  const Register = async (e) => {
    e.preventDefault();
    // const users_id = [];
    // users_id.push(users.id);

    const childs_id = [];
    childs_id.push(idChild);

    const formData = new FormData();

    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("childs_id", childs_id);
    formData.append("users_id", users_id);
   
    // Bout de code pour récupérer les données du formulaire
    for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

    await axios
      .post(`http://localhost:8000/api/registerEmployer`, formData)
      .then(navigate("/home"))
      // .then(navigate(-1))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        className="boxLoginRegister"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar className="avatar" sx={{ m: 2 }}>
            <GroupSharp />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ajouter un parent
          </Typography>
          <Box component="form" noValidate onSubmit={Register} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstname", {
                    required: true,
                    maxLength: {
                      value: 20,
                      message: "Prénom: Longueur maximale de 20 caractères",
                    },
                  })}
                  required
                  fullWidth
                  id="firstname"
                  label="Prénom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastname", {
                    required: true,
                    maxLength: {
                      value: 20,
                      message: "Nom: Longueur maximale de 20 caractères",
                    },
                  })}
                  required
                  fullWidth
                  id="lastname"
                  label="Nom"
                  autoFocus
                />
              </Grid>
              {errors.firstname ? (
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
                sx={{ mt: 2, p: 0, pl: 2 }} severity="error">
                  {errors.lastname?.message}
                </Alert>
              ) : (
                ""
              )}

              <Grid item xs={12}>
                <TextField
                  {...register("email", {
                    required: "Veuillez saisir un email",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Veuillez saisir un email valide",
                    },
                  })}
                  required
                  fullWidth
                  id="email"
                  label="Votre mail"
                />
              </Grid>
              {errors.email ? (
                <Alert
                  className="errorsMessage"
                  sx={{ mt: 2, p: 0, pl: 2 }}
                  severity="error"
                >
                  {errors.email?.message}
                </Alert>
              ) : (
                ""
              )}

              {/* ----------------------------------------------------------------------------------------------- *** PASSWORD *** ------------------------------------------- */}
              <Grid item xs={12}>
                <FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" label="Mot de passe" required>
                    Mot de passe
                  </InputLabel>
                  <OutlinedInput
                    {...register("password", {
                      required: "Ce champ est requis",
                      minLength: {
                        value: 5,
                        message: "Longueur minimale de 5 caractères",
                      },
                      pattern: {
                        value:
                          /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%^&])/,
                        message:
                          "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractère spéciale",
                      },
                    })}
                    id="outlined-adornment-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    endAdornment={
                      <InputAdornment position="end" sx={{ color: "inherit" }}>
                        <IconButton
                          color="inherit"
                          onClick={handleClickShowPassword}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              {errors.password ? (
                <Alert
                  className="errorsMessage"
                  sx={{ mt: 2, p: 0, pl: 2 }}
                  severity="error"
                >
                  {errors.password?.message}
                </Alert>
              ) : (
                ""
              )}
            </Grid>

            <button type="submit" className="button-87" role="button">
              Ajouter
            </button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}
