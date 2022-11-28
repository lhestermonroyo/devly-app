import React from 'react';
import { Row, Col } from 'react-bootstrap';
// Redux
import PostItem from '../PostItem';

const Posts = props => {
  const { posts } = props;

  return (
    <React.Fragment>
      {posts &&
        posts
          .sort((a, b) => a.date - b.date)
          .map((item, i) => <PostItem key={i} item={item} />)}
    </React.Fragment>
  );
};

export default Posts;
