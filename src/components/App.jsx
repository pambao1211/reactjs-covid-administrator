import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "../contexts/AuthContext";
import Layout from "./commons/layout";
import PrivateRoute from "./commons/PrivateRoute";
import { paths } from "../configs";

const App = () => {
  const a = [
    "asdasd",
    "asdasdasd",
    "dasdasda",
    "dasdasda",
    "asdasd",
    "sadsdasdasdasdasd",
  ];
  const renderPaths = () => {
    return paths.map((item) => (
      <Route
        key={item.label}
        path={item.path}
        element={<PrivateRoute path={item.path}>{item.element}</PrivateRoute>}
      />
    ));
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>{renderPaths()}</Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
