import {
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  Tag,
  Flex,
} from "@chakra-ui/react";
import { BsGenderFemale, BsGenderMale, BsPen, BsTrash } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";

import {
  DASH_BOARD,
  DETAIL_CITIZEN,
  DETAIL_VACCINATION,
  EDIT_CITIZEN,
  EDIT_VACCINATION,
  GENDER_FEMALE,
  GENDER_MALE,
} from "../constant";
import {
  paths,
  PRIMARY_COLOR,
  NAVBAR_PATTERN_COLOR,
  PRIMARY_PATTERN_COLOR,
} from "../configs";
import _ from "lodash";

const convertStatus = (doses) => {
  switch (doses) {
    case 0:
      return <Badge colorScheme="red">Unprotected</Badge>;
    case 1:
      return <Badge colorScheme="orange">Partial protected</Badge>;
    case 2:
      return <Badge colorScheme="yellow">Highly protected</Badge>;
    case 3:
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
  return _.chain(formConfigs)
    .filter((config) => !config.isHidden)
    .keyBy((field) => field.name)
    .mapValues(({ defaultValue = "" }) => defaultValue)
    .value();
};

export const getFormFields = (formConfigs) => {
  return _.chain(formConfigs)
    .keyBy((field) => field.name)
    .mapValues(({ label, icon, defaultValue }) => {
      return {
        label,
        icon,
        value: defaultValue || defaultValue === 0 ? defaultValue : "",
      };
    })
    .value();
};

export const renderVaccineTags = (vaccines) => {
  return (
    <HStack spacing={2}>
      {vaccines.map((vaccine) => {
        return (
          <Link
            key={vaccine.id}
            to={`${paths[DETAIL_VACCINATION].pathWithNoParams}/${vaccine.id}`}
          >
            <Tag
              bgColor={NAVBAR_PATTERN_COLOR}
              _hover={{ bg: PRIMARY_PATTERN_COLOR, cursor: "pointer" }}
            >
              <Flex align="center">
                <Avatar src={vaccine.img} size="2xs" />
                <Box ml={2}>{vaccine.label}</Box>
              </Flex>
            </Tag>
          </Link>
        );
      })}
    </HStack>
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

export const vaccineToVaccineSelector = (vaccines) => {
  return vaccines.map((vaccine) => {
    return {
      id: vaccine.id,
      vaccineName: vaccine.vaccineName,
      label: vaccine.vaccineName,
      value: vaccine.id,
      img: vaccine.img,
    };
  });
};

export const customSelectionRender = (value) => {
  return (
    <Flex align="center">
      <Avatar src={value.img} size="sm" />
      <Box ml={2}>{value.label}</Box>
    </Flex>
  );
};
