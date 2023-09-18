import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fullreportResponseAdapter} from 'antonydb-adapters';

import {getFullReportData} from 'apis/api-results';

import Spinner from 'components/spinner/spinner';
import DeviceDetailCollapse, {CollapseHead, CollapseBody} from './device-detail-collapse/device-detail-collapse';
import DeviceDetailListObject from './device-detail-list-object';
import DeviceDetailListPrimitive from './device-detail-list-primitive';

import './device-detail.scss';

export default class DeviceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeviceDetail: false,
      isLoadingDeviceDetail: false,
      deviceDetail: {},
    };
    this.handleShowDeviceDetail = this.handleShowDeviceDetail.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reportId !== this.props.reportId) {
      this.hideDeviceDetail(); 
      this.clearCurrentDeviceDetail();
    }
  }

  async apiGetDeviceDetail() {
    try {
      this.toggleLoadingDeviceDetail();
      const {reportId} = this.props;
      const {data: fullReportResponse} = await getFullReportData(reportId);
      const {extended: deviceDetail} = fullreportResponseAdapter.adapt(fullReportResponse);
      this.setState({deviceDetail});
      this.showDeviceDetail();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      this.toggleLoadingDeviceDetail();
    }
  }

  showDeviceDetail() {
    this.setState({isShowDeviceDetail: true});
  }

  hideDeviceDetail() {
    this.setState({isShowDeviceDetail: false});
  }

  clearCurrentDeviceDetail() {
    this.setState({deviceDetail: {}});
  }

  toggleLoadingDeviceDetail() {
    this.setState({isLoadingDeviceDetail: !this.state.isLoadingDeviceDetail});
  }

  handleShowDeviceDetail() {
    this.apiGetDeviceDetail();
  }

  render() {
    const {specificIncludes, onSpecificIncludesChange} = this.props;
    const {isShowDeviceDetail, isLoadingDeviceDetail, deviceDetail} = this.state;
    return (
      isLoadingDeviceDetail
        ? <div className="text-center"><Spinner /></div>
        : isShowDeviceDetail
          ? (
            <div className="app-device-detail">
              <p>Tích chọn các mục sau để đưa vào báo cáo đầy đủ</p>
              <DeviceDetailCollapse>
                <CollapseHead>
                  <div className="flex-container align-middle" onClick={(e) => {e.stopPropagation()}}>
                    <input 
                      id="hardware_checkbox" 
                      type="checkbox"
                      checked={specificIncludes.hardware}
                      onChange={(e) => {onSpecificIncludesChange('hardware', e.target.checked)}}
                    />
                    <label htmlFor="hardware_checkbox">1. Phần cứng</label>
                  </div>
                </CollapseHead>
                <CollapseBody>
                  <DeviceDetailCollapse>
                    <CollapseHead>Bo mạch chủ</CollapseHead>
                    <CollapseBody>
                      <DeviceDetailListObject objects={deviceDetail.hardware.main_board} titleProp="product" />
                    </CollapseBody>
                  </DeviceDetailCollapse>
                  <DeviceDetailCollapse>
                    <CollapseHead>BIOS</CollapseHead>
                    <CollapseBody>
                      <DeviceDetailListObject objects={deviceDetail.hardware.bios} titleProp="name" />
                    </CollapseBody>
                  </DeviceDetailCollapse>
                  <DeviceDetailCollapse>
                    <CollapseHead>CPUs</CollapseHead>
                    <CollapseBody>
                      <DeviceDetailListObject objects={deviceDetail.hardware.cpus} titleProp="name" />
                    </CollapseBody>
                  </DeviceDetailCollapse>
                  <DeviceDetailCollapse>
                    <CollapseHead>Bộ nhớ</CollapseHead>
                    <CollapseBody>
                      <DeviceDetailListObject objects={deviceDetail.hardware.memories} titleProp="caption" />
                    </CollapseBody>
                  </DeviceDetailCollapse>
                  <DeviceDetailCollapse>
                    <CollapseHead>Bộ xử lý đồ hoạ</CollapseHead>
                    <CollapseBody>
                      <DeviceDetailListObject objects={deviceDetail.hardware.graphics} titleProp="name" />
                    </CollapseBody>
                  </DeviceDetailCollapse>
                  <DeviceDetailCollapse>
                    <CollapseHead>Phân vùng ổ cứng</CollapseHead>
                    <CollapseBody>
                      <DeviceDetailListObject objects={deviceDetail.hardware.storage.logical} titleProp="caption" />
                    </CollapseBody>
                  </DeviceDetailCollapse>
                  <DeviceDetailCollapse>
                    <CollapseHead>Ổ cứng vật lý</CollapseHead>
                    <CollapseBody>
                      <DeviceDetailListObject objects={deviceDetail.hardware.storage.physical} titleProp="caption" />
                    </CollapseBody>
                  </DeviceDetailCollapse>
                  <DeviceDetailCollapse>
                    <CollapseHead>PCIS</CollapseHead>
                    <CollapseBody>
                      <DeviceDetailListObject objects={deviceDetail.hardware.pcis} titleProp="name" />
                    </CollapseBody>
                  </DeviceDetailCollapse>
                  <DeviceDetailCollapse>
                    <CollapseHead>USBS</CollapseHead>
                    <CollapseBody>
                      <DeviceDetailListObject objects={deviceDetail.hardware.usbs} titleProp="name" />
                    </CollapseBody>
                  </DeviceDetailCollapse>
                </CollapseBody>
              </DeviceDetailCollapse>
              <DeviceDetailCollapse>
                <CollapseHead>
                  <div className="flex-container align-middle" onClick={(e) => {e.stopPropagation()}}>
                    <input 
                      id="softwares_checkbox" 
                      type="checkbox"
                      checked={specificIncludes.softwares}
                      onChange={(e) => {onSpecificIncludesChange('softwares', e.target.checked)}}
                    />
                    <label htmlFor="softwares_checkbox">2. Phần mềm</label>
                  </div>
                </CollapseHead>
                <CollapseBody>
                  <DeviceDetailListObject objects={deviceDetail.softwares} titleProp="name" />
                </CollapseBody>
              </DeviceDetailCollapse>
              <DeviceDetailCollapse>
                <CollapseHead>
                  <div className="flex-container align-middle" onClick={(e) => {e.stopPropagation()}}>
                    <input 
                      id="processes_checkbox" 
                      type="checkbox"
                      checked={specificIncludes.processes}
                      onChange={(e) => {onSpecificIncludesChange('processes', e.target.checked)}}
                    />
                    <label htmlFor="processes_checkbox">3. Tiến trình</label>
                  </div>
                </CollapseHead>
                <CollapseBody>
                  <DeviceDetailListObject objects={deviceDetail.processes} titleProp="name" />
                </CollapseBody>
              </DeviceDetailCollapse>
              <DeviceDetailCollapse>
                <CollapseHead>
                  <div className="flex-container align-middle" onClick={(e) => {e.stopPropagation()}}>
                    <input 
                      id="networks_checkbox" 
                      type="checkbox"
                      checked={specificIncludes.networks}
                      onChange={(e) => {onSpecificIncludesChange('networks', e.target.checked)}}
                    />
                    <label htmlFor="networks_checkbox">4. Kết nối mạng</label>
                  </div>
                </CollapseHead>
                <CollapseBody>
                  <DeviceDetailCollapse>
                    <CollapseHead>Tên miền đã truy cập</CollapseHead>
                    <CollapseBody>
                      <DeviceDetailListPrimitive objects={deviceDetail.networks.dns_cache} />
                    </CollapseBody>
                  </DeviceDetailCollapse>
                  <DeviceDetailCollapse>
                    <CollapseHead>Cổng kết nối đã mở</CollapseHead>
                    <CollapseBody>
                      <DeviceDetailListObject objects={deviceDetail.networks.netstat} titleProp="state" />
                    </CollapseBody>
                  </DeviceDetailCollapse>
                </CollapseBody>
              </DeviceDetailCollapse>
              <DeviceDetailCollapse>
                <CollapseHead>
                  <div className="flex-container align-middle" onClick={(e) => {e.stopPropagation()}}>
                    <input 
                      id="networks_adapter_checkbox" 
                      type="checkbox"
                      checked={specificIncludes.networks_adapter}
                      onChange={(e) => {onSpecificIncludesChange('networks_adapter', e.target.checked)}}
                    />
                    <label htmlFor="networks_adapter_checkbox">5. Giao diện mạng</label>
                  </div>
                </CollapseHead>
                <CollapseBody>
                  <DeviceDetailListObject objects={deviceDetail.networks_adapter} titleProp="AdapterDesc" />
                </CollapseBody>
              </DeviceDetailCollapse>
              <DeviceDetailCollapse>
                <CollapseHead>
                  <div className="flex-container align-middle" onClick={(e) => {e.stopPropagation()}}>
                    <input 
                      id="files_checkbox" 
                      type="checkbox"
                      checked={specificIncludes.files}
                      onChange={(e) => {onSpecificIncludesChange('files', e.target.checked)}}
                    />
                    <label htmlFor="files_checkbox">6. Tập tin</label>
                  </div>
                </CollapseHead>
                <CollapseBody>
                  <DeviceDetailListObject objects={deviceDetail.files} titleProp="image" />
                </CollapseBody>
              </DeviceDetailCollapse>
              <DeviceDetailCollapse>
                <CollapseHead>
                  <div className="flex-container align-middle" onClick={(e) => {e.stopPropagation()}}>
                    <input 
                      id="printers_checkbox" 
                      type="checkbox"
                      checked={specificIncludes.printers}
                      onChange={(e) => {onSpecificIncludesChange('printers', e.target.checked)}}
                    />
                    <label htmlFor="printers_checkbox">7. Máy in</label>
                  </div>
                </CollapseHead>
                <CollapseBody>
                  <DeviceDetailListObject objects={deviceDetail.printers} titleProp="name" />
                </CollapseBody>
              </DeviceDetailCollapse>
              <DeviceDetailCollapse>
                <CollapseHead>
                  <div className="flex-container align-middle" onClick={(e) => {e.stopPropagation()}}>
                    <input 
                      id="security_settings_checkbox" 
                      type="checkbox"
                      checked={specificIncludes.security_settings}
                      onChange={(e) => {onSpecificIncludesChange('security_settings', e.target.checked)}}
                    />
                    <label htmlFor="security_settings_checkbox">8. Cài đặt bảo mật</label>
                  </div>
                </CollapseHead>
                <CollapseBody>
                  <table className="margin-bottom-0">
                    <tbody>
                      {
                        Object.keys(deviceDetail.security_settings).map((prop) => (
                          <tr key={prop}>
                            <td>{prop}</td>
                            <td>{deviceDetail.security_settings[prop]}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </CollapseBody>
              </DeviceDetailCollapse>
              <DeviceDetailCollapse>
                <CollapseHead>
                  <div className="flex-container align-middle" onClick={(e) => {e.stopPropagation()}}>
                    <input 
                      id="autoruns_checkbox" 
                      type="checkbox"
                      checked={specificIncludes.autoruns}
                      onChange={(e) => {onSpecificIncludesChange('autoruns', e.target.checked)}}
                    />
                    <label htmlFor="autoruns_checkbox">9. Tự động khởi chạy</label>
                  </div>
                </CollapseHead>
                <CollapseBody>
                  <DeviceDetailListObject objects={deviceDetail.autoruns} titleProp="name" />
                </CollapseBody>
              </DeviceDetailCollapse>
              <DeviceDetailCollapse>
                <CollapseHead>
                  <div className="flex-container align-middle" onClick={(e) => {e.stopPropagation()}}>
                    <input 
                      id="services_checkbox" 
                      type="checkbox"
                      checked={specificIncludes.services}
                      onChange={(e) => {onSpecificIncludesChange('services', e.target.checked)}}
                    />
                    <label htmlFor="services_checkbox">10. Dịch vụ</label>
                  </div>
                </CollapseHead>
                <CollapseBody>
                  <DeviceDetailListObject objects={deviceDetail.services} titleProp="name" />
                </CollapseBody>
              </DeviceDetailCollapse>
            </div>
          ) : (
            <div className="text-center app-device-detail">
              <span className="show-detail-button" onClick={this.handleShowDeviceDetail}>
                Xem chi tiết thiết bị
              </span>
            </div>
          )
    );
  }
}

DeviceDetail.propTypes = {
  reportId: PropTypes.string.isRequired,
  specificIncludes: PropTypes.shape({
    printers: PropTypes.bool.isRequired,
    processes: PropTypes.bool.isRequired,
    softwares: PropTypes.bool.isRequired,
    networks_adapter: PropTypes.bool.isRequired,
    security_settings: PropTypes.bool.isRequired,
    services: PropTypes.bool.isRequired,
    networks: PropTypes.bool.isRequired,
    autoruns: PropTypes.bool.isRequired,
    files: PropTypes.bool.isRequired,
    hardware: PropTypes.bool.isRequired,   
  }),
  onSpecificIncludesChange: PropTypes.func.isRequired,
};

DeviceDetail.defaultProps = {
  reportId: '',
};
