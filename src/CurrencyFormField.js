import React from "react";
import * as FinalForm from "react-final-form";
import { Input } from "semantic-ui-react";

const parseCurrency = (value) => {
  const num = Number(value || 0);
  const truncatedNum = Math.trunc(num * 100) / 100;
  return truncatedNum > 0 ? truncatedNum : 0;
};

const formatCurrency = (value) => {
  return `${Number(value || 0).toFixed(2)}`;
};

const CurrencyFormField = ({ name, disabled = false, readOnly = false }) => (
  <FinalForm.Field
    name={name}
    component={Input}
    type="number"
    placeholder="0"
    parse={parseCurrency}
    label="$"
    disabled={disabled}
    readOnly={readOnly}
    formatOnBlur
    format={formatCurrency}
  />
);

export default CurrencyFormField;
