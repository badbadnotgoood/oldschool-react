import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { editBasketList } from "../../../Store/Actions";

import LogoBurgRound from "../../../Media/images/LogoBurgRound.svg";
import LogoSandRound from "../../../Media/images/LogoSandRound.svg";

import device from "../../device";

import ItemImage from "../ItemImage";

const BasketBottomLink = styled(Link)`
  margin-top: 20px;
`;

const BasketBottomOrderButton = styled.button`
  background: #2b2d36;
  border-radius: 6px;
  color: white;
  height: 65px;
  width: 100%;
`;

const BasketBottomTotalOrder = styled.p`
  font-size: 21px;
  line-height: 25px;
`;

const BasketBottomTotalOrderLabel = styled.p`
  font-size: 21px;
  line-height: 25px;
`;

const BasketBottomDeliveryPrice = styled.p`
  font-size: 18px;
  line-height: 25px;
  color: #bcbcbc;
`;

const BasketBottomDeliveryPriceLabel = styled.p`
  font-size: 18px;
  line-height: 25px;
  color: #bcbcbc;
`;

const BasketBottomOrderPrice = styled.p`
  font-size: 18px;
  line-height: 25px;
  color: #bcbcbc;
`;

const BasketBottomOrderPriceLabel = styled.p`
  font-size: 18px;
  line-height: 25px;
  color: #bcbcbc;
`;

const BasketBottomOrderContainer = styled.div`
  margin-bottom: 10px;
  justify-content: space-between;
  width: 100%;
`;

const BasketBottomContainer = styled.div`
  flex-direction: column;
  padding: 20px 25px 30px 25px;
  border-radius: 0 0 15px 15px;
`;

const BasketDishCountPlus = styled.button`
  background-image: url("data:image/svg+xml,%3Csvg width='13' height='12' viewBox='0 0 13 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.68213 5.34064C1.24654 5.34064 0.893418 5.69376 0.893418 6.12935C0.893418 6.56494 1.24654 6.91806 1.68213 6.91806V5.34064ZM11.6821 6.91806C12.1177 6.91806 12.4708 6.56494 12.4708 6.12935C12.4708 5.69376 12.1177 5.34064 11.6821 5.34064V6.91806ZM1.68213 6.91806H6.05713V5.34064H1.68213V6.91806ZM6.05713 6.91806H11.6821V5.34064H6.05713V6.91806Z' fill='%232B2D36'/%3E%3Cpath d='M6.68219 1.13015V11.1301' stroke='%232B2D36' stroke-width='1.57742' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    height: 40px;
    width: 40px;
  }
`;

const BasketDishCountText = styled.p`
  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    font-size: 17px;
    line-height: 40px;
  }
`;

const BasketDishCountMinus = styled.button`
  background-image: url("data:image/svg+xml,%3Csvg width='13' height='2' viewBox='0 0 13 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.68225 0.158456C1.24666 0.158456 0.89354 0.511574 0.89354 0.947166C0.89354 1.38276 1.24666 1.73588 1.68225 1.73588V0.158456ZM11.6823 1.73588C12.1178 1.73588 12.471 1.38276 12.471 0.947166C12.471 0.511574 12.1178 0.158456 11.6823 0.158456V1.73588ZM1.68225 1.73588H6.05725V0.158456H1.68225V1.73588ZM6.05725 1.73588H11.6823V0.158456H6.05725V1.73588Z' fill='%23000'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    height: 40px;
    width: 40px;
  }
`;

const BasketDishCountContainer = styled.div`
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    border-radius: 20px;
    margin-left: 30px;
  }
`;

const BasketDishPrice = styled.p`
  color: #c91e25;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    font-size: 18px;
    line-height: 20px;
  }
`;

const BasketDishPriceContainer = styled.div`
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    height: 115px;
  }
`;

const BasketDishInfoMods = styled.p`
  color: #bcbcbc;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    font-size: 15px;
    line-height: 15px;
  }
`;

const BasketDishInfoName = styled.p`
  font-family: "Cera Round Pro Medium";

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    font-size: 18px;
    line-height: 20px;
    margin-bottom: 15px;
  }
`;

const BasketDishInfo = styled.div`
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    margin-left: 20px;
  }
`;

const BasketDishImage = styled.div`
  background-color: black;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    width: 115px;
    height: 115px;
    min-width: 115px;
    min-height: 115px;
    border-radius: 10px;
  }
`;

const BasketDish = styled.div`
  flex-grow: 1;
  align-items: flex-start;

  & > div {
    min-height: 100%;
  }

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    width: 100%;
    height: max-content;
    min-height: 140px;
    padding-bottom: 25px;
    margin-bottom: 25px;
    border-bottom: 1.5px solid #f3f3f3;
  }
`;

const BasketDishContainer = styled.div`
  flex-direction: column;
  & ${BasketDish}:last-child {
    margin-bottom: unset;
  }

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    padding: 15px 25px;
    margin-bottom: 15px;
  }
`;

const BasketPriceText = styled.p`
  color: #bcbcbc;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    font-size: 17px;
    line-height: 25px;
  }
`;

const BasketRestName = styled.p`
  font-family: "Cera Round Pro Medium";

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    font-size: 21px;
    line-height: 25px;
    margin-bottom: 5px;
  }
`;

const BasketRestInfoContainer = styled.div`
  flex-direction: column;
  align-items: flex-start;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    margin-left: 25px;
  }
`;

const BasketOrderCount = styled.div`
  background: #2b2d36;
  color: white;
  border-radius: 100%;

  position: absolute;
  right: 0;
  bottom: 0;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    width: 25px;
    height: 25px;
    font-size: 12px;
    line-height: 15px;
  }
`;

const BasketRestLogo = styled.div`
  background-image: url(${(props) => props.source});
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    width: 70px;
    height: 70px;
  }
`;

const BasketRestContainer = styled.div`
  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    padding: 25px;
    margin-bottom: 15px;

    &:first-child {
      border-radius: 15px 15px 0 0;
    }
  }
`;

const BasketContainer = styled.div`
  background: #f3f3f3;
  flex-direction: column;
  position: absolute;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    border-radius: 15px;
    top: 70px;
    right: 30px;

    & > div {
      background-color: white;
      width: 430px;
      justify-content: flex-start;
    }
  }
`;

const MemoDishListComponent = ({ data, action }) => {
  const MemoDishList = useMemo(() => {
    return data.map((el, i) => (
      <BasketDish key={i}>
        <ItemImage
          name={el.name}
          rest={el.rest}
          style={{
            minHeight: "115px",
            height: "115px",
            minWidth: "115px",
            width: "115px",
            borderRadius: "13px",
            backgroundSize: "215%",
            borderRadius: "16px",
            border: "1px solid #e0e0e0",
          }}
          defstyle={{
            minHeight: "115px",
            height: "115px",
            minWidth: "115px",
            width: "115px",
            borderRadius: "13px",
            backgroundSize: "80%",
            borderRadius: "16px",
            border: "1px solid #f3f3f3",
          }}
        />
        <BasketDishInfo>
          <BasketDishInfoName>{el.name}</BasketDishInfoName>
          {el.mods.length > 0 &&
            el.mods.map((el, i) => (
              <BasketDishInfoMods key={i}>{el.name}</BasketDishInfoMods>
            ))}
        </BasketDishInfo>
        <BasketDishPriceContainer>
          <BasketDishPrice>{el.price + "₽"}</BasketDishPrice>
          <BasketDishCountContainer>
            <BasketDishCountMinus
              onClick={() => {
                action(el.rest, i, 1);
              }}
            />
            <BasketDishCountText>{el.count}</BasketDishCountText>
            <BasketDishCountPlus
              onClick={() => {
                action(el.rest, i, 0);
              }}
            />
          </BasketDishCountContainer>
        </BasketDishPriceContainer>
      </BasketDish>
    ));
  }, [data, action]);

  return MemoDishList;
};

const Basket = ({ basketList, editBasketList, activeRest, deliveryStatus }) => {
  const burgList = basketList["0"];
  const sandList = basketList["1"];
  const [burgTotalPrice, setBurgTotalPrice] = useState(0);
  const [sandTotalPrice, setSandTotalPrice] = useState(0);

  useEffect(() => {
    let tempBurgPrice = 0;
    let tempSandPrice = 0;
    burgList.length > 0 &&
      burgList.forEach((el) => {
        tempBurgPrice = tempBurgPrice + el.price;
      });
    sandList.length > 0 &&
      sandList.forEach((el) => {
        tempSandPrice = tempSandPrice + el.price;
      });
    setBurgTotalPrice(tempBurgPrice);
    setSandTotalPrice(tempSandPrice);
  }, [setBurgTotalPrice, setSandTotalPrice, burgList, sandList]);

  return (
    <BasketContainer>
      <BasketRestContainer>
        <BasketRestLogo source={LogoBurgRound}>
          <BasketOrderCount>{burgList.length}</BasketOrderCount>
        </BasketRestLogo>
        <BasketRestInfoContainer>
          <BasketRestName>Oldschool Burgers</BasketRestName>
          <BasketPriceText>
            Стоимость заказа {burgTotalPrice + "₽"}
          </BasketPriceText>
        </BasketRestInfoContainer>
      </BasketRestContainer>
      {burgList.length > 0 && (
        <BasketDishContainer>
          <MemoDishListComponent data={burgList} action={editBasketList} />
        </BasketDishContainer>
      )}
      <BasketRestContainer>
        <BasketRestLogo source={LogoSandRound}>
          <BasketOrderCount>{sandList.length}</BasketOrderCount>
        </BasketRestLogo>
        <BasketRestInfoContainer>
          <BasketRestName>Sandwich street</BasketRestName>
          <BasketPriceText>
            Стоимость заказа {sandTotalPrice + "₽"}
          </BasketPriceText>
        </BasketRestInfoContainer>
      </BasketRestContainer>
      {sandList.length > 0 && (
        <BasketDishContainer>
          <MemoDishListComponent data={sandList} action={editBasketList} />
        </BasketDishContainer>
      )}
      <BasketBottomContainer>
        <BasketBottomOrderContainer>
          <BasketBottomOrderPriceLabel>
            Стоимость заказа
          </BasketBottomOrderPriceLabel>
          <BasketBottomOrderPrice>
            {burgTotalPrice + sandTotalPrice + "₽"}
          </BasketBottomOrderPrice>
        </BasketBottomOrderContainer>
        <BasketBottomOrderContainer>
          <BasketBottomDeliveryPriceLabel>
            Доставка
          </BasketBottomDeliveryPriceLabel>
          <BasketBottomDeliveryPrice>БЕСПЛАТНО</BasketBottomDeliveryPrice>
        </BasketBottomOrderContainer>
        <BasketBottomOrderContainer>
          <BasketBottomTotalOrderLabel>Итого:</BasketBottomTotalOrderLabel>
          <BasketBottomTotalOrder>
            {burgTotalPrice + sandTotalPrice + "₽"}
          </BasketBottomTotalOrder>
        </BasketBottomOrderContainer>
        <BasketBottomLink to={"/basket"} style={{ width: "100%" }}>
          <BasketBottomOrderButton
            disabled={burgList.length + sandList.length > 0 ? false : true}
          >
            Перейти в корзину
          </BasketBottomOrderButton>
        </BasketBottomLink>
      </BasketBottomContainer>
    </BasketContainer>
  );
};

const mapStateToProps = (state) => ({
  basketList: state.basketList,
  activeRest: state.activeRest,
  deliveryStatus: state.deliveryStatus,
});

const mapDispatchToProps = { editBasketList };

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
