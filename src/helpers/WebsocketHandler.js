class Api {
  constructor() {
    this.listeners = [];
    this.subscribedCurrencies = new Set();
    this.ws = new WebSocket('ws://coins-stream.demo.javascript.ninja');
    this.ws.onopen = () => {
      this.initializeSubscriptions();
    };
    this.ws.addEventListener('message', e => {
      this.messageHandler(e);
    });
  }
  messageHandler(e) {
    const { currency } = JSON.parse(e.data);
    let { price } = JSON.parse(e.data);
    price = parseFloat(price);
    this.broadcast({ currency, price });
  }

  broadcast = ({ currency, price }) => {
    this.listeners.map(lis => {
      lis({ currency, price });
    });
  };
  subscribe = fn => {
    this.listeners.push(fn);
  };
  recordCurrency = currency => {
    this.subscribedCurrencies.add(currency);
  };
  initializeSubscriptions() {
    this.subscribedCurrencies.forEach(currency => {
      console.log(`Subscribe to ${currency}`);
      this.ws.send(JSON.stringify({ type: 'subscribe', currency }));
    });
  }

  cleanUpWSConnections(currency) {
    console.log(`Unsubscribe from ${currency}`);
    this.ws.send(JSON.stringify({ type: 'unsubscribe', currency }));
    this.ws.removeEventListener('message', this.messageHandler);
    this.subscribedCurrencies.delete(currency);
    if (this.subscribedCurrencies.size === 0) {
      this.ws.close();
    }
  }
}

export default Api;
