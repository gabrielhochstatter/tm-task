import React from "react";
import styled from "styled-components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { styleSettings } from "../../utils/styleSettings";

const SuccessContainer = styled.section`
  width: 100%;
  max-width: 550px;
  padding: 46px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h2 {
    font-size: 23px;
  }

  p {
    font-size: 14px;
    color: ${styleSettings.colors.tmGrey};
  }
`;

const Success = () => {
  return (
    <SuccessContainer>
      <CheckCircleIcon
        style={{ fontSize: 220, color: styleSettings.colors.tmGreen }}
      />
      <h2>You're signed up!</h2>
      <p>We'll let you know when tickets are available</p>
    </SuccessContainer>
  );
};

export default Success;
