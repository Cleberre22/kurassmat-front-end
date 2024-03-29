import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";

const Child = () => {
  const [childs, setChild] = useState([]);

  // Le useEffect se joue lorsque le composant est monté
//   useEffect(() => {
//     axios
//       .get("https://kurassmat.charleyleberre.fr/api/childs")
//       .then((res) => setChilds(res.data));
//   }, []);

  useEffect(() => {
    // displayUsers();
    displayChild();
  }, []); // Sans les crochets ça tourne en boucle

 const displayChild = async (props) => {
    await axios.get("https://kurassmat.charleyleberre.fr/api/childs/${id}", {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("access_token"),
      },
    }).then((res) => {
      setChild(res.data);
      console.log(res.data);
      console.log(childs);
    });
  };



  return (
    <section className="childCard">
      {/* <Box className="userCardMiddle" sx={{ mb: 3 }}>
        {childs.map((child) => (
          <p>{child.firstnameChild}</p>
        ))}
        <p>blalalalala</p> */}
      {/* </Box> */}
      {childs.map((child) => (
          <p>{child.firstnameChild}</p>
        ))}
      {childs.firstnameChild}
    </section>
  );
};

export default Child;
