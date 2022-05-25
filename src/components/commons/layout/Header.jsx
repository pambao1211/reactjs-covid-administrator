import React from "react";
import { Avatar, Box, Flex, HStack, Heading } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

import paths from "../../configs/paths";

const Header = () => {
    let { pathname } = useLocation();
    const renderNavItems = () => {
        return paths.map((item) => (
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
                    <Box mr={10}>Logo</Box>
                    <Box whiteSpace="noWrap">Covid Vaccination Management</Box>
                </Flex>
                <HStack spacing={10}>{renderNavItems()}</HStack>
            </Flex>
            <Avatar
                size="sm"
                src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            />
        </Flex>
    );
};

export default Header;
