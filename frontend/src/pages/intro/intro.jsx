import React, {Fragment} from 'react';

import AboutPage from 'abstractions/about-page/about-page';
import TopbarNoauthen from 'components/topbar-noauthen/topbar-noauthen';
import Topbar from 'components/topbar/topbar';
import Footer from 'components/footer/footer';

import './intro.scss';

export default class Intro extends AboutPage {
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
        <div className="grid-x grid-padding-x app-intro">
          <div className="cell large-6 large-offset-3 medium-10 medium-offset-1 small-12">
            <h3 className="text-center text-uppercase margin-bottom-2">Giới thiệu</h3>
            <p className="text-justify">
              Mobile Computer Testing System là bộ công cụ đánh giá máy tính cơ động phục vụ việc phân tích, đánh giá từ cơ bản đến nâng cao tình trạng ATTT của các máy tính chạy trên các nền tảng khác nhau (x86, x64, ...), hỗ trợ cán bộ kỹ thuật thu thập, tìm kiếm và phân tích dữ liệu tự động từ các máy tính, đồng thời trích xuất báo cáo theo ngôn ngữ tiếng Việt với giao diện trực quan.
            </p>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}
