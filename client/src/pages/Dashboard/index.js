import React, { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import Main from '../../components/Main';
import LoadingScreen from '../../components/LoadingScreen';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import { getAllPosts } from '../../actions/postAction';
import Posts from '../../components/Posts';

const Dashboard = () => {
  const { profileDetails, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { posts, loading: postLoading } = useSelector((state) => state.post);
  const { userDetails } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
    dispatch(getAllPosts());
  }, []);

  console.log(posts);

  return profileLoading || postLoading ? (
    <LoadingScreen loadingMsg='Loading, please wait...' />
  ) : (
    <Main>
      <h1>Dashboard</h1>
      {!profileDetails ? (
        <Card>
          <Card.Body>
            <p className='lead'>
              Welcome,{' '}
              {userDetails &&
                `${userDetails.firstname} ${userDetails.lastname}`}
            </p>
            <p>
              Looks like that you didn't setup your profile yet. Edit your
              profile to get recognized.
            </p>
            <Button href='/edit-profile'>Edit Profile</Button>
          </Card.Body>
        </Card>
      ) : (
        <Button
          title='Write a Post'
          className='float-right write-post-btn'
          variant='outline-primary'
          href='/create-post'
        >
          <i className='fa fa-pencil fa-fw' />
        </Button>
      )}
      {posts && <Posts posts={posts} userDetails={userDetails} />}
    </Main>
  );
};

export default Dashboard;
