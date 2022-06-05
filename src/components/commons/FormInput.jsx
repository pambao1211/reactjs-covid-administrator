import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const FormInput = ({ field, form, label, ...rest }) => {
  const { name } = field;
  const error = form.errors[name] && form.touched[name];
  return (
    <FormControl isInvalid={error}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} {...rest} />
      <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
