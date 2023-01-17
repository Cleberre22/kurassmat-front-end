import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const UpdateImageChild = ({idChild}) => {
  const { child } = useParams();
  const navigate = useNavigate();

  const [imageChild, setImageChild] = useState("");
  const [childs_id, setChilds_id] = useState("");

  const changeHandler = (event) => {
    setImageChild(event.target.files[0]);
  };

  console.log(idChild);

  const [validationError, setValidationError] = useState({});


  useEffect(() => {
    getChild();
  }, []); // Sans les crochets ça tourne en boucle

  // GET - Récupère les valeurs de la fiche avec l'API
  const getChild = async () => {
    await axios
      .get(`https://kurassmat.charleyleberre.fr/api/childs/${child}`)
      .then((res) => {
        // console.log(res.data);
        setImageChild(res.data.data[0].imageChild);
        setChilds_id(res.data.data[0].childs_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(imageChild);

  //Fonction d'ajout d'une fiche enfant
  const UpdateImageChild = async (e) => {
    // console.log(birthDate);

    // e.preventDefault();
    // const users_id = [];
    // users_id.push(user.id);

    // const childs_id = [];
    // childs_id.push(idChild);
    
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("imageChild", imageChild);
    // formData.append("childs_id", childs_id);

    // Bout de code pour récupérer les données du formulaire
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }


    await axios
      .post(`https://kurassmat.charleyleberre.fr/api/childUpdateImage`, formData)
      .then(navigate("/home"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div>
      <Box className="pictureForm" component="form" onSubmit={UpdateImageChild}>
        <h2>Modifier la photo</h2>
        <Avatar
                  sx={{ width: 100, height: 100 }}
                  src={`https://kurassmat.charleyleberre.fr/thumbnail/${imageChild}`}
                />
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
          <PhotoCamera sx={{ width: 16, height: 16, mb: 0.33, ml: 0.7 }} />
        </Button>

        
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
export default UpdateImageChild;