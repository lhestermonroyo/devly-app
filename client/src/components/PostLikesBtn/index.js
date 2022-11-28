import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, List, Avatar } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
// Redux
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/postAction';

const PostLikesBtn = props => {
  const { postId, currentUser, likes, showLikes, setShowLikes } = props;
  const [liked, setLiked] = useState(false);
  const [postLikeType, setPostLikeType] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const hasLiked = likes.find(item => item.user._id === currentUser._id)
      ? true
      : false;
    setLiked(hasLiked);

    if (history.location.pathname === '/dashboard') {
      setPostLikeType('POSTS');
    } else {
      setPostLikeType('POST_DETAILS');
    }
  }, []);

  const handleLike = () => {
    if (liked) {
      dispatch(unlikePost(postId, postLikeType));
    } else {
      dispatch(likePost(postId, postLikeType));
    }
    setLiked(!liked);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleLike}
        type={liked ? 'link' : 'text'}
        shape="circle"
        size="large"
        icon={
          liked ? (
            <HeartFilled style={{ fontSize: 28 }} />
          ) : (
            <HeartOutlined style={{ fontSize: 28 }} />
          )
        }
      />
      <Modal
        title={`Likes (${likes.length})`}
        visible={showLikes}
        onCancel={() => setShowLikes(!showLikes)}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={likes}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.user.avatar} />}
                title={
                  <a href={`profile/${item.user._id}`}>
                    {item.user.firstname} {item.user.lastname}
                  </a>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    </React.Fragment>
  );
};

export default PostLikesBtn;
