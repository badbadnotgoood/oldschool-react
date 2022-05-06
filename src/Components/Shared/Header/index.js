import React, { useState, useLayoutEffect, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import device from "../../device";

import {
  updateModalStatus,
  updateActiveRest,
  updateDeliveryStatus,
} from "../../../Store/Actions";

import LogoBurgRound from "../../../Media/images/LogoBurgRound.svg";
import LogoSandRound from "../../../Media/images/LogoSandRound.svg";

const HeaderRestTime = styled.div`
  margin-left: 7.5px;
  @media ${device.screenMaxto1280} {
    font-size: 23px;
    line-height: 35px;
  }

  @media ${device.screen1279to1000} {
    font-size: 18px;
    line-height: 25px;
  }

  @media ${device.screen999to768} {
    font-size: 20px;
    line-height: 30px;
  }

  @media ${device.screen767to425} {
    font-size: 15px;
    line-height: 20px;
  }

  @media ${device.screen424to375} {
    font-size: 14px;
    line-height: 20px;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    font-size: 13px;
    line-height: 20px;
  }
  color: #199869;
`;

const HeaderRestContainer = styled.div``;

const TempLink = styled(Link)`
  width: 100%;
  height: 100%;
`;

const BasketCount = styled.p`
  color: #8d929e;

  @media ${device.screenMaxto1280} {
    font-size: 23px;
    line-height: 25px;
  }

  @media ${device.screen1279to1000} {
    font-size: 18px;
    line-height: 20px;
  }
`;

const BasketLine = styled.div`
  border-right: 1.5px solid #e9e9e9;
  width: 0;

  @media ${device.screenMaxto1280} {
    margin-right: 15px;
    height: 25px;
  }

  @media ${device.screen1279to1000} {
    margin-right: 10px;
    height: 20px;
  }
`;

const BasketText = styled.p`
  @media ${device.screenMaxto1280} {
    margin-right: 15px;
    font-size: 23px;
    line-height: 25px;
  }

  @media ${device.screen1279to1000} {
    margin-right: 10px;
    font-size: 18px;
    line-height: 20px;
  }
`;

const BasketButtonContainer = styled.button`
  background-color: #fafafa;
  border-radius: 5px;

  @media ${device.screenMaxto1280} {
    padding: 15px 15px;
  }

  @media ${device.screen1279to1000} {
    padding: 10px 14px;
  }

  &:hover ${BasketText}, &:hover ${BasketCount} {
    color: #c91e25;
  }
`;

const LoginButton = styled.button`
  margin-right: 30px;
  color: #8d929e;
  text-decoration-line: underline;

  &:hover {
    color: #c91e25;
  }

  @media ${device.screenMaxto1280} {
    font-size: 23px;
    line-height: 25px;
  }
  @media ${device.screen1279to1000} {
    font-size: 18px;
    line-height: 20px;
  }
`;

const ButtonContainer = styled.div`
  width: max-content;
  justify-content: flex-end;
  position: absolute;
  right: 0;
`;

const Image = styled.div`
  background-image: url(${(props) => props.source});
  background-size: 100%;

  background-repeat: no-repeat;
  background-position: center;

  @media ${device.screenMaxto1280} {
    width: 70px;
    height: 70px;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    width: 55px;
    height: 55px;
  }

  @media ${device.screen767to425}, ${device.screen424to375} {
    width: 50px;
    height: 50px;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    width: 40px;
    height: 40px;
  }

  border-radius: 100%;
`;

const ImageContainer = styled.div`
  width: max-content;
  justify-content: center;
  @media ${device.screenMaxto1280},
    ${device.screen1279to1000},
    ${device.screen999to768} {
    & ${Image}:first-child {
      margin-right: 15px;
    }
  }
  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    & ${Image}:first-child {
      margin-right: 10px;
    }
  }
`;

const RestaurantImage = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg width='45' height='45' viewBox='0 0 45 45' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M45 22.5C45 34.9264 34.9264 45 22.5 45C10.0736 45 0 34.9264 0 22.5C0 10.0736 10.0736 0 22.5 0C34.9264 0 45 10.0736 45 22.5Z' fill='%23F3F3F3'/%3E%3Cpath d='M26.8626 22.8966L18.9307 30.8285L13.3784 31.6217L14.1716 26.0694L24.483 15.758M24.483 15.758L29.2421 20.5171L30.7617 18.9975C31.2366 18.5226 31.2366 17.7525 30.7617 17.2775L27.7225 14.2384C27.2476 13.7635 26.4775 13.7635 26.0026 14.2384L24.483 15.758Z' stroke='%232B2D36' stroke-width='1.45946'/%3E%3C/svg%3E%0A");
  margin-left: 7.5px;
  background-position: center;
  background-size: 40px 40px;
  width: 40px;
  height: 40px;
`;

const RestaurantText = styled.p`
  @media ${device.screenMaxto1280} {
    font-size: 23px;
    line-height: 35px;
  }

  @media ${device.screen1279to1000} {
    font-size: 18px;
    line-height: 25px;
  }

  @media ${device.screen999to768} {
    font-size: 20px;
    line-height: 30px;
  }

  @media ${device.screen767to425} {
    font-size: 15px;
    line-height: 20px;
  }

  @media ${device.screen424to375} {
    font-size: 14px;
    line-height: 20px;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    font-size: 13px;
    line-height: 20px;
  }
`;

const ChooseRestaurantText = styled.div`
  text-decoration-line: underline;
  white-space: nowrap;

  @media ${device.screenMaxto1280} {
    font-size: 23px;
    line-height: 35px;
  }

  @media ${device.screen1279to1000} {
    font-size: 18px;
    line-height: 25px;
  }

  @media ${device.screen999to768} {
    font-size: 20px;
    line-height: 30px;
  }

  @media ${device.screen767to425} {
    font-size: 15px;
    line-height: 20px;
  }

  @media ${device.screen424to375} {
    font-size: 14px;
    line-height: 20px;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    font-size: 13px;
    line-height: 20px;
  }
`;

const ChooseRestaurantContainer = styled.div`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    margin-right: 20px;
  }

  @media ${device.screen999to768},
    ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    width: max-content;
  }
`;

const RestaurantContainer = styled.button`
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: flex-start;

  @media ${device.screen999to768},
    ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #f3f3f3;
  }
  @media ${device.screen999to768} {
    padding: 15px 25px;
  }
  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    padding: 10px 20px;
  }
`;

const NavLine = styled.div`
  width: 20px;
  height: 2px;
  margin-bottom: 2.5px;
  border-radius: 2.5px;
  background-color: #000000;

  &:last-child {
    margin-bottom: 0;
  }
`;

const NavButton = styled.button`
  flex-direction: column;
  align-items: flex-start;
  @media ${device.screen999to768} {
    padding: 10px 0;
    border-bottom: 1.5px solid #f3f3f3;
  }
`;

const NavButtonContainer = styled.div`
  width: max-content;
  justify-content: flex-start;
  position: absolute;
  left: 0;

  @media ${device.screen999to768} {
    left: 25px;
  }

  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    left: 20px;
  }
`;

const TopHeaderContainer = styled.div`
  justify-content: center;
  width: 100%;

  @media ${device.screenMaxto1280} {
    padding: 20px 0;
    margin: 0 30px;
  }

  @media ${device.screen1279to1000} {
    padding: 15px 0;
    margin: 0 20px;
  }

  @media ${device.screen999to768} {
    padding: 10px 0;
    border-bottom: 1.5px solid #f3f3f3;
  }

  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    padding: 10px 0;
    border-bottom: 1.5px solid #f3f3f3;
  }

  position: relative;
  background-color: white;
`;

const HeaderContainer = styled.header`
  justify-content: space-between;
  width: 100%;

  @media ${device.screenMaxto1280} {
  }

  @media ${device.screen1279to1000} {
  }

  @media ${device.screen999to768} {
    flex-direction: column;
  }

  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    flex-direction: column;
  }

  z-index: 2;
  position: sticky;
  top: 0;
  background-color: white;
`;

const Header = ({
  data,
  userData,
  activeRest,
  deliveryStatus,
  basketList,
  HeaderContainerRef,
  updateModalStatus,
  updateActiveRest,
  updateDeliveryStatus,
  logoStatus,
  order,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, [setWindowWidth]);

  const RestaurantComponent = (
    <RestaurantContainer
      disabled={order}
      onClick={() => {
        !order && updateModalStatus(1);
      }}
    >
      <ChooseRestaurantContainer>
        <RestaurantText>
          {deliveryStatus === 1 ? "Навынос," : "Доставка,"}
        </RestaurantText>
        <HeaderRestContainer>
          <ChooseRestaurantText>
            {data.restList[activeRest - 1].Address}
          </ChooseRestaurantText>
          <HeaderRestTime>
            &#8226;{" "}
            {"c " +
              data.restList[activeRest - 1].Time1 +
              " до " +
              data.restList[activeRest - 1].Time2}
          </HeaderRestTime>
          <RestaurantImage />
        </HeaderRestContainer>
      </ChooseRestaurantContainer>
    </RestaurantContainer>
  );

  const NavButtonComponent = (
    <NavButtonContainer>
      {windowWidth < 1000 ? (
        <NavButton>
          <NavLine />
          <NavLine />
          <NavLine />
        </NavButton>
      ) : (
        data && RestaurantComponent
      )}
    </NavButtonContainer>
  );

  const ButtonComponent = (
    <ButtonContainer>
      {windowWidth >= 1000 && (
        <>
          {!order &&
            (userData.status !== 1 ? (
              <LoginButton
                onClick={() => {
                  updateModalStatus(3);
                }}
              >
                Войти
              </LoginButton>
            ) : (
              <LoginButton
                onClick={() => {
                  updateModalStatus(6);
                }}
              >
                Профиль
              </LoginButton>
            ))}
          {!order && (
            <BasketButtonContainer
              onClick={() => {
                if (basketList["0"].length + basketList["1"].length > 0) {
                  updateModalStatus(5);
                }
              }}
            >
              <BasketText>Корзина</BasketText>
              <BasketLine />
              <BasketCount>
                {basketList["0"] &&
                  basketList["0"].length + basketList["1"].length}
              </BasketCount>
            </BasketButtonContainer>
          )}
        </>
      )}
    </ButtonContainer>
  );

  return (
    <HeaderContainer ref={HeaderContainerRef}>
      <TopHeaderContainer>
        {NavButtonComponent}
        <ImageContainer>
          <Image
            source={LogoBurgRound}
            style={
              activeRest === 3 || activeRest === 4 ? { opacity: "0.5" } : {}
            }
            onClick={() => {
              updateActiveRest(1);
              updateDeliveryStatus(0);
            }}
          >
            <TempLink to="/" />
          </Image>
          <Image
            source={LogoSandRound}
            onClick={() => {
              updateActiveRest(3);
              updateDeliveryStatus(0);
            }}
          >
            <TempLink to="/" />
          </Image>
        </ImageContainer>
        {ButtonComponent}
      </TopHeaderContainer>
      {windowWidth < 1000 && data && RestaurantComponent}
    </HeaderContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    activeRest: state.activeRest,
    deliveryStatus: state.deliveryStatus,
    basketList: state.basketList,
    userData: state.userData,
    logoStatus: state.logoStatus,
  };
};

const mapDispatchToProps = {
  updateModalStatus,
  updateActiveRest,
  updateDeliveryStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
