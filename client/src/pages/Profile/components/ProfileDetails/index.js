import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { Image, ListGroup, Badge } from 'react-bootstrap';
import FormButton from '../../../../components/FormButton';

const ProfileDetails = props => {
  const { profileDetails, userDetails } = props;

  return (
    <React.Fragment>
      <p className="text-center" style={{ position: 'relative' }}>
        <Image src={userDetails.avatar} thumbnail roundedCircle />
        <Badge pill bg="info" className="profile-status text-light">
          <i className="fa fa-info-circle fa-fw" />{' '}
          {profileDetails && profileDetails.status}
        </Badge>
      </p>
      <div className="mb-3 text-center">
        <p className="lead text-primary" style={{ marginBottom: -2 }}>
          <strong>
            {userDetails.firstname} {userDetails.lastname}
          </strong>
        </p>
        <Typography.Paragraph className="text-muted">
          {userDetails.email}
        </Typography.Paragraph>
      </div>
      <FormButton block={true} href="/edit-profile#profile-details">
        <i className="fa fa-edit fa-fw" /> Edit Profile
      </FormButton>
      <div className="mt-3 mb-4 text-center">
        <p className="lead text-primary" style={{ marginBottom: 5 }}>
          <strong>Bio</strong>
        </p>
        {profileDetails && profileDetails.bio ? (
          <Typography.Paragraph style={{ whiteSpace: 'pre-line' }}>
            {profileDetails.bio}
          </Typography.Paragraph>
        ) : (
          <Typography.Paragraph className="text-muted">
            Compose your bio on edit profile page.
          </Typography.Paragraph>
        )}
      </div>
      {profileDetails ? (
        <React.Fragment>
          <div className="mt-4 mb-4">
            <p className="lead text-primary text-center">
              <strong>About</strong>
            </p>
            <ListGroup variant="flush" style={{ marginTop: -16 }}>
              {profileDetails.company && (
                <ListGroup.Item as="li">
                  <i className="text-primary fa fa-building fa-fw" />{' '}
                  {profileDetails.company}
                </ListGroup.Item>
              )}
              {profileDetails.mobilenumber && (
                <ListGroup.Item as="li">
                  <i className="text-primary fa fa-mobile fa-fw" />{' '}
                  {profileDetails.mobilenumber}
                </ListGroup.Item>
              )}
              {profileDetails.phonenumber && (
                <ListGroup.Item as="li">
                  <i className="text-primary fa fa-phone fa-fw" />{' '}
                  {profileDetails.phonenumber}
                </ListGroup.Item>
              )}
              {profileDetails.location && (
                <ListGroup.Item as="li">
                  <i className="text-primary fa fa-map-pin fa-fw" />{' '}
                  {profileDetails.location}
                </ListGroup.Item>
              )}
            </ListGroup>
          </div>
          {profileDetails.social && (
            <div className="mt-3 mb-4">
              <p className="lead text-primary text-center">
                <strong>Social Media</strong>
              </p>
              <ListGroup variant="flush" style={{ marginTop: -16 }}>
                {profileDetails.website && (
                  <ListGroup.Item as="li">
                    <i className="text-primary fa fa-globe fa-fw" />{' '}
                    <Link
                      to={{ pathname: profileDetails.website }}
                      target="_blank"
                    >
                      {profileDetails.website}
                    </Link>
                  </ListGroup.Item>
                )}
                {profileDetails.social.facebook && (
                  <ListGroup.Item as="li">
                    <i className="text-primary fa-brands fa-facebook-square fa-fw" />{' '}
                    <Link
                      to={{
                        pathname: `https://facebook.com/${profileDetails.social.facebook}`,
                      }}
                      target="_blank"
                    >
                      https://facebook.com/{profileDetails.social.facebook}
                    </Link>
                  </ListGroup.Item>
                )}
                {profileDetails.social.twitter && (
                  <ListGroup.Item as="li">
                    <i className="text-primary fa-brands fa-twitter fa-fw" />{' '}
                    <Link
                      to={{
                        pathname: `https://twitter.com/${profileDetails.social.twitter}`,
                      }}
                      target="_blank"
                    >
                      https://twitter.com/{profileDetails.social.twitter}
                    </Link>
                  </ListGroup.Item>
                )}
                {profileDetails.social.youtube && (
                  <ListGroup.Item as="li">
                    <i className="text-primary fa-brands fa-youtube fa-fw" />{' '}
                    <Link
                      to={{
                        pathname: `https://youtube.com/${profileDetails.social.youtube}`,
                      }}
                      target="_blank"
                    >
                      https://youtube.com/{profileDetails.social.youtube}
                    </Link>
                  </ListGroup.Item>
                )}
                {profileDetails.social.linkedin && (
                  <ListGroup.Item as="li">
                    <i className="text-primary fa-brands fa-linkedin fa-fw" />{' '}
                    <Link
                      to={{
                        pathname: `https://linkedin.com/${profileDetails.social.linkedin}`,
                      }}
                      target="_blank"
                    >
                      https://linkedin.com/{profileDetails.social.linkedin}
                    </Link>
                  </ListGroup.Item>
                )}
                {profileDetails.social.githubusername && (
                  <ListGroup.Item as="li">
                    <i className="text-primary fa-brands fa-github fa-fw" />{' '}
                    <Link
                      to={{
                        pathname: `https://github.com/${profileDetails.social.githubusername}`,
                      }}
                      target="_blank"
                    >
                      https://github.com/
                      {profileDetails.social.githubusername}
                    </Link>
                  </ListGroup.Item>
                )}
              </ListGroup>
              {profileDetails.skills && (
                <div className="mt-3 mb-5">
                  <p className="lead text-primary text-center">
                    <strong>Skills</strong>
                  </p>
                  {profileDetails.skills.map(item => {
                    return (
                      <Badge
                        pill
                        variant="light"
                        className="ml-1 mr-1 mt-1 mb-1 text-light"
                      >
                        {item}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </React.Fragment>
      ) : (
        <div className="mt-3 mb-4">
          <p className="text-center text-muted">No data to display.</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProfileDetails;
