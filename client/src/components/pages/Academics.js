import React, { Component } from 'react';
import Courses from '../Courses';

export default class Academics extends Component {
  constructor(props) {
    super(props);
    this.state = { api: 'Api' };
  }

  render() {
    const { api } = this.state;
    return (
      <div>
        <Courses />
        <p>Thisis: {api}</p>
      </div>
    );
  }
}
