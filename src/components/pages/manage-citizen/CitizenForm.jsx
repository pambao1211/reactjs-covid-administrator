import React, { useRef } from "react";
import _ from "lodash";
import { Formik, Form, Field } from "formik";
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";

import { initialCitizenFormValues, citizenFormConfigs } from "../../../configs";
import FormInput from "../../commons/FormInput";
import { PRIMARY_COLOR, TITLE_INFO_COLOR } from "../../../configs";

const renderField = (props) => {
  return <FormInput {...props} />;
};

const renderFields = () => {
  return citizenFormConfigs.map((field) => {
    const { fieldType = "text", name, label } = field;
    return (
      <GridItem colSpan={1}>
        <Field
          name={field.name}
          label={field.label}
          type={fieldType}
          component={renderField}
        />
      </GridItem>
    );
  });
};

const CitizenForm = ({ handleChange, handleSubmit }) => {
  const ref = useRef(null);

  const validate = (values) => {
    const error = {};
    _.forOwn(values, (value, key) => {
      if (!value) error[key] = `You must enter your value`;
    });
    return error;
  };

  return (
    <Flex w="60%" direction="column" align="center" justify="center">
      <Flex h="20%">
        <Heading color={TITLE_INFO_COLOR}>Add Citizen</Heading>
      </Flex>
      <Flex w="100%" align="center" justify="center">
        <Formik
          innerRef={ref}
          validate={validate}
          onSubmit={handleSubmit}
          initialValues={initialCitizenFormValues}
        >
          <Form
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
          >
            <Grid h="100%" templateColumns="repeat(2, 1fr)" gap={4}>
              {renderFields()}
            </Grid>
            <Button mt={5} colorScheme={PRIMARY_COLOR} w="100%" type="submit">
              Submit
            </Button>
          </Form>
        </Formik>
      </Flex>
    </Flex>
  );
};

export default CitizenForm;
