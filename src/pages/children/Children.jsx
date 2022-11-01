import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";

import MenuHeader from "../../components/auth/MenuHeader";
import Fox from "../../components//Fox";
import Prince from "../../components/Prince";

const Children = () => {
  const buttons = [
    <Button key="one">One</Button>,
    <Button key="two">Two</Button>,
    <Button key="three">Three</Button>,
  ];

  // Get the button:
  let mybutton = document.getElementById("myBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const [children, setChildren] = useState([]);

  useEffect(() => {
    displayChildren();
  }, []); // Sans les crochets ça tourne en boucle

  const displayChildren = async () => {
    await axios.get("http://localhost:8000/api/childs").then((res) => {
      setChildren(res.data.data);
      // console.log(res.data.data);
    });
  };
  // console.log(articles);

  const deleteChild = (id) => {
    axios
      .delete(`http://localhost:8000/api/childs/${id}`)
      .then(displayChildren);
  };

  return (
    <div className="indexChild">
      <MenuHeader />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil">
          <h1 className="titleProfil">Liste des enfants</h1>

          <Box className="boxProfil">
            {children.map((child) => (
              <Box className="userCard">
                <Box className="boxActionIndexChild">
                  {/* <a
                    className="linkEditProfil"
                    href="/editProfil/"
                    id="style-2"
                    data-replace="Modifier mon profil"
                  >
                    <span>Modifier mon profil </span>
                  </a> */}
                  <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical contained button group"
                    variant="text"
                    sx={{ m: 2 }}
                  >
                    

                    <Button href="/children/show/${id}" key="one"><VisibilityIcon /></Button>

                    <Button key="two" href="/children/edit/${id}"><ModeEditIcon /></Button>

                    <Button
                      key="three"
                  href="#"
                      onClick={() => {
                        deleteChild(child.id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>

                  </ButtonGroup>







                </Box>

                <div className="cardIndexChild">
                  <Avatar
                    sx={{ width: 70, height: 70 }}
                    src={`http://localhost:8000/storage/uploads/${child.imageChild}`}
                  />
                  <p>{child.firstnameChild} </p>
                  <p> {child.lastnameChild}</p>
                  <p> {child.birthDate}</p>

               

               

                  
                </div>
              </Box>
            ))}

            {/* <Box component="form" onSubmit={AddChild}>
              <Box className="userCardTopEdit" sx={{ mb: 4 }}>
              <Avatar
                        sx={{ width: 100, height: 100 }}
                        src="avatar.png"
                      />
                <button type="submit" className="button-87" role="button">
                 Ajouter une photo
                </button>
              </Box> */}

            {/* <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  Prénom:
                  <TextField
                    // {...AddChild("firstnameChild", {
                    //   required: true,
                    //   maxLength: {
                    //     value: 20,
                    //     message: "Prénom: Longueur maximale de 20 caractères",
                    //   },
                    // })}
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
                    // {...AddChild("lastnameChild", {
                    //   required: true,
                    //   maxLength: {
                    //     value: 20,
                    //     message: "Nom: Longueur maximale de 20 caractères",
                    //   },
                    // })}
                    value={lastnameChild}
                    onChange={(event) => {
                      setLastnameChild(event.target.value);
                    }}
                    required
                    fullWidth
                    id="lastnameChild"
                    autoFocus
                  />
                </Grid> */}

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

            {/* <Grid item xs={12} sm={6}>
                  Email:
                  <TextField
                    {...AddChild("email", {
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
                </Grid> */}

            {/* <Grid item xs={12} sm={6}>
                  Téléphone:
                  <TextField
                    // {...AddChild("phone", {
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
                </Grid> */}

            {/* <Grid item xs={12}>
                  Adresse:
                  <TextField
                    // {...AddChild("address", {
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
                </Grid> */}

            {/* <Grid item xs={12} sm={6}>
                  Code postal:
                  <TextField
                    {...AddChild("postalCode", {
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
                </Grid> */}

            {/* <Grid item xs={12} sm={6}>
                  Ville:
                  <TextField
                    {...AddChild("city", {
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
                </Grid> */}
            {/* </Grid>

              <Grid
                container
                justifyContent="center"
                sx={{ mt: 4 }}
                className="buttonAddChild"
              >
                <button type="submit" className="button-877" role="button">
                  Ajouter un enfant
                </button>
              </Grid> */}
            {/* </Box> */}
          </Box>
        </Container>
      </Box>
      <Fox />
      <Prince />
      <button onclick="topFunction()" id="myBtn" title="Go to top">
        Top
      </button>
    </div>
  );
};

export default Children;
