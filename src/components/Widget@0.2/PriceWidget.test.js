import React from 'react';
import { shallow, render, mount } from 'enzyme';
import PriceWidget from './PriceWidget';
import Widget from './Widget';

const props = {
  dotsArray: [[1, 34], [2, 5], [3, 19]],
  width: 500,
  height: 300,
  price: 13,
  growth: 0.3,
  currency: 'BTC',
  minY: 14,
  maxY: 24,
  priceDiff: 2,
  baseLineFactor: 1.2
};

it('shows PriceWidget if data is supplied', () => {
  const tree = mount(<PriceWidget {...props} />);
  expect(tree.find('.price-widget')).toHaveLength(1);
});

it('shows Loading SVG if no data supplied', () => {
  const props = {
    dotsArray: [],
    width: 500,
    height: 300
  };
  const tree = shallow(<PriceWidget {...props} />);
  expect(tree.find('.loading')).toHaveLength(1);
});

it('if price > than the previous price, tspan.price gets class green', () => {
  const tree = mount(<PriceWidget {...props} priceDiff={-2} />);
  expect(tree.find('tspan.price').hasClass('green')).toBeTruthy();
});

it('if price < than the previous price, tspan.price gets class red', () => {
  const tree = mount(<PriceWidget {...props} priceDiff={2} />);
  expect(tree.find('tspan.price').hasClass('red')).toBeTruthy();
});

it('calculateWidgetData gets called on componentWillReceiveProps and sets correct state', () => {
  const Component = <Widget price={0} currency={'Blah'} />;
  const tree = shallow(Component);
  tree.setProps({ price: 21, currency: 'BTC' });
  expect(tree.state('price')).toBe(21);
  expect(tree.state('minY')).toBe(21);
  expect(tree.state('maxY')).toBe(21);
  expect(tree.state('growth')).toBe(0);
  expect(tree.state('currency')).toBe('BTC');
});

it('incoming price value must be over 0', () => {
  const Component = <Widget price={0} currency={'Blah'} />;
  const tree = shallow(Component);
  tree.setProps({ price: -1, currency: 'BTC' });
  expect(tree.state('price')).toBe(null);
});

it('if growth is < than previous value, tspan.growth gets red class', () => {
  const Component = <PriceWidget {...props} growth={-0.2} />;
  const tree = mount(Component);
  expect(tree.find('tspan.growth').hasClass('red')).toBeTruthy();
});

it('if growth is > than previous value, tspan.growth gets green class', () => {
  const Component = <PriceWidget {...props} growth={0.2} />;
  const tree = mount(Component);
  expect(tree.find('tspan.growth').hasClass('green')).toBeTruthy();
});

