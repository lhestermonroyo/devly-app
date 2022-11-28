import React, { useState } from 'react';
import { Space, Button, Divider, Typography } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import PostLikesBtn from '../PostLikesBtn';
import PostCommentsBtn from '../PostCommentsBtn';

const PostFooter = props => {
  const { postId, currentUser, likes, comments, handleFocusComment } = props;
  const [showLikes, setShowLikes] = useState(false);

  return (
    <React.Fragment>
      <Space direction="horizontal" size={18}>
        {likes.length !== 0 && (
          <Typography.Text
            style={{ cursor: 'pointer' }}
            onClick={() => setShowLikes(!showLikes)}
          >
            {likes.length} {likes.length !== 1 ? 'Likes' : 'Like'}
          </Typography.Text>
        )}
        {comments.length !== 0 && (
          <Typography.Text style={{ cursor: 'pointer' }}>
            {comments.length} {comments.length !== 1 ? 'Comments' : 'Comment'}
          </Typography.Text>
        )}
      </Space>
      {(likes.length !== 0 || comments.length !== 0) && <Divider />}
      <Space direction="horizontal" size={18}>
        <PostLikesBtn
          postId={postId}
          currentUser={currentUser}
          likes={likes}
          showLikes={showLikes}
          setShowLikes={setShowLikes}
        />
        <PostCommentsBtn
          postId={postId}
          currentUser={currentUser}
          comments={comments}
          handleFocusComment={handleFocusComment}
        />
        <Button
          type="text"
          shape="circle"
          size="large"
          icon={<BookOutlined style={{ fontSize: 28 }} />}
        />
      </Space>
    </React.Fragment>
  );
};

export default PostFooter;
