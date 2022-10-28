import React, { useEffect, useState } from "react";
import MenuHeader from "../../components/auth/MenuHeader";
import axios from "axios";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const Children = () => {
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
        <Box className="boxChild">
          <h1>Index Child</h1>

          <Box className="listeChild">
            <h2>liste</h2>
            {children.map((child) => (
              <div className="cardIndexChild">
                <p>{child.firstnameChild} </p>
                <p> {child.lastnameChild}</p>
                <p> {child.birthDate}</p>
                <p> {child.imageChild}</p>

                <Link
                  href="/children/edit/${id}"
                  underline="none"
                >
                  Modifier
                </Link>

                <Link
                  href="/children/show/${id}"
                  underline="none"
                >
                  Voir
                </Link>

                <Button
                  variant="danger"
                  onClick={() => {
                    deleteChild(child.id);
                  }}
                >
                  Supprimer
                </Button>
              </div>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Children;
