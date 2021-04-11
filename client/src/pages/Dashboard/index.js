import React, { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import Main from '../../components/Main';
import Posts from '../../components/Posts';
import LoadingScreen from '../../components/LoadingScreen';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import { getCurrentPage } from '../../actions/uiStateAction';

const Dashboard = (props) => {
  const { history } = props;
  const { profileDetails, loading } = useSelector((state) => state.profile);
  const { userDetails } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentPage('Dashboard'));
    dispatch(getCurrentProfile());
  }, []);

  if (loading) {
    return <LoadingScreen loadingMsg='Loading, please wait...' />;
  }

  return (
    <Main>
      {!profileDetails && (
        <Card>
          <Card.Body>
            <p className='lead'>
              Welcome,{' '}
              {userDetails &&
                `${userDetails.firstname} ${userDetails.lastname}`}
            </p>
            <p>
              Looks like that you didn't setup your profile yet. Complete your
              profile to post contents.
            </p>
            <Button href='/edit-profile#profile-details'>Edit Profile</Button>
          </Card.Body>
        </Card>
      )}
      <Posts history={history} />
    </Main>
  );
};

export default Dashboard;
