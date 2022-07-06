import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { collection, addDoc } from "firebase/firestore";

import { db } from "../../../firebase";
import { citizenFormFields } from "../../../configs";
import CitizenForm from "./CitizenForm";
import InformationCard from "./InformationCard";

const ManageCitizen = () => {
  const [fields, setFields] = useState(citizenFormFields);

  console.log(fields);
  const handleChange = (keyChange, value) => {
    setFields((pre) => {
      return { ...pre, [keyChange]: { ...pre[keyChange], value: value } };
    });
  };

  const handleSubmit = async (values) => {
    console.log(values);
    await addDoc(collection(db, "countries"), values);
  };

  return (
    <Flex h="100%" w="100%">
      <CitizenForm handleChange={handleChange} handleSubmit={handleSubmit} />
      <InformationCard formValues={fields} />
    </Flex>
  );
};

export default ManageCitizen;
