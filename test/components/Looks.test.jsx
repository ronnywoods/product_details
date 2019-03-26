import React from 'react';
import { shallow } from 'enzyme';

import Looks from '../../client/src/components/Complete-Look/Looks';

describe('Looks Components', () => {
  const sample = {
    id: 1,
    pant_name: 'TREFOIL PANTS',
    pant_url: 'https://s3-us-west-1.amazonaws.com/adidas-shoe/pant1.jpg',
    pant_price: 75,
    shirt_name: 'OUTLINE TREFOIL TEE',
    shirt_url: 'https://s3-us-west-1.amazonaws.com/adidas-shoe/shirt4.jpg',
    shirt_price: 40,
    jacket_name: 'SST WINDBREAKER',
    jacket_url: 'https://s3-us-west-1.amazonaws.com/adidas-shoe/jacket1.jpg',
    jacket_price: 80,
  };

  const component = shallow(<Looks looks={sample} />);

  it('should display like snapshot', () => {
    expect(component).toMatchSnapshot();
  })

  it('should display shirt when picture is clicked', () => {
    component.find('#shirtCard').simulate('click');
    expect(component.find('#shirtCard').hasClass('collapsed')).toBe(false);
    expect(component.find('#shirtCard')).toHaveClassName('bottom-bold');
  });

  it('should toggle between pant display properly on click', () => {
    expect(component.find('#pantCard').hasClass('bottom-bold')).toBe(false);

    component.find('#pantCard').simulate('click');
    expect(component.find('#pantCard').hasClass('collapsed')).toBe(false);
    expect(component.find('#pantCard')).toHaveClassName('bottom-bold');

    component.find('#pantCard').simulate('click');
    expect(component.find('#pantCard').hasClass('bottom-bold')).toBe(false);
  });

  it('should not allow to add to cart when size is not selected', () => {
    component.find('#jacketCard').simulate('click');
    expect(component.find('span.look-size').at(1).text()).toBe('SELECT SIZE');
    expect(component.find('button').at(1)).toHaveClassName('disabled');
  });

  xit('should display correct size when size is selected', () => {
    component.find('#jacketCard').simulate('click');
    component.find('.dropdown').at(1).simulate('click');
    component.find('.select-size').at(5).simulate('click');
    component.find('.select-size').at(5).simulate('click', { target: { textContent: 'S' } });
    expect(component.find('span.look-size').at(1).text()).toBe('S');
  });

  xit('should allow to add to cart after size has been selected', () => {
    component.find('#jacketCard').simulate('click');
    component.find('.dropdown').at(1).simulate('click');
    component.find('.select-size').at(5).simulate('click');
    component.find('.select-size').at(5).simulate('click', { target: { textContent: 'S' } });
    expect(component.find('span.look-size').at(1).text()).toBe('S');
    expect(component.find('.bag-text').at(1)).toHaveClassName('enabled');
  });
});
