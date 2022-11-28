import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Main from '../../components/Main';
import { Button, Form } from 'react-bootstrap';
import LoadingScreen from '../../components/LoadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetails, updatePost } from '../../actions/postAction';
import { Input } from 'antd';
import FormButton from '../../components/FormButton';
import { loadingFormEnd, loadingFormStart } from '../../actions/uiStateAction';

const EditPost = props => {
  const { match } = props;
  const { postDetails, loading } = useSelector(state => state.post);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostDetails(match.params.id));
  }, []);

  return loading ? (
    <LoadingScreen loadingMsg="Loading page, please wait..." />
  ) : (
    <Main>
      {postDetails && (
        <React.Fragment>
          <h1 className="display-4">
            <Button
              size="sm"
              style={{ marginTop: -6 }}
              href="/dashboard"
              variant="link"
            >
              <i className="fa fa-chevron-left fa-fw" />
            </Button>
            Edit Post
          </h1>
          <EditPostForm postDetails={postDetails} history={history} />
        </React.Fragment>
      )}
    </Main>
  );
};

const EditPostForm = props => {
  const { postDetails, history } = props;
  const [content, setContent] = useState('');

  const { loadingForm } = useSelector(state => state.uiState);

  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();

    const postData = {
      content,
    };

    dispatch(loadingFormStart());
    await dispatch(updatePost(postDetails._id, postData, history));
    dispatch(loadingFormEnd());
  };

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <FormButton
        loading={loadingForm}
        size="lg"
        type="submit"
        className="float-right publish-post-btn"
      >
        Save Changes
      </FormButton>
      <Input.TextArea
        size="large"
        placeholder={`What's on your mind?`}
        onChange={e => setContent(e.target.value)}
        defaultValue={postDetails && postDetails.content}
        autoSize={{ minRows: 4 }}
        required
        className="mb-3"
        style={{ borderRadius: 6 }}
      />
    </Form>
  );
};

export default EditPost;
