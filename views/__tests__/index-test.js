
import React from 'react';
import { mount } from 'enzyme';
import Index from '../index';
import Layout from '../layout';

jest.unmock('../index');
jest.unmock('../layout');
jest.unmock('../components/navbar');


/**
 * Index View Tests
 */
describe('<Index />', () => {
  const someTitle = 'someTitle';

  // eslint-disable-next-line react/jsx-filename-extension
  const target = mount(<Index title={someTitle} />);
  const layout = target.find(Layout)[0];

  it('should render a Layout component', () => {
    expect(layout).not.toBe(null);
  });

  it(`should set layout title to ${someTitle}`, () => {
    expect(target.props().title).toBe(someTitle);
  });
});
