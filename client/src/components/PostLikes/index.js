import React, { useState, useEffect } from 'react';
import { ButtonGroup, Button, Modal, Image } from 'react-bootstrap';
// Redux
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/postAction';

const PostLikes = (props) => {
  const { postId, likes, userDetails } = props;
  const [liked, setLiked] = useState(false);
  const [showLikes, setShowLikes] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const hasLiked = likes.find((item) => item.user._id === userDetails._id)
      ? true
      : false;
    setLiked(hasLiked);
  }, []);

  const handleLike = () => {
    if (liked) {
      dispatch(unlikePost(postId));
    } else {
      dispatch(likePost(postId));
    }
    setLiked(!liked);
  };

  return (
    <React.Fragment>
      <ButtonGroup vertical className='post-footer-btn-group mr-3 mt-5'>
        <Button variant='link' onClick={() => handleLike()}>
          {' '}
          <i
            className={
              liked ? 'fa fa-heart fa-fw fa-2x' : 'far fa-heart fa-fw fa-2x'
            }
          />{' '}
        </Button>
        <Button variant='link' onClick={() => setShowLikes(!showLikes)}>
          {likes.length !== 0 && (
            <span>
              {likes.length} {likes.length !== 1 ? 'Likes' : 'Like'}
            </span>
          )}
        </Button>
      </ButtonGroup>
      <Modal show={showLikes} onHide={() => setShowLikes(!showLikes)}>
        <Modal.Header closeButton>
          <Modal.Title>Likes ({likes.length})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {likes.length !== 0 ? (
            <React.Fragment>
              {likes.map((like) => {
                const { firstname, lastname, avatar, _id } = like.user;
                return (
                  <React.Fragment key={_id}>
                    <div className='post-user mt-2 mb-3'>
                      <Image src={avatar} roundedCircle />
                      <p className='text-primary ml-2'>
                        <strong>
                          {firstname} {lastname}
                        </strong>
                      </p>
                    </div>
                    <hr />
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          ) : (
            <p className='text-center lead mt-5'>No likes for now.</p>
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default PostLikes;
