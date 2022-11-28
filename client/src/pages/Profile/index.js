import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import LoadingScreen from '../../components/LoadingScreen';
import ProfileDetails from './components/ProfileDetails';
import Main from '../../components/Main';
import ProfileExperience from './components/ProfileExperience';
import ProfileEducation from './components/ProfileEducation';
import ProfileStats from './components/ProfileStats';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import { loadingPageEnd, loadingPageStart } from '../../actions/uiStateAction';

const Profile = () => {
  const { loadingPage } = useSelector(state => state.uiState);
  const { profileDetails } = useSelector(state => state.profile);
  const { userDetails } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    dispatch(loadingPageStart());
    await dispatch(getCurrentProfile());
    dispatch(loadingPageEnd());
  };

  if (loadingPage) {
    return <LoadingScreen loadingMsg="Loading profile, please wait..." />;
  }

  return (
    <Main>
      <Row>
        <Col xs={12} md={4}>
          <ProfileDetails
            profileDetails={profileDetails}
            userDetails={userDetails}
          />
        </Col>
        <Col xs={12} md={8}>
          <ProfileStats />
          <ProfileExperience
            experience={profileDetails && profileDetails.experience}
          />
          <ProfileEducation
            education={profileDetails && profileDetails.education}
          />
        </Col>
      </Row>
    </Main>
  );
};

export default Profile;
