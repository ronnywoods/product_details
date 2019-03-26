import React from 'react';
import { shallow } from 'enzyme';

import Topbar from '../../client/src/components/Navbar/Topbar';

describe('Topbar/Navbar Component', () => {
  const component = shallow(<Topbar cart={0} />);
  const component2 = shallow(<Topbar cart={2} />);

  describe('When cart is empty', () => {
    it('should match snapshot when cart is empty', () => {
      expect(component).toMatchSnapshot();
    });

    it('should not contain cart numbers', () => {
      expect(component.find('.cartNum').text()).toBe('');
    });
  });

  describe('When cart has contents', () => {
    it('should match snapshot when cart has content', () => {
      expect(component2).toMatchSnapshot();
    });

    it('should display cart number properly', () => {
      expect(component2.find('.cart')).toExist();
      expect(component2.find('.cartNum').text()).toBe('2');
    });
  });

});
