import React, { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardGroup,
  Container,
  ListGroup,
  Nav,
} from 'react-bootstrap';
import Moment from 'react-moment';

const ProfileDetails = (props) => {
  const [key, setKey] = useState('#experience');

  const { profileDetails, userDetails } = props;
  const { experience, education, social } = profileDetails;

  return (
    <Container className='mt-2 mb-5'>
      <Nav
        className='justify-content-center profile-details-nav'
        activeKey={key}
        onSelect={(key) => setKey(key)}
      >
        <Nav.Item>
          <Nav.Link
            className={
              key === '#experience' ? 'nav-active text-primary' : 'text-muted'
            }
            eventKey='#experience'
          >
            Work Experience
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={
              key === '#education' ? 'nav-active text-primary' : 'text-muted'
            }
            eventKey='#education'
          >
            Education
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={
              key === '#socials' ? 'nav-active text-primary' : 'text-muted'
            }
            eventKey='#socials'
          >
            Socials and Contact Infos
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className='mt-5'>
        {key === '#experience' && (
          <React.Fragment>
            <Button
              title='Add Experience'
              className='float-right'
              variant='outline-primary'
              href='/edit-profile#experience'
            >
              <i className='fa fa-plus fa-fw' />
            </Button>
            <h1>Work Experience</h1>
            <ListGroup className='mt-5'>
              {experience.map((item) => {
                return (
                  <Card key={item.id} className='mb-2'>
                    <Card.Body>
                      <div className='float-right'>
                        <h5 className='text-right'>
                          <Badge pill variant='primary' style={{ padding: 12 }}>
                            {item.type}
                          </Badge>
                        </h5>
                        <p className='text-muted'>
                          <i className='fa fa-calendar fa-fw' />
                          <Moment format='MM/DD/YY'>{item.from}</Moment> -{' '}
                          {item.current && 'Current'}
                          {item.to && (
                            <Moment format='MM/DD/YY'>{item.to}</Moment>
                          )}
                        </p>
                      </div>
                      <h3 className='mt-2'>{item.title}</h3>
                      <div className='profile-details-subdetails'>
                        <p className='text-inline text-muted'>
                          <i className='fa fa-building fa-fw' /> {item.company}
                        </p>
                        <p className='text-inline text-muted'>
                          <i className='fa fa-map-marker fa-fw' />{' '}
                          {item.location}
                        </p>
                      </div>
                      <p className='mt-2'>{item.description}</p>
                    </Card.Body>
                  </Card>
                );
              })}
            </ListGroup>
          </React.Fragment>
        )}
        {key === '#education' && (
          <React.Fragment>
            <Button
              title='Add Education'
              className='float-right'
              variant='outline-primary'
              href='/edit-profile#education'
            >
              <i className='fa fa-plus fa-fw' />
            </Button>
            <h1>Education</h1>
            <ListGroup className='mt-5'>
              {education.map((item) => {
                return (
                  <Card key={item.id} className='mb-2'>
                    <Card.Body>
                      <h3 className='mt-2'>{item.fieldofstudy}</h3>
                      <div className='profile-details-subdetails'>
                        <p className='text-inline text-muted'>
                          <i className='fa fa-building fa-fw' /> {item.school}
                        </p>
                        <p className='text-inline text-muted'>
                          <i className='fa fa-graduation-cap fa-fw' />{' '}
                          {item.degree}
                        </p>
                        <p className='text-muted'>
                          <i className='fa fa-calendar fa-fw' />{' '}
                          <Moment format='MM/DD/YY'>{item.from}</Moment> -{' '}
                          {item.current && 'Current'}
                          {item.to && (
                            <Moment format='MM/DD/YY'>{item.to}</Moment>
                          )}
                        </p>
                      </div>
                      <p className='mt-2'>{item.description}</p>
                    </Card.Body>
                  </Card>
                );
              })}
            </ListGroup>
          </React.Fragment>
        )}
        {key === '#socials' && (
          <React.Fragment>
            <h1>Socials and Contact Infos</h1>
            <ListGroup className='mt-3'>
              {userDetails.email && (
                <ListGroup.Item>
                  <Button
                    className='float-right'
                    href={`mailto:${userDetails.email}`}
                  >
                    <i className='fa fa-external-link fa-fw' />
                  </Button>
                  <div className='profile-details-socials mt-2'>
                    <p className='text-inline mr-4'>
                      <i className='fa fa-envelope-square fa-fw fa-2x' />
                    </p>
                    <p className='text-inline'>{userDetails.email}</p>
                  </div>
                </ListGroup.Item>
              )}
              {social.facebook && (
                <ListGroup.Item>
                  <Button className='float-right' href={social.facebook}>
                    <i className='fa fa-external-link fa-fw' />
                  </Button>
                  <div className='profile-details-socials mt-2'>
                    <p className='text-inline mr-4'>
                      <i className='fa fa-facebook-square fa-fw fa-2x' />
                    </p>
                    <p className='text-inline'>{social.facebook}</p>
                  </div>
                </ListGroup.Item>
              )}
              {social.linkedin && (
                <ListGroup.Item>
                  <Button className='float-right' href={social.linkedin}>
                    <i className='fa fa-external-link fa-fw' />
                  </Button>
                  <div className='profile-details-socials mt-2'>
                    <p className='text-inline mr-4'>
                      <i className='fa fa-linkedin-square fa-fw fa-2x' />
                    </p>
                    <p className='text-inline'>{social.linkedin}</p>
                  </div>
                </ListGroup.Item>
              )}
              {social.twitter && (
                <ListGroup.Item>
                  <Button className='float-right' href={social.twitter}>
                    <i className='fa fa-external-link fa-fw' />
                  </Button>
                  <div className='profile-details-socials mt-2'>
                    <p className='text-inline mr-4'>
                      <i className='fa fa-twitter-square fa-fw fa-2x' />
                    </p>
                    <p className='text-inline'>{social.twitter}</p>
                  </div>
                </ListGroup.Item>
              )}
              {social.youtube && (
                <ListGroup.Item>
                  <Button className='float-right' href={social.youtube}>
                    <i className='fa fa-external-link fa-fw' />
                  </Button>
                  <div className='profile-details-socials mt-2'>
                    <p className='text-inline mr-4'>
                      <i className='fa fa-youtube-square fa-fw fa-2x' />
                    </p>
                    <p className='text-inline'>{social.youtube}</p>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </React.Fragment>
        )}
      </div>
    </Container>
  );
};

export default ProfileDetails;
