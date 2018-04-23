import React, { Fragment } from 'react';
import Widget from '../../components/Widget@0.3';
import Api from '../../helpers/WebsocketHandler';

export default class DemoWidget extends React.Component {
  constructor() {
    super();
    this.api = new Api();
  }

  render() { 
    return (
      <Fragment>
        <Widget api={this.api} currency="BTC" />
        <Widget api={this.api} currency="ETC" />
        <Widget api={this.api} currency="BCH" />
      </Fragment>
    );
  }
}
