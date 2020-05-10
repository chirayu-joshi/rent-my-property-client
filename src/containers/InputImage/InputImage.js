import React, { Component } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import axios from '../../axios';

import styles from './InputImage.module.css';
import InfoModal from '../../components/InfoModal/InfoModal';

class InputImage extends Component {
  state = {
    selectedImages: null,
    uploading: false,
    uploaded: false,
    error: ''
  }

  maxSelectFile(event) {
    let files = event.target.files;
    if (files.length > 20) {
      this.setState({ error: 'Maximum 20 file is allowed' });
      event.target.value = null;
      return false;
    } else {
      this.setState({ error: '' });
      let err = '';
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 5242880) { // 5 MB
          err += files[i].name + ', ';
        }
      }
      if (err !== '') {
        // error caught
        event.target.value = null;
        this.setState({ error: err + 'is/are too large. Please select file size < 5Mb' });
      }
    }
    return true;
  }

  fileChangeHandler(event) {
    const files = event.target.files;
    if (this.maxSelectFile(event)) {
      this.setState({
        selectedImages: files
      });
    }
  }

  fileUploadHandler(event) {
    if (this.state.selectedImages === null) {
      this.setState({ error: 'Please select some images. ' });
      return;
    } else {
      this.setState({ error: '' });
    }
    this.setState({ uploading: true, uploaded: false });
    const data = new FormData();
    for (let i = 0; i < this.state.selectedImages.length; i++) {
      data.append('file', this.state.selectedImages[i]);
    }
    // axios.post('http://127.0.0.1:3333/api/upload', data, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
    //   }
    // }, {
    //   onUploadProgress: ProgressEvent => {
    //     this.setState({
    //       loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)
    //     });
    //   }
    // }).then(res => {
    //   toast.success('Upload Successful');
    // }).catch(err => {
    //   toast.error(`Upload Fail with status: ${err.statusText}`);
    // });
    axios.post(this.props.reqLink, data)
      .then(res => {
        console.log(res);
        this.setState({ uploading: false, uploaded: true });
        setTimeout(() => this.setState({ uploaded: false }), 2000);
      }).catch(err => {
        console.log(err);
        this.setState({ uploading: false, error: 'Upload Failed' });
      });
  }

  render() {
    return (
      <form method="post" name="imageUpload" action={this.props.reqLink} id="#" encType="multipart/form-data">
        <InfoModal loading={this.state.error !== ''} type="error">{this.state.error}</InfoModal>
        <InfoModal loading={this.state.uploaded} type="success">Image/s uploaded. </InfoModal>
        <div className={styles.files}>
          <label>Upload Your Images Here</label>
          <input
            type="file"
            name="file"
            multiple="multiple"
            accept="image/*"
            onChange={this.fileChangeHandler.bind(this)} />
          <div className={styles.btnWrapper}>
            <Button
              type="button"
              variant="contained"
              startIcon={<CloudUpload />}
              color="primary"
              disabled={this.state.uploading}
              className={styles.uploadBtn}
              onClick={this.fileUploadHandler.bind(this)}>
              Upload Images
            </Button>
            {this.state.uploading && <CircularProgress className={styles.btnProgress} size={24} />}
          </div>
        </div>
      </form>
    );
  }
}

export default InputImage;
