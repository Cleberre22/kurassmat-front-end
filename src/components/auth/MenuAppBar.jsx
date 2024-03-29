import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={true} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function HideAppBar(props) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
  // console.log(token);
  const userLogged = !token;

  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);
  // const [idUser, setIdUser] = useState([]);

  const displayUsers = async () => {
    await axios
      .get("https://kurassmat.charleyleberre.fr/api/current-user", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUser(res.data);
        // setIdUser(res.data.idUser);
        setRole(res.data.role);
        // console.log(res.data.role);
      });
  };
  // console.log(user);

  const removeToken = () => {
    localStorage.removeItem("access_token");
    //   setIsLoggedin(false);
    navigate("/home");
  };

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Box className="appBar">
            <Toolbar disableGutters>
              {/* -------------------------------------------------------------------- MENU BURGER */}
              <Box
                className="boxBurger"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                <IconButton
                  className="iconBurger"
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
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
                  
                    <MenuItem onClick={handleCloseNavMenu} className="menuItemBurger">
                      <Typography component="a" href="/home" textAlign="center">Accueil</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} className="menuItemBurger">
                      <Typography component="a" href="/showProfil" textAlign="center">Mon profil</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} className="menuItemBurger">
                      <Typography component="a" href={`/childrenAuth/${user.id}`} textAlign="center">Mes enfants</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} className="menuItemBurger">
                      <Typography component="a" href="/IndexPicturesChild/:idChildPicture" textAlign="center">Galerie photo</Typography>
                    </MenuItem>
               
                </Menu>
              </Box>

              {/* -------------------------------------------------------------------- LOGO MOBILE */}
              <Box
                className="boxLogoMobile"
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
                <Typography
                  className="logoMobile"
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
                  KURASSMAT
                </Typography>
              </Box>

              {/* -------------------------------------------------------------------- MENU DESKTOP PART-1 */}
              <Box
                className="boxMenuDesktopPart1"
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              >
                <Button
                  component="a"
                  href="/home"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Accueil
                </Button>

                <Button
                  component="a"
                  href="/showProfil"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Mon profil
                </Button>
              </Box>

              {/* -------------------------------------------------------------------- LOGO DESKTOP */}
              <Box
                className="logoDesktop"
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              >
                <Button
                  id="back-to-top-anchor"
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
                </Button>
              </Box>

              {/* -------------------------------------------------------------------- MENU DESKTOP PART-2 */}
              <Box
                className="boxMenuDesktopPart2"
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              >
                <Button
                  component="a"
                  href={`/childrenAuth/${user.id}`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Mes enfants
                </Button>

                <Button
                  component="a"
                  href="/IndexPicturesChild/:idChildPicture"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Galerie photo
                </Button>

                <Box sx={{ flexGrow: 1 }}></Box>

                <Box className="boxAvatar" sx={{ flexGrow: 0 }}>
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
                </Box>
              </Box>

              {/* -------------------------------------------------------------------- BOX AVATAR + MENU PROFIL */}
              <Box className="boxAvatar2" sx={{ flexGrow: 0 }}>
                <p>
                  {user.firstname} {user.lastname}
                </p>
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
                      <Typography textAlign="center">Déconnexion</Typography>
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Box>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
