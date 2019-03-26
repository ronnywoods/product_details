import React from 'react';
import { shallow } from 'enzyme';
import Specification from '../../client/src/components/Product-Details/Specification';

describe('Specification Component', () => {
  const sample = ['Lace closure', 'Seam-sealed stretch-mesh upper',
    'Arch type: Normal', 'supportive feel', 'imported', 'Product Code: B31231'];

  const component = shallow(<Specification details={sample} />);

  it('should display like snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should display 2 columns of details', () => {
    expect(component.find('div.col-sm').length).toBe(2);
    expect(component.find('.first-col')).toExist();
    expect(component.find('.sec-col')).toExist();
  });

  it('should have correct amount of details', () => {
    expect(component.find('li').length).toBe(6);
  });

  it('should display details properly', () => {
    expect(component.find('li').at(0).text()).toBe('Lace closure');
    expect(component.find('li').at(2).text()).toBe('Arch type: Normal');
  });
});
