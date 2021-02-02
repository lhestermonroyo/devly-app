import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
// Redux
import { useDispatch } from 'react-redux';
import { addExperience } from '../../actions/profileAction';
import AlertDismissable from '../Alert';

const NewExperience = () => {
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

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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

  return (
    <React.Fragment>
      <h3 className='mb-3 mt-5'>New Experience</h3>
      <AlertDismissable />
      <Form className='mb-4' onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            name='title'
            type='text'
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Company</Form.Label>
          <Form.Control
            name='company'
            type='text'
            value={company}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            name='location'
            type='text'
            value={location}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Job Type</Form.Label>
          <Form.Control
            as='select'
            name='type'
            value={type}
            onChange={handleChange}
          >
            <option selected='selected'>-</option>
            <option value='Full-time'>Full-time</option>
            <option value='Part-time'>Part-time</option>
            <option value='Self Employed'>Self Employed</option>
            <option value='Freelance'>Freelance</option>
            <option value='Contractual'>Contractual</option>
            <option value='Seasonal'>Seasonal</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>From</Form.Label>
          <Form.Control
            name='from'
            type='date'
            value={from}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type='checkbox'
            defaultChecked={current}
            name='current'
            label='Current'
            onChange={() => setCurrent(!current)}
          />
        </Form.Group>
        {!current && (
          <Form.Group>
            <Form.Label>To</Form.Label>
            <Form.Control
              name='to'
              type='date'
              value={to}
              onChange={handleChange}
            />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name='description'
            as='textarea'
            value={description}
            onChange={handleChange}
          />
        </Form.Group>
        <Button size='lg' variant='primary' type='submit'>
          Add Experience
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default NewExperience;
