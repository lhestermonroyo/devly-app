import React, { useEffect } from 'react';
import Main from '../../components/Main';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import LoadingScreen from '../../components/LoadingScreen';
import { Button } from 'react-bootstrap';

const Dashboard = () => {
  const { profileDetails, loading } = useSelector((state) => state.profile);
  const { userDetails } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);


  return loading ? (
    <LoadingScreen loadingMsg='Fetching data...' />
  ) : (
    <Main>
      <h1>Dashboard Page</h1>
      <p className='lead'>
        Welcome,{' '}
        {userDetails && `${userDetails.firstname} ${userDetails.lastname}`}
      </p>

      {!profileDetails && (
        <React.Fragment>
          <p>
            Looks like that you didn't setup your profile yet. Edit your profile
            to get recognized.
          </p>
          <Button href='/edit-profile'>Edit Profile</Button>
        </React.Fragment>
      )}
    </Main>
  );
};

export default Dashboard;
