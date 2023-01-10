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

        <Route path="/showProfil" element={token ? <ShowProfil/> : <Login/> } />
        <Route path="/editProfil" element={token ? <EditProfil/> : <Login/> } />

        <Route path="/daysummaries" element={token ? <IndexSummaries/> : <Login/> } />
        <Route path="/indexDaySummariesChild/:idChildSummary" element={token ? <IndexSummariesChild/> : <Login/> } />

        <Route path="/IndexPicturesChild/:idChildPicture" element={token ? <IndexPicturesChild/> : <Login/> }/>

        <Route path="/childrenAuth/:idUserAuth" element={token ? <ChildrenAuth/> : <Login/> } />
        <Route path="/children" element={token ? <Children/> : <Login/> } />
        <Route path="/children/add" element={token ? <AddChild/> : <Login/> } />
        <Route path="/children/edit/:child" element={token ? <EditChild/> : <Login/> } />
        <Route path="/children/show/:child" element={token ? <ShowChild/> : <Login/> } />

        <Route path="/dashboard/index" element={token ? <Index/> : <Login/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
