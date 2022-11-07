import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const SummaryForm = ({idChild}) => {
  const navigate = useNavigate();

  const [contentDaySummary, setContentDaySummary] = useState("");
  const [childs_id, setChilds_id] = useState("");
  const [users_id, setUsers_id] = useState("");

  console.log(idChild);
  const [validationError, setValidationError] = useState({});

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
  }, []); // Sans les crochets ça tourne en boucle

  //Fonction d'ajout d'une fiche enfant
  const AddDaySummary = async (e) => {
    // console.log(birthDate);

    e.preventDefault();
    const users_id = [];
    users_id.push(user.id);

    const childs_id = [];
    childs_id.push(idChild);

    const formData = new FormData();

    formData.append("contentDaySummary", contentDaySummary);
    formData.append("childs_id", childs_id);
    formData.append("users_id", users_id);

    //Bout de code pour récupérer les données du formulaire
    // for (var pair of formData.entries()) {
    //         console.log(pair[0]+ ', ' + pair[1]);
    //     }

    await axios
      .post(`http://localhost:8000/api/daysummary`, formData)
      .then(navigate("/home"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div>
      <Box className="summaryForm" component="form" onSubmit={AddDaySummary}>
        <h2>Récapitulatif de la journée</h2>
        <TextField
          id="contentDaySummary"
          label="Message"
          fullWidth
          multiline
          value={contentDaySummary}
          onChange={(event) => {
            setContentDaySummary(event.target.value);
          }}
          rows={8}
        />
        <Grid
          container
          justifyContent="center"
          sx={{ mt: 2 }}
          className="buttonAddChild"
        >
          <button type="submit" className="button-87" role="button">
            Envoyer le message
          </button>
        </Grid>
      </Box>
    </div>
  );
};
export default SummaryForm;
