import React, { useState } from "react";
import { Flex, useToast } from "@chakra-ui/react";

import { addCitizen } from "../../../services/firebase";
import { citizenFormFields } from "../../../configs";
import CitizenForm from "./CitizenForm";
import InformationCard from "./InformationCard";

const ManageCitizen = () => {
  const toast = useToast();
  const [fields, setFields] = useState(citizenFormFields);
  const [avt, setAvt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (keyChange, value) => {
    setFields((pre) => {
      return { ...pre, [keyChange]: { ...pre[keyChange], value: value } };
    });
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const citizenRef = await addCitizen({ ...values, avt: avt });
      toast({
        title: "Added citizen",
        description: "Citizen is successfully added",
        status: "success",
        position: "bottom",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Added fail",
        description: "There is some error with the server",
        status: "error",
        position: "bottom",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <Flex h="100%" w="100%">
      <CitizenForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <InformationCard formValues={fields} avt={avt} setAvt={setAvt} />
    </Flex>
  );
};

export default ManageCitizen;
