import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Cookies from "js-cookie"

import LogoBurgRound from "../../../Media/images/LogoBurgRound.svg";
import LogoSandRound from "../../../Media/images/LogoSandRound.svg";
import {
  updateActiveRest,
  updateActiveRestAddress,
  updateModalStatus,
  clearBasketList,
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

  &:hover {
    color: #c91e25;
  }
`;

const RestDisabledTextBottomNumber = styled.p`
  font-size: 16px;
  line-height: 20px;
  text-decoration-line: underline;
  margin-left: 5px;
`;

const RestDisabledTextBottom = styled.p`
  font-size: 16px;
  line-height: 20px;
`;

const RestDisabledTextBottomContainer = styled.div``;

const RestDisabledTextTop = styled.p`
  font-size: 16px;
  line-height: 20px;
`;

const RestDisabled = styled.div`
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const RestChoose = styled.p`
  width: 100%;
  margin-top: 15px;
  justify-content: flex-end;
`;

const RestTime = styled.p`
  font-size: 15px;
  line-height: 25px;
`;

const RestName = styled.p`
  font-family: "Cera Round Pro Medium";
  font-size: 20px;
  line-height: 25px;
`;

const ItemInfo = styled.div`
  margin-left: 15px;
  flex-direction: column;
  align-items: flex-start;
`;

const ItemIcon = styled.div`
  position: absolute;
  background-image: url(${(props) => props.source});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 54px;
  height: 54px;
`;

const ItemIconContainer = styled.div`
  position: relative;
  height: 54px;
  width: 89px;

  & ${ItemIcon}:nth-child(1) {
    left: 0;
  }

  & ${ItemIcon}:nth-child(2) {
    left: 35px;
  }
`;

const ItemInfoContainer = styled.div`
  width: 100%;
  justify-content: flex-start;
`;

const Item = styled.button`
  background: #fefefe;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 18px 20px;
  margin-bottom: 15px;
  justify-content: flex-start;
  width: 100%;
  min-height: 54px;
  flex-direction: column;

  cursor: ${(props) => !props.status && "not-allowed"};

  &:last-child {
    margin-bottom: unset;
  }

  &:hover {
    background-color: #f3f3f3;
  }
`;

const ItemContainer = styled.div`
  margin-bottom: 20px;
  flex-direction: column;
  width: 100%;
`;

const TopText = styled.p`
  font-family: "Cera Round Pro Medium";
  font-size: 24px;
  line-height: 25px;
  margin-bottom: 20px;
`;

const RestAddressContainer = styled.div`
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 30px;
  width: 500px;
`;

const RestAddress = ({
  restList,
  basketList,
  activeRest,
  clearBasketList,
  updateModalStatus,
  updateActiveRest,
}) => {
  const [rest, setRest] = useState();
  const [address, setAddress] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(activeRest);
  }, [activeRest]);

  return (
    <RestAddressContainer>
      <TopText>Выберите адрес ресторана</TopText>
      <ItemContainer>
        {restList &&
          restList.map((el, i) => (
            <Item
              key={i}
              status={el["RestStatus"]}
              onClick={() => {
                if (activeRest === i + 1) {
                  updateActiveRestAddress(el["Address"]);
                  Cookies.set("restModalStatus", "true", { expires: 1 });
                  updateModalStatus(0);
                } else {
                  const basketCount =
                    basketList[0].length + basketList[1].length;
                  if (basketCount > 0) {
                    setAddress(el["Address"]);
                    setRest(i + 1);
                    setShow(true);
                  } else {
                    setShow(false);
                    updateActiveRest(i + 1);
                    updateActiveRestAddress(el["Address"]);
                    Cookies.set("restModalStatus", "true", { expires: 1 });
                    updateModalStatus(0);
                  }
                }
              }}
              disabled={!el["RestStatus"] ? true : false}
              style={
                el["RestStatus"]
                  ? { opacity: "1", cursor: "pointer" }
                  : { opacity: "1" }
              }
            >
              <ItemInfoContainer
                style={
                  !el["RestStatus"] ? { opacity: "0.5" } : { opacity: "1" }
                }
              >
                <ItemIconContainer>
                  {el["BURG"] && <ItemIcon source={LogoBurgRound} />}
                  {el["SAND"] && <ItemIcon source={LogoSandRound} />}
                </ItemIconContainer>
                <ItemInfo>
                  <RestName>{el["Address"]}</RestName>
                  <RestTime>
                    {"Время работы: c " + el["Time1"] + " до " + el["Time2"]}
                  </RestTime>
                </ItemInfo>
              </ItemInfoContainer>
              {el["RestStatus"] ? (
                <RestChoose
                  style={
                    activeRest === i + 1
                      ? { color: "#8D929E" }
                      : { textDecorationLine: "underline" }
                  }
                >
                  {activeRest === i + 1 ? "Выбранно" : "Выбрать адрес"}
                </RestChoose>
              ) : (
                <RestDisabled>
                  <RestDisabledTextTop>
                    Заказ по этому адресу временно недоступен.
                  </RestDisabledTextTop>
                  <RestDisabledTextBottomContainer>
                    <RestDisabledTextBottom>
                      Номер колл-центра:
                    </RestDisabledTextBottom>
                    <RestDisabledTextBottomNumber>
                      333-247
                    </RestDisabledTextBottomNumber>
                  </RestDisabledTextBottomContainer>
                </RestDisabled>
              )}
            </Item>
          ))}
      </ItemContainer>
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
              updateActiveRest(rest);
              updateActiveRestAddress(address);
              clearBasketList();
              Cookies.set("restModalStatus", "true", { expires: 1 });
              updateModalStatus(0);
            }}
          />
        </ModalContainer>
      )}
    </RestAddressContainer>
  );
};

const mapStateToProps = (state) => ({
  restList: state.data.restList,
  activeRest: state.activeRest,
  basketList: state.basketList,
});

const mapDispatchToProps = {
  updateActiveRestAddress,
  updateModalStatus,
  updateActiveRest,
  clearBasketList,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestAddress);
