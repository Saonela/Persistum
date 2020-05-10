import React from 'react';
import Header from "./Header";
import {shallow} from "enzyme";

it('displays main logo', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('.logo')).toHaveLength(1);
});
