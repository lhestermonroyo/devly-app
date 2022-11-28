import React from 'react';
import { Typography } from 'antd';

const PostContent = props => {
  const { content, viewPost } = props;

const truncatedContent = maxLimit => {
    if (content.length >= maxLimit) {
      return (
        <React.Fragment>
          {content.substring(0, maxLimit - 3) + '...'}{' '}
          <Typography.Link onClick={viewPost}>Read more</Typography.Link>
        </React.Fragment>
      );
    } else {
      return content;
    }
  };

  return (
    <Typography.Text className="post-content">
      {truncatedContent(940)}
    </Typography.Text>
  );
};

export default PostContent;
