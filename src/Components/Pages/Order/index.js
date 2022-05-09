import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import InputMask from "react-input-mask";

import {
  getBasketList,
  updateUserData,
  updateModalStatus,
} from "../../../Store/Actions";

import axios from "axios";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";

const OrderFinalText = styled.p`
  font-size: 20px;
  line-height: 25px;
`;

const OrderFinalId2 = styled.p`
  font-size: 27px;
  line-height: 30px;
  font-family: "Cera Round Pro Medium";
  color: #c91e25;
`;

const OrderFinalId1 = styled.p`
  font-size: 27px;
  line-height: 30px;
  font-family: "Cera Round Pro Medium";
  margin-right: 10px;
`;

const OrderFinalIdContainer = styled.div`
  margin-bottom: 20px;
`;

const OrderFinal = styled.div`
  margin-top: 15px;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: white;
  flex-direction: column;
  border-radius: 0 0 20px 20px;
`;

const AddressComment = styled.p`
  font-size: 14px;
  line-height: 15px;
  color: #8d929e;
  width: 100%;
  justify-content: flex-start;
`;

const AddressContainer = styled.div`
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const OrderAcceptButton = styled.button`
  height: 65px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: black;
  color: white;
  width: calc(100% / 2);
`;

const OrderCancelButton = styled.button`
  height: 65px;
  background: #f3f3f3;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: black;
  margin-right: 20px;
  width: 100%;
`;

const OrderLink = styled(Link)`
  width: calc(100% / 2);
`;

const OrderButtonContainer = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const OrderCheckboxInput = styled.input.attrs({ type: "checkbox" })``;

const OrderCheckboxLabelText = styled.span`
  font-size: 12px;
  line-height: 15px;
  color: #2b2d36;
`;

const OrderCheckboxLabel = styled.label`
  width: 100%;
  justify-content: flex-start;
  margin-top: 30px;

  & > input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  & > span {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }

  & > span::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    flex-grow: 0;
    background-color: #f3f3f3;
    border-radius: 3.5px;
    margin-right: 10px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }

  & > input:checked + span::before {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23000' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }

  & > input:disabled + span::before {
    background-color: #e9ecef;
  }
`;

const OrderPaymentMethodText = styled.p`
  font-size: 17px;
  line-height: 20px;
`;

const OrderPaymentMethodRadio = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const OrderPaymentMethodLabel = styled.label`
  position: relative;
  display: flex;
  font-size: 17px;
  line-height: 20px;
  padding-left: 40px;

  ${OrderPaymentMethodRadio}:disabled & {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:last-child {
    margin-bottom: 30px;
  }
`;

const OrderPaymentMethodIndicator = styled.div`
  border: 2px solid;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;

  ${OrderPaymentMethodLabel}:hover {
    background-color: #fefefe;
  }

  &::after {
    content: "";
    position: absolute;
    display: none;
  }

  ${OrderPaymentMethodRadio}:checked {
    background-color: red;
  }

  ${OrderPaymentMethodRadio}:checked + &::after {
    display: block;
    border-radius: 50%;
    background-color: #263238;
    width: 10px;
    height: 10px;
  }
`;

const OrderPaymentTitle = styled.p`
  font-size: 21px;
  line-height: 25px;
  margin-bottom: 20px;
`;

const OrderPaymentContainer = styled.div`
  flex-direction: column;
  padding: 30px 25px;
  background-color: white;
  width: 100%;
  align-items: flex-start;
  border-radius: 0 0 15px 15px;
  margin-top: 15px;
`;

const OrderEditAddress = styled.button`
  background-position: center;
  background-repeat: no-repeat;
  background-size: 30px;
  background-image: url(${(props) => props.source});

  position: absolute;
  right: 0;

  width: 30px;
  height: 30px;
`;

const DataPhoneInput = styled(InputMask)`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const OrderUserData = styled.p`
  font-size: 14px;
  line-height: 15px;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
`;

const OrderUserDataName = styled.p`
  position: absolute;
  left: 0;
  font-family: "Cera Round Pro Medium";
  font-size: 14px;
  line-height: 15px;
  height: 100%;
`;

const OrderUserDataRow = styled.div`
  position: relative;
  padding-left: 85px;
  height: 40px;
  width: 100%;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: unset;
  }
`;

const OrderUserDataContainer = styled.div`
  background-color: white;
  flex-direction: column;
  padding: 30px 60px;
  border-radius: 15px 15px 0 0;
`;

const OrderContainer = styled.div`
  background-color: #f3f3f3;
  width: 805px;
  flex-direction: column;
  box-shadow: 0px 6.325px 6.325px rgba(0, 0, 0, 0.1);
  border-radius: 15px;

  & > div {
    width: 100%;
  }
`;

const OrderAddressLink = styled(Link)`
  margin-left: 10px;
  margin-right: 10px;

  &:hover {
    color: #c91e25;
  }
`;

const OrderAddressContainer = styled.div`
  font-size: 18px;
  line-height: 25px;
  color: #8d929e;
  width: 1220px;
  justify-content: flex-start;

  &:first-child {
    margin-left: unset;
  }

  &:last-child {
    margin-right: unset;
  }
`;

const OrderAddressName = styled.p`
  font-size: 37px;
  line-height: 40px;
  width: 805px;
  justify-content: flex-start;
  margin-top: 40px;
  margin-bottom: 30px;
`;

const Order = ({
  restList,
  userData,
  deliveryStatus,
  activeDeliveryAddress,
  activeRestAddress,
  activeRest,
  updateUserData,
  getBasketList,
  updateModalStatus,
  basketList,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(activeDeliveryAddress);

  const [method, setMethod] = useState("method-1");

  const [checked, setChecked] = useState(false);

  const [orderSend, setOrderSend] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [accessStatus, setAccessStatus] = useState(false);

  const [checkedError, setCheckedError] = useState(false);

  useEffect(() => {
    updateModalStatus(0);
  }, [updateModalStatus]);

  useEffect(() => {
    if (basketList["0"].length <= 0 && basketList["1"].length <= 0) {
      document.location.replace("/");
      updateModalStatus(0);
    }
  }, [basketList, updateModalStatus]);

  useEffect(() => {
    axios
      .post("../api/0.1.0/orderAccess", {
        Phone: userData.Phone,
      })
      .then((response) => {
        if (response.data.status !== 1) {
          document.location.replace("./");
        } else {
          setAccessStatus(true);
        }
      });
  }, [setAccessStatus, userData]);

  useEffect(() => {
    setName(userData.Name);
    setPhone(userData.Phone);
  }, [userData]);

  useEffect(() => {
    updateUserData();
  }, [updateUserData]);

  const OrderComponent = (
    <OrderContainer>
      <OrderUserDataContainer>
        <OrderUserDataRow>
          <OrderUserDataName>Имя</OrderUserDataName>
          <AddressContainer>
            <OrderUserData>{name}</OrderUserData>
          </AddressContainer>
        </OrderUserDataRow>
        <OrderUserDataRow>
          <OrderUserDataName>Телефон</OrderUserDataName>
          <DataPhoneInput
            placeholder="Телефон для связи"
            maskChar={null}
            mask="8 (999) 999 99 99"
            value={phone}
            disabled={true}
          />
        </OrderUserDataRow>
        <OrderUserDataRow>
          <OrderUserDataName>Адрес</OrderUserDataName>
          <AddressContainer>
            <OrderUserData>
              {deliveryStatus === 0 ? activeRestAddress : address.Address}
            </OrderUserData>
            <AddressComment>{deliveryStatus === 0 ? "" : address.Comment}</AddressComment>
          </AddressContainer>
        </OrderUserDataRow>
      </OrderUserDataContainer>
      {!orderSend ? (
        <OrderPaymentContainer>
          <OrderPaymentTitle>Способ оплаты</OrderPaymentTitle>
          <OrderPaymentMethodLabel>
            <OrderPaymentMethodText>Наличными</OrderPaymentMethodText>
            <OrderPaymentMethodRadio
              type="radio"
              name="method"
              value={"method-1"}
              checked={method === "method-1"}
              onChange={(e) => {
                setMethod(e.target.value);
              }}
            />
            <OrderPaymentMethodIndicator />
          </OrderPaymentMethodLabel>
          {/* <OrderPaymentMethodLabel>
            <OrderPaymentMethodText>В ресторане</OrderPaymentMethodText>
            <OrderPaymentMethodRadio
              type="radio"
              name="method"
              value={"method-2"}
              checked={method === "method-2"}
              onChange={(e) => {
                console.log(method);
              }}
            />
            <OrderPaymentMethodIndicator />
          </OrderPaymentMethodLabel> */}
          <OrderCheckboxLabel>
            <OrderCheckboxInput
              value={true}
              checked={checked}
              onChange={(e) => setChecked(!checked)}
            />
            <OrderCheckboxLabelText
              style={checkedError ? { color: "red" } : {}}
            >
              Согласен на обработку персональных даных
            </OrderCheckboxLabelText>
          </OrderCheckboxLabel>
          <OrderButtonContainer>
            <OrderLink to="/basket">
              <OrderCancelButton>Вернуться в корзину</OrderCancelButton>
            </OrderLink>
            <OrderAcceptButton
              onClick={() => {
                console.log(deliveryStatus);
                if (checked) {
                  axios
                    .post("../api/0.1.0/postOrder", {
                      RestId: activeRest,
                      Delivery: deliveryStatus,
                      Name: userData.Name,
                      Phone: userData.Phone,
                      Address: deliveryStatus === 0 ? activeRestAddress : address.Address,
                      Comment: deliveryStatus === 0 ? "" : address.Comment,
                    })
                    .then((response) => {
                      if (response.data.status) {
                        setOrderSend(true);
                        setOrderId(response.data.order_id);
                        axios.get("../api/0.1.0/clearBasket");
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } else {
                  setCheckedError(true);
                }
              }}
            >
              Оформить заказ
            </OrderAcceptButton>
          </OrderButtonContainer>
        </OrderPaymentContainer>
      ) : (
        <OrderFinal>
          <OrderFinalIdContainer>
            <OrderFinalId1>Ваш номер заказа:</OrderFinalId1>
            <OrderFinalId2>{orderId}</OrderFinalId2>
          </OrderFinalIdContainer>
          <OrderFinalText>
            Спасибо за заказ! Мы приготовим ваши блюда
          </OrderFinalText>
          <OrderFinalText>
            за 10 минут, отследить процесс можно в разделе
          </OrderFinalText>
          <OrderFinalText>“История заказов”</OrderFinalText>
        </OrderFinal>
      )}
    </OrderContainer>
  );

  return (
    accessStatus && (
      <>
        <Header order={true} />
        <OrderAddressContainer>
          <OrderAddressLink
            to="/"
            onClick={() => {
              document.location.replace("/");
            }}
          >
            Меню
          </OrderAddressLink>
          {"/"}
          <OrderAddressLink to="/order">Оформление заказа</OrderAddressLink>
        </OrderAddressContainer>
        <OrderAddressName>
          Заказ на{" "}
          {deliveryStatus === 0
            ? "самовывоз"
            : deliveryStatus === 1 && "доставку"}
        </OrderAddressName>
        {OrderComponent}
        <Footer />
      </>
    )
  );
};

const mapStateToProps = (state) => ({
  restList: state.data.restList,
  userData: state.userData,
  deliveryStatus: state.deliveryStatus,
  activeDeliveryAddress: state.activeDeliveryAddress,
  activeRestAddress: state.activeRestAddress,
  activeRest: state.activeRest,
  basketList: state.basketList,
});

const mapDispatchToProps = { getBasketList, updateUserData, updateModalStatus };

export default connect(mapStateToProps, mapDispatchToProps)(Order);
