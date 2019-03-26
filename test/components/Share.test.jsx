import React from 'react';
import { shallow } from 'enzyme';

import Share from '../../client/src/components/Share-Photos/Share';
import SmPicture from '../../client/src/components/Share-Photos/SmPicture';

const sample = {
  id: 1,
  user1: 'anonymouse',
  img1: 'https://s3-us-west-1.amazonaws.com/adidas-shoe/share3.jpg',
  user2: 'indigosparkle',
  img2: 'https://s3-us-west-1.amazonaws.com/adidas-shoe/share7.jpg',
  user3: 'weareliving',
  img3: 'https://s3-us-west-1.amazonaws.com/adidas-shoe/share1.jpg',
  user4: 'urk3wl',
  img4: 'https://s3-us-west-1.amazonaws.com/adidas-shoe/share5.jpg',
  user5: 'cereal_killer',
  img5: 'https://s3-us-west-1.amazonaws.com/adidas-shoe/share3.jpg',
};

describe('Share Component', () => {
  const wrapper = shallow(<Share shares={sample} />);
  const picture = shallow(<SmPicture user={sample.user5} class={'share-username hidden'} />);

  it('should look like snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have 1 Large picture', () => {
    expect(wrapper.find('div.overlay-blk')).toHaveLength(1);
  });

  it('should call Small Picture component 4 times', () => {
    expect(wrapper.find(SmPicture)).toHaveLength(4);
  })

  it('should not show username on normal display', () => {
    expect(wrapper.find('span').at(0)).toHaveClassName('hidden');
    expect(picture.find('span')).toHaveClassName('hidden');
  });

  it('should display username on hover/mouseenter', () => {
    wrapper.find('div.overlay-blk').at(0).prop('onMouseEnter')();
    expect(wrapper.find('span').at(0).hasClass('hidden')).toBe(false);
  });

  it('should display correct username on hover', () => {
    wrapper.find('div.overlay-blk').at(0).prop('onMouseEnter')();
    expect(wrapper.find('span').at(0).hasClass('hidden')).toBe(false);
    expect(wrapper.find('span').at(0).text()).toBe('anonymouse');
  });

  it('should not display username on mouse leave', () => {
    wrapper.find('div.overlay-blk').at(0).prop('onMouseEnter')();
    expect(wrapper.find('span').at(0).hasClass('hidden')).toBe(false);

    wrapper.find('div.overlay-blk').at(0).prop('onMouseLeave')();
    expect(wrapper.find('span').at(0)).toHaveClassName('hidden');
  });
});
