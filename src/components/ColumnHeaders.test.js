import React from 'react';
import { mount } from 'enzyme';
import ColumnHeaders from './ColumnHeaders';
import TrackedStats from '../lib/TrackedStats.js';

describe('<ColumnHeaders/>', () => {
  it('should render column header', () => {
    const wrapper = mount(<table><ColumnHeaders/></table>);
    expect(wrapper.find('th').first().text()).toEqual('Player Name');
  });

  it('should render n column headers for TrackedStats.keys', () => {
    const wrapper = mount(<table><ColumnHeaders/></table>);
    expect(wrapper.find('th').first().text()).toEqual('Player Name');

    const columnHeaders = wrapper.find('ColumnHeader');
    const keys = Object.keys(TrackedStats);
    expect(columnHeaders.length).toEqual(keys.length);

    columnHeaders.forEach((ch, index) => {
      expect(ch.text()).toEqual(TrackedStats[keys[index]].header);
    });
  });

});


