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

import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import MenuHeader from "../../components/auth/MenuHeader";
import Fox from "../../components//Fox";
import Prince from "../../components/Prince";

const EditChild = () => {
  const { child } = useParams();
  const navigate = useNavigate();

  const [firstnameChild, setFirstnameChild] = useState("");
  const [lastnameChild, setLastnameChild] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  // const [imageChild, setImageChild] = useState("");

  const [users_id, setUsers_id] = useState([]);

  const handleChange = (newValue) => {
    setBirthDate(newValue);
    // console.log(birthDate);
  };

  const [validationError, setValidationError] = useState({});

  // const changeHandler = (event) => {
  //   setImageChild(event.target.files[0]);
  // };

  // On récupère l'id du user pour remplir la table pivot
  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);

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
        // console.log(res.data);
      });
  };
  // console.log(role);

  useEffect(() => {
    displayUsers();
    getChild();
  }, []); // Sans les crochets ça tourne en boucle

  // GET - Récupère les valeurs de la fiche avec l'API
  const getChild = async () => {
    await axios
      .get(`http://localhost:8000/api/childs/${child}`)
      .then((res) => {
        // console.log(res.data.data[0].firstnameChild);
        setFirstnameChild(res.data.data[0].firstnameChild);
        setLastnameChild(res.data.data[0].lastnameChild);
        setBirthDate(res.data.data[0].birthDate);
        // setImageChild(res.data.imageChild);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(child);

  //Fonction de modification d'une fiche enfant
  const EditChild = async (e) => {
    // console.log(birthDate);

    e.preventDefault();
    const users_id = [];
    users_id.push(user.id);

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("firstnameChild", firstnameChild);
    formData.append("lastnameChild", lastnameChild);
    formData.append("birthDate", birthDate);
    // formData.append("imageChild", imageChild);
    formData.append("users_id", users_id);

    // Bout de code pour récupérer les données du formulaire
    for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

    await axios
      .post(`http://localhost:8000/api/childs/${child}`, formData)
      .then(navigate("/children"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div className="editChild">
      <MenuHeader />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil">
          <h1 className="titleProfil">Modifier la fiche enfant</h1>

          <Box className="boxProfil" component="form" onSubmit={EditChild}>
            <Box className="containerAddChild">
              <Container className="containerAddChild">
                <Grid className="infoAddChild" container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      value={firstnameChild}
                      onChange={(event) => {
                        setFirstnameChild(event.target.value);
                      }}
                      id="firstnameChild"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      value={lastnameChild}
                      onChange={(event) => {
                        setLastnameChild(event.target.value);
                      }}
                      id="lastnameChild"
                      label="Nom"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Date de naissance"
                        inputFormat="DD-MM-YYYY"
                        value={birthDate}
                        // value="2022-12-24"
                        id="birthDate"
                        class="birth"
                        onChange={(event) => {
                          setBirthDate(
                            new Date(event).toISOString().split("T")[0]
                          );
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Container>

              {/* <Box className="addChildCard" sx={{ mb: 4 }}>
                <Avatar sx={{ width: 100, height: 100 }} src="avatar.png" />
                <Button
                  className="button-87"
                  variant="contained"
                  component="label"
                >
                  Ajouter une photo
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
                  <PhotoCamera 
                  sx={{ width: 16, height: 16, mb: 0.33, ml: 0.7 }}/>
                </Button>
              </Box> */}
            </Box>

            <Grid
              container
              justifyContent="center"
              sx={{ mt: 4 }}
              className="buttonAddChild"
            >
              <button type="submit" className="button-87" role="button">
                Modifier la fiche enfant
              </button>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Fox />
      <Prince />
    </div>
  );
};
export default EditChild;
