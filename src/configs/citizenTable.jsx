import { keyBy, mapValues } from "lodash";
import { citizenFormConfigs } from "./citizenForm";

export const tableColumns = [
  {
    Header: "Avatar",
    accessor: "avt",
  },
  {
    Header: "Id Number",
    accessor: "idNumber",
  },
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Date of birth",
    accessor: "dob",
  },
  {
    Header: "Status",
    accessor: "doses",
  },
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

export const initialCitizenFormValues = mapValues(
  keyBy(citizenFormConfigs, (field) => field.name),
  ({ defaultValue = "" }) => defaultValue
);

export const citizenFormFields = mapValues(
  keyBy(citizenFormConfigs, (field) => field.name),
  ({ label, icon, defaultValue }) => {
    return {
      label,
      icon,
      value: defaultValue || defaultValue === 0 ? defaultValue : "",
    };
  }
);
