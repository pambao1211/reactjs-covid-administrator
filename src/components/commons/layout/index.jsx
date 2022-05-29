import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../../../contexts/AuthContext";
import PrivateComponent from "../PrivateComponent";

const Layout = ({ children }) => {
    return (
        <Box>
            <PrivateComponent>
                <Header />
            </PrivateComponent>
            <Box h="80vh">
                <Flex h="100%" align="center" justify="center">
                    {children}
                </Flex>
            </Box>
            <PrivateComponent>
                <Footer />
            </PrivateComponent>
        </Box>
    );
};

export default Layout;
