import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Modal, Upload } from 'antd';
import FormButton from '../../components/FormButton';
import Main from '../../components/Main';
import { useDispatch, useSelector } from 'react-redux';
import { savePost } from '../../actions/postAction';
import {
  getCurrentPage,
  loadingFormStart,
  loadingFormEnd,
} from '../../actions/uiStateAction';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });

const CreatePost = props => {
  const { history } = props;

  const [content, setContent] = useState('');
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const { loadingForm } = useSelector(state => state.uiState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentPage('Create Post'));
  }, []);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleBeforeUpload = () => false;

  const handleSubmit = async e => {
    e.preventDefault();

    const postData = new FormData();
    postData.append('content', content);
    for (let i = 0; i < fileList.length; i++) {
      postData.append('fileList', fileList[i].originFileObj);
    }

    dispatch(loadingFormStart());
    await dispatch(savePost(postData, history));
    dispatch(loadingFormEnd());
  };

  return (
    <Main>
      <h1 className="display-4">Write a Post</h1>
      <Form onSubmit={e => handleSubmit(e)}>
        <FormButton
          loading={loadingForm}
          type="submit"
          size="lg"
          className="float-right publish-post-btn"
        >
          Publish Post
        </FormButton>
        <Input.TextArea
          size="large"
          placeholder={`What's on your mind?`}
          onChange={e => setContent(e.target.value)}
          autoSize={{ minRows: 4 }}
          required
          className="mb-3"
          style={{ borderRadius: 6 }}
        />
        <Upload.Dragger
          disabled={fileList.length === 8}
          accept="image/*, video/*"
          multiple={true}
          maxCount={8}
          listType="picture"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={handleBeforeUpload}
        >
          <p className="ant-upload-drag-icon">
            <PlusOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag images/videos to this area to upload.
          </p>
          <p className="ant-upload-hint">
            Upload limit is 8 images/videos only.
          </p>
        </Upload.Dragger>
        <Modal
          visible={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewOpen(false)}
          width={800}
        >
          <img alt="post-img" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Form>
    </Main>
  );
};

export default CreatePost;
