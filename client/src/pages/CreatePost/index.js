import React, { useEffect, useState } from 'react';
import Main from '../../components/Main';
import { Button, Form } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import LoadingScreen from '../../components/LoadingScreen';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { savePost } from '../../actions/postAction';
import AlertDismissable from '../../components/Alert';

const CreatePost = (props) => {
  const { history } = props;
  const [title, handleTitle] = useState('');
  const [content, handleContent] = useState((content, editor) => content);

  const { loading } = useSelector((state) => state.post);
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

    dispatch(savePost(postData, history));
  };

  return loading ? (
    <LoadingScreen loadingMsg='Loading, please wait...' />
  ) : (
    <Main>
      <AlertDismissable />
      <h1>Write a Post</h1>
      <Button
        onClick={(e) => handleSubmit(e)}
        className='float-right publish-post-btn'
      >
        Publish Post
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
    </Main>
  );
};

export default CreatePost;
