import React from 'react';
import { shallow } from 'enzyme';
import AppHeader from './AppHeader';

describe('<AppHeader/>', () => {
  it('should say Undead Darts', () => {
    const wrapper = shallow(<AppHeader/>);
    expect(wrapper.text()).toEqual("Undead Darts");

  });

  it('should have header with correct className', () => {
    const wrapper = shallow(<AppHeader/>);
    const header = wrapper.find('header');
    expect(header.length).toEqual(1);
    expect(header.prop('className')).toEqual('App-header');

  });

  it('should have undead image in header', () => {
    const wrapper = shallow(<AppHeader/>);
    const header = wrapper.find('header');
    const img = header.find('img');
    expect(img.length).toEqual(1);
    expect(img.prop('src')).toEqual('friendly_zombie.jpg');
  });


});

