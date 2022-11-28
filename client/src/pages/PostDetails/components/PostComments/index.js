import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Image, Dropdown } from 'react-bootstrap';
import TimeAgo from 'react-timeago';
import EmptyComponent from '../../../../components/EmptyComponent';
import FormButton from '../../../../components/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  addComment,
  deleteComment,
  updateComment,
} from '../../../../actions/postAction';
import { Divider, Typography } from 'antd';
import {
  loadingFormEnd,
  loadingFormStart,
} from '../../../../actions/uiStateAction';
import { MoreOutlined } from '@ant-design/icons';
import setConfirmDelete from '../../../../util/setConfirmDelete';

const PostComments = props => {
  const { postId, comments, currentUser, commentField } = props;

  const [optionType, setOptionType] = useState({ currentView: '', id: null });
  const [values, setValues] = useState({
    newComment: '',
    updatedComment: '',
  });
  const { newComment, updatedComment } = values;
  const { currentView, id } = optionType;

  const { loadingForm } = useSelector(state => state.uiState);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (history.location.hash === '#comment') {
      commentField.current.focus();
    }
  }, []);

  const handleChange = e => {
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

  const handleSubmit = async (e, submitType) => {
    e.preventDefault();

    dispatch(loadingFormStart());
    if (submitType === 'Add') {
      await dispatch(addComment(postId, { text: newComment }));
      setValues({ ...values, newComment: '' });
    } else if (submitType === 'Update') {
      await dispatch(updateComment(postId, id, { text: updatedComment }));
      setValues({ ...values, updatedComment: '' });
      handleOptions({
        currentView: '',
        id: null,
      });
    }
    dispatch(loadingFormEnd());
  };

  const handleDelete = async commentId => {
    await dispatch(deleteComment(postId, commentId));
  };

  return (
    <React.Fragment>
      <Typography.Title level={4}>
        Comments ({comments.length})
      </Typography.Title>
      <Form onSubmit={e => handleSubmit(e, 'Add')}>
        <Form.Group className="mb-3">
          <Form.Control
            ref={commentField}
            as="textarea"
            placeholder="Add a comment..."
            name="newComment"
            onChange={handleChange}
            value={newComment}
            rows="3"
            style={{ resize: 'none' }}
            required
          />
        </Form.Group>
        <FormButton
          loading={loadingForm && currentView === ''}
          type="submit"
          size="lg"
        >
          Submit
        </FormButton>
      </Form>
      <Divider />
      {comments.length !== 0 ? (
        <div className="mt-2">
          {comments.map(comment => {
            const { firstname, lastname, avatar, _id: userId } = comment.user;
            return (
              <React.Fragment key={userId}>
                {currentView === 'showEdit' && id === comment._id ? (
                  <Form onSubmit={e => handleSubmit(e, 'Update')}>
                    <Form.Group className="mb-3">
                      <Form.Label>Update Comment</Form.Label>
                      <Form.Control
                        name="updatedComment"
                        as="textarea"
                        value={updatedComment}
                        onChange={handleChange}
                        rows={3}
                        required
                        style={{ resize: 'none' }}
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      disabled={loadingForm}
                      className="mr-2"
                    >
                      {loadingForm && currentView === 'showEdit'
                        ? 'Loading...'
                        : 'Save Changes'}
                    </Button>
                    <Button
                      variant="outline-primary"
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
                ) : (
                  <div className="mb-4">
                    <div className="post-user mt-2 mb-3">
                      <Image
                        src={avatar}
                        roundedCircle
                        style={{ cursor: 'pointer' }}
                      />
                      <p className="text-muted ml-2">
                        {firstname} {lastname}
                        <span className="ml-2 mr-2">&bull;</span>
                        <TimeAgo date={comment.date} />
                      </p>
                      {currentUser._id === userId && (
                        <Dropdown
                          className="post-user-dropdown float-right"
                          align="end"
                        >
                          <Dropdown.Toggle
                            id="dropdown-basic"
                            variant="default"
                            size="sm"
                          >
                            <MoreOutlined style={{ fontSize: 20 }} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
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
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                setConfirmDelete(
                                  'Are you sure you want to delete this comment?',
                                  () => handleDelete(comment._id)
                                )
                              }
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </div>
                    <Typography.Text className="post-content">
                      {comment.text}
                    </Typography.Text>
                  </div>
                )}
                <Divider />
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <EmptyComponent emptyMsg="No comments for now." />
      )}
    </React.Fragment>
  );
};

export default PostComments;
