import React, { useEffect, useState } from 'react';
import Main from '../../components/Main';
import { Button, Form } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import LoadingScreen from '../../components/LoadingScreen';
import AlertDismissable from '../../components/Alert';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetails, updatePost } from '../../actions/postAction';

const EditPost = (props) => {
  const { match, history } = props;
  const { postDetails, loading } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostDetails(match.params.id));
  }, []);

  return loading ? (
    <LoadingScreen loadingMsg='Loading page, please wait...' />
  ) : (
    <Main>
      {postDetails && (
        <React.Fragment>
          <AlertDismissable />
          <Button
            className='mb-3'
            href={`/post/${match.params.id}`}
            variant='outline-primary'
          >
            <i className='fa fa-chevron-left fa-fw' />
            Back
          </Button>
          <h1>Edit Post</h1>
          <EditPostForm postDetails={postDetails} history={history} />
        </React.Fragment>
      )}
    </Main>
  );
};

const EditPostForm = (props) => {
  const { postDetails, history } = props;
  const [title, handleTitle] = useState('');
  const [content, handleContent] = useState((content, editor) => content);

  useEffect(() => {
    handleTitle(postDetails ? postDetails.title : '');
    handleContent(postDetails ? postDetails.content : '');
  }, []);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const thumbnail = document
      .querySelector('#preview img')
      .getAttribute('src');
    const postData = {
      title,
      content,
      thumbnail,
    };

    dispatch(updatePost(postDetails._id, postData, history));
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Button
        type='submit'
        variant='primary'
        className='float-right edit-post-btn'
      >
        Save Changes
      </Button>
      <Form.Group className='mt-5'>
        <Form.Control
          className='post-title-textarea'
          name='title'
          as='textarea'
          placeholder='Title'
          value={title}
          onChange={(e) => handleTitle(e.target.value)}
          required={true}
        />
      </Form.Group>
      <Editor
        apiKey='d01fggzhnl8ykqa0mv3t83mdkkw8f4j5aj305lr5it0pvjck'
        initialValue={content}
        init={{
          placeholder: 'What do you have in mind?',
          selector: 'textarea',
          resize: false,
          height: 500,
          menubar: false,
          toolbar_mode: 'floating',
          toolbar_location: 'bottom',
          skin: 'outside',
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | link image | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
        }}
        onEditorChange={(e) => handleContent(e)}
      />
      <div
        style={{ display: 'none' }}
        id='preview'
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Form>
  );
};

export default EditPost;
