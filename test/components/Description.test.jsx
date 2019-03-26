import React from 'react';
import { shallow } from 'enzyme';

import Description from '../../client/src/components/Product-Details/Description';

describe('Description Component', () => {
  const desc = { short_desc: 'This is a short description',
    name: 'ULTRABOOST',
    long_desc: 'This is a long description of ultraboost.',
    img_url: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/29ffefeadfb448bfae6ba93b007c3f38_9366/POD-S3_1_Shoes_Black_G54741_04_standard.jpg',
  };
  const component = shallow(<Description shoe={desc} />);

  it('should render description correctly when passed in descriptions', () => {
    expect(component).toMatchSnapshot();
  });

  it('should display shoe name properly', () => {
    expect(component.find('h2.detail-name').text()).toBe('ULTRABOOST');
  });

  it('should display short description properly', () => {
    expect(component.find('h5.short-desc').text()).toBe('This is a short description');
  });

  it('should display long description properly', () => {
    expect(component.find('p.para').text()).toBe('This is a long description of ultraboost.');
  });

  it('should have img of shoe', () => {
    expect(component.find('img')).toHaveLength(1);
  });
});
