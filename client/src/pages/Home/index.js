import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage } from '../../actions/uiStateAction';

const Home = props => {
  const { history } = props;

  const { isAuthenticated } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentPage('Home'));
  }, []);

  if (isAuthenticated) {
    history.push('/dashboard');
  }

  return (
    <div className="hero-bg">
      <div className="hero-content">
        <h1 className="display-3 text-center">
          Hey Dude <i className="twa twa-heart"></i>
        </h1>
        <p className="lead text-center">
          Devly is a social media made for developers, career-shifters who
          wanted to be a developer and people who looks for a developer. Get
          started, share ideas and get along with other developers here.
        </p>
        <div className="hero-btn-group mt-5">
          <Button size="lg" variant="outline-light" href="/sign-in">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
