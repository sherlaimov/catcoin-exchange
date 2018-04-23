import React from 'react';
import Api from '../../helpers/WebsocketHandler';
import Widget from '../../components/Widget@0.3';

export default class DemoWidget extends React.Component {
  constructor() {
    super();
    this.api = new Api();
  }
  render() {
    return <Widget height={150} width={300} api={this.api} currency="BTC" />;
  }
}
