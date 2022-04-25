import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const CancelButton = styled.button`
  width: 40%;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 16px;
  line-height: 20px;
`;

const ContinueButton = styled.button`
  width: 60%;
  margin-right: 20px;
  background: #2b2d36;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 16px;
  line-height: 20px;
  color: white;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 30px;

  & button {
    height: 55px;
  }
`;

const TextBottom = styled.p`
  font-size: 22px;
  line-height: 25px;
  text-decoration-line: underline;
`;

const TextTop = styled.p`
  font-size: 22px;
  line-height: 25px;
`;

const Title = styled.p`
  font-size: 24px;
  line-height: 25px;
  font-family: "Cera Round Pro Medium", sans-serif;
  margin-bottom: 20px;
`;

const AttentionContainer = styled.div`
  padding: 30px;
  background: #ffffff;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: fixed;
  flex-direction: column;
`;

const Attention = ({ cancelFunc, continueFunc }) => {
  return (
    <AttentionContainer>
      <Title>Изменить адрес</Title>
      <TextTop>Все ранее добавленные блюда будут</TextTop>
      <TextBottom>удалены из корзины</TextBottom>
      <ButtonContainer>
        <ContinueButton
          onClick={() => {
            continueFunc();
          }}
        >
          Продолжить
        </ContinueButton>
        <CancelButton
          onClick={() => {
            cancelFunc();
          }}
        >
          Отмена
        </CancelButton>
      </ButtonContainer>
    </AttentionContainer>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Attention);
