import React from 'react';
import { Button } from 'react-bootstrap';
// Redux
import { useSelector } from 'react-redux';

const Home = (props) => {
  const { history } = props;

  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    history.push('/dashboard');
  }

  return (
    <div className='hero-bg'>
      <div className='hero-content'>
        <h1 className='display-2 text-center'>Welcome Home</h1>
        <p className='lead text-center'>
          DEVLY's purpose is to consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </p>
        <div className='hero-btn-group mt-5'>
          <Button className='mr-2' variant='outline-light' href='/sign-up'>
            Get Started
          </Button>
          <Button className='ml-2' variant='outline-light' href='/developers'>
            Check our Developers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
