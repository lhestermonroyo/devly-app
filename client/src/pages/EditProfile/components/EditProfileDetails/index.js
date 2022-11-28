import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import FormField from '../../../../components/FormField';
// Redux
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../../actions/profileAction';
import FormButton from '../../../../components/FormButton';

const EditProfileDetails = props => {
  const { profileDetails, loadingForm } = props;
  const [values, setValues] = useState({
    company: '',
    bio: '',
    status: '',
    website: '',
    mobilenumber: '',
    phonenumber: '',
    location: '',
    skills: '',
    facebook: '',
    linkedin: '',
    twitter: '',
    youtube: '',
    githubusername: '',
  });

  const {
    company,
    bio,
    status,
    mobilenumber,
    phonenumber,
    location,
    skills,
    website,
    facebook,
    linkedin,
    twitter,
    youtube,
    githubusername,
  } = values;

  const dispatch = useDispatch();

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setValues({
      bio: !profileDetails ? '' : profileDetails.bio,
      status: !profileDetails ? '' : profileDetails.status,
      skills: !profileDetails ? '' : profileDetails.skills.join(', '),
      company: !profileDetails ? '' : profileDetails.company,
      mobilenumber: !profileDetails ? '' : profileDetails.mobilenumber,
      phonenumber: !profileDetails ? '' : profileDetails.phonenumber,
      location: !profileDetails ? '' : profileDetails.location,
      website: !profileDetails ? '' : profileDetails.website,
      facebook: !profileDetails ? '' : profileDetails.social.facebook,
      linkedin: !profileDetails ? '' : profileDetails.social.linkedin,
      twitter: !profileDetails ? '' : profileDetails.social.twitter,
      youtube: !profileDetails ? '' : profileDetails.social.youtube,
      githubusername: !profileDetails
        ? ''
        : profileDetails.social.githubusername,
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(updateProfile(values));
  };

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <div className="mt-4 mb-4">
        <FormField
          label="Bio"
          as="textarea"
          rows="3"
          placeholder="Compose your bio"
          name="bio"
          handleChange={handleChange}
          value={bio}
        />
        <FormField
          label="Status"
          type="text"
          placeholder="Enter status"
          name="status"
          handleChange={handleChange}
          value={status}
        />
        <FormField
          label="Skills"
          type="text"
          placeholder="Enter skills"
          name="skills"
          handleChange={handleChange}
          value={skills}
          helperText="Seperate by comma (e. Web Development, UI/UX)"
          required
        />
      </div>
      <hr />
      <div className="mt-4 mb-5">
        <FormField
          label="Company"
          type="text"
          placeholder="Enter company"
          name="company"
          handleChange={handleChange}
          value={company}
        />
        <FormField
          label="Mobile Number"
          type="text"
          placeholder="Enter mobile number"
          name="mobilenumber"
          handleChange={handleChange}
          value={mobilenumber}
        />
        <FormField
          label="Phone Number"
          type="text"
          placeholder="Enter phone number"
          name="phonenumber"
          handleChange={handleChange}
          value={phonenumber}
        />
        <FormField
          label="Location"
          type="text"
          placeholder="Enter location"
          name="location"
          handleChange={handleChange}
          value={location}
        />
      </div>
      <hr />
      <div className="mt-4 mb-4">
        <FormField
          label="Website"
          type="text"
          placeholder="Enter website"
          name="website"
          handleChange={handleChange}
          value={website}
        />
        <FormField
          label="Facebook"
          prependText="https://facebook.com/"
          type="text"
          placeholder="Enter facebook"
          name="facebook"
          handleChange={handleChange}
          value={facebook}
        />
        <FormField
          label="Twitter"
          prependText="https://twitter.com/"
          type="text"
          placeholder="Enter twitter"
          name="twitter"
          handleChange={handleChange}
          value={twitter}
        />
        <FormField
          label="Youtube"
          prependText="https://youtube.com/"
          type="text"
          placeholder="Enter youtube"
          name="youtube"
          handleChange={handleChange}
          value={youtube}
        />
        <FormField
          label="LinkedIn"
          prependText="https://linkedin.com/"
          s
          type="text"
          placeholder="Enter linkedin"
          name="linkedin"
          handleChange={handleChange}
          value={linkedin}
        />
        <FormField
          label="Github"
          prependText="https://github.com/"
          type="text"
          placeholder="Enter github"
          name="githubusername"
          handleChange={handleChange}
          value={githubusername}
        />
      </div>
      <FormButton loading={loadingForm} type="submit">
        Save Changes
      </FormButton>
    </Form>
  );
};

export default EditProfileDetails;
