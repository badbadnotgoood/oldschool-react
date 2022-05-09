import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Footer from "../../Shared/Footer";
import Header from "../../Shared/Header";
import axios from "axios";

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
          Создан
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
          {"Готовится"}
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
          {type === 0 ? "Выдан" : "Отправлено"}
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
          <OrderAddressLink to="/">Меню</OrderAddressLink>
          {"/"}
          <OrderAddressLink to="/history">История заказов</OrderAddressLink>
        </OrderAddressContainer>
        <OrderAddressName>История заказов</OrderAddressName>
        <HistoryContainer>
          {history.length > 0 &&
            history.map((el, i) => (
              <OrderContainer key={i}>
                <OrderInfoContainer>
                  <OrderNumberPriceContainer>
                    <OrderNumber
                      style={
                        el["0"] > 0
                          ? { color: "#C91E25" }
                          : { color: "#199869" }
                      }
                    >
                      {"С-" + el.order_id}
                    </OrderNumber>
                    <OrderPrice>{el.price + "₽"}</OrderPrice>
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
