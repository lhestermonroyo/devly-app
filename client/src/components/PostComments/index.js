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
import LoadingComponent from '../LoadingComponent';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  addComment,
  deleteComment,
  updateComment,
} from '../../actions/postAction';
import EmptyComponent from '../EmptyComponent';

const PostComments = (props) => {
  const { postId, comments, userDetails } = props;

  const [commented, setCommented] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [optionType, setOptionType] = useState({ currentView: '', id: null });
  const [values, setValues] = useState({
    newComment: '',
    updatedComment: '',
  });

  const { newComment, updatedComment } = values;
  const { currentView, id } = optionType;

  const { commentLoading } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    const hasCommented = comments.find(
      (item) => item.user._id === userDetails._id
    )
      ? true
      : false;
    setCommented(hasCommented);
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptions = (newOptionType, text) => {
    setValues({
      ...values,
      updatedComment: text,
    });
    setOptionType(newOptionType);
  };

  const handleSubmit = (e, submitType) => {
    e.preventDefault();

    if (submitType === 'Add') {
      dispatch(addComment(postId, { text: newComment }));
    } else if (submitType === 'Update') {
      dispatch(updateComment(postId, id, { text: updatedComment }));
      handleOptions({
        currentView: '',
        id: null,
      });
    }
  };

  const handleDelete = (commentId) => {
    dispatch(deleteComment(postId, commentId));
    setOptionType({ currentView: '', id: null });
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
      <Modal
        className='modal-sidebar'
        show={showComment}
        onHide={() => setShowComment(!showComment)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Comments ({comments.length})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e, 'Add')}>
            <Form.Group>
              <Form.Control
                placeholder="What's your thought?"
                name='newComment'
                as='textarea'
                value={newComment}
                onChange={handleChange}
                required={true}
                rows={4}
              />
            </Form.Group>
            <Button type='submit'>Submit Comment</Button>
          </Form>
          <hr />
          <LoadingComponent
            loading={commentLoading}
            loadingMsg='Loading comments, please wait...'
          />
          {comments.length !== 0 ? (
            <React.Fragment>
              {comments.map((comment) => {
                const { firstname, lastname, avatar, _id } = comment.user;
                return (
                  <React.Fragment key={_id}>
                    {currentView === 'showEdit' && id === comment._id ? (
                      <Form onSubmit={(e) => handleSubmit(e, 'Update')}>
                        <Form.Group>
                          <Form.Label>Update Comment</Form.Label>
                          <Form.Control
                            name='updatedComment'
                            as='textarea'
                            value={updatedComment}
                            onChange={handleChange}
                            required={true}
                            rows={4}
                          />
                        </Form.Group>
                        <Button type='submit' className='mr-2'>
                          Save Changes
                        </Button>
                        <Button
                          variant='outline-primary'
                          onClick={() =>
                            handleOptions({
                              currentView: '',
                              id: null,
                            })
                          }
                        >
                          Cancel
                        </Button>
                      </Form>
                    ) : currentView === 'showDelete' && id === comment._id ? (
                      <React.Fragment>
                        <p>Are you sure you want to delete this comment?</p>
                        <Button
                          className='mr-2'
                          onClick={() => handleDelete(comment._id)}
                        >
                          Yes
                        </Button>
                        <Button
                          variant='outline-primary'
                          onClick={() =>
                            handleOptions({
                              currentView: '',
                              id: null,
                            })
                          }
                        >
                          Cancel
                        </Button>
                      </React.Fragment>
                    ) : (
                      <div className='mb-5'>
                        {userDetails._id === _id && (
                          <React.Fragment>
                            {!id && (
                              <NavDropdown
                                id='post-more-dropdown'
                                title={
                                  <Button
                                    size='sm'
                                    variant='link'
                                    className='text-muted'
                                  >
                                    <i className='fa fa-ellipsis-h fa-fw' />
                                  </Button>
                                }
                              >
                                <NavDropdown.Item
                                  onClick={() =>
                                    handleOptions(
                                      {
                                        currentView: 'showEdit',
                                        id: comment._id,
                                      },
                                      comment.text
                                    )
                                  }
                                >
                                  Edit
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                  onClick={() =>
                                    handleOptions({
                                      currentView: 'showDelete',
                                      id: comment._id,
                                    })
                                  }
                                >
                                  Delete
                                </NavDropdown.Item>
                              </NavDropdown>
                            )}
                          </React.Fragment>
                        )}
                        <div className='post-user mt-2 mb-3'>
                          <Image src={avatar} roundedCircle />
                          <p className='text-muted ml-2'>
                            {firstname} {lastname}
                            <span className='ml-2 mr-2'>&bull;</span>
                            <TimeAgo date={comment.date} />
                          </p>
                        </div>
                        <p>{comment.text}</p>
                      </div>
                    )}
                    <hr />
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          ) : (
            <EmptyComponent emptyMsg='No comments for now.' />
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default PostComments;
