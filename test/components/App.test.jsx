import React from 'react';
import { shallow } from 'enzyme';

import App from '../../client/src/components/App';
import Description from '../../client/src/components/Product-Details/Description';
import Likes from '../../client/src/components/Also-Like/Likes';
import Looks from '../../client/src/components/Complete-Look/Looks';
import Share from '../../client/src/components/Share-Photos/Share';
import Topbar from '../../client/src/components/Navbar/Topbar';
import Specification from '../../client/src/components/Product-Details/Specification';

describe('App Component', () => {
  const component = shallow(<App />);
  it('should render Description', () => {
    expect(component.find(Description)).toHaveLength(1);
  });

  it('should render Likes', () => {
    expect(component.find(Likes)).toHaveLength(1);
  });

  it('should render Looks', () => {
    expect(component.find(Looks)).toHaveLength(1);
  });

  it('should render Share', () => {
    expect(component.find(Share)).toHaveLength(1);
  });

  it('should render Topbar', () => {
    expect(component.find(Topbar)).toHaveLength(1);
  });

  it('should not render Specification on page load', () => {
    expect(component.find(Specification)).toHaveLength(0);
  });

  it('should show Specification on click', () => {
    component.find('div#spec').simulate('click');
    expect(component.find('div#spec')).toHaveLength(1);
    expect(component.find(Specification)).toHaveLength(1);
    expect(component.find(Description)).toHaveLength(0);
  });

  it('should be able to toggle from Specification and Description', () => {
    component.find('div#spec').simulate('click');
    expect(component.find(Specification)).toHaveLength(1);
    expect(component.find(Description)).toHaveLength(0);

    component.find('div#desc').simulate('click');
    expect(component.find(Specification)).toHaveLength(0);
    expect(component.find(Description)).toHaveLength(1);
  });
});
