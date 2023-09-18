import React, {Component} from 'react';
import moment from 'moment';
import uuid from 'uuid-random';
import {FormService} from '@tpacks/react-common-services';
import {reportResponseAdapter} from 'antonydb-adapters';

import {getResults, getFullReportData} from 'apis/api-results.js';
import {downloadDocxReport, downloadPdfReport, downloadFullDocxReport} from 'apis/api-download-report';
import {getScoreColor, calculateScore} from 'utils/util-score';
import {saveArrayBuffer} from 'utils/util-save-array-buffer';

import Spinner from 'components/spinner/spinner';
import OsinfoCard from 'components/osinfo-card/osinfo-card';

import RisksTable from './risks-table';
import DeviceDetail from './device-detail';

import './results.scss';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      downloadingDocx: false,
      downloadingPdf: false,
      downloadingFullDocx: false,
    };
    this.specificIncludesFormService = new FormService(this, {
      printers: true,
      processes: true,
      softwares: true,
      networks_adapter: true,
      security_settings: true,
      services: true,
      networks: true,
      autoruns: true,
      files: true,
      hardware: true,
    });
    this.rawReportData = {};
    this.timeoutReloadResults = null;
    this.handleSpecificIncludesFormChange = this.handleSpecificIncludesFormChange.bind(this);
    this.handleDownloadDocxReport = this.handleDownloadDocxReport.bind(this);
    this.handleDownloadPdfReport = this.handleDownloadPdfReport.bind(this);
    this.handleDownloadFullDocxReport = this.handleDownloadFullDocxReport.bind(this);
  }

  componentDidMount() {
    this.apiGetResults();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      window.clearTimeout(this.timeoutReloadResults);
      this.apiGetResults();
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeoutReloadResults);
  }

  apiGetResults() {
    const {id} = this.props.match.params;
    getResults(id).then((response) => {
      if (!response.data.total || !response.data.total.value) {
        this.setupReloadResultsAfter(200);
      } else {
        this.rawReportData = response.data;
        const results = reportResponseAdapter.adapt(response.data);
        (results.risks || []).forEach((risk) => {
          risk.id = uuid();
          (risk.entries || []).forEach((entry) => {
            entry.id = uuid();
          });
        });
        this.setState({results: results});
        if (results.done === false) {
          this.setupReloadResultsAfter(3000);
        }
      }
    }, (err) => {
      console.error(err);
    });
  }

  setupReloadResultsAfter(timeInMs = 200) {
    window.clearTimeout(this.timeoutReloadResults);
    this.timeoutReloadResults = window.setTimeout(() => {
      this.apiGetResults();
    }, timeInMs);
  }

  getSpecificIncludesFormValues() {
    return {
      printers: this.specificIncludesFormService.getValueOfField('printers'),
      processes: this.specificIncludesFormService.getValueOfField('processes'),
      softwares: this.specificIncludesFormService.getValueOfField('softwares'),
      networks_adapter: this.specificIncludesFormService.getValueOfField('networks_adapter'),
      security_settings: this.specificIncludesFormService.getValueOfField('security_settings'),
      services: this.specificIncludesFormService.getValueOfField('services'),
      networks: this.specificIncludesFormService.getValueOfField('networks'),
      autoruns: this.specificIncludesFormService.getValueOfField('autoruns'),
      files: this.specificIncludesFormService.getValueOfField('files'),
      hardware: this.specificIncludesFormService.getValueOfField('hardware'),
    };
  }

  handleSpecificIncludesFormChange(field, value) {
    this.specificIncludesFormService.setValueForField(field, value);
  }

  async handleDownloadDocxReport() {
    try {
      this.setState({downloadingDocx: true});
      const response = await downloadDocxReport(this.rawReportData);
      saveArrayBuffer({
        arrayBuffer: response.data,
        fileName: this.makeReportFileName() + '.docx',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingm',
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      this.setState({downloadingDocx: false});
    }
  }

  async handleDownloadPdfReport() {
    try {
      this.setState({downloadingPdf: true});
      const response = await downloadPdfReport(this.rawReportData);
      saveArrayBuffer({
        arrayBuffer: response.data,
        fileName: this.makeReportFileName() + '.pdf',
        mimeType: 'application/pdf',
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      this.setState({downloadingPdf: false});
    }
  }

  async handleDownloadFullDocxReport() {
    try {
      this.setState({downloadingFullDocx: true});
      const {id} = this.props.match.params;
      const {data: fullReportResponse} = await getFullReportData(id);
      fullReportResponse.hits[0]._source.specificIncludes 
        = this.getSpecificIncludesFormValues();
      const response = await downloadFullDocxReport(fullReportResponse);
      saveArrayBuffer({
        arrayBuffer: response.data,
        fileName: this.makeFullReportFileName() + '.docx',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingm',
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      this.setState({downloadingFullDocx: false});
    }
  }

  makeReportFileName() {
    try {
      const {results: reportData} = this.state;
      const reportName = reportData.name;
      const reportComputerName = reportData.os.computer_name;
      return `syscom_report_${reportName}_${reportComputerName}`;
    } catch (err) {
      return 'syscom_report';
    }
  }

  makeFullReportFileName() {
    return this.makeReportFileName()
      .replace(/^syscom_/, 'syscom_full_');
  }

  render() {
    const {id: reportId} = this.props.match.params;
    const {results, downloadingDocx, downloadingPdf, downloadingFullDocx} = this.state;
    const score = calculateScore(results);
    return (
      <div className="grid-x grid-padding-x app-results">
        <div className="cell large-10 large-offset-1 medium-12 small-12">
          <div className="grid-x grid-margin-x head">
            <div className="cell large-2 medium-12 flex-container flex-dir-column">
              <div className="download-buttons-container">
                <button 
                  disabled={downloadingDocx}
                  title="Tải xuống báo cáo chuẩn định dạng DOCX"
                  className={`primary button expanded ${downloadingDocx ? 'disabled' : ''}`}
                  onClick={this.handleDownloadDocxReport}
                >
                  {
                    downloadingDocx
                      ? <Spinner />
                      : <svg viewBox="0 0 384 512" width="15" height="20">
                        <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm57.1 120H305c7.7 0 13.4 7.1 11.7 14.7l-38 168c-1.2 5.5-6.1 9.3-11.7 9.3h-38c-5.5 0-10.3-3.8-11.6-9.1-25.8-103.5-20.8-81.2-25.6-110.5h-.5c-1.1 14.3-2.4 17.4-25.6 110.5-1.3 5.3-6.1 9.1-11.6 9.1H117c-5.6 0-10.5-3.9-11.7-9.4l-37.8-168c-1.7-7.5 4-14.6 11.7-14.6h24.5c5.7 0 10.7 4 11.8 9.7 15.6 78 20.1 109.5 21 122.2 1.6-10.2 7.3-32.7 29.4-122.7 1.3-5.4 6.1-9.1 11.7-9.1h29.1c5.6 0 10.4 3.8 11.7 9.2 24 100.4 28.8 124 29.6 129.4-.2-11.2-2.6-17.8 21.6-129.2 1-5.6 5.9-9.5 11.5-9.5zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
                      </svg>
                  }
                </button>
                <button 
                  disabled={downloadingPdf}
                  title="Tải xuống báo cáo chuẩn định dạng PDF"
                  className={`primary button expanded ${downloadingPdf ? 'disabled' : ''}`}
                  onClick={this.handleDownloadPdfReport}
                >
                  {
                    downloadingPdf
                      ? <Spinner />
                      : <svg viewBox="0 0 384 512" width="15" height="20">
                        <path fill="currentColor" d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z" />
                      </svg>
                  }
                </button>
                <button 
                  disabled={downloadingFullDocx}
                  title="Tải xuống báo cáo đầy đủ"
                  className={`hollow primary button expanded ${downloadingFullDocx ? 'disabled' : ''}`}
                  onClick={this.handleDownloadFullDocxReport}
                >
                  {
                    downloadingFullDocx
                      ? <Spinner />
                      : <svg viewBox="0 0 384 512" width="15" height="20">
                        <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
                      </svg>
                  }
                </button>
              </div>
              <div className="score-time margin-bottom-1">
                <div className="score margin-bottom-1" style={{borderColor: getScoreColor(score)}}>
                  <div className="shadow inner">
                    {score}
                  </div>
                </div>
                <div className="time">
                  <div className="text-center font-bold">
                    {results.time ? moment(results.time).format('DD/MM/YYYY') : 'Không rõ thời gian'}
                  </div>
                  {
                    results.time
                      ? <div className="text-center">{moment(results.time).format('HH:mm:ss')}</div>
                      : null
                  }
                </div>
              </div>
              <div className="text-center">
                <span className="font-bold">Đợt đánh giá: </span>
                <span>{results.name || 'Không biết'}</span>
              </div>
            </div>
            <div className="cell large-10 medium-12">
              <OsinfoCard osInfo={results.os} />
            </div>
          </div>
          <div className="margin-bottom-2 body">
            <RisksTable results={results} />
          </div>
          <DeviceDetail 
            reportId={reportId} 
            specificIncludes={this.getSpecificIncludesFormValues()}
            onSpecificIncludesChange={this.handleSpecificIncludesFormChange}
          />
        </div>
      </div>
    );
  }
}

