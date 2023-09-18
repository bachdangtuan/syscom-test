import React, {Component} from 'react';
import {uploadReport} from 'apis/api-upload-report';

import Dropify from 'components/dropify/dropify';
import Spinner from 'components/spinner/spinner';

import './upload-report.scss';

export default class UploadReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportFile: null,
      uploading: false,
    };
    this.apiUploadReport = this.apiUploadReport.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleFileRemove = this.handleFileRemove.bind(this);
  }

  apiUploadReport() {
    const {reportFile} = this.state;
    this.setState({uploading: true});
    uploadReport({file: reportFile})
      .then((response) => {
        const {id} = response.data;
        if (id) {
          setTimeout(() => {this.props.history.push(`/home/results/${id}`)}, 0);
        } else {
          alert('Returned response has no id');
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      })
      .finally(() => {
        this.setState({uploading: false});
      });
  }

  handleFileChange(file) {
    this.setState({reportFile: file});
  }

  handleFileRemove() {
    this.setState({reportFile: null});
  }

  render() {
    const {uploading} = this.state;
    return (
      <div className="grid-x grid-padding-x app-upload-report">
        <div className="cell large-10 large-offset-1 medium-12 small-12">
          <h3 className="text-center text-uppercase margin-bottom-2">Tải lên báo cáo</h3>
          <div className="margin-bottom-1">
            <Dropify 
              onChange={this.handleFileChange} 
              onRemoved={this.handleFileRemove} 
            />
          </div>
          <div className="flex-container control">
            <button 
              className={`primary button margin-bottom-0 ${uploading ? 'disabled' : ''}`}
              onClick={this.apiUploadReport}
            >
              {
                uploading
                  ? <span><Spinner />&nbsp;&nbsp;</span>
                  : null
              }
              Tải lên
            </button>
          </div>
        </div>
      </div>
    );
  }
}
