import React, {Fragment} from 'react';

import imgAgent1Src from 'assets/images/agent1.png';
import imgAgent2Src from 'assets/images/agent2.png';
import imgAgent3Src from 'assets/images/agent3.png';
import imgSv1Src from 'assets/images/sv1.jpeg';
import imgSv2Src from 'assets/images/sv2.jpeg';
import imgSv3Src from 'assets/images/sv3.jpeg';
import imgSv4Src from 'assets/images/sv4.jpeg';

import {getGuideDatastructureInnerHtml} from 'utils/util-guide-datastructure';

import AboutPage from 'abstractions/about-page/about-page';
import TopbarNoauthen from 'components/topbar-noauthen/topbar-noauthen';
import Topbar from 'components/topbar/topbar';
import Footer from 'components/footer/footer';

import './guide.scss';

export default class Guide extends AboutPage {
  constructor(props) {
    super(props);
    this.dataStructureRef = React.createRef();
  }

  componentDidMount() {
    super.componentDidMount();
    this.dataStructureRef.current.innerHTML = getGuideDatastructureInnerHtml();
  }

  render() {
    const {search, isAuthenticated} = this.state;
    return (
      <Fragment>
        {
          isAuthenticated !== null
            ? isAuthenticated 
              ? <Topbar search={search} onSearchChange={this.handleSearchChange} />
              : <TopbarNoauthen />
            : null
        }
        <div className="grid-x grid-padding-x app-guide">
          <div className="cell large-6 large-offset-3 medium-10 medium-offset-1 small-12">
            <h3 className="text-center text-uppercase margin-bottom-2">Hướng dẫn</h3>

            <h5>I. Client</h5>
            <p className="text-justify">1. Chạy client với quyền administration</p>
            <p className="text-center">
              <img alt="agent 1" className="photo" src={imgAgent1Src} />
            </p>
            <p className="text-justify">2. Nhập tên đánh giá, tick chọn các thông tin cần thu thập và bắt đầu chạy</p>
            <p className="text-center">
              <img alt="agent 2" className="photo" src={imgAgent2Src} />
            </p>
            <p className="text-justify">3. Sau khi thu thập xong, ấn vào kết thúc và upload file báo cáo lên máy chủ</p>
            <p className="text-center">
              <img alt="agent 3" className="photo" src={imgAgent3Src} />
            </p>

            <h5>II. Server - tải lên báo cáo</h5>
            <p className="text-justify">1. Kéo thả file báo cáo lên và click vào nút tải lên</p>
            <p className="text-center">
              <img alt="server 1" className="photo" src={imgSv1Src} />
            </p>
            <p className="text-justify">2. Sau khi thông tin được đánh giá xong, thông tin về tình trạng ATTT của máy được hiện ra</p>
            <p className="text-center">
              <img alt="server 2" className="photo" src={imgSv2Src} />
            </p>
            <h5>III. Server - tìm kiếm</h5>
            <p className="text-justify">1. Vào mục tìm kiếm</p>
            <p className="text-center">
              <img alt="server 3" className="photo" src={imgSv3Src} />
            </p>
            <p className="text-justify">2. Tìm kiếm các máy tính có sử dụng 7zip và phiên bản 19.00 với câu truy vấn `softwares.name:"7-zip" AND  softwares.version:19.00` tìm kiếm các thông tin khác cũng tương tự theo cấu trúc dữ liệu ở dưới</p>
            <p className="text-center">
              <img alt="server 4" className="photo" src={imgSv4Src} />
            </p>
            <h5>IV. Cấu trúc dữ liệu</h5>
            <pre className="data-structure margin-bottom-1">
              <code ref={this.dataStructureRef} />
            </pre>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}
