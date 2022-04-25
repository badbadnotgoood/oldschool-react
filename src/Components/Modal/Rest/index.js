import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import device from "../../device";

import {
  updateActiveRest,
  updateDeliveryStatus,
  updateModalStatus,
  updateData,
  updateActiveRestAddress,
} from "../../../Store/Actions";

import LogoBurgRound from "../../../Media/images/LogoBurgRound.svg";
import LogoSandRound from "../../../Media/images/LogoSandRound.svg";

const TimeText = styled.p`
  position: absolute;

  @media ${device.screenMaxto1280},
    ${device.screen1279to1000},
    ${device.screen999to768} {
    right: 20px;
    bottom: 18px;
    font-size: 14px;
  }

  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    right: 10px;
    bottom: 10px;
    font-size: 12px;
  }
`;

const ChooseButton = styled.button`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  background-color: #2b2d36;
  color: white;
  width: 100%;

  @media ${device.screenMaxto1280} {
    border-radius: 8px;
    font-size: 22px;
    line-height: 25px;
    padding: 20px 15px;
    margin-top: 20px;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    border-radius: 6px;
    font-size: 16px;
    line-height: 20px;
    padding: 15px 15px;
    margin-top: 15px;
  }

  @media ${device.screen767to425} {
    border-radius: 6px;
    font-size: 16px;
    line-height: 20px;
    padding: 10px 15px;
    margin-top: 15px;
  }
  @media ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    border-radius: 6px;
    font-size: 14px;
    line-height: 15px;
    padding: 10px 15px;
    margin-top: 10px;
  }
`;

const RestImage = styled.div`
  position: absolute;
  background-image: url(${(props) => props.source});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;

  @media ${device.screenMaxto1280} {
    width: 55px;
    height: 55px;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    width: 50px;
    height: 50px;
  }

  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    width: 40px;
    height: 40px;
  }
`;

const RestText = styled.p`
  font-family: "Cera Round Pro Medium";
  @media ${device.screenMaxto1280} {
    font-size: 22px;
    line-height: 25px;
    margin-bottom: 15px;
  }

  @media ${device.screen1279to1000},
    ${device.screen999to768},
    ${device.screen767to425} {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 10px;
  }

  @media ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    font-size: 14px;
    line-height: 15px;
    margin-bottom: 10px;
  }
`;

const ChooseAddress = styled.p`
  text-decoration-line: underline;
  color: #8d929e;

  @media ${device.screenMaxto1280} {
    font-size: 16px;
    line-height: 20px;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    font-size: 14px;
    line-height: 15px;
  }

  @media ${device.screen767to425} {
    font-size: 14px;
    line-height: 15px;
  }

  @media ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    font-size: 12px;
    line-height: 15px;
  }
`;

const ChooseStreetAddress = styled.div`
  flex-direction: column;
  align-items: flex-start;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    margin-left: 110px;
  }

  @media ${device.screen999to768} {
    margin-left: 115px;
  }

  @media ${device.screen767to425} {
    margin-left: 75px;
  }

  @media ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    margin-left: 70px;
  }
`;

const RestImageContainer = styled.div`
  position: relative;
  @media ${device.screenMaxto1280},
    ${device.screen1279to1000},
    ${device.screen999to768},
    ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    & ${RestImage}:nth-child(1) {
      left: 0;
    }
  }

  @media ${device.screenMaxto1280} {
    & ${RestImage}:nth-child(2) {
      left: 35px;
    }
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    & ${RestImage}:nth-child(2) {
      left: 30px;
    }
  }

  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    & ${RestImage}:nth-child(2) {
      left: 20px;
    }
  }
`;

const ChooseStreetContainerButton = styled.button`
  background-color: #fefefe;
  justify-content: flex-start;
  width: 100%;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  position: relative;

  @media ${device.screenMaxto1280},
    ${device.screen1279to1000},
    ${device.screen999to768} {
    border-radius: 10px;
    margin: 25px 0 0;
    padding: 18px 20px;
  }

  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    border-radius: 8px;
    margin: 10px 0 0;
    padding: 10px 10px;
  }
`;

const DeliveryContainerButton = styled.button`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  font-family: "Cera Round Pro Medium";

  @media ${device.screenMaxto1280} {
    border-radius: 8px;
    font-size: 22px;
    line-height: 25px;
    padding: 20px 18px;

    &:first-child {
      margin-right: 20px;
    }
  }
  @media ${device.screen1279to1000}, ${device.screen999to768} {
    border-radius: 6px;
    font-size: 16px;
    line-height: 20px;
    padding: 15px 18px;

    &:first-child {
      margin-right: 15px;
    }
  }
  @media ${device.screen767to425} {
    border-radius: 6px;
    font-size: 16px;
    line-height: 20px;
    padding: 10px 15px;

    &:first-child {
      margin-right: 10px;
    }
  }
  @media ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    border-radius: 5px;
    font-size: 14px;
    line-height: 15px;
    padding: 10px 10px;

    &:first-child {
      margin-right: 10px;
    }
  }
`;

const ChooseRestaurantContainer = styled.div`
  flex-direction: column;
  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    width: 535px;
  }
  @media ${device.screen999to768} {
    width: 655px;
  }
  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    width: 100%;
  }
`;

const ChooseDeliveryContainer = styled.div`
  justify-content: space-between;
  width: 100%;
  & ${DeliveryContainerButton} {
    width: calc(100% / 2);
  }
`;

const RestarauntContainer = styled.div`
  flex-direction: column;
  background-color: white;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    border-radius: 15px;
    padding: 20px;
  }
  @media ${device.screen999to768} {
    border-radius: 15px;
    padding: 15px 15px;
  }
  @media ${device.screen767to425} {
    border-radius: 15px 15px 0 0;
    padding: 15px 15px;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  @media ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    border-radius: 12px 12px 0 0;
    padding: 10px 10px;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
`;

export const Rest = ({
  updateModalStatus,
  updateDeliveryStatus,
  updateActiveRest,
  deliveryStatus,
  activeRest,
  data,
}) => {
  const [localActiveRest, setLocalActiveRest] = useState(activeRest);
  const [localDeliveryStatus, setLocalDeliveryStatus] =
    useState(deliveryStatus);

  return (
    <RestarauntContainer>
      <ChooseDeliveryContainer>
        <DeliveryContainerButton
          onClick={() => setLocalDeliveryStatus(0)}
          className={localDeliveryStatus === 0 ? "active-delivery" : ""}
        >
          Навынос
        </DeliveryContainerButton>
        <DeliveryContainerButton
          onClick={() => setLocalDeliveryStatus(1)}
          className={localDeliveryStatus === 1 ? "active-delivery" : ""}
        >
          Доставка
        </DeliveryContainerButton>
      </ChooseDeliveryContainer>
      <ChooseRestaurantContainer>
        {data.restList &&
          data.restList.map(
            (el, i) =>
              (localDeliveryStatus === 0 ||
                (localDeliveryStatus === 1 && el["ID"] === 1)) && (
                <ChooseStreetContainerButton
                  key={el["ID"]}
                  disabled={!el["RestStatus"]}
                  onClick={() => {
                    setLocalActiveRest(el["ID"]);
                    updateActiveRest(el["ID"]);
                    updateModalStatus(0);
                    updateDeliveryStatus(localDeliveryStatus);
                    window.scrollTo(0, 0);

                    if (localDeliveryStatus === 0) {
                      updateActiveRestAddress(
                        data.restList[activeRest - 1]["Address"]
                      );
                    } else {
                      updateActiveRestAddress("");
                    }
                  }}
                >
                  <RestImageContainer>
                    {el["BURG"] && <RestImage source={LogoBurgRound} />}
                    {el["SAND"] && <RestImage source={LogoSandRound} />}
                  </RestImageContainer>
                  <ChooseStreetAddress>
                    <RestText>{el["Address"]}</RestText>
                    <ChooseAddress
                      className={
                        localActiveRest === el["ID"] ? "active-address" : ""
                      }
                    >
                      {localActiveRest === el["ID"]
                        ? "Выбран адрес"
                        : "Выбрать адрес"}
                    </ChooseAddress>
                  </ChooseStreetAddress>
                  <TimeText>
                    {"c " + el["Time1"] + " до " + el["Time2"]}
                  </TimeText>
                </ChooseStreetContainerButton>
              )
          )}
      </ChooseRestaurantContainer>
    </RestarauntContainer>
  );
};

const mapStateToProps = (state) => ({
  deliveryStatus: state.deliveryStatus,
  activeRest: state.activeRest,
  data: state.data,
});

const mapDispatchToProps = {
  updateActiveRest,
  updateDeliveryStatus,
  updateModalStatus,
  updateData,
  updateActiveRestAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Rest);
