import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { WebSocket } from 'mock-socket';
import PriceWidget from './PriceWidget';
import Api from '../../helpers/WebsocketHandler';

window.WebSocket = WebSocket;
const props = {
  dotsArray: [[1, 34], [2, 5], [3, 19]],
  width: 500,
  height: 300,
  price: 13,
  growth: 0.3,
  minY: 14,
  maxY: 24,
  priceDiff: 2
};

describe('PriceWidget test group', () => {
  it('shows PriceWidget if a proper state is set', () => {
    const api = new Api();
    const tree = shallow(<PriceWidget api={api} currency="BTC" />);
    tree.setState({ ...props });
    expect(tree.find('.price-widget')).toHaveLength(1);
  });

  it('shows Loading SVG if no data supplied', () => {
    const api = new Api();
    const state = {
      dotsArray: []
    };
    const tree = shallow(<PriceWidget api={api} currency="BTC" />);
    tree.setState({ ...state });
    expect(tree.find('.loading')).toHaveLength(1);
  });

  it('if price > than the previous price, tspan.price gets class green', () => {
    const api = new Api();
    const tree = mount(<PriceWidget api={api} currency="BTC" />);
    tree.setState({ ...props });
    tree.setState({ priceDiff: -2 });
    expect(tree.find('tspan.price').hasClass('green')).toBeTruthy();
    // tree.unmount();
  });

  it('if price < than the previous price, tspan.price gets class red', () => {
    const api = new Api();
    const tree = mount(<PriceWidget api={api} currency="BTC" />);
    tree.setState({ ...props });
    tree.setState({ priceDiff: 2 });
    expect(tree.find('tspan.price').hasClass('red')).toBeTruthy();
  });

  it('calculateWidgetData sets values for price, minY, maxY', () => {
    const api = new Api();
    const Component = <PriceWidget api={api} currency="BTC" />;
    const tree = shallow(Component);
    tree.instance().calculateWidgetData({ price: 21 });
    expect(tree.state('price')).toBe(21);
    expect(tree.state('minY')).toBe(21);
    expect(tree.state('maxY')).toBe(21);
    expect(tree.state('growth')).toBe(0);
  });

  it('calculateWidgetData sets correct growth value', () => {
    const api = new Api();
    const Component = <PriceWidget api={api} currency="BTC" />;
    const tree = shallow(Component);
    tree.instance().calculateWidgetData({ price: 21 });
    expect(tree.state('growth')).toBe(0);
  });

  it('incoming price value must be over 0', () => {
    const api = new Api();
    const Component = <PriceWidget api={api} currency="BTC" />;
    const tree = shallow(Component);
    tree.instance().calculateWidgetData({ price: -1 });
    expect(tree.state('price')).toBe(null);
  });

  it('if growth is < than previous value, tspan.growth gets red class', () => {
    const api = new Api();
    const Component = <PriceWidget api={api} currency="BTC" />;
    const tree = mount(Component);
    tree.setState({ ...props });
    tree.setState({ growth: -0.2 });
    expect(tree.find('tspan.growth').hasClass('red')).toBeTruthy();
  });

  it('if growth is > than previous value, tspan.growth gets green class', () => {
    const api = new Api();
    const Component = <PriceWidget api={api} currency="BTC" />;
    const tree = mount(Component);
    tree.setState({ ...props });
    tree.setState({ growth: 0.2 });
    expect(tree.find('tspan.growth').hasClass('green')).toBeTruthy();
  });

  it('PriceWidget calls componentWillUnmount before unmounting', () => {
    const api = new Api();
    const Component = <PriceWidget api={api} currency="BTC" />;
    const tree = mount(Component);
    const componentWillUnmount = jest.spyOn(tree.instance(), 'componentWillUnmount');
    tree.unmount();
    expect(componentWillUnmount).toHaveBeenCalled();
  });
});
