import React, { useEffect } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProfileByUserId } from '../../actions/profileAction';

const AboutTheAuthor = (props) => {
  const { user } = props;
  const { _id, firstname, lastname, avatar } = user;

  const { profileDetails } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileByUserId(_id));
  }, []);

  return (
    <React.Fragment>
      <h1 className='mt-5 mb-3'>About the Author</h1>
      {profileDetails && (
        <Row>
          <Col xs={3} md={3}>
            <p className='text-center'>
              <Image src={avatar} roundedCircle thumbnail />
            </p>
          </Col>
          <Col xs={9} md={9}>
            <h3 className='mt-2'>
              {firstname} {lastname}
            </h3>
            <div className='post-profile-subdetails'>
              <p className='text-inline'>
                <i className='fa fa-map-marker fa-fw text-danger' />{' '}
                {profileDetails.location}
              </p>
              <p className='text-inline'>
                <i className='fa fa-building fa-fw' /> {profileDetails.company}
              </p>
              <p className='text-inline'>
                <i className='fa fa-globe fa-fw text-warning' />{' '}
                {profileDetails.website}
              </p>
              <p className='text-inline'>
                <i className='fa fa-quote-left fa-fw text-muted' /> Feeling{' '}
                {profileDetails.status}
              </p>
            </div>
            <div className='mb-3'>
              <p>{profileDetails.bio}</p>
            </div>
            <Button variant='primary' className='mr-2'>
              View Profile
            </Button>
            <Button variant='outline-primary'>Posts</Button>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

export default AboutTheAuthor;
