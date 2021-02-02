import React, { useState, useEffect } from 'react';
import Main from '../../components/Main';
import { Form, Button, Nav } from 'react-bootstrap';
import LoadingScreen from '../../components/LoadingScreen';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import EditProfileDetails from '../../components/EditProfileDetails';
import NewExperience from '../../components/NewExperience';
import NewEducation from '../../components/NewEducation';

const EditProfile = (props) => {
  const { history } = props;
  const { hash } = history.location;

  const [key, setKey] = useState(hash);

  const { profileDetails, loading } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  return loading ? (
    <LoadingScreen loadingMsg='Loading page, please wait...' />
  ) : (
    <Main>
      <React.Fragment>
        <h1>
          <Button
            className='mr-3'
            style={{ marginTop: -6 }}
            href='profile'
            variant='outline-primary'
          >
            <i className='fa fa-chevron-left fa-fw' /> Back
          </Button>
          Edit Profile
        </h1>
        <Nav
          className='profile-details-nav mt-5'
          activeKey={key}
          onSelect={(key) => setKey(key)}
        >
          <Nav.Item>
            <Nav.Link
              className={
                key === '#profile-details'
                  ? 'nav-active text-primary'
                  : 'text-muted'
              }
              eventKey='#profile-details'
            >
              Profile Details
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={
                key === '#experience' ? 'nav-active text-primary' : 'text-muted'
              }
              eventKey='#experience'
            >
              Experience
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={
                key === '#education' ? 'nav-active text-primary' : 'text-muted'
              }
              eventKey='#education'
            >
              Education
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {key === '#profile-details' && (
          <EditProfileDetails profileDetails={profileDetails} />
        )}
        {key === '#experience' && <NewExperience />}
        {key === '#education' && <NewEducation />}
      </React.Fragment>
    </Main>
  );
};

export default EditProfile;
