import React, { useEffect, useState } from "react";
import MenuHeader from "../../components/auth/MenuHeader";
import axios from "axios";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useParams } from "react-router-dom";

const Child = (id) => {


  const [child, setChild] = useState([]);

  useEffect(() => {
    displayChild();
  }, []); // Sans les crochets ça tourne en boucle

  const displayChild = async () => {
    await axios.get("http://localhost:8000/api/childs/${id}").then((res) => {
      setChild(res.data);
      console.log(res.data);
    });
  };
     console.log(child);

  return (
    <div className="indexChild">
      <MenuHeader />

      <Box className="main">
        <Box className="boxChild">
          <h1>Show fiche enfant</h1>

          {child.firstnameChild}
          {/* <Box className="listeChild">
            <h2>liste</h2>
            {children.map((child) => (
              <div className="cardIndexChild">
                <p>{child.firstnameChild} </p>
                <p> {child.lastnameChild}</p>
                <p> {child.birthDate}</p>
                <p> {child.imageChild}</p>

                <Link
                    to={`/pages/children/edit/${child.id}`}
                    className="btn btn-success mb-2"
                  >
                    Modifier
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
          </Box>*/}
        </Box>
      </Box>
    </div>
  );
};

export default Child;
