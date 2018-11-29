import React, { Component } from 'react';
import PageTitle from '../layout/PageTitle';

export default class Finances extends Component {
  constructor(props) {
    super(props);
    this.state = { api: 'Api' };
  }

  render() {
    const { api } = this.state;
    return (
      <div data-testid="finances-page">
        <PageTitle title="Financial Information" />
        <p>Finances {api} </p>
      </div>
    );
  }
}
