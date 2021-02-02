import React, { useEffect, useState } from 'react';
import Main from '../../components/Main';
import LoadingScreen from '../../components/LoadingScreen';
import { Button, NavDropdown, Image } from 'react-bootstrap';
import TimeAgo from 'react-timeago';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetails, deletePost } from '../../actions/postAction';
import PostDetailsFooter from '../../components/PostDetailsFooter';
import AboutTheAuthor from '../../components/AboutTheAuthor';
import DeleteDialog from '../../components/DeleteDialog';

const PostDetails = (props) => {
  const { history, match } = props;

  const [showDelete, setShowDelete] = useState(false);

  const { postDetails, loading } = useSelector((state) => state.post);
  const { userDetails } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostDetails(match.params.id));
  }, []);

  const handleDelete = () => {
    dispatch(deletePost(match.params.id, history));
  };

  return loading ? (
    <LoadingScreen loadingMsg='Loading page, please wait...' />
  ) : (
    <Main>
      {postDetails && userDetails && (
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
                id='post-more-dropdown'
                title={
                  <Button
                    variant='link'
                    className='text-muted mt-2'
                    style={{ fontSize: 16 }}
                  >
                    <i className='fa fa-ellipsis-v fa-fw' />
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
            <div className='post-user mt-2 mb-5'>
              <Image src={postDetails.user.avatar} roundedCircle />
              <p className='text-muted ml-2'>
                {postDetails.user.firstname} {postDetails.user.lastname}
                <span className='ml-2 mr-2'>&bull;</span>
                <TimeAgo date={postDetails.date} />
                <span className='ml-2 mr-2'>&bull;</span>
                <Button>Follow</Button>
              </p>
            </div>
            <div
              className='post-content'
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
      )}
    </Main>
  );
};

export default PostDetails;
