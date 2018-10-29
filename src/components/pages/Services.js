import React, { Component } from 'react';

export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = { api: 'Api' };
  }

  render() {
    const { api } = this.state;
    return <div>Services {api} </div>;
  }
}
