import React, { Component } from 'react';
import PageTitle from '../ui/PageTitle';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { api: 'Api' };
  }

  render() {
    const { api } = this.state;
    return (
      <div data-testid="events-page">
        <PageTitle title="Events" />
        <p>Events {api} </p>
      </div>
    );
  }
}
