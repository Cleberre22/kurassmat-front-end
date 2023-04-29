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
import Button from "@mui/material/Button";
import MenuAppBar from "../../components/auth/MenuAppBar";
import Fox from "../../components//Fox";
import Prince from "../../components/Prince";

const EditProfil = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [userId, setUserId] = useState();
  const [city, setCity] = useState("");
  const [imageUser, setImageUser] = useState("");
  const [validationError, setValidationError] = useState({});

  const {
    editProfil,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const changeHandler = (event) => {
    setImageUser(event.target.files);
  };


  useEffect(() => {
    getUsers();
  }, []); // Sans les crochets ça tourne en boucle

  // GET - Récupère les valeurs de la fiche avec l'API
  const getUsers = async () => {
    await axios
      .get("https://kurassmat.charleyleberre.fr/api/current-user", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
         console.log(res.data);
        setFirstname(res.data.firstname);
        setLastname(res.data.lastname);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setAddress(res.data.address);
        setPostalCode(res.data.postalCode);
        setCity(res.data.city);
        setUserId(res.data.id);
        setImageUser(res.data.imageUser);
      });
  };

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
    formData.append("imageUser", imageUser);

       // Bout de code pour récupérer les données du formulaire
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    await axios
      .post(`https://kurassmat.charleyleberre.fr/api/users/${userId}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(navigate("/profil"))
      // .then(navigate(-1))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div>
      <MenuAppBar />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil">
          <h1 className="titleProfil">Modifier mon profil</h1>

          <Box className="boxProfil">
            <Box component="form" onSubmit={EditProfil}>
              {/* <Box className="userCardTopEdit" sx={{ mb: 4 }}>
              <Avatar
                        className="avatarEditProfil"
                          sx={{ width: 120, height: 120 }}
                          src="avatar.png"
                        />
               <Grid item xs={12} sm={12}>
                  <Button variant="outlined" color="primary" component="label" className="btnEditImageProfil">
                    Modifier la photo
                    <input hidden accept="image/*" multiple type="file" onChange={changeHandler}/>
                  </Button>
                </Grid>
              </Box> */}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  Prénom:
                  <TextField
                    {...EditProfil("firstname", {
                      required: true,
                      maxLength: {
                        value: 20,
                        message: "Prénom: Longueur maximale de 20 caractères",
                      },
                    })}
                    value={firstname}
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
                  Nom:
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
