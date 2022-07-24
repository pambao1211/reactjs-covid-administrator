import { Avatar, Badge, Button, Flex, Icon } from "@chakra-ui/react";
import { BsPen, BsTrash, BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";

import { GENDER_MALE, GENDER_FEMALE } from "../constant";
import { PRIMARY_COLOR } from "../configs";

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

export const getTableData = (citizens, handleDelete, handleNavigate) => {
  const tableData = citizens.map((citizen, index) => ({
    avt: <Avatar src={citizen.avt} />,
    idNumber: citizen.idNumber,
    firstName: citizen.firstName,
    lastName: citizen.lastName,
    gender: renderGender(citizen.gender),
    dob: toLocaleDate(citizen.dob),
    doses: convertStatus(citizen.doses),
    address: citizen.address,
    action: (
      <Flex>
        <Button
          mr={3}
          colorScheme="green"
          onClick={() => {
            handleNavigate(citizen.id);
          }}
        >
          <Icon boxSize={3} as={MdOpenInNew} />
        </Button>
        <Button
          mr={3}
          colorScheme="blue"
          onClick={() => {
            handleNavigate(citizen.id);
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
      </Flex>
    ),
  }));
  return tableData;
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
