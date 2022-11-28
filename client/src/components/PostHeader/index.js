import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Image } from 'react-bootstrap';
import { Typography } from 'antd';
import TimeAgo from 'react-timeago';
import { MoreOutlined } from '@ant-design/icons';
import setConfirmDelete from '../../util/setConfirmDelete';

const PostHeader = props => {
  const { currentUser, postId, user, date, handleDelete } = props;
  const { _id: userId, firstname, lastname, avatar } = user;

  const history = useHistory();

  const viewPost = () => {
    history.push(`/post/${postId}`);
  };

  const viewEditPost = () => {
    history.push(`/edit-post/${postId}`);
  };

  const viewProfile = () => {
    history.push(`/profile/${postId}`);
  };

  return (
    <div className="post-user mb-3">
      <Image
        src={avatar}
        roundedCircle
        onClick={viewProfile}
        style={{ cursor: 'pointer' }}
      />
      <Typography.Text
        className="ml-2"
        onClick={viewProfile}
        style={{ cursor: 'pointer' }}
      >
        {firstname} {lastname}
        <span className="ml-1 mr-1">&bull;</span>
        <span className="text-muted">
          <TimeAgo date={date} />
        </span>
      </Typography.Text>
      <Dropdown className="post-user-dropdown float-right" align="end">
        <Dropdown.Toggle id="dropdown-basic" variant="default" size="sm">
          <MoreOutlined style={{ fontSize: 20 }} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {history.location.pathname === '/dashboard' && (
            <Dropdown.Item onClick={viewPost}>Expand Post</Dropdown.Item>
          )}
          {history.location.pathname === '/dashboard' &&
            currentUser._id === userId && <Dropdown.Divider />}
          {currentUser._id === userId && (
            <React.Fragment>
              <Dropdown.Item onClick={viewEditPost}>Edit</Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  setConfirmDelete(
                    'Are you sure you want to delete this post?',
                    handleDelete
                  )
                }
              >
                Delete
              </Dropdown.Item>
            </React.Fragment>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default PostHeader;
