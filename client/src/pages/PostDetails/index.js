import React, { useEffect } from 'react';
import Main from '../../components/Main';
import LoadingScreen from '../../components/LoadingScreen';
import { Button, NavDropdown, Image } from 'react-bootstrap';
import TimeAgo from 'react-timeago';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetails } from '../../actions/postAction';
import PostDetailsFooter from '../../components/PostDetailsFooter';

const PostDetails = (props) => {
  const { match } = props;

  const { postDetails, loading } = useSelector((state) => state.post);
  const { userDetails } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostDetails(match.params.id));
  }, []);

  return loading ? (
    <LoadingScreen loadingMsg='Loading, please wait...' />
  ) : (
    <Main>
      <Button className='mb-5' href='/dashboard' variant='outline-primary'>
        <i className='fa fa-chevron-left fa-fw' />
        Back
      </Button>
      {postDetails && userDetails && (
        <React.Fragment>
          {postDetails.user._id === userDetails._id && (
            <React.Fragment>
              <NavDropdown
                alignRight
                id='post-more-dropdown'
                title={
                  <Button variant='link' style={{ fontSize: 16 }}>
                    <i className='fa fa-ellipsis-h fa-fw' />
                  </Button>
                }
              >
                <NavDropdown.Item>Bookmark this Post</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Edit</NavDropdown.Item>
                <NavDropdown.Item>Delete</NavDropdown.Item>
              </NavDropdown>
            </React.Fragment>
          )}
          <React.Fragment>
            <h1>{postDetails.title}</h1>
            <div className='post-user mt-2 mb-5'>
              <Image src={postDetails.user.avatar} roundedCircle />
              <p className='text-primary ml-2'>
                <strong>
                  {postDetails.user.firstname} {postDetails.user.lastname}
                  <span className='ml-2 mr-2'>&bull;</span>
                  <TimeAgo date={postDetails.date} />
                </strong>
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
        </React.Fragment>
      )}
    </Main>
  );
};

export default PostDetails;
