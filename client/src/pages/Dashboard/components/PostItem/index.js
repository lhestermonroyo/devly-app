import React from 'react';
import { useHistory } from 'react-router-dom';
import { Image, Card } from 'react-bootstrap';
import PostContent from '../PostContent';
import PostHeader from '../../../../components/PostHeader';
import PostFooter from '../../../../components/PostFooter';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../../../actions/postAction';

const PostItem = props => {
  const {
    item: { _id: postId, content, fileList, user, date, likes, comments },
  } = props;
  const { userDetails: currentUser } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();

  const viewPost = () => {
    history.push(`/post/${postId}`);
  };

  const handleDeletePost = async () => {
    await dispatch(deletePost(postId));
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <PostHeader
          currentUser={currentUser}
          postId={postId}
          user={user}
          date={date}
          handleDelete={handleDeletePost}
        />
        {content && <PostContent content={content} viewPost={viewPost} />}
      </Card.Body>
      {fileList && fileList.length !== 0 && (
        <div className="post-card-thumbnail" onClick={viewPost}>
          <Image
            src={require(`../../../../uploads/${fileList[0]}`).default}
            fluid
          />
        </div>
      )}
      <Card.Body>
        <PostFooter
          currentUser={currentUser}
          postId={postId}
          likes={likes}
          comments={comments}
        />
      </Card.Body>
    </Card>
  );
};

export default PostItem;
