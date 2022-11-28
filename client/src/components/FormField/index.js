import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const FormField = props => {
  const {
    handleChange,
    label,
    type,
    name,
    placeholder,
    value,
    defaultValue,
    prependText,
    appendText,
    helperText,
    errorText,
    as,
    rows,
    ref,
    required = false,
    disabled = false,
    readOnly = false,
  } = props;

  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      {prependText || appendText ? (
        <InputGroup>
          {prependText && <InputGroup.Text>{prependText}</InputGroup.Text>}
          <Form.Control
            type={type}
            as={as}
            rows={as && rows}
            name={name}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            ref={ref}
            onChange={handleChange}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
          />
          {appendText && <InputGroup.Text>{appendText}</InputGroup.Text>}
        </InputGroup>
      ) : (
        <Form.Control
          type={type}
          as={as}
          rows={as && rows}
          name={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          ref={ref}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
        />
      )}
      {helperText && <Form.Text className="text-muted">{helperText}</Form.Text>}
      {errorText && (
        <Form.Control.Feedback type="invalid">
          {errorText}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormField;
