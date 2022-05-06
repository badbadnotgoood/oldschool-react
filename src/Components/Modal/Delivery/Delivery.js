import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import delivery1 from "../../../Media/images/delivery1.svg";
import delivery2 from "../../../Media/images/delivery2.svg";
import {
  updateActiveRest,
  clearBasketList,
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
  background-size: 235px;
  background-repeat: no-repeat;
  background-position: center 60px;
  padding-bottom: 30px;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  align-items: flex-end;
  font-family: "Cera Round Pro Medium";

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
  clearBasketList,
  updateDeliveryStatus,
  updateModalStatus,
  updateActiveRest,
  activeRest,
  basketList,
  deliveryStatus,
}) => {
  const [delivery, setDelivery] = useState();
  const [show, setShow] = useState(false);

  return (
    <DeliveryContainer>
      <TopText>Способ получения заказа</TopText>
      <ButtonContainer>
        <Button
          source={delivery1}
          onClick={() => {
            if (deliveryStatus === 1) {
              updateModalStatus(2);
            } else {
              const basketCount = basketList[0].length + basketList[1].length;
              if (basketCount > 0) {
                setShow(true);
                setDelivery(1);
              } else {
                setShow(false);
                updateDeliveryStatus(1);
                updateModalStatus(2);
              }
            }
          }}
        >
          Навынос
        </Button>
        <Button
          source={delivery2}
          onClick={() => {
            if (deliveryStatus === 2) {
              updateActiveRest(1)
              updateModalStatus(0);
            } else {
              const basketCount = basketList[0].length + basketList[1].length;
              if (basketCount > 0) {
                setShow(true);
                setDelivery(2);
              } else {
                setShow(false);
                updateDeliveryStatus(2);
                updateModalStatus(0);
              }
            }
          }}
        >
          Доставка
        </Button>
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
              clearBasketList();
              if (delivery === 1) {
                updateDeliveryStatus(delivery);
                updateModalStatus(0);
              } else {
                updateActiveRest(1);
                updateDeliveryStatus(delivery);
                updateModalStatus(0);
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
  basketList: state.basketList,
  deliveryStatus: state.deliveryStatus,
});

const mapDispatchToProps = {
  clearBasketList,
  updateDeliveryStatus,
  updateModalStatus,
  updateActiveRest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
