import React from 'react';
import { shallow } from 'enzyme';
import Stocks from './Stocks';

describe('<Stocks />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Stocks />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
