import { Avatar, Badge, Button, HStack, Icon } from "@chakra-ui/react";
import { BsGenderFemale, BsGenderMale, BsPen, BsTrash } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";

import {
  DASH_BOARD,
  DETAIL_CITIZEN,
  DETAIL_VACCINATION,
  EDIT_CITIZEN,
  EDIT_VACCINATION,
  GENDER_FEMALE,
  GENDER_MALE,
} from "../constant";
import { paths, PRIMARY_COLOR } from "../configs";
import { keyBy, mapValues } from "lodash";

const convertStatus = (doses) => {
  switch (doses) {
    case 0:
      return <Badge colorScheme="red">Unprotected</Badge>;
    case 1:
      return <Badge colorScheme="yellow">Partial protected</Badge>;
    case 2:
      return <Badge colorScheme="green">Fully protected</Badge>;
    default:
      return <Badge colorScheme="blue">Unknown</Badge>;
  }
};

export const getCitizenTableData = (citizens, handleDelete, handleNavigate) => {
  return citizens.map((citizen) => ({
    avt: <Avatar src={citizen.avt} />,
    idNumber: citizen.idNumber,
    firstName: citizen.firstName,
    lastName: citizen.lastName,
    gender: renderGender(citizen.gender),
    dob: toLocaleDate(citizen.dob),
    doses: convertStatus(citizen.doses),
    address: citizen.address,
    actions: (
      <HStack spacing={3}>
        <Button
          colorScheme="green"
          onClick={() => {
            handleNavigate(DETAIL_CITIZEN, citizen.id);
          }}
        >
          <Icon boxSize={3} as={MdOpenInNew} />
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => {
            handleNavigate(EDIT_CITIZEN, citizen.id);
          }}
        >
          <Icon boxSize={3} as={BsPen} />
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            handleDelete(citizen.id, citizen.idNumber);
          }}
        >
          <Icon boxSize={3} as={BsTrash} />
        </Button>
      </HStack>
    ),
  }));
};

export const getVaccineTableData = (vaccines, handleDelete, handleNavigate) => {
  return vaccines.map((vaccine) => ({
    img: <Avatar src={vaccine.img} />,
    id: vaccine.id,
    vaccineName: vaccine.vaccineName,
    code: vaccine.code,
    origin: vaccine.origin,
    actions: (
      <HStack spacing={3}>
        <Button
          colorScheme="green"
          onClick={() => {
            handleNavigate(DETAIL_VACCINATION, vaccine.id);
          }}
        >
          <Icon boxSize={3} as={MdOpenInNew} />
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => {
            handleNavigate(EDIT_VACCINATION, vaccine.id);
          }}
        >
          <Icon boxSize={3} as={BsPen} />
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            handleDelete(vaccine.id, vaccine.code);
          }}
        >
          <Icon boxSize={3} as={BsTrash} />
        </Button>
      </HStack>
    ),
  }));
};

export const getInitialFormValues = (formConfigs) => {
  return mapValues(
    keyBy(formConfigs, (field) => field.name),
    ({ defaultValue = "" }) => defaultValue
  );
};

export const getFormFields = (formConfigs) => {
  return mapValues(
    keyBy(formConfigs, (field) => field.name),
    ({ label, icon, defaultValue }) => {
      return {
        label,
        icon,
        value: defaultValue || defaultValue === 0 ? defaultValue : "",
      };
    }
  );
};

export const renderGender = (value) => {
  if (parseInt(value) === GENDER_MALE) {
    return (
      <Badge colorScheme={PRIMARY_COLOR}>
        Male <Icon as={BsGenderMale} />
      </Badge>
    );
  }
  if (parseInt(value) === GENDER_FEMALE) {
    return (
      <Badge colorScheme={PRIMARY_COLOR}>
        Female <Icon as={BsGenderFemale} />
      </Badge>
    );
  }
};

export const toLocaleDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("vi-VN").format(new Date(date));
};

export const isPathMatch = (currentPath, pathItem) => {
  const homePath = paths[DASH_BOARD].path;
  if (currentPath !== homePath && pathItem === homePath) {
    return false;
  }
  return currentPath.includes(pathItem);
};
