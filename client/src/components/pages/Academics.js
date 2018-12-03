import React, { Component } from 'react';
import Courses from '../Courses';
import PageTitle from '../layout/PageTitle';

export default class Academics extends Component {
  constructor(props) {
    super(props);
    this.state = { api: 'Api' };
  }

  render() {
    const { api } = this.state;
    return (
      <div data-testid="academics-page">
        <PageTitle title="Academics" />
        <Courses />
        <p>Thisis: {api}</p>
      </div>
    );
  }
}
