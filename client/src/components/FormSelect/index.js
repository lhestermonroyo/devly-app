import React from 'react';
import { Form } from 'react-bootstrap';

const FormSelect = props => {
  const {
    handleChange,
    label,
    name,
    placeholder = '---',
    value,
    defaultValue,
    options = [],
    helperText,
    errorText,
    required = false,
  } = props;

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        required={required}
      >
        <option selected="selected">{placeholder}</option>
        {options.map(item => (
          <option value={item.value}>{item.name}</option>
        ))}
      </Form.Control>
      {helperText && <Form.Text>{helperText}</Form.Text>}
      {errorText && (
        <Form.Control.Feedback type="invalid">
          {errorText}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormSelect;
