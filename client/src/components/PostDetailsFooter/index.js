import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../../actions/postAction';
import PostComments from '../PostComments';
import PostLikes from '../PostLikes';

const PostDetailsFooter = (props) => {
  const [liked, setLiked] = useState(false);

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
      <PostLikes likes={likes} postId={_id} userDetails={userDetails} />
      {/* Post Comment */}
      <PostComments
        postId={_id}
        comments={comments}
        userDetails={userDetails}
      />
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
