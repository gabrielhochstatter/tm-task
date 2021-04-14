import React from "react";
import { shallow } from "enzyme";
import WaitingListForm from "./WaitingListForm";

describe("WaitingListForm", () => {
  it("should render", () => {
    const wrapper = shallow(<WaitingListForm />);
    expect(wrapper.length).toBe(1);
  });

  it("should call the onSubmit callback with the formdata when submitted", () => {
    const testEmail = "email@example.com";
    const testPhone = "18005551111";
    const mockOnSumbit = jest.fn();
    const wrapper = shallow(<WaitingListForm onSubmit={mockOnSumbit} />);
    wrapper
      .find("#email-input")
      .first()
      .simulate("change", { target: { value: testEmail } });
    wrapper
      .find("#phone-input")
      .first()
      .simulate("change", { target: { value: testPhone } });
    wrapper
      .find("#submit-button")
      .first()
      .simulate("click", { preventDefault: jest.fn() });
    expect(mockOnSumbit).toHaveBeenCalledWith({
      emailAddress: testEmail,
      mobileNumber: testPhone,
    });
  });
});
