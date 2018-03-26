import React from 'react';
import { shallow, render, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Autocomplete from './Autocomplete';
import withHandlers from './withHandlers';
import SuggestItems from './SuggestItems';

const requiredAutocompleteProps = {
  value: '',
  onInput: () => {},
  onChange: () => {},
  onClickOutside: () => {}
};

it('withHandlers HOC passes required props to wrapped component', () => {
  const WrappedComponent = () => <div />;
  const Component = withHandlers(WrappedComponent);
  const wrapper = shallow(<Component />);
  const passedProps = wrapper.props();
  expect(passedProps.hasOwnProperty('value')).toBeTruthy();
  expect(passedProps.hasOwnProperty('onInput')).toBeTruthy();
  expect(passedProps.hasOwnProperty('onChange')).toBeTruthy();
  expect(passedProps.hasOwnProperty('onClickOutside')).toBeTruthy();
});

it('withHandlers HOC passes search value on state change', () => {
  const WrappedComponent = () => <div />;
  const Component = withHandlers(WrappedComponent);
  const wrapper = shallow(<Component />);
  wrapper.setState({ searchVal: 'BT' });
  expect(wrapper.find('WrappedComponent').prop('value')).toBe('BT');
});

it('onInput func gets called with onChange event on input', () => {
  const onInput = jest.fn();
  const component = <Autocomplete {...requiredAutocompleteProps} onInput={onInput} />;
  const tree = shallow(component);
  tree.find('#autocomplete').simulate('change');
  expect(onInput).toHaveBeenCalled();
});

it('onItemClick gets called on li click in SuggestItems', () => {
  const onChange = jest.fn();
  const items = [{ id: 1, symbol: 'ETH' }];
  const component = <SuggestItems items={items} onItemClick={onChange} />;
  const tree = shallow(component);
  tree.find('li').simulate('click');
  expect(onChange).toHaveBeenCalled();
});

it('onInput finds items and sets correct state', async () => {
  const WrappedComponent = () => <div />;
  const Component = withHandlers(WrappedComponent);
  const wrapper = shallow(<Component />);
  await wrapper.instance().onInput({ target: { value: 'e' } });
  expect(wrapper.state('items').length > 0).toBeTruthy();
});

it('onInput sets correct state if no items are found', async () => {
  const WrappedComponent = () => <div />;
  const Component = withHandlers(WrappedComponent);
  const wrapper = shallow(<Component />);
  await wrapper.instance().onInput({ target: { value: 'asd' } });
  expect(wrapper.state('found')).toBeFalsy();
  expect(wrapper.state('set')).toBeFalsy();
});

it('onItemClick sets correct state', () => {
  const WrappedComponent = () => <div />;
  const Component = withHandlers(WrappedComponent);
  const wrapper = shallow(<Component />);
  wrapper.instance().onItemClick({ target: { textContent: 'ASD' } });
  expect(wrapper.state('searchVal')).toBe('ASD');
  expect(wrapper.state('found')).toBeFalsy();
  expect(wrapper.state('set')).toBeTruthy();
});

it('onClickOutside sets correct state', () => {
  const WrappedComponent = () => <div />;
  const Component = withHandlers(WrappedComponent);
  const wrapper = shallow(<Component />);
  wrapper.instance().onClickOutside();
  expect(wrapper.state('searchVal')).toBe('');
  expect(wrapper.state('found')).toBeFalsy();
});


