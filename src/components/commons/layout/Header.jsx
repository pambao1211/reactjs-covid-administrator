import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { GiHospital } from "react-icons/gi";

import paths from "../../../configs/paths";
import { useAuth } from "../../../contexts/AuthContext";

const Header = () => {
  let { pathname } = useLocation();
  const { logout } = useAuth();

  const renderNavItems = () => {
    return paths
      .filter((item) => !item.isHidden)
      .map((item) => (
        <Link key={item.label} to={item.path}>
          <Box
            p={3}
            borderRadius="md"
            _hover={{ bg: "red.500", cursor: "pointer" }}
            transition=".15s ease"
            bgColor={pathname === item.path ? "red.400" : "white"}
          >
            {item.label}
          </Box>
        </Link>
      ));
  };

  return (
    <Flex
      h="10vh"
      w="100vw"
      align="center"
      justify="space-between"
      p={5}
      borderWidth={1}
      shadow="md"
      // bg="gray.200"
    >
      <Flex w="100%">
        <Flex align="center" mr="10">
          <Icon boxSize={10} color="gray.600" as={GiHospital} mr={5} />
          <Text
            bgGradient={`linear(to-r, red.500 , red.300)`}
            bgClip="text"
            fontSize="3xl"
            fontWeight="bold"
            textAlign="center"
            letterSpacing="tight"
          >
            Covid Management System
          </Text>
        </Flex>
        <HStack spacing={10}>{renderNavItems()}</HStack>
      </Flex>
      <Stack direction="row" align="center" spacing={5}>
        <Button align="center" colorScheme="red" onClick={() => logout()}>
          Logout
        </Button>
        <Avatar
          size="sm"
          src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
        />
      </Stack>
    </Flex>
  );
};

export default Header;
