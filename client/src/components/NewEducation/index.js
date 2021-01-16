import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
// Redux
import { useDispatch } from 'react-redux';
import { addEducation } from '../../actions/profileAction';
import AlertDismissable from '../Alert';

const NewEducation = () => {
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

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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
    <React.Fragment>
      <h1 className='mb-5 mt-5'>New Education</h1>
      <AlertDismissable />
      <Form className='mb-4' onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Field of Study</Form.Label>
          <Form.Control
            name='fieldofstudy'
            type='text'
            value={fieldofstudy}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>School</Form.Label>
          <Form.Control
            name='school'
            type='text'
            value={school}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Degree</Form.Label>
          <Form.Control
            as='select'
            name='degree'
            value={degree}
            onChange={handleChange}
          >
            <option selected='selected'>-</option>
            <option value='Doctoral degree'>Doctoral degree</option>
            <option value='Professional degree'>Professional degree</option>
            <option value="Master's degree">Master's degree</option>
            <option value="Bachelor's degree">Bachelor's degree</option>
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
        <Button variant='primary' type='submit'>
          Add Education
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default NewEducation;
