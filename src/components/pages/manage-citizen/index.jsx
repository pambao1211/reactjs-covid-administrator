import React, { useState, useRef, useEffect } from "react";
import { Flex } from "@chakra-ui/react";

import CitizenForm from "./CitizenForm";
import InformationCard from "./InformationCard";

const ManageCitizen = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    idNumber: "",
    address: "",
    doses: "",
  });

  const handleChange = (keyChange, value) => {
    setFormValues((pre) => {
      return { ...pre, [keyChange]: value };
    });
  };

  return (
    <Flex h="100%" w="100%" align="center" justify="center">
      <CitizenForm handleChange={handleChange} />
      <InformationCard formValues={formValues} />
    </Flex>
  );
};

export default ManageCitizen;
