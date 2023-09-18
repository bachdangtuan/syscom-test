import React, {Fragment} from 'react';

import AboutPage from 'abstractions/about-page/about-page';
import TopbarNoauthen from 'components/topbar-noauthen/topbar-noauthen';
import Topbar from 'components/topbar/topbar';
import Footer from 'components/footer/footer';

import './contact.scss';

export default class Contact extends AboutPage {
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
        <div className="grid-x grid-padding-x app-contact">
          <div className="cell large-6 large-offset-3 medium-10 medium-offset-1 small-12">
            <h3 className="text-center text-uppercase margin-bottom-2">Liên hệ</h3>
            <h6 className="text-center">
              -
            </h6>
            <p className="text-center">
              <i className="fi-marker" /> 123 Example St.
              <br />
              <a href="mailto:email@example.com" className="email">
                <i className="fi-mail" /> email@example.com
              </a>
            </p>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}
