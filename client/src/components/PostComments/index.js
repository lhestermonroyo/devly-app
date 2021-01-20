import React, { useState, useEffect } from 'react';
import {
  ButtonGroup,
  Button,
  Form,
  Modal,
  Image,
  NavDropdown,
} from 'react-bootstrap';
import TimeAgo from 'react-timeago';
import useForm from '../../customHooks/useForm';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { commentPost } from '../../actions/postAction';
import Loading from '../Loading';

const PostComments = (props) => {
  const { postId, comments, userDetails } = props;

  const [commented, setCommented] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [value, handleChange] = useForm({
    comment: '',
  });

  const { commentLoading } = useSelector((state) => state.post);

  const { comment } = value;

  const dispatch = useDispatch();

  useEffect(() => {
    const hasCommented = comments.find(
      (item) => item.user._id === userDetails._id
    )
      ? true
      : false;
    setCommented(hasCommented);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(commentPost(postId, { text: comment }));
  };

  return (
    <React.Fragment>
      <ButtonGroup vertical className='post-footer-btn-group ml-3 mr-3 mt-5'>
        <Button variant='link' onClick={() => setShowComment(!showComment)}>
          {' '}
          <i
            className={
              commented
                ? 'fa fa-comment-alt fa-fw fa-2x'
                : 'far fa-comment-alt fa-fw fa-2x'
            }
          />{' '}
        </Button>
        <Button variant='link' onClick={() => setShowComment(!showComment)}>
          {comments.length !== 0 && (
            <span>
              {comments.length} {comments.length !== 1 ? 'Comments' : 'Comment'}
            </span>
          )}
        </Button>
      </ButtonGroup>
      <Modal show={showComment} onHide={() => setShowComment(!showComment)}>
        <Modal.Header closeButton>
          <Modal.Title>Comments ({comments.length})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Loading
            loading={commentLoading}
            loadingMsg='Posting, please wait...'
          />
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
              <Form.Control
                placeholder="What's your thought?"
                name='comment'
                as='textarea'
                value={comment}
                onChange={handleChange}
                required={true}
                rows={4}
              />
            </Form.Group>
            <Button type='submit'>Submit Comment</Button>
          </Form>
          <hr />
          {comments.length !== 0 ? (
            <React.Fragment>
              {comments.map((comment) => {
                const { firstname, lastname, avatar, _id } = comment.user;
                return (
                  <React.Fragment key={_id}>
                    <div className='mb-5'>
                      {userDetails._id === _id && (
                        <React.Fragment>
                          <NavDropdown
                            id='post-more-dropdown'
                            title={
                              <Button size='sm' variant='link'>
                                <i className='fa fa-ellipsis-h fa-fw' />
                              </Button>
                            }
                          >
                            <NavDropdown.Item>Edit</NavDropdown.Item>
                            <NavDropdown.Item>Delete</NavDropdown.Item>
                          </NavDropdown>
                        </React.Fragment>
                      )}
                      <div className='post-user mt-2 mb-3'>
                        <Image src={avatar} roundedCircle />
                        <p className='text-primary ml-2'>
                          <strong>
                            {firstname} {lastname}
                            <span className='ml-2 mr-2'>&bull;</span>
                            <TimeAgo date={comment.date} />
                          </strong>
                        </p>
                      </div>
                      <p>{comment.text}</p>
                    </div>
                    <hr />
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          ) : (
            <p className='text-center lead mt-5'>No comments for now.</p>
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default PostComments;
