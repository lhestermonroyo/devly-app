import React from 'react';
import {
  Container,
  Button,
  Image,
  Badge,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

const ProfileHeader = (props) => {
  const { profileDetails, userDetails } = props;

  return (
    <Container className='profile-container'>
      <Dropdown className='profile-edit-btn' as={ButtonGroup}>
        <Button variant='outline-light' href='/edit-profile#profile-details'>
          Edit Profile
        </Button>
        <Dropdown.Toggle
          split
          variant='outline-light'
          id='dropdown-split-basic'
        />
        <Dropdown.Menu alignRight>
          <Dropdown.Item href='#/action-1'>Change Avatar</Dropdown.Item>
          <Dropdown.Item href='#/action-2'>Change Cover Picture</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <p className='text-center'>
        <Image src={profileDetails.user.avatar} thumbnail roundedCircle />
      </p>
      <h3 className='text-center text-light'>
        {userDetails.firstname} {userDetails.lastname}
      </h3>
      <div className='profile-subdetails'>
        <p className='text-inline text-light'>
          <i className='fa fa-map-marker fa-fw text-danger' />{' '}
          {profileDetails.location}
        </p>
        <p className='text-inline text-light'>
          <i className='fa fa-building fa-fw text-light' />{' '}
          {profileDetails.company}
        </p>
        <p className='text-inline text-light'>
          <i className='fa fa-globe fa-fw text-warning' />{' '}
          {profileDetails.website}
        </p>
        <p className='text-inline text-light'>
          <i className='fa fa-quote-left fa-fw text-muted' /> Feeling{' '}
          {profileDetails.status}
        </p>
      </div>
      <div className='profile-bio mt-5'>
        <p className='text-center text-light'>{profileDetails.bio}</p>
      </div>

      <div className='mt-5'>
        <h5 className='text-center text-light text-block'>Top Skills</h5>
        <div className='profile-skills text-center'>
          <h5>
            {profileDetails.skills.map((item) => {
              return (
                <Badge variant='light' className='ml-1 mr-1 mt-1 mb-1'>
                  {item}
                </Badge>
              );
            })}
          </h5>
        </div>
      </div>
    </Container>
  );
};

export default ProfileHeader;
