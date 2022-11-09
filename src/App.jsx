import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

// import Register from "./pages/Register";
import RegisterAssmat from "./pages/RegisterAssmat";
import RegisterEmployer from "./pages/RegisterEmployer";

import Login from "./pages/Login";
// import LoginRedirectProfil from "./pages/LoginRedirectProfil";

import ShowProfil from "./pages/profil/ShowProfil";
import EditProfil from "./pages/profil/EditProfil";

import Index from "./pages/dashboard/Index";

import IndexSummaries from "./pages/daySummaries/IndexSummaries";
import IndexSummariesChild from "./pages/daySummaries/IndexSummariesChild";

import ChildrenAuth from "./pages/children/ChildrenAuth";
import Children from "./pages/children/Children";
import AddChild from "./pages/children/AddChild";
import EditChild from "./pages/children/EditChild";
import ShowChild from "./pages/children/ShowChild";

// import Children from "./pages/children/Children";
// import AddSummary from "./pages/daySummaries/AddSummary";
// import EditChild from "./pages/children/EditChild";
// import ShowChild from "./pages/children/ShowChild";




function App() {

  const token = localStorage.getItem("access_token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/registerAssmat" element={<RegisterAssmat />} />
        <Route path="/registerEmployer" element={<RegisterEmployer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/showProfil" element={<ShowProfil/> }/>
        <Route path="/editProfil" element={<EditProfil/>} />

        {/* <Route path="/showProfil" element={token ? <Profil/> : <LoginRedirectProfil/> }/> */}
        {/* Ajouter dans le back une fonction login avec redirection vers profil */}

        <Route path="/daysummaries" element={<IndexSummaries />} />
        <Route path="/indexDaySummariesChild/:idChildSummary" element={<IndexSummariesChild />} />

        <Route path="/children" element={<Children />} />
        <Route path="/childrenAuth/:idUserAuth" element={<ChildrenAuth />} />
        <Route path="/children/add" element={<AddChild />} />
        <Route path="/children/edit/:child" element={<EditChild />} />
        <Route path="/children/show/:child" element={<ShowChild />} />

        {/* <Route path="/summary" element={<IndexSummary />} /> */}
        {/* <Route path="/summary/add/:child" element={<AddSummary />} /> */}
        {/* <Route path="/children/edit/:child" element={<EditChild />} />
        <Route path="/children/show/:child" element={<ShowChild />} /> */}

        {/* <Route path="/dashboard/index" element={<Index />} /> */}
        <Route path="/dashboard/index" element={token ? <Index/> : <Login/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
