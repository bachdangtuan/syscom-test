import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment';

import {extractOneHighlightInfo} from 'utils/util-search-highlight';

import OsinfoCard from 'components/osinfo-card/osinfo-card';

export default class ResultItem extends Component {
  constructor() {
    super();
    this.highlightValueElement = React.createRef();
  }

  componentDidMount() {
    this.manualUpdateHighlightValue();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.result !== this.props.result) {
      this.manualUpdateHighlightValue();
    }
  }

  manualUpdateHighlightValue() {
    const currentHighlightValueElement = this.highlightValueElement.current;
    currentHighlightValueElement.innerHTML = currentHighlightValueElement.dataset.content;
  }

  render() {
    const {result, onDelete} = this.props;
    const highlightInfo = extractOneHighlightInfo(result.highlight);
    return (
      <div className="result-item margin-bottom-1">
        <div className="flex-container align-middle align-justify title-container">
          <div className="flex-container align-middle result-item-title">
            <Link to={`/home/results/${result._id}`} className="h5 margin-0 name">
              {result.name}
            </Link>
            {/* <span className="font-bold margin-left-1 score" style={{borderColor: getScoreColor(result.score)}}>
              {result.score}
            </span> */}
            <span className="margin-left-1 time">
              {moment(result.time).format('DD/MM/YYYY HH:mm:ss')}
            </span>
          </div>
          <button 
            type="button" 
            title="Xoá báo cáo"
            className="tiny hollow button alert margin-0 delete-report-button"
            onClick={() => {onDelete(result._id)}}
          >
            <i className="fi-trash icon" />
          </button>
        </div>
        <div className="margin-bottom-1 result-item-highlight">
          <span className="unimportant">Trùng khớp:</span>
          &nbsp;<span>{highlightInfo.field}:</span>
          &nbsp;<span ref={this.highlightValueElement} data-content={highlightInfo.value} />
        </div>
        <OsinfoCard noHeader osInfo={result.os} />
      </div>
    );
  }
}

ResultItem.propTypes = {
  result: PropTypes.shape({
    Id: PropTypes.string,
    done: PropTypes.bool,
    highlight: PropTypes.object,
    name: PropTypes.string,
    os: PropTypes.object,
    time: PropTypes.string,
    _id: PropTypes.string,
  }),
  onDelete: PropTypes.func.isRequired,
}
