import React, { Component } from 'react';
import PageTitle from '../layout/PageTitle';

export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = { api: 'Api' };
  }

  render() {
    const { api } = this.state;
    return (
      <div data-testid="services-page">
        <PageTitle title="Tools and Services" />
        <p>Services {api} </p>
      </div>
    );
  }
}
