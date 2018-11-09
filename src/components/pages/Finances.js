import React, { Component } from 'react';

export default class Finances extends Component {
  constructor(props) {
    super(props);
    this.state = { api: 'Api' };
  }

  render() {
    const { api } = this.state;
    return <div>Finances {api} </div>;
  }
}
