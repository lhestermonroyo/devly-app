import React, { useEffect } from 'react';
import LoadingScreen from '../../components/LoadingScreen';
import ProfileDetails from '../../components/ProfileDetails';
import ProfileHeader from '../../components/ProfileHeader';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';

const Profile = () => {
  const { profileDetails, loading } = useSelector((state) => state.profile);
  const { userDetails } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  return loading ? (
    <LoadingScreen loadingMsg='Loading, please wait...' />
  ) : (
    <React.Fragment>
      {profileDetails && userDetails && (
        <React.Fragment>
          <div className='profile-bg'>
            <ProfileHeader
              profileDetails={profileDetails}
              userDetails={userDetails}
            />
          </div>
          <ProfileDetails
            profileDetails={profileDetails}
            userDetails={userDetails}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Profile;
