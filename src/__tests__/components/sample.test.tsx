import React from "react";
import { mount } from "enzyme";
it("hello world", () => {
  const wrapper = mount(<p>Hello Jest!</p>);
  expect(wrapper.text()).toMatch("Hello Jest!");
});
