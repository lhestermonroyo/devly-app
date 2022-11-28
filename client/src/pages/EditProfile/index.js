import React, { useState, useEffect } from 'react';
import Main from '../../components/Main';
import { Button, Nav } from 'react-bootstrap';
import LoadingScreen from '../../components/LoadingScreen';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import EditProfileDetails from './components/EditProfileDetails';
import NewExperience from './components/NewExperience';
import NewEducation from './components/NewEducation';

const EditProfile = props => {
  const { history } = props;
  const { hash } = history.location;

  const [key, setKey] = useState(hash);

  const { profileDetails, loading, loadingForm } = useSelector(
    state => state.profile
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  if (loading) {
    return <LoadingScreen loadingMsg="Loading page, please wait..." />;
  }

  console.log(profileDetails);

  return (
    <Main>
      <React.Fragment>
        <h1 className="display-4">
          <Button
            size="sm"
            style={{ marginTop: -6 }}
            href="/profile"
            variant="link"
          >
            <i className="fa fa-chevron-left fa-fw" />
          </Button>
          Edit Profile
        </h1>
        <Nav
          fill={true}
          className="profile-details-nav mt-3"
          defaultActiveKey={key}
          onSelect={key => setKey(key)}
        >
          <Nav.Item>
            <Nav.Link
              className={
                key === '#profile-details'
                  ? 'nav-active text-primary'
                  : 'text-muted'
              }
              eventKey="#profile-details"
            >
              Profile Details
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={
                key === '#profile-picture'
                  ? 'nav-active text-primary'
                  : 'text-muted'
              }
              eventKey="#profile-picture"
            >
              Profile Picture
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={
                key === '#experience' ? 'nav-active text-primary' : 'text-muted'
              }
              eventKey="#experience"
            >
              Add Experience
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={
                key === '#education' ? 'nav-active text-primary' : 'text-muted'
              }
              eventKey="#education"
            >
              Add Education
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {key === '#profile-details' && (
          <EditProfileDetails
            profileDetails={profileDetails}
            loadingForm={loadingForm}
          />
        )}
        {key === '#experience' && <NewExperience loadingForm={loadingForm} />}
        {key === '#education' && <NewEducation loadingForm={loadingForm} />}
      </React.Fragment>
    </Main>
  );
};

export default EditProfile;
