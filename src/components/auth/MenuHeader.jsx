import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";

// const pages = ["Login", "Register"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const token = localStorage.getItem("access_token");
  console.log(token);
  const userLogged = !token;

  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle
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
        // console.log(res.data.role);
      });
  };
  console.log(role);

  const removeToken = () => {
    localStorage.removeItem("access_token");
    //   setIsLoggedin(false);
    navigate("/home");
  };

  return (
    <AppBar position="static">
      <Box className="menuNav">
        <Toolbar disableGutters>
          {/* -------------------------------------------------------------------- MENU MOBILE */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {role === "ADMIN" ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component="a"
                    href="/dashboard/index"
                  >
                    Dashboard
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component="a"
                    href="/dashboard/index"
                  >
                    Dashboardeueueu
                  </Typography>
                </MenuItem>
              )}

              {userLogged ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component="a" href="/login">
                    Connexion
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={removeToken}>
                  <Typography textAlign="center">Deconnexion</Typography>
                </MenuItem>
              )}

              {/* <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component="a" href="/register">
                  Inscription
                </Typography>
              </MenuItem> */}
            </Menu>
          </Box>

          {/* -------------------------------------------------------------------- LOGO MOBILE */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MOBILE
          </Typography>

          {/* -------------------------------------------------------------------- MENU DESCKTOP */}
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
              {/* -------------------------------------------------------------------- BOX 1  */}
              <Grid item xs={4}>
                <Box
                  className="box1"
                  sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                >
                  <Button
                    component="a"
                    href="/dashboard/index"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Dashboard
                  </Button>

                  <Button
                    component="a"
                    href="/dashboard/index"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Dashboard
                  </Button>
                </Box>
              </Grid>

              {/* -------------------------------------------------------------------- BOX 2  */}
              <Grid item xs={4}>
                <Box
                  className="box2"
                  sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                >
                  <Typography
                    className="titleMenu"
                    variant="h6"
                    noWrap
                    component="a"
                    href="/home"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    KURASSMAT
                  </Typography>
                </Box>
              </Grid>

              {/* -------------------------------------------------------------------- BOX 3  */}
              {/* ------------------------------ DESCKTOP LOGO */}
              <Grid item xs={2}>
                <Box
                  className="box3"
                  sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                >
                  {/* <Button
                    component="a"
                    href="/registerAssmat"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Inscription Assmat
                  </Button> */}

                  {/* <Button
                    component="a"
                    href="/registerEmployer"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Inscription Employeur
                  </Button> */}

                  {userLogged ? (
                    <Button
                      component="a"
                      href="/login"
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Connexion
                    </Button>
                  ) : (
                    <Button
                      component="a"
                      onClick={removeToken}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      déconnection
                    </Button>
                  )}
                </Box>
              </Grid>

              {/* -------------------------------------------------------------------- BOX 4  */}
              <Grid item xs={2}>
                <Box
                  className="box4"
                  sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                >
                  <p>
                    {user.firstname} {user.lastname}
                  </p>

                  <Box className="avatarDesktop" sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        {userLogged ? (
                          <Avatar
                            sx={{ width: 32, height: 32 }}
                            src="/broken-image.jpg"
                          />
                        ) : (
                          <StyledBadge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            variant="dot"
                          >
                            <Avatar alt="Remy Sharp" src="avatar.png" />
                          </StyledBadge>
                        )}
                      </IconButton>
                    </Tooltip>

                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Profil</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Compte</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Dashboard</Typography>
                      </MenuItem>
                      {userLogged ? (
                        <MenuItem
                          component="a"
                          href="/login"
                          onClick={handleCloseUserMenu}
                        >
                          <Typography textAlign="center">Connexion</Typography>
                        </MenuItem>
                      ) : (
                        <MenuItem onClick={removeToken}>
                          <Typography textAlign="center">
                            Deconnection
                          </Typography>
                        </MenuItem>
                      )}
                    </Menu>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* -------------------------------------------------------------------- FIN DU MENU DESCKTOP */}
        </Toolbar>
      </Box>
    </AppBar>
  );
};
export default ResponsiveAppBar;
