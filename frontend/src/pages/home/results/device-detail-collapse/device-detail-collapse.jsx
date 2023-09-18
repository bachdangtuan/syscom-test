import React, {Component} from 'react';

import CollapseHead from './collapse-head';
import CollapseBody from './collapse-body';

import './device-detail-collapse.scss';

export default class DeviceDetailCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  getCollapseHeadChildElement() {
    const {children} = this.props;
    return React.Children.toArray(children)
      .filter((child) => child.type === CollapseHead)[0];
  }

  getCollapseBodyChildElement() {
    const {children} = this.props;
    return React.Children.toArray(children)
      .filter((child) => child.type === CollapseBody)[0];
  }

  cloneCollapseHeadElementWithColtrolledProps(collapseHeadElement) {
    return collapseHeadElement 
      ? React.cloneElement(
        collapseHeadElement, 
        {
          expanded: this.state.expanded,
          onToggleExpand: this.handleToggleExpand.bind(this),
        },
      )
      : null;
  }

  cloneCollapseBodyElementWithColtrolledProps(collapseBodyElement) {
    return collapseBodyElement
      ? React.cloneElement(
        collapseBodyElement, 
        {
          expanded: this.state.expanded,
        },
      )
      : null;
  }

  handleToggleExpand() {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    return (
      <div className="app-device-detail-collapse">
        {this.cloneCollapseHeadElementWithColtrolledProps(this.getCollapseHeadChildElement())}
        {this.cloneCollapseBodyElementWithColtrolledProps(this.getCollapseBodyChildElement())}
      </div>
    );
  }
}

export {CollapseHead, CollapseBody};
