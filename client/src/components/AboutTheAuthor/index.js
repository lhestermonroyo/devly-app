import React, { useEffect } from 'react';
import { Row, Col, Image, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileByUserId } from '../../actions/profileAction';

const AboutTheAuthor = props => {
  const { user } = props;
  const { _id, firstname, lastname, avatar } = user;

  const { profileDetails } = useSelector(state => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileByUserId(_id));
  }, []);

  return (
    <React.Fragment>
      <h3 className="mt-5 mb-3">About the Author</h3>
      {profileDetails && (
        <Card>
          <Card.Body>
            <Row>
              <Col xs={2} md={2}>
                <p className="text-center">
                  <Image src={avatar} roundedCircle thumbnail />
                </p>
              </Col>
              <Col xs={10} md={10}>
                <h3 className="mt-2">
                  {firstname} {lastname}
                </h3>
                <div className="mb-3">
                  <p style={{ whiteSpace: 'pre-line' }}>{profileDetails.bio}</p>
                </div>
                <Button variant="primary" className="mr-2">
                  Follow
                </Button>
                <Button variant="outline-primary">View Profile</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </React.Fragment>
  );
};

export default AboutTheAuthor;
