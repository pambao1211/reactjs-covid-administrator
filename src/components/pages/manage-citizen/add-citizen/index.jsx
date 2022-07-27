import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";

import { ADD_CITIZEN } from "../../../../constant";
import { addCitizen } from "../../../../services/firebase";
import { citizenFormConfigs, paths } from "../../../../configs";
import { getInitialFormValues, getFormFields } from "../../../../utils";
import GenericForm from "../../../commons/GenericForm";
import InformationCard from "../../../commons/InformationCard";
import useToastCustom from "../../../../hooks/useToast";
import { MANAGE_CITIZEN } from "../../../../constant";
import { useNavigate } from "react-router-dom";

const AddCitizen = () => {
  const navigate = useNavigate();
  const toast = useToastCustom();
  const [fields, setFields] = useState(getFormFields(citizenFormConfigs));
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
      await addCitizen({ ...values, avt: avt });
      toast({
        title: "Added citizen",
        description: "Citizen is successfully added",
      });
      navigate(paths[MANAGE_CITIZEN].path);
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
      <GenericForm
        initialFormValues={getInitialFormValues(citizenFormConfigs)}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        heading={paths[ADD_CITIZEN].label}
        formConfigs={citizenFormConfigs}
      />
      <InformationCard formValues={fields} avt={avt} setAvt={setAvt} />
    </Flex>
  );
};

export default AddCitizen;
