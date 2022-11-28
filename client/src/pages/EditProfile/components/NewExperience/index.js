import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
// Redux
import { useDispatch } from 'react-redux';
import { addExperience } from '../../../../actions/profileAction';
import FormButton from '../../../../components/FormButton';
import FormField from '../../../../components/FormField';
import FormSelect from '../../../../components/FormSelect';

const NewExperience = props => {
  const { loadingForm } = props;
  const [values, setValues] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    from: '',
    to: '',
    description: '',
  });
  const [current, setCurrent] = useState(false);

  const { title, company, location, type, from, to, description } = values;

  const dispatch = useDispatch();

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const experienceData = {
      title,
      company,
      location,
      type,
      from,
      current,
      description,
    };

    if (!current) {
      experienceData.to = to;
    }

    dispatch(addExperience(experienceData));
  };

  console.log(values);

  return (
    <Form className="mt-4 mb-4" onSubmit={e => handleSubmit(e)}>
      <FormField
        type="text"
        label="Job Title"
        placeholder="Enter job title"
        name="title"
        value={title}
        handleChange={handleChange}
        required={true}
      />
      <FormField
        type="text"
        label="Company"
        placeholder="Enter company"
        name="company"
        value={company}
        handleChange={handleChange}
        required={true}
      />
      <FormField
        type="text"
        label="Location"
        placeholder="Enter location"
        name="location"
        value={location}
        handleChange={handleChange}
        required={true}
      />
      <FormSelect
        label="Job Type"
        placeholder="Select job type"
        name="type"
        value={type}
        handleChange={handleChange}
        options={[
          { value: 'Full-time', name: 'Full-time' },
          { value: 'Part-time', name: 'Part-time' },
          { value: 'Self-employed', name: 'Self-employed' },
          { value: 'Freelance', name: 'Freelance' },
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
      <FormButton loading={loadingForm} type="submit">
        Add Experience
      </FormButton>
    </Form>
  );
};

export default NewExperience;
