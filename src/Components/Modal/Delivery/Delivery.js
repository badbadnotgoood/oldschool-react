import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import delivery1 from "../../../Media/images/delivery1.svg";
import delivery2 from "../../../Media/images/delivery2.svg";
import {
  updateActiveRest,
  updateActiveRestAddress,
  updateDeliveryStatus,
  updateModalStatus,
} from "../../../Store/Actions";
import Attention from "../Attention";

const ModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SkipButton = styled.button`
  font-size: 16px;
  line-height: 20px;
  text-decoration-line: underline;
`;

const Button = styled.button`
  width: 330px;
  height: 290px;
  box-shadow: 0px 12.5px 12.5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background-image: url(${(props) => props.source});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;

  &:first-child {
    margin-right: 15px;
  }

  &:hover {
    background-color: #f3f3f3;
  }
`;

const ButtonContainer = styled.div`
  margin-bottom: 30px;
`;

const TopText = styled.p`
  font-family: "Cera Round Pro Medium";
  font-size: 24px;
  line-height: 25px;
  margin-bottom: 20px;
`;

const DeliveryContainer = styled.div`
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  padding: 30px;
`;

const Delivery = ({
  updateDeliveryStatus,
  updateModalStatus,
  updateActiveRest,
  activeRest,
}) => {
  const [show, setShow] = useState(false);
  const [delivery, setDelivery] = useState(0);

  return (
    <DeliveryContainer>
      <TopText>Способ получения заказа</TopText>
      <ButtonContainer>
        <Button
          source={delivery1}
          onClick={() => {
            if (activeRest === 1) {
              updateModalStatus(0);
              updateDeliveryStatus(0)
            } else {
              setShow(true);
              setDelivery(0);
            }
          }}
        />
        <Button
          source={delivery2}
          onClick={() => {
            updateDeliveryStatus(1);
            updateModalStatus(2);
          }}
        />
      </ButtonContainer>
      <SkipButton
        onClick={() => {
          updateModalStatus(0);
        }}
      >
        Выбрать позже
      </SkipButton>
      {show && (
        <ModalContainer>
          <Attention
            cancelFunc={() => {
              setShow(false);
            }}
            continueFunc={() => {
              setShow(false);
              updateDeliveryStatus(delivery);
              if (delivery === 0) {
                updateModalStatus(0);
                updateActiveRest(1);
              } else {
                updateModalStatus(2);
              }
            }}
          />
        </ModalContainer>
      )}
    </DeliveryContainer>
  );
};

const mapStateToProps = (state) => ({
  activeRest: state.activeRest,
});

const mapDispatchToProps = {
  updateDeliveryStatus,
  updateModalStatus,
  updateActiveRest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
