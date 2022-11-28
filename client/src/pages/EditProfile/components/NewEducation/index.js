import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
// Redux
import { useDispatch } from 'react-redux';
import { addEducation } from '../../../../actions/profileAction';
import FormButton from '../../../../components/FormButton';
import FormField from '../../../../components/FormField';
import FormSelect from '../../../../components/FormSelect';

const NewEducation = props => {
  const { loadingForm } = props;
  const [values, setValues] = useState({
    fieldofstudy: '',
    school: '',
    degree: '',
    from: '',
    to: '',
    description: '',
  });
  const [current, setCurrent] = useState(false);

  const { fieldofstudy, school, degree, from, to, description } = values;

  const dispatch = useDispatch();

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const educationData = {
      fieldofstudy,
      school,
      degree,
      from,
      current,
      description,
    };

    if (!current) {
      educationData.to = to;
    }

    dispatch(addEducation(educationData));
  };

  return (
    <Form className="mt-4 mb-4" onSubmit={e => handleSubmit(e)}>
      <FormField
        type="text"
        label="Field of Study"
        placeholder="Enter field of study"
        name="fieldofstudy"
        value={fieldofstudy}
        handleChange={handleChange}
        required={true}
      />
      <FormField
        type="text"
        label="School"
        placeholder="Enter school"
        name="school"
        value={school}
        handleChange={handleChange}
        required={true}
      />
      <FormSelect
        label="Degree"
        placeholder="Select degree"
        name="degree"
        value={degree}
        handleChange={handleChange}
        options={[
          { value: 'Doctoral', name: 'Doctoral' },
          { value: 'Professional degree', name: 'Professional degree' },
          { value: `Bachelor's degree`, name: `Bachelor's degree` },
          { value: `Master's degree`, name: `Master's degree` },
          { value: 'Contractual', name: 'Contractual' },
          { value: 'Seasonal', name: 'Seasonal' },
        ]}
      />
      <FormField
        type="date"
        label="From"
        placeholder="Enter from date"
        name="from"
        value={from}
        handleChange={handleChange}
        required={true}
      />
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          defaultChecked={current}
          name="current"
          label="Current"
          onChange={() => setCurrent(!current)}
        />
      </Form.Group>
      {!current && (
        <FormField
          type="date"
          label="To"
          placeholder="Enter to date"
          name="to"
          value={to}
          handleChange={handleChange}
        />
      )}
      <FormField
        label="Description"
        as="textarea"
        rows="3"
        placeholder="Enter description"
        name="description"
        value={description}
        handleChange={handleChange}
        required={true}
      />
      <FormButton loading={loadingForm} variant="primary" type="submit">
        Add Education
      </FormButton>
    </Form>
  );
};

export default NewEducation;
