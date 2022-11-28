import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Row, Col, Image } from 'react-bootstrap';
import { Typography } from 'antd';
import Main from '../../components/Main';
import LoadingScreen from '../../components/LoadingScreen';
import AboutTheAuthor from '../../components/AboutTheAuthor';
import PostHeader from '../../components/PostHeader';
import PostComments from './components/PostComments';
import PostFooter from '../../components/PostFooter';
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetails, deletePost } from '../../actions/postAction';
import { loadingPageEnd, loadingPageStart } from '../../actions/uiStateAction';

const PostDetails = props => {
  const { match } = props;
  const { loadingPage } = useSelector(state => state.uiState);
  const { postDetails } = useSelector(state => state.post);
  const { userDetails: currentUser } = useSelector(state => state.auth);
  const commentField = useRef();

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    dispatch(loadingPageStart());
    await dispatch(getPostDetails(match.params.id));
    dispatch(loadingPageEnd());
  };

  const handleDeletePost = async () => {
    await dispatch(deletePost(match.params.id, history));
  };

  const handleFocusComment = () => {
    commentField.current.focus();
  };

  if (loadingPage) {
    return <LoadingScreen loadingMsg="Loading post details, please wait..." />;
  }

  return (
    <Main>
      <h1 className="display-4">
        <Button
          size="sm"
          style={{ marginTop: -6 }}
          href="/dashboard"
          variant="link"
        >
          <i className="fa fa-chevron-left fa-fw" />
        </Button>
        Post Details
      </h1>
      {postDetails && (
        <Row>
          <Col xs={8} md={8}>
            <PostHeader
              currentUser={currentUser}
              postId={postDetails._id}
              user={postDetails.user}
              date={postDetails.date}
              handleDelete={handleDeletePost}
            />
            {postDetails.content && (
              <Typography.Text className="post-content">
                {postDetails.content}
              </Typography.Text>
            )}
            {postDetails.fileList && (
              <div className="mt-4 mb-2">
                {postDetails.fileList.map((file, i) => (
                  <Image
                    className="mb-3"
                    key={i}
                    src={require(`../../uploads/${file}`).default}
                    fluid
                  />
                ))}
              </div>
            )}
            <PostFooter
              postId={match.params.id}
              currentUser={currentUser}
              likes={postDetails.likes}
              comments={postDetails.comments}
              handleFocusComment={handleFocusComment}
            />
            <AboutTheAuthor user={postDetails.user} />
          </Col>
          <Col>
            <PostComments
              postId={match.params.id}
              comments={postDetails.comments}
              currentUser={currentUser}
              commentField={commentField}
            />
          </Col>
        </Row>
      )}

      {/* {postDetails && userDetails && (
        <React.Fragment>
          {postDetails.user._id === userDetails._id && (
            <React.Fragment>
              <DeleteDialog
                showDelete={showDelete}
                setShowDelete={setShowDelete}
                deleteMsg={'Are you sure you want to delete this post?'}
                handleDelete={handleDelete}
              />
              <NavDropdown
                alignRight
                id="post-more-dropdown"
                title={
                  <Button
                    variant="link"
                    className="text-muted mt-2"
                    style={{ fontSize: 16 }}
                  >
                    <i className="fa fa-ellipsis-v fa-fw" />
                  </Button>
                }
              >
                <NavDropdown.Item href={`/edit-post/${match.params.id}`}>
                  Edit
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setShowDelete(!showDelete)}>
                  Delete
                </NavDropdown.Item>
              </NavDropdown>
            </React.Fragment>
          )}
          <React.Fragment>
            <h1>{postDetails.title}</h1>
            <div className="post-user mt-2 mb-5">
              <Image src={postDetails.user.avatar} roundedCircle />
              <p className="text-muted ml-2">
                {postDetails.user.firstname} {postDetails.user.lastname}
                <span className="ml-2 mr-2">&bull;</span>
                <TimeAgo date={postDetails.date} />
                {postDetails.user._id !== userDetails._id && (
                  <React.Fragment>
                    <span className="ml-2 mr-2">&bull;</span>
                    <Button>Follow</Button>
                  </React.Fragment>
                )}
              </p>
            </div>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: postDetails.content }}
            />
          </React.Fragment>
          <PostDetailsFooter
            postDetails={postDetails}
            userDetails={userDetails}
          />
          <hr />
          <AboutTheAuthor user={postDetails.user} />
        </React.Fragment>
      )} */}
    </Main>
  );
};

export default PostDetails;
