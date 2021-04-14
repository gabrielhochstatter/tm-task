import React, { useState } from "react";
import styled from "styled-components";
import { styleSettings } from "../../utils/styleSettings"

const { errorRed, tmBlue, tmGrey, tmDarkBlue } = styleSettings.colors;

const Form = styled.form`
  width: 100%;
  max-width: 550px;
  padding: 46px;
  margin: 0 auto;
`

const Input = styled.input`
  display: block;
  border: 1px solid ${props => props.errored ? errorRed : tmGrey};;
  border-radius: none;
  padding: 4px 6px;
  outline: none;
  font-size: 16px;
  margin-bottom: 14px;
  width: 100%;

  &:focus {
    border-color: ${tmBlue};
    border-radius: none;
  }
`

const Label = styled.label`
  font-size: 13px;
  color: ${props => props.errored ? errorRed : tmGrey};
`

const FormHeader = styled.h2`
  font-size: 23px;
`

const FormText = styled.p`
  font-size: 14px;
  color: ${props => props.error ? errorRed : tmGrey};
`

const Button = styled.button`
  width: 100%;
  color: white;
  background-color: ${tmBlue};
  font-size: 14px;
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  &:hover{
    background-color: ${tmDarkBlue};
  }
`

const ERRORS = {
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_PHONE: "INVALID_PHONE"
};

const WaitingListForm = ({ onSubmit, isLoading, errorMessage }) => {
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [errors, setErrors] = useState([]);


  const validateInputs = () => {
    // reset errors at the start
    setErrors([]);

    /**
     * In a larger project I'd use a form validation library but for
     * simplicity's sake this will work fine here for now
     */
    let validationErrors = [];
    if (!emailValue) {
      validationErrors.push(ERRORS.INVALID_EMAIL);
    }

    if (!phoneValue) {
      validationErrors.push(ERRORS.INVALID_PHONE);
    }

    setErrors(validationErrors);

    return validationErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();

    if (validationErrors.length > 0) {
      return;
    };

    onSubmit({
      emailAddress: emailValue,
      mobileNumber: phoneValue
    })
  };

  const isEmailErrored = errors.includes(ERRORS.INVALID_EMAIL) || errorMessage;
  const isPhoneErrored = errors.includes(ERRORS.INVALID_PHONE) || errorMessage;
  return (
    <Form id="form-body">
      <FormHeader>Don't miss out. Join the waiting list.</FormHeader>
      <FormText>Sign up to be the first to know when new tickets are available.</FormText>
      <Label htmlFor="email-input" errored={isEmailErrored}>Email:</Label>
      <Input
        type="email"
        id="email-input"
        onChange={e => setEmailValue(e.target.value)}
        errored={isEmailErrored}
      />
      <Label htmlFor="phone-input" errored={isPhoneErrored}>Mobile Number:</Label>
      <Input
        type="tel"
        id="phone-input"
        onChange={e => setPhoneValue(e.target.value)}
        errored={isPhoneErrored}
      />
      {errorMessage ? <FormText error>{errorMessage}</FormText> : null}
      <Button onClick={handleSubmit} id="submit-button">
        {isLoading ? "Signing Up..." : "Sign Up"}
      </Button>
    </Form>
  );
};

export default WaitingListForm;