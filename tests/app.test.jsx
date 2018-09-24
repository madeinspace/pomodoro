import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/App';

describe('The App', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<App />)).toExist();
  });
});
