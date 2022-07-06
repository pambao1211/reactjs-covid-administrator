import React from "react";
import _ from "lodash";
import {
  Flex,
  Heading,
  Avatar,
  Box,
  Stack,
  Divider,
  Icon,
} from "@chakra-ui/react";

import {
  PRIMARY_PATTERN_COLOR,
  TITLE_INFO_COLOR,
  DETAIL_INFO_COLOR,
  BOX_BORDER_COLOR,
} from "../../../configs";

const field = ({ label, icon, value }) => {
  return (
    <>
      <Flex align="center">
        <Icon as={icon} boxSize={6} mr={3} color={PRIMARY_PATTERN_COLOR} />
        <Flex key={label} w="100%">
          <Box color={TITLE_INFO_COLOR} fontWeight="semibold" w="30%">
            {label}:
          </Box>
          <Box fontWeight="medium" w="60%" color={DETAIL_INFO_COLOR}>
            {value}
          </Box>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

const InformationCard = ({ formValues }) => {
  const renderFields = () => {
    let result = [];
    _.forOwn(formValues, (value, key) => {
      console.log(value);
      result.push(field(value));
    });
    return result;
  };

  return (
    <Flex
      direction="column"
      p={5}
      align="center"
      h="100%"
      w="40%"
      borderLeftWidth={3}
      borderColor={BOX_BORDER_COLOR}
    >
      <Heading color={TITLE_INFO_COLOR} mb={5}>
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
