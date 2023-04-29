import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import MenuAppBar from "../../components/auth/MenuAppBar";
import Fox from "../../components//Fox";
import Prince from "../../components/Prince";
import BackToTop from "../../components/BackToTop";

const ChildrenAuth = () => {
  const { idUserAuth } = useParams();
  const [children, setChildren] = useState([]);
  const [user, setUser] = useState([]);
  const [role, setRole] = useState("");
  const [users_id, setUsers_id] = useState("");
  const [child_id, setChild_id] = useState("");

  //  console.log(idUserAuth);

  useEffect(() => {
    displayChildren();
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  const displayChildren = async () => {
    await axios
      .get(`http://localhost:8000/api/childIndexAuth/${idUserAuth}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setChildren(res.data.data);
        //   console.log(res.data);
      });
  };
  // console.log(articles);

  const deleteChild = (id) => {
    axios
      .delete(`http://localhost:8000/api/childs/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(displayChildren);
  };

  const displayUsers = async () => {
    await axios
      .get("http://localhost:8000/api/current-user", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUser(res.data);
        // console.log(res.data);
      });
  };
  // console.log(role);

  const userRole = user.role;
  // console.log(userRole);

  return (
    <div className="indexChild">
      <MenuAppBar />
      <Box className="main">
        <CssBaseline />
        <Container className="containerProfil" sx={{ mt: 10 }}>
          <h1 id="back-to-top-anchor" className="titleIndexChild">
            Liste des enfants {user.firstname} {user.lastname}
          </h1>
          {userRole == "assmat" ? (
            <Box className="boxActionIndexChild">
              <a
                className="linkEditProfil"
                href="/children/add"
                id="style-2"
                data-replace="Ajouter un enfant"
              >
                <span>
                  <p>
                    Ajouter un enfant{" "}
                    <AddCircleIcon
                      className="iconAddIndexChild"
                      sx={{ width: 20, height: 20, mt: 0.63, ml: 0.4 }}
                    />
                  </p>
                </span>
              </a>
            </Box>
          ) : (
            <Box></Box>
          )}

          <Box className="boxProfil">
            {children.map((child) => (
              
                <Box className="boxIndexChild">
                  <Grid container >
                    <Grid item xs={12} sm={10}>
                      <Box className="cardIndexChild">
                        <Box className="avatarIndexChild">
                          <Avatar
                            className="avatar"
                            sx={{ width: 100, height: 100 }}
                            src={`http://localhost:8000/storage/uploads/${child.imageChild}`}
                          />
                        </Box>
                        <Box className="boxInfoIndexChild">
                          <Box className="boxNameIndexChild">
                            <p> {child.firstnameChild} {child.lastnameChild} </p>
                            <p>né(e) le: {child.birthDate}</p>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Box>
                        {" "}
                        <Box
                          className="buttonGroupIndexChild"
                          orientation="vertical"
                          variant="text"
                          // sx={{ m: 2 }}
                        >
                          <Button
                            className="actionButtonIndexChild"
                            href={`/children/show/${child.child_id}`}
                            key="one"
                          >
                            <VisibilityIcon />
                          </Button>

                          <Button
                            className="actionButtonIndexChild"
                            key="two"
                            href={`/children/edit/${child.child_id}`}
                          >
                            <ModeEditIcon />
                          </Button>

                          <Button
                            className="actionButtonIndexChild"
                            key="three"
                            href="#"
                            onClick={() => {
                              deleteChild(child.child_id);
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
            ))}
          </Box>
          {/* ) : ( */}
          {/* <p>pas de correspondance</p> */}
          {/* )} */}
        </Container>
      </Box>
      <Fox />
      <Prince />
      <BackToTop />
    </div>
  );
};

export default ChildrenAuth;
