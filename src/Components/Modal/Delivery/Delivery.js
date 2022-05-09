import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Cookies from "js-cookie";

import delivery1 from "../../../Media/images/delivery1.svg";
import delivery2 from "../../../Media/images/delivery2.svg";
import {
  updateActiveRest,
  clearBasketList,
  updateDeliveryStatus,
  updateModalStatus,
  updateActiveRestAddress,
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
  updateActiveRestAddress,
  updateDeliveryStatus,
  updateModalStatus,
  updateActiveRest,
  restList,
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
            if (deliveryStatus === 0) {
              updateModalStatus(2);
            } else {
              const basketCount = basketList[0].length + basketList[1].length;
              if (basketCount > 0) {
                setDelivery(0);
                setShow(true);
              } else {
                setShow(false);
                updateDeliveryStatus(0);
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
            if (deliveryStatus === 1) {
              updateActiveRest(1);
              updateActiveRestAddress(restList[0]["Address"]);
              updateModalStatus(0);
            } else {
              const basketCount = basketList[0].length + basketList[1].length;
              if (basketCount > 0) {
                setDelivery(1);
                setShow(true);
              } else {
                setShow(false);
                updateActiveRest(1);
                updateDeliveryStatus(1);
                updateActiveRestAddress(restList[0]["Address"]);
                Cookies.set("restModalStatus", "true", { expires: 1 });
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
              if (delivery === 0) {
                updateDeliveryStatus(delivery);
                updateModalStatus(2);
              } else {
                updateActiveRest(1);
                updateDeliveryStatus(delivery);
                updateActiveRestAddress(restList[0]["Address"]);
                Cookies.set("restModalStatus", "true", { expires: 1 });
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
  basketList: state.basketList,
  deliveryStatus: state.deliveryStatus,
  restList: state.data.restList,
});

const mapDispatchToProps = {
  clearBasketList,
  updateActiveRestAddress,
  updateDeliveryStatus,
  updateModalStatus,
  updateActiveRest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
