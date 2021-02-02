import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import TimeAgo from 'react-timeago';

const Posts = (props) => {
  const { posts, history } = props;

  const handleRedirect = (redirect) => {
    history.push(redirect);
  };

  return (
    <Row className='mt-5'>
      {posts.map((post, i) => {
        const { _id, title, content, thumbnail, user, date } = post;
        const { firstname, lastname, avatar } = user;
        const excerpt = content.slice(0, 70);

        if (i === 0) {
          return (
            <div key={_id} className='post-card-block mb-5'>
              <Col xs={12} md={12}>
                <Row>
                  <Col
                    xs={6}
                    md={6}
                    className='post-card-thumbnail'
                    onClick={() => handleRedirect(`/post/${_id}`)}
                  >
                    <Image src={thumbnail} fluid />
                  </Col>
                  <Col xs={6} md={6}>
                    <div className='post-user mt-2 mb-3'>
                      <Image src={avatar} roundedCircle />
                      <p className='text-muted ml-2'>
                        {firstname} {lastname}
                        <span className='ml-2 mr-2'>&bull;</span>
                        <TimeAgo date={date} />
                      </p>
                    </div>
                    <h3 className='mb-3'>{title}</h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: `${excerpt}...` }}
                    />
                    <Button href={`/post/${_id}`}>Read More</Button>
                  </Col>
                </Row>
              </Col>
            </div>
          );
        } else {
          return (
            <Col key={_id} xs={4} md={4} className='mb-5'>
              <div
                className='post-card-thumbnail-2'
                onClick={() => handleRedirect(`/post/${_id}`)}
              >
                <Image src={thumbnail} fluid />
              </div>
              <div className='post-user mt-3 mb-3'>
                <Image src={avatar} roundedCircle />
                <p className='text-muted ml-2'>
                  {firstname} {lastname}
                  <span className='ml-2 mr-2'>&bull;</span>
                  <TimeAgo date={date} />
                </p>
              </div>
              <h4 className='mb-3'>{title}</h4>
              <div dangerouslySetInnerHTML={{ __html: `${excerpt}...` }} />
              <Button href={`/post/${_id}`}>Read More</Button>
            </Col>
          );
        }
      })}
    </Row>
  );
};

export default Posts;
