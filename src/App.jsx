import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import RegisterAssmat from "./pages/RegisterAssmat";
import RegisterEmployer from "./pages/RegisterEmployer";

import Login from "./pages/Login";

import ShowProfil from "./pages/profil/ShowProfil";
import EditProfil from "./pages/profil/EditProfil";

import IndexSummaries from "./pages/daySummaries/IndexSummaries";
import IndexSummariesChild from "./pages/daySummaries/IndexSummariesChild";

import IndexPicturesChild from "./pages/pictures/IndexPicturesChild";

import ChildrenAuth from "./pages/children/ChildrenAuth";
import Children from "./pages/children/Children";
import AddChild from "./pages/children/AddChild";
import EditChild from "./pages/children/EditChild";
import ShowChild from "./pages/children/ShowChild";

import Index from "./pages/dashboard/Index";

function App() {

  const token = localStorage.getItem("access_token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
     
        <Route path="/registerAssmat" element={<RegisterAssmat />} />
        <Route path="/registerEmployer" element={<RegisterEmployer />} />

        <Route path="/login" element={<Login />} />

        <Route path="/showProfil" element={<ShowProfil/> }/>
        <Route path="/editProfil" element={<EditProfil/>} />

        <Route path="/daysummaries" element={<IndexSummaries />} />
        <Route path="/indexDaySummariesChild/:idChildSummary" element={<IndexSummariesChild />} />

        <Route path="/IndexPicturesChild/:idChildPicture" element={<IndexPicturesChild />} />

        <Route path="/childrenAuth/:idUserAuth" element={<ChildrenAuth />} />
        <Route path="/children" element={<Children />} />
        <Route path="/children/add" element={<AddChild />} />
        <Route path="/children/edit/:child" element={<EditChild />} />
        <Route path="/children/show/:child" element={<ShowChild />} />

        <Route path="/dashboard/index" element={token ? <Index/> : <Login/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
