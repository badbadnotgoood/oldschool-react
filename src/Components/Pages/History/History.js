import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Footer from "../../Shared/Footer";
import Header from "../../Shared/Header";
import axios from "axios";

const OrderDishPrice = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: #bcbcbc;
`;

const OrderDishComment = styled.span``;

const OrderContentContainer = styled.div`
  justify-content: space-between;
`;

const OrderTitleContainer = styled.div`
  justify-content: space-between;
  width: 100%;
`;

const OrderRightContainer = styled.div`
  width: 440px;
  padding: 22px 22px 24px;
  background-color: #f9f9f9;
  border-radius: 21px;
  flex-direction: column;
  margin-left: 30px;

  & > ${OrderTitleContainer} {
    margin-bottom: 10px;
  }

  & > ${OrderTitleContainer}:last-child {
    margin-bottom: unset;
  }
`;

const OrderContent = styled.p`
  font-size: 14px;
  line-height: 15px;
  color: #bcbcbc;
`;

const OrderTitle = styled.p`
  font-family: "Cera Round Pro Medium", sans-serif;
  font-size: 15px;
  line-height: 15px;
`;

const OrderBlock = styled.div`
  flex-direction: column;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 15px;
  margin-bottom: 15px;
  width: 100%;
  align-items: flex-start;

  & > *:first-child {
    margin-bottom: 10px;
  }

  &:last-child {
    margin-bottom: unset;
  }
`;

const OrderLeftContainer = styled.div`
  flex-direction: column;
  width: 330px;
`;

const OrderBottomContainer = styled.div`
  align-items: flex-start;
`;

const OrderComponent = styled.div`
  flex-direction: column;
`;

const OrderStatusRestAddress = styled.p`
  font-size: 21px;
  line-height: 25px;
  color: #bcbcbc;
`;

const OrderStatusRestName = styled.p`
  font-size: 21px;
  line-height: 25px;
  margin-right: 10px;
`;

const OrderStatusRestContainer = styled.div``;

const OrderStatusIndicator = styled.p``;

const OrderStatusIndicatorContainer = styled.div`
  color: #bcbcbc;
  font-size: 20px;
  line-height: 20px;
  font-family: "Cera Round Pro Medium", sans-serif;
  margin-bottom: 15px;
  & > * {
    margin-left: 10px;
    margin-right: 10px;
  }

  & > *:first-child {
    margin-left: unset;
  }

  & > *:last-child {
    margin-right: unset;
  }
`;

const OrderRestContainer = styled.div`
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
`;

const OrderStatusContainer = styled.div`
  height: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;

  & > * {
    margin-bottom: 30px;
  }

  & > *:last-child {
    margin-bottom: unset;
  }
`;

const OrderDeliverat = styled.p`
  font-size: 20px;
  line-height: 20px;
  color: #bcbcbc;
`;

const OrderPrice = styled.p`
  font-size: 24px;
  line-height: 25px;
  color: black;
`;

const OrderNumber = styled.p`
  color: ${(props) => (props.rest === 0 ? "#C91E25" : "#199869")};
  font-size: 32px;
  line-height: 35px;
  font-family: "Cera Round Pro Medium";
`;

const OrderNumberPriceContainer = styled.div`
  margin-bottom: 15px;
  width: 100%;
  justify-content: space-between;
`;

const OrderInfoContainer = styled.div`
  flex-direction: column;
`;

const OrderContainer = styled.div`
  padding: 30px 35px;
  background: #fefefe;
  border-radius: 15px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: flex-start;

  &:last-child {
    margin-bottom: unset;
  }
`;

const HistoryContainer = styled.div`
  width: 805px;
  flex-direction: column;
  border-radius: 15px;

  & > div {
    width: 100%;
  }
`;

const OrderAddressButton = styled.button`
  margin-left: 10px;
  margin-right: 10px;

  &:hover {
    color: #c91e25;
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

const OrderRestComponent = ({ data }) => {
  const order_id = data.order_id;
  const restList = data.restList;
  const rest_id = data.rest_id;
  const status = data.status;
  const theme = data.theme;
  const type = data.type;
  return (
    <OrderRestContainer>
      <OrderStatusIndicatorContainer>
        <OrderStatusIndicator
          style={
            status === 0
              ? theme === 0
                ? { color: "#C91E25" }
                : { color: "#199869" }
              : {}
          }
        >
          ????????????
        </OrderStatusIndicator>
        /
        <OrderStatusIndicator
          style={
            status === 1
              ? theme === 0
                ? { color: "#C91E25" }
                : { color: "#199869" }
              : {}
          }
        >
          {"??????????????????"}
        </OrderStatusIndicator>
        /
        <OrderStatusIndicator
          style={
            status === 2
              ? theme === 0
                ? { color: "#C91E25" }
                : { color: "#199869" }
              : {}
          }
        >
          {type === 0 ? "??????????" : "????????????????????"}
        </OrderStatusIndicator>
      </OrderStatusIndicatorContainer>
      <OrderStatusRestContainer>
        <OrderStatusRestName>
          {theme === 0 ? "Oldschool burgers" : "Sandwich Street"}
        </OrderStatusRestName>
        <OrderStatusRestAddress>
          {restList[rest_id - 1]["Address"]}
        </OrderStatusRestAddress>
      </OrderStatusRestContainer>
    </OrderRestContainer>
  );
};

const OrderStatusComponent = ({ data }) => {
  const [realStatus, setRealStatus] = useState(data.status);
  const burgCount = data.burg;
  const sandCount = data.sand;
  useEffect(() => {
    const status = data.status;
    if (status === 0) {
      axios
        .post("./api/0.1.0/check_order", {
          order_id: data["order_id"],
          rest_id: data["rest_id"],
        })
        .then((r) => {
          const response = r.data;
          setRealStatus(response.order.status);
        });
    }
  }, [data]);
  return (
    <OrderStatusContainer>
      {burgCount > 0 && (
        <OrderRestComponent
          data={{
            rest_id: data.rest_id,
            theme: 0,
            restList: data.restList,
            status: realStatus,
            type: data.type,
          }}
        />
      )}
      {sandCount > 0 && (
        <OrderRestComponent
          data={{
            rest_id: data.rest_id,
            theme: 1,
            restList: data.restList,
            status: realStatus,
            type: data.type,
          }}
        />
      )}
    </OrderStatusContainer>
  );
};

const History = ({ userData, restList }) => {
  const [accessStatus, setAccessStatus] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeOrder, setActiveOrder] = useState({
    click: false,
  });

  console.log(activeOrder.content);

  useEffect(() => {
    axios
      .post("../api/0.1.0/historyAccess", {
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
    setHistory(userData.OrderArray);
    console.log(history);
  }, [userData]);

  return (
    accessStatus && (
      <>
        <Header />
        <OrderAddressContainer>
          <OrderAddressLink to="/">????????</OrderAddressLink>
          {"/"}
          <OrderAddressButton
            onClick={() => {
              setActiveOrder({ click: false });
            }}
          >
            ?????????????? ??????????????
          </OrderAddressButton>
          {activeOrder.click && (
            <>
              /<OrderAddressButton>{activeOrder.order_id}</OrderAddressButton>
            </>
          )}
        </OrderAddressContainer>
        {activeOrder.click ? (
          <OrderComponent>
            <OrderAddressName>
              {"?????????? " + activeOrder.order_id}
            </OrderAddressName>
            <OrderBottomContainer>
              <OrderLeftContainer>
                <OrderBlock>
                  <OrderTitle>
                    {"?????????? " + activeOrder.order_id_short}
                  </OrderTitle>
                  <OrderContentContainer>
                    <OrderContent>{"???????????? ????????????: "}</OrderContent>
                    <OrderContent
                      style={{
                        color: "#199869",
                        textDecorationLine: "underline",
                        marginLeft: "5px",
                      }}
                    >
                      {activeOrder.status}
                    </OrderContent>
                  </OrderContentContainer>
                </OrderBlock>
                <OrderBlock>
                  <OrderTitle>{activeOrder.rests}</OrderTitle>
                  <OrderContent>{activeOrder.deliverat}</OrderContent>
                </OrderBlock>
                <OrderBlock>
                  <OrderTitle>?????????? ??????????????????:</OrderTitle>
                  <OrderContent>{activeOrder.address}</OrderContent>
                </OrderBlock>
                <OrderBlock>
                  <OrderTitle>????????????????????:</OrderTitle>
                  <OrderContent>{activeOrder.serving}</OrderContent>
                </OrderBlock>
              </OrderLeftContainer>
              <OrderRightContainer>
                {activeOrder.content.content["0"].length > 0 &&
                  activeOrder.content.content["0"].map((el, i) => (
                    <OrderBlock key={i}>
                      <OrderTitleContainer>
                        <OrderTitle>{el.count + " x " + el.name}</OrderTitle>
                        <OrderDishPrice>{el.price + "???"}</OrderDishPrice>
                      </OrderTitleContainer>
                      <OrderContentContainer>
                        {el.adds.map((el2, i) => (
                          <OrderContent key={i}>
                            {el2.name}
                            {el.adds.length > 1 && ", "}
                          </OrderContent>
                        ))}
                        {el.mods.map((el2, i) => (
                          <OrderContent key={i}>
                            {el2.name}
                            {el.mods.length > 1 && ", "}
                          </OrderContent>
                        ))}
                      </OrderContentContainer>
                    </OrderBlock>
                  ))}
                {activeOrder.content.content["1"].length > 0 &&
                  activeOrder.content.content["1"].map((el, i) => (
                    <OrderBlock key={i}>
                      <OrderTitleContainer>
                        <OrderTitle>{el.count + " x " + el.name}</OrderTitle>
                        <OrderDishPrice>{el.price + "???"}</OrderDishPrice>
                      </OrderTitleContainer>
                      <OrderContentContainer>
                        {el.adds.map((el2, i) => (
                          <OrderContent key={i}>
                            {el2.name}
                            {el.adds.length > 1 && ", "}
                          </OrderContent>
                        ))}
                        {el.mods.map((el2, i) => (
                          <OrderContent key={i}>
                            {el2.name}
                            {el.mods.length > 1 && ", "}
                          </OrderContent>
                        ))}
                      </OrderContentContainer>
                    </OrderBlock>
                  ))}
                <OrderTitleContainer>
                  <OrderContent>?????????????????? ????????????</OrderContent>
                  <OrderContent>{activeOrder.price + "???"}</OrderContent>
                </OrderTitleContainer>
                <OrderTitleContainer>
                  <OrderContent>????????????????</OrderContent>
                  <OrderContent>??????????????????</OrderContent>
                </OrderTitleContainer>
                <OrderTitleContainer>
                  <OrderTitle>??????????:</OrderTitle>
                  <OrderTitle>{activeOrder.price + "???"}</OrderTitle>
                </OrderTitleContainer>
              </OrderRightContainer>
            </OrderBottomContainer>
          </OrderComponent>
        ) : (
          <>
            <OrderAddressName>?????????????? ??????????????</OrderAddressName>
            <HistoryContainer>
              {history.length > 0 &&
                history.map((el, i) => (
                  <OrderContainer
                    key={i}
                    onClick={() => {
                      setActiveOrder({
                        status:
                          el["status"] === 0
                            ? "????????????"
                            : el["status"] === 1
                            ? "??????????????????"
                            : el["type"] === 0
                            ? "??????????"
                            : "????????????????????",
                        rests:
                          el["0"] > 0 ? "Oldschool burgers" : "Sandwich Street",
                        deliverat: el.deliverat,
                        order_id: "??-" + el.order_id + ", " + el.deliverat,
                        order_id_short: "C-" + el.order_id,
                        serving:
                          el["type"] === 0 ? "???????????? ?? ??????????" : "????????????????",
                        address: restList[el["rest_id"] - 1]["Address"],
                        content: el,
                        price: el.price,
                        click: true,
                      });
                    }}
                  >
                    <OrderInfoContainer>
                      <OrderNumberPriceContainer>
                        <OrderNumber
                          style={
                            el["0"] > 0
                              ? { color: "#C91E25" }
                              : { color: "#199869" }
                          }
                        >
                          {"??-" + el.order_id}
                        </OrderNumber>
                        <OrderPrice>{el.price + "???"}</OrderPrice>
                      </OrderNumberPriceContainer>
                      <OrderDeliverat>{el.deliverat}</OrderDeliverat>
                    </OrderInfoContainer>
                    <OrderStatusComponent
                      data={{
                        burg: el["0"],
                        sand: el["1"],
                        type: el["type"],
                        status: el["status"],
                        rest_id: el["rest_id"],
                        order_id: el["order_id"],
                        restList: restList,
                      }}
                    />
                  </OrderContainer>
                ))}
            </HistoryContainer>
          </>
        )}
        <Footer />
      </>
    )
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
  restList: state.data.restList,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(History);
