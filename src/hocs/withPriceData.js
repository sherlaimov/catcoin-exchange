import React from 'react';

export default function withPriceData(Component) {
  return class WithPriceData extends React.Component {
    constructor() {
      super();
      this.state = {
        currency: '',
        price: 0
      };
      this.ws = new WebSocket('ws://coins-stream.demo.javascript.ninja');
    }
    componentDidMount() {
      this.ws.onopen = () => {
        console.log('subscribe');
        this.ws.send(JSON.stringify({ type: 'subscribe', currency: 'BTC' }));
      };
      this.ws.addEventListener('message', e => {
        this.messageHandler(e);
      });
    }

    componentWillUnmount() {
      this.ws.removeEventListener('message', this.messageHandler);
    }
    messageHandler(e) {
      let { currency } = JSON.parse(e.data);
      let { price } = JSON.parse(e.data);
      currency = currency.toUpperCase();
      price = parseFloat(price);
      this.setState({ price, currency });
    }
    render() {
      const { price, currency } = this.state;

      return <Component price={price} currency={currency} />;
    }
  };
}
