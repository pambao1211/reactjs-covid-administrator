import React from "react";
import _ from "lodash";
import { Flex, Heading, Avatar, Box, Stack } from "@chakra-ui/react";

const field = (title, value) => {
  return (
    <Flex key={title} w="100%">
      <Box w="30%">{title}:</Box>
      <Box w="30%">{value}</Box>
    </Flex>
  );
};

const InformationCard = ({ formValues }) => {
  // console.log(formValues);
  const renderFields = () => {
    let result = [];
    _.forOwn(formValues, (value, key) => {
      console.log(value);
      result.push(field(key, value));
    });
    return result;
  };

  return (
    <Flex
      direction="column"
      p={5}
      align="center"
      h="100%"
      w="100%"
      borderWidth={1}
    >
      <Heading color="red.400" mb={5}>
        Profile Preview
      </Heading>

      <Avatar mb={5} size="xl" />

      <Stack w="100%" spacing={5}>
        {renderFields()}
      </Stack>
    </Flex>
  );
};

export default InformationCard;
