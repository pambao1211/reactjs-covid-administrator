import React, { useRef } from "react";
import _ from "lodash";
import { Formik, Form, Field } from "formik";
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";

import FormInput from "./FormInput";
import { PRIMARY_COLOR, TITLE_INFO_COLOR } from "../../configs";

const renderField = (props) => {
  return <FormInput {...props} />;
};

const GenericForm = ({
  initialFormValues,
  handleChange,
  handleSubmit,
  isLoading,
  heading,
  formConfigs,
}) => {
  const ref = useRef(null);

  const renderFields = () => {
    console.log(formConfigs);
    return formConfigs.map((field) => {
      const { name, label, fieldType = "text", options = [] } = field;
      return (
        <GridItem colSpan={1}>
          <Field
            name={name}
            label={label}
            type={fieldType}
            options={options}
            component={renderField}
          />
        </GridItem>
      );
    });
  };

  const validate = (values) => {
    const error = {};
    _.forOwn(values, (value, key) => {
      if (!value && value !== 0) error[key] = `You must enter your value`;
    });
    return error;
  };

  return (
    <Flex w="60%" direction="column" align="center" justify="center">
      <Flex h="20%">
        <Heading color={TITLE_INFO_COLOR}>{heading}</Heading>
      </Flex>
      <Flex w="100%" align="center" justify="center">
        <Formik
          innerRef={ref}
          validate={validate}
          onSubmit={handleSubmit}
          initialValues={initialFormValues}
        >
          <Form
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
          >
            <Grid h="100%" templateColumns="repeat(2, 1fr)" gap={4}>
              {renderFields()}
            </Grid>
            <Button
              mt={5}
              colorScheme={PRIMARY_COLOR}
              w="100%"
              type="submit"
              isLoading={isLoading}
            >
              Submit
            </Button>
          </Form>
        </Formik>
      </Flex>
    </Flex>
  );
};

export default GenericForm;