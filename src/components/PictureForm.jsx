import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";

const PictureForm = ({idChild}) => {
  const navigate = useNavigate();

  const [urlPicture, setUrlPicture] = useState("");
  const [namePicture, setNamePicture] = useState("");
  const [childs_id, setChilds_id] = useState("");
  
  const changeHandler = (event) => {
    setUrlPicture(event.target.files[0]);
  };

  console.log(idChild);

  const [validationError, setValidationError] = useState({});

  // On récupère l'id du user pour remplir la table pivot
//   const [user, setUser] = useState([]);
//   const [role, setRole] = useState([]);

  const displayUsers = async () => {
    await axios
      .get("http://localhost:8000/api/current-user", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        // setUser(res.data);
        // setRole(res.data.role);
        // console.log(res.data);
      });
  };
  // console.log(role);

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  //Fonction d'ajout d'une fiche enfant
  const AddPicture = async (e) => {
    // console.log(birthDate);

    // e.preventDefault();
    // const users_id = [];
    // users_id.push(user.id);

    const childs_id = [];
    childs_id.push(idChild);

    const formData = new FormData();

    formData.append("urlPicture", urlPicture);
    formData.append("namePicture", namePicture);
    formData.append("childs_id", childs_id);

    // Bout de code pour récupérer les données du formulaire
    for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

    await axios
      .post(`http://localhost:8000/api/pictures`, formData)
      .then(navigate("/home"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div>
      <Box className="pictureForm" component="form" onSubmit={AddPicture}>
        <h2>Ajouter une photo</h2>

        <Button
                  className="button-87"
                  variant="contained"
                  component="label"
                  sx={{ mb: 2 }}
                >
                  Ajouter une photo
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={changeHandler}
                    // value={imageChild}
                    // onChange={(event) => {
                    //   setImageChild(event.target.value);
                    // }}
                    id="imageChild"
                  />
                  <PhotoCamera
                    sx={{ width: 16, height: 16, mb: 0.33, ml: 0.7 }}
                  />
                </Button>



        <TextField
          id="namePicture"
          label="Description"
          fullWidth
          multiline
          value={namePicture}
          onChange={(event) => {
            setNamePicture(event.target.value);
          }}
          rows={4}
        />
        <Grid
          container
          justifyContent="center"
          sx={{ mt: 2 }}
          className="buttonAddChild"
        >
          <button type="submit" className="button-87" role="button">
            Envoyer la photo
          </button>
        </Grid>
      </Box>
    </div>
  );
};
export default PictureForm;