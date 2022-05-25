import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./commons/layout";
import paths from "./configs/paths";

const App = () => {
    const renderPaths = () => {
        return paths.map((item) => (
            <Route key={item.label} path={item.path} element={item.element} />
        ));
    };

    return (
        <BrowserRouter>
            <Layout>
                <Routes>{renderPaths()}</Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
