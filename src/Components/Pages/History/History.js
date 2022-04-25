import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Footer from "../../Shared/Footer";
import Header from "../../Shared/Header";
import axios from "axios";

const OrderRestContainer = styled.div`

`

const OrderStatusContainer = styled.div`
  margin-bottom: 15px;
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
  margin-right: 20px;
`;

const OrderNumber = styled.p`
  color: ${(props) => (props.rest === 0 ? "#C91E25" : "#199869")};
  font-size: 32px;
  line-height: 35px;
  font-family: "Cera Round Pro Medium";
`;

const OrderNumberPriceContainer = styled.div`
  margin-bottom: 20px;
`;

const OrderInfoContainer = styled.div`
  flex-direction: column;
`;

const OrderContainer = styled.div`
  padding: 30px 35px;
  background: #fefefe;
  border-radius: 15px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.1);
`;

const HistoryContainer = styled.div`
  background-color: #f3f3f3;
  width: 805px;
  flex-direction: column;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.1);
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

const History = ({ userData }) => {
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
  }, [userData]);

  const HistoryComponent = (
    <HistoryContainer>
      {history.length > 0 &&
        history.map((el, i) => <OrderContainer key={i}></OrderContainer>)}
    </HistoryContainer>
  );

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
        <Footer />
      </>
    )
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(History);
