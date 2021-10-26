import React from "react";
import * as FinalForm from "react-final-form";
import { Input } from "semantic-ui-react";

const IntegerFormField = ({ name }) => (
  <FinalForm.Field
    name={name}
    component={Input}
    type="number"
    placeholder="0"
    parse={(value) => Math.trunc(value || 0)}
  />
);

export default IntegerFormField;
