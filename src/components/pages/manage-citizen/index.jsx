import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";

import { addCitizen } from "../../../services/firebase";
import { citizenFormFields } from "../../../configs";
import CitizenForm from "../../commons/CitizenForm";
import InformationCard from "../../commons/InformationCard";
import useToastCustom from "../../../hooks/useToast";

const ManageCitizen = () => {
  const toast = useToastCustom();
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
      });
    } catch (e) {
      toast({
        title: "Added fail",
        description: "There is some error with the server",
        status: "error",
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
