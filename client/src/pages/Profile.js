import React, { Component } from 'react';
import PageTitle from '../ui/PageTitle';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { api: 'Api' };
  }

  render() {
    const { api } = this.state;
    return (
      <div data-testid="profile-page">
        <PageTitle title="My Profile" />
        <p>Profile {api} </p>
      </div>
    );
  }
}
