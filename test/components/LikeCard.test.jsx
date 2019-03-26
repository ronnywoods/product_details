import React from 'react';
import { shallow } from 'enzyme';

import LikeCard from '../../client/src/components/Also-Like/LikeCard';
import sampleShoes from './data';

describe('LikeCard Component', () => {
  const component = shallow(<LikeCard shoes={sampleShoes.slice(0, 4)} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should have at least have 2 image cards', () => {
    expect(component.find('div.card').length).toBeGreaterThan(1);
  });

  it('should display name, type, and price on each card', () => {
    expect(component.find('span.like-name').at(0).text()).toBe('SOLARBOOST');
    expect(component.find('span.like-type').at(0).text()).toBe('Performance');
    expect(component.find('span.like-price').at(0).text()).toBe('$110');
  });

  it('should render images in order', () => {
    expect(component.find('span.like-name').at(0).text()).toBe('SOLARBOOST');
    expect(component.find('span.like-name').at(1).text()).toBe('ANDALAX');
    expect(component.find('span.like-price').at(2).text()).toBe('$130');
  });
});
