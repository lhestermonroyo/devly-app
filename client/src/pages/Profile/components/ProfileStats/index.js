import { Grid } from 'antd';
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const ProfileStats = () => {
  return (
    <Card body className="mb-3">
      <p className="lead text-primary">
        <strong>Profile Stats</strong>
      </p>
      <Row className="text-center">
        <Col xs={12} sm={6} md={3}>
          <p className="lead text-muted" style={{ marginBottom: -2 }}>
            Posts
          </p>
          <h1 className="display-4 text-primary">0</h1>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <p className="lead text-muted" style={{ marginBottom: -2 }}>
            Followers
          </p>
          <h1 className="display-4 text-primary">0</h1>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <p className="lead text-muted" style={{ marginBottom: -2 }}>
            Following
          </p>
          <h1 className="display-4 text-primary">0</h1>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <p className="lead text-muted" style={{ marginBottom: -2 }}>
            Bookmarked
          </p>
          <h1 className="display-4 text-primary">0</h1>
        </Col>
      </Row>
    </Card>
  );
};

export default ProfileStats;
