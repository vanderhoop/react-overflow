import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResizeDetector from './ResizeDetector';

export default class OverflowDetector extends Component {
  static propTypes = {
    onOverflowChange: PropTypes.func,
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);
    this.isOverflowed = false;
    this.domElement = null;
    this.setDOMElement = this.setDOMElement.bind(this);
    this.checkOverflow = this.checkOverflow.bind(this);
  }

  componentDidMount() {
    this.checkOverflow();
  }

  componentDidUpdate() {
    this.checkOverflow();
  }

  setDOMElement(domElement) {
    this.domElement = domElement;
  }

  checkOverflow() {
    const that = this

    const timer = setTimeout(() => {
      const isOverflowed =
        that.domElement.scrollWidth > that.domElement.clientWidth ||
        that.domElement.scrollHeight > that.domElement.clientHeight;

      if (isOverflowed !== that.isOverflowed) {
        that.isOverflowed = isOverflowed;
        if (that.props.onOverflowChange) {
          that.props.onOverflowChange(isOverflowed);
        }
      }

      clearTimeout(timer);
    }, 150)
  }

  render() {
    const { style, className, children } = this.props;

    return (
      <div
        ref={this.setDOMElement}
        style={{ ...style, position: 'relative' }}
        className={className}
      >
        {children}
        <ResizeDetector onResize={this.checkOverflow} />
      </div>
    );
  }
}
