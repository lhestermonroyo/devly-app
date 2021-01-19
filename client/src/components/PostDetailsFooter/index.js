import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../../actions/postAction';
import PostComment from '../PostComment';

const PostDetailsFooter = (props) => {
  const [liked, setLiked] = useState(false);
  const [showComment, handleComment] = useState(false);

  const { postDetails, userDetails } = props;
  const { _id, likes, comments } = postDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    const hasLiked = likes.find((item) => item.user === userDetails._id)
      ? true
      : false;
    setLiked(hasLiked);
  }, []);

  const handleLike = () => {
    if (liked) {
      dispatch(unlikePost(_id));
    } else {
      dispatch(likePost(_id));
    }
    setLiked(!liked);
  };

  return (
    <React.Fragment>
      {/* Post Comment Modal */}
      <PostComment
        comments={comments}
        userDetails={userDetails}
        showComment={showComment}
        handleComment={handleComment}
      />
      <ButtonGroup vertical className='post-footer-btn-group mr-3 mt-5'>
        <Button variant='link' onClick={() => handleLike()}>
          {' '}
          <i
            className={
              liked ? 'fa fa-heart fa-fw fa-2x' : 'far fa-heart fa-fw fa-2x'
            }
          />{' '}
        </Button>
        <Button variant='link'>
          {likes.length !== 0 && (
            <span>
              {likes.length} {likes.length !== 1 ? 'Likes' : 'Like'}
            </span>
          )}
        </Button>
      </ButtonGroup>
      <ButtonGroup vertical className='post-footer-btn-group ml-3 mr-3 mt-5'>
        <Button variant='link' onClick={() => handleComment(!showComment)}>
          {' '}
          <i className='far fa-comment-alt fa-fw fa-2x' />{' '}
        </Button>
        <Button variant='link'>
          {comments.length !== 0 && (
            <span>
              {comments.length} {comments.length !== 1 ? 'Comments' : 'Comment'}
            </span>
          )}
        </Button>
      </ButtonGroup>
      <ButtonGroup vertical className='post-footer-btn-group ml-3 mr-3 mt-5'>
        <Button variant='link'>
          {' '}
          <i className='far fa-bookmark fa-fw fa-2x' />{' '}
        </Button>
        <Button variant='link'>
          {/* {likes.length !== 0 && (
                <span>
                  {likes.length}{' '}
                  {likes.length !== 1 ? 'Likes' : 'Like'}
                </span>
              )} */}
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default PostDetailsFooter;
