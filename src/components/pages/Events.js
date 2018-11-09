import React, { Component } from 'react';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { api: 'Api' };
  }

  render() {
    const { api } = this.state;
    return <div>Events {api} </div>;
  }
}
