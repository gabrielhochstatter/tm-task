import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Logo from "../Logo";
import WaitingListForm from "../WaitingListForm";
import Success from "../Success";
import { styleSettings } from "../../utils/styleSettings";

const Header = styled.header`
  color: white;
  background-color: ${styleSettings.colors.tmBlue};
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    transform: scale(0.4);
  }
`;

const WaitingListPage = () => {
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleFormSubmit = async (formData) => {
    setIsPending(true);
    setErrorMessage("");

    try {
      const data = await axios({
        url: "/api/waiting-list",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      });
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section>
      <Header>
        <Logo />
      </Header>
      <section>
        {isSuccess ? (
          <Success />
        ) : (
          <WaitingListForm
            onSubmit={handleFormSubmit}
            isLoading={isPending}
            errorMessage={errorMessage}
          />
        )}
      </section>
    </section>
  );
};

export default WaitingListPage;
