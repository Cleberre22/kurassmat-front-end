import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Box";
import { GroupSharp, Padding } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
// import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

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
  // const lastName = watch("lastName", "");
  // const firstName = watch("firstName", "");

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

  let login = async () => {
    try {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      let res = await axios.post("http://127.0.0.1:8000/api/login/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.token);

        navigate("/home", { replace: true });
      }
    } catch (err) {}
  };

  return (
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
            Se connecter
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(login)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
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
                  <InputLabel
                    color="secondary"
                    htmlFor="outlined-adornment-password"
                  >
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

            <button type="submit" class="button-87" role="button">
              connexion
            </button>

            <Grid container justifyContent="center">
               <Grid item >
                <p className="linkLoginRegister">Pas de compte ? <a href="/register" id="style-2" data-replace="Inscrivez-vous"><span>Inscrivez-vous</span></a></p>
               </Grid> 
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

