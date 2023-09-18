import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './pagination.scss';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.handlePreviousButtonClick = this.handlePreviousButtonClick.bind(this);
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
    this.handleNumberButtonClick = this.handleNumberButtonClick.bind(this);
  }

  isInFirstPageNow() {
    return this.props.pageNumber === 1;
  }

  isInLastPageNow() {
    const {pageNumber, pagingButtons} = this.props;
    const lastPageNumber = pagingButtons[pagingButtons.length - 1];
    return pageNumber === lastPageNumber;
  }

  handlePreviousButtonClick() {
    if (!this.isInFirstPageNow()) {
      this.props.onPageNumberChange(this.props.pageNumber - 1);
    }
  }

  handleNextButtonClick() {
    if (!this.isInLastPageNow()) {
      this.props.onPageNumberChange(this.props.pageNumber + 1);
    }
  }

  handleNumberButtonClick(number) {
    this.props.onPageNumberChange(number);
  }

  render() {
    const {pageNumber, pagingButtons} = this.props;
    return (
      <nav aria-label="Pagination">
        <ul className="pagination app-pagination">
          <PaginationPreviousButton 
            disabled={this.isInFirstPageNow()} 
            onClick={this.handlePreviousButtonClick}
          />
          {
            pagingButtons.map((number, i) => (
              <PaginationNumberButton 
                key={i} 
                number={number} 
                isActive={number === pageNumber} 
                onClick={this.handleNumberButtonClick}
              />
            ))
          }
          <PaginationNextButton 
            disabled={this.isInLastPageNow()} 
            onClick={this.handleNextButtonClick}
          />
        </ul>
      </nav>
    );
  }
}

function PaginationPreviousButton({disabled, onClick}) {
  return (
    <li className={`pagination-previous ${disabled ? 'disabled' : ''}`}>
      {
        disabled 
          ? 'Trang trước'
          : <a href="#!" aria-label="Previous page" onClick={onClick}>Trang trước</a>
      }
    </li>
  );
}

function PaginationNextButton({disabled, onClick}) {
  return (
    <li className={`pagination-next ${disabled ? 'disabled' : ''}`}>
      {
        disabled 
          ? 'Trang sau'
          : <a href="#!" aria-label="Next page" onClick={onClick}>Trang sau</a>
      }
    </li>
  );
}

function PaginationNumberButton({number, isActive, onClick}) {
  if (!number) {
    return <li className="ellipsis" aria-hidden="true"></li>;
  }
  if (isActive) {
    return <li className="current">{number}</li>;
  }
  return (
    <li>
      <a href="#!" aria-label={`Page ${number}`} onClick={() => {onClick(number)}}>{number}</a>
    </li>
  );
}

Pagination.propTypes = {
  pagingButtons: PropTypes.arrayOf(PropTypes.number),
  pageNumber: PropTypes.number,
  onPageNumberChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  pagingButtons: [1],
  pageNumber: 1,
};
