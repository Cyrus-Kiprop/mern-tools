import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NumInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.format_to_str(this.props.value)
    };
    // binding of functions
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onBlur(e) {
    this.props.onChange(e, this.unformat_to_num(this.state.value));
  }

  onChange(e) {
    if (e.target.value.match(/^\d*$/g)) {
      this.setState({ value: e.target.value });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ value: this.format_to_str(nextProps.value) });
  }

  format_to_str(num) {
    return num != null ? num.toString() : '';
  }

  unformat_to_num(str) {
    // converts to a decimal number
    const val = parseInt(str, 10);
    return isNaN(val) ? null : val;
  }

  render() {
    return (
      <input
        type="text"
        {...this.props}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    );
  }
}
NumInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
