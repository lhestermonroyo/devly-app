import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { MessageOutlined, MessageFilled } from '@ant-design/icons';

const PostCommentsBtn = props => {
  const { postId, currentUser, comments, handleFocusComment = null } = props;

  const history = useHistory();

  const hasCommented = () => {
    return comments.some(comment => comment.user._id === currentUser._id);
  };

  const handleComment = () => {
    if (history.location.pathname === '/dashboard') {
      history.push(`post/${postId}/#comment`);
    } else {
      handleFocusComment();
    }
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleComment}
        type={hasCommented() ? 'link' : 'text'}
        shape="circle"
        size="large"
        icon={
          hasCommented() ? (
            <MessageFilled style={{ fontSize: 28 }} />
          ) : (
            <MessageOutlined style={{ fontSize: 28 }} />
          )
        }
      />
    </React.Fragment>
  );
};

export default PostCommentsBtn;
