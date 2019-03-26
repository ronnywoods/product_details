import React from 'react';
import { shallow } from 'enzyme';

import DropdownMenu from '../../client/src/components/Navbar/DropdownMenu';
import menu from '../../client/src/components/Navbar/data';

describe('Dropdown Menu Component', () => {
  const component = shallow(<DropdownMenu title='FEATURED' options={menu.women.featured} />);

  it('should match snapshot when props are passed in', () => {
    expect(component).toMatchSnapshot();
  });

  it('should contain only 1 headline', () => {
    expect(component.find('.headline')).toHaveLength(1);
  });

  it('should have more than 3 option', () => {
    expect(component.find('li').length).toBeGreaterThan(3);
  });
});
