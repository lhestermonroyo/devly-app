import React from 'react';
import Moment from 'react-moment';
import { Button, Card } from 'react-bootstrap';
import { Timeline, Typography, Popconfirm } from 'antd';

const ProfileExperience = props => {
  const { experience } = props;

  const confirmDelete = () => {
    
  };

  return (
    <Card body className="mb-3">
      <Button className="float-right" href="/edit-profile#experience">
        <i className="fa fa-plus fa-fw" /> Add Experience
      </Button>
      <p className="lead text-primary" style={{ marginBottom: -2 }}>
        <strong>Work Experience</strong>
      </p>
      {experience && Array.isArray(experience) ? (
        <div className="mt-5">
          <Timeline>
            {experience.map((item, i) => (
              <Timeline.Item key={i}>
                <Popconfirm
                  title="Are you sure to delete this?"
                  onConfirm={confirmDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size="sm" variant="link" className="float-right">
                    <i className="fa fa-trash fa-fw" />
                  </Button>
                </Popconfirm>
                <React.Fragment>
                  <Moment format="MMMM DD, YYYY">{item.from}</Moment> -{' '}
                  {item.current ? (
                    'Current'
                  ) : (
                    <Moment format="MMMM DD, YYYY">{item.to}</Moment>
                  )}
                  <p className="lead text-default" style={{ marginBottom: -2 }}>
                    <strong>
                      {item.title} - {item.company}
                    </strong>
                  </p>
                  <Typography.Paragraph className="text-muted mb-2">
                    {item.location} &bull; {item.type}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ whiteSpace: 'pre-line' }}>
                    {item.description}
                  </Typography.Paragraph>
                </React.Fragment>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      ) : (
        <div className="mt-3 mb-4">
          <p className="text-left text-muted">No experience to display.</p>
        </div>
      )}
    </Card>
  );
};

export default ProfileExperience;
