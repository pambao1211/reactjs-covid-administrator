import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import CitizenForm from "../../commons/CitizenForm";
import { fetchCitizenById } from "../../../services/firebase";

const EditCitizen = () => {
  const { citizenId } = useParams();
  useEffect(() => {
    // fetchCitizenById(citizenId);
  }, []);
  return <CitizenForm />;
};

export default EditCitizen;
