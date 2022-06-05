import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import Header from "./Header";
import Footer from "./Footer";
import PrivateComponent from "../PrivateComponent";

const Layout = ({ children }) => {
  return (
    <Box>
      <PrivateComponent>
        <Header />
      </PrivateComponent>
      <Box h="80vh">
        <Flex h="100%" align="center" justify="center">
          <Flex
            h="90%"
            w="90vw"
            algins="center"
            justify="center"
            borderWidth={1}
            shadow="md"
            backgroundColor="#F7AFC"
          >
            {children}
          </Flex>
        </Flex>
      </Box>
      <PrivateComponent>
        <Footer />
      </PrivateComponent>
    </Box>
  );
};

export default Layout;
