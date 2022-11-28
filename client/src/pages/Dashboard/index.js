import React, { useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import Main from '../../components/Main';
import Posts from './components/Posts';
import LoadingScreen from '../../components/LoadingScreen';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import { getAllPosts } from '../../actions/postAction';
import {
  getCurrentPage,
  loadingPageEnd,
  loadingPageStart,
} from '../../actions/uiStateAction';
import { Typography } from 'antd';

const Dashboard = props => {
  const { loadingPage } = useSelector(state => state.uiState);
  const { profileDetails } = useSelector(state => state.profile);
  const { posts } = useSelector(state => state.post);
  const { userDetails } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentPage('Dashboard'));
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    dispatch(loadingPageStart());
    await dispatch(getCurrentProfile());
    await dispatch(getAllPosts());
    dispatch(loadingPageEnd());
  };

  if (loadingPage) {
    return <LoadingScreen loadingMsg="Loading dashboard, please wait..." />;
  }

  return (
    <Main>
      {/* {!profileDetails && (
        <Card>
          <Card.Body>
            <p className="lead">
              Welcome,{' '}
              {userDetails &&
                `${userDetails.firstname} ${userDetails.lastname}`}
            </p>
            <p>
              Looks like that you didn't setup your profile yet. Complete your
              profile to post contents.
            </p>
            <Button href="/edit-profile#profile-details">Edit Profile</Button>
          </Card.Body>
        </Card>
      )} */}
      <Row className="mt-5">
        <Col xs={8} md={8}>
          <Posts posts={posts} />
        </Col>
        <Col xs={4} md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Typography.Title level={4} className="lead">
                Hey {userDetails && `${userDetails.firstname}`}, do you have
                something to share?
              </Typography.Title>
              <Button className="btn-block mt-4" href="/create-post">
                <i className="fas fa-plus fa-fw" /> Write a post
              </Button>
            </Card.Body>
          </Card>
          <Typography.Title level={2}>Who to follow</Typography.Title>
        </Col>
      </Row>
    </Main>
  );
};

export default Dashboard;
