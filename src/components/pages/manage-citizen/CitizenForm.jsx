import React, { useRef } from 'react';
import _ from 'lodash';
import { Formik, Form, Field } from 'formik';
import { Box, Button, Flex, Grid, GridItem, Input } from '@chakra-ui/react';

import FormInput from '../../commons/FormInput';

const renderField = (props) => {
  return <FormInput {...props} />;
};

const initialValues = {
  firstName: '',
  lastName: '',
  dob: '',
  idNumber: '',
  address: '',
  doses: '',
};

const CitizenForm = ({ handleChange }) => {
  const ref = useRef(null);

  const validate = (values) => {
    const error = {};
    _.forOwn(values, (value, key) => {
      if (!value) error[key] = `You must enter your value`;
    });
    return error;
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Flex h="100%" minW="60vw" align="center" justify="center">
      <Formik
        innerRef={ref}
        validate={validate}
        onSubmit={onSubmit}
        initialValues={initialValues}
      >
        <Form
          onChange={(e) => {
            console.log(e);
            handleChange(e.target.name, e.target.value);
          }}
        >
          <Grid h="100%" templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem colSpan={1}>
              <Field
                label="First name"
                name="firstName"
                component={renderField}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Field
                label="Last name"
                name="lastName"
                component={renderField}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Field
                label="Date of birth"
                name="dob"
                type="date"
                component={FormInput}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Field
                label="Identification number"
                name="idNumber"
                component={FormInput}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Field label="Address" name="address" component={FormInput} />
            </GridItem>
            <GridItem colSpan={1}>
              <Field
                label="Doses"
                name="doses"
                type="number"
                component={renderField}
              />
            </GridItem>
          </Grid>
          <Button colorScheme="red" w="100%" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </Flex>
  );
};

export default CitizenForm;
