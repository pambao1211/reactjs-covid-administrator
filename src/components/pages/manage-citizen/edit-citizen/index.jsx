import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

import InformationCard from "../../../commons/InformationCard";
import GenericForm from "../../../commons/GenericForm";
import CustomSpinner from "../../../commons/CustomSpinner";
import useToastCustom from "../../../../hooks/useToast";
import { fetchCitizenById } from "../../../../services/firebase";
import { EDIT_CITIZEN } from "../../../../constant";
import { citizenFormConfigs, paths } from "../../../../configs";
import { editCitizen } from "../../../../services/firebase";
import { DASH_BOARD } from "../../../../constant";
import { getFormFields } from "../../../../utils";

const EditCitizen = () => {
  let navigate = useNavigate();
  const { citizenId } = useParams();
  const toast = useToastCustom();
  const [citizen, setCitizen] = useState({});
  const [avt, setAvt] = useState(null);
  const [fields, setFields] = useState(getFormFields(citizenFormConfigs));
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const initialization = async () => {
      try {
        const citizenResult = await fetchCitizenById(citizenId);
        if (!citizenResult) {
          toast({
            title: "Citizen is not exist",
            description: "Given citizen is not exist",
            status: "error",
          });
          return;
        }
        const { avt: rsAvt, ...rsCitizen } = citizenResult;
        setCitizen(rsCitizen);
        setAvt(rsAvt);
      } catch (e) {
        toast({
          title: "Cannot get citizen",
          description: "There was some errors with given citizen",
          status: "error",
        });
      }
      setIsLoading(false);
    };
    initialization();
  }, []);

  useEffect(() => {
    if (!citizen) return;
    const fieldsTempt = fields;
    _.forOwn(citizen, (val, key) => {
      fieldsTempt[key] = { ...fieldsTempt[key], value: val };
    });
    setFields({ ...fieldsTempt });
  }, [citizen]);

  const handleChange = (keyChange, value) => {
    setFields((pre) => {
      return { ...pre, [keyChange]: { ...pre[keyChange], value: value } };
    });
  };

  const handleSubmit = async () => {
    setIsFormLoading(true);
    const editedValues = _.mapValues(fields, "value");
    try {
      await editCitizen(citizenId, editedValues);
      navigate(paths[DASH_BOARD].path);
      toast({
        title: "Citizen edited",
        description: "Citizen has been edited successfully",
      });
    } catch (e) {
      toast({
        title: "Edited failed",
        description: "Citizen has been failed to edit",
      });
    }
    setIsFormLoading(false);
  };

  if (isLoading) {
    return (
      <Flex h="100%" w="100%" align="center" justify="center">
        <CustomSpinner />
      </Flex>
    );
  }

  return (
    <Flex h="100%" w="100%">
      <GenericForm
        initialFormValues={citizen}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isFormLoading}
        heading={paths[EDIT_CITIZEN].label}
        formConfigs={citizenFormConfigs}
      />
      <InformationCard formValues={fields} avt={avt} setAvt={setAvt} />
    </Flex>
  );
};

export default EditCitizen;
