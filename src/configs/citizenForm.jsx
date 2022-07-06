import { keyBy, mapValues } from "lodash";
import { BsPersonBadge } from "react-icons/bs";
import { MdFamilyRestroom } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { FiHome } from "react-icons/fi";
import { GiLoveInjection } from "react-icons/gi";

export const citizenFormConfigs = [
  {
    name: "firstName",
    label: "First name",
    icon: BsPersonBadge,
    defaultValue: "Bao",
  },
  {
    name: "lastName",
    label: "Last name",
    icon: MdFamilyRestroom,
  },
  {
    name: "dob",
    label: "Date of birth",
    icon: FaBirthdayCake,
    fieldType: "date",
  },
  {
    name: "idNumber",
    label: "Identification number",
    icon: HiOutlineIdentification,
  },
  {
    name: "address",
    label: "Address",
    icon: FiHome,
  },
  {
    name: "doses",
    label: "Doses",
    icon: GiLoveInjection,
    fieldType: "number",
  },
];

export const initialCitizenFormValues = mapValues(
  keyBy(citizenFormConfigs, (field) => field.name),
  ({ defaultValue = "" }) => defaultValue
);

export const citizenFormFields = mapValues(
  keyBy(citizenFormConfigs, (field) => field.name),
  ({ label, icon, defaultValue }) => {
    return { label, icon, value: defaultValue || "" };
  }
);
