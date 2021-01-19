import React from 'react';
import { Button, Form, Modal, Image, NavDropdown } from 'react-bootstrap';
import TimeAgo from 'react-timeago';

const PostComment = (props) => {
  const { comments, userDetails, showComment, handleComment } = props;

  return (
    <Modal
      show={showComment}
      // animation={false}
      onHide={() => handleComment(!showComment)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Comments ({comments.length})</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              placeholder="What's your thought?"
              name='email'
              as='textarea'
              // value={email}
              // onChange={handleChange}
              required={true}
              rows={4}
            />
          </Form.Group>
          <Button>Submit Comment</Button>
        </Form>
        <hr />
        {comments.length !== 0 ? (
          <React.Fragment>
            {comments.map((comment) => {
              const { firstname, lastname, avatar, _id } = comment.user;
              return (
                <React.Fragment>
                  <div className='mb-5'>
                    {userDetails._id === _id && (
                      <React.Fragment>
                        <NavDropdown
                          // alignRight
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
  );
};

export default PostComment;
