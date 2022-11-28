import React from 'react';
import Moment from 'react-moment';
import { Button, Card } from 'react-bootstrap';
import { Timeline, Typography } from 'antd';

const ProfileEducation = props => {
  const { education } = props;

  return (
    <Card body className="mb-3">
      <Button className="float-right" href="/edit-profile#education">
        <i className="fa fa-plus fa-fw" /> Add Education
      </Button>
      <p className="lead text-primary" style={{ marginBottom: -2 }}>
        <strong>Educational Background</strong>
      </p>
      {education && Array.isArray(education) ? (
        <div className="mt-5">
          <Timeline>
            {education.map((item, i) => (
              <Timeline.Item key={i}>
                <Button size="sm" variant="link" className="float-right">
                  <i className="fa fa-trash fa-fw" />
                </Button>
                <React.Fragment>
                  <Moment format="MMMM DD, YYYY">{item.from}</Moment> -{' '}
                  {item.current ? (
                    'Current'
                  ) : (
                    <Moment format="MMMM DD, YYYY">{item.to}</Moment>
                  )}
                  <p className="lead text-default" style={{ marginBottom: -2 }}>
                    <strong>
                      {item.fieldofstudy} ({item.degree})
                    </strong>
                  </p>
                  <Typography.Paragraph className="text-muted mb-2">
                    {item.school}
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
          <p className="text-left text-muted">No education to display.</p>
        </div>
      )}
    </Card>
  );
};

export default ProfileEducation;
