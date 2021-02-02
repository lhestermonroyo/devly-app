import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
// Redux
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../actions/profileAction';
import AlertDismissable from '../Alert';

const EditProfileDetails = (props) => {
  const { profileDetails } = props;
  const [values, setValues] = useState({
    location: '',
    website: '',
    company: '',
    status: '',
    bio: '',
    skills: '',
    githubusername: '',
    facebook: '',
    linkedin: '',
    twitter: '',
    youtube: '',
  });

  const {
    location,
    website,
    company,
    status,
    bio,
    skills,
    githubusername,
    facebook,
    linkedin,
    twitter,
    youtube,
  } = values;

  const dispatch = useDispatch();

  useEffect(() => {
    setValues({
      location: !profileDetails ? '' : profileDetails.location,
      company: !profileDetails ? '' : profileDetails.company,
      website: !profileDetails ? '' : profileDetails.website,
      status: !profileDetails ? '' : profileDetails.status,
      bio: !profileDetails ? '' : profileDetails.bio,
      skills: !profileDetails ? '' : profileDetails.skills.join(', '),
      githubusername: !profileDetails ? '' : profileDetails.githubusername,
      facebook: !profileDetails ? '' : profileDetails.social.facebook,
      linkedin: !profileDetails ? '' : profileDetails.social.linkedin,
      twitter: !profileDetails ? '' : profileDetails.social.twitter,
      youtube: !profileDetails ? '' : profileDetails.social.youtube,
    });
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(values);

    dispatch(updateProfile(values));
  };

  return (
    <React.Fragment>
      <h3 className='mb-3 mt-5'>Edit Main Details</h3>
      <AlertDismissable />
      <Form className='mb-4' onSubmit={(e) => handleSubmit(e)}>
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
          <Form.Label>Company</Form.Label>
          <Form.Control
            name='company'
            type='text'
            value={company}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Website</Form.Label>
          <Form.Control
            name='website'
            type='text'
            value={website}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Control
            name='status'
            type='text'
            value={status}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            name='bio'
            as='textarea'
            value={bio}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Skills</Form.Label>
          <Form.Control
            name='skills'
            type='text'
            value={skills}
            onChange={handleChange}
            // required={true}
          />
        </Form.Group>
        <h3 className='mt-3 mb-4'>Socials</h3>
        <Form.Group>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>https://github.com/</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              placeholder='Enter Github username'
              name='githubusername'
              type='text'
              value={githubusername}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i className='fab fa-facebook fa-fw' />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              placeholder='Enter Facebook account url'
              name='facebook'
              type='text'
              value={facebook}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i className='fab fa-linkedin fa-fw' />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              placeholder='Enter LinkedIn account url'
              name='linkedin'
              type='text'
              value={linkedin}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i className='fab fa-twitter fa-fw' />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              placeholder='Enter Twitter account url'
              name='twitter'
              type='text'
              value={twitter}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i className='fab fa-youtube fa-fw' />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              placeholder='Enter Youtube account url'
              name='youtube'
              type='text'
              value={youtube}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
        <Button size='lg' variant='primary' type='submit'>
          Save Changes
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default EditProfileDetails;
