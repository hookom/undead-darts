import React from 'react';
import { mount } from 'enzyme';
import ChangeHistory from './ChangeHistory';

describe('<ChangeHistory/>', () => {
  it('should render the header with no history', () => {
    const changelog = new Array();
    const wrapper = mount(<ChangeHistory changelog={changelog}/>);
    const changeHeader = wrapper.find('ChangeHeader');
    expect(changeHeader.length).toEqual(1);

    const columns = changeHeader.find('th');
    expect(columns.length).toEqual(2);
    expect(columns.first().text()).toEqual('CHANGE');
    expect(columns.last().text()).toEqual('TIMESTAMP');

  });

  it('should not render rows with no history', () => {
    const changelog = new Array();
    const wrapper = mount(<ChangeHistory changelog={changelog}/>);
    const rows = wrapper.find('ChangeRow');
    expect(rows.length).toEqual(0);
  });

   it('should render history rows', () => {
    const log1 = {message: "test1", timestamp: Date.now()}
    const log2 = {message: "test2", timestamp: Date.now()}
    const changelog = [log1, log2]
    const wrapper = mount(<ChangeHistory changelog={changelog}/>);
    const rows = wrapper.find('ChangeRow');
    expect(rows.length).toEqual(2);
    const row1 = rows.first();
    const row2 = rows.last();
    expect(row1.find('div').first().text()).toEqual(log1.message);
    expect(row1.find('div').last().text()).toEqual(log1.timestamp + "");
    expect(row2.find('div').first().text()).toEqual(log2.message);
    expect(row2.find('div').last().text()).toEqual(log2.timestamp + "");


     
  });
 
});

