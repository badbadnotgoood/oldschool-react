import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";

import {
  getBasketList,
  updateData,
  updateUserData,
  updateModalStatus,
  updateRequestStatus,
} from "../Store/Actions";

import Auth from "./Modal/Auth";
import Dish from "./Modal/Dish";
import User from "./Modal/User";
import Address from "./Modal/Address";
import Basket from "./Modal/Basket";
import Profile from "./Modal/Profile";

import MenuPage from "./Pages/Menu";
import OrderPage from "./Pages/Order";
import BasketPage from "./Pages/Basket";
import HistoryPage from "./Pages/History/History";
import Delivery from "./Modal/Delivery/Delivery";
import RestAddress from "./Modal/RestAddress/RestAddress";
import Attention from "./Modal/Attention";

const ModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;

const NoMatch = () => {
  const linkRef = useRef(null);

  useEffect(() => {
    if (linkRef !== null) {
      linkRef.current.click();
    }
  }, [linkRef]);

  return <Link ref={linkRef} to="./" />;
};

const App = ({
  data,
  activeRest,
  modalStatus,
  updateData,
  updateUserData,
  getBasketList,
  updateModalStatus,
}) => {
  const ModalContainerRef = useRef();
  const restModalStatus = Cookies.get("restModalStatus");

  useEffect(() => {
    updateData(activeRest);
  }, [activeRest]);

  useEffect(() => {
    getBasketList();
  }, [updateData]);

  useEffect(() => {
    updateUserData();
  }, [updateData]);

  useEffect(() => {
    if (restModalStatus) {
      updateModalStatus(0);
      Cookies.set("restModalStatus", "true", { expires: 1 });
    } else {
      updateModalStatus(1);
    }
  }, [restModalStatus]);

  const ModalComponent = (
    <ModalContainer
      ref={ModalContainerRef}
      onClick={(e) => {
        const current = e.target;
        const ref = ModalContainerRef.current;
        if (current === ref) {
          updateModalStatus(0);
        }
      }}
    >
      {modalStatus === 1 && <Delivery />}
      {modalStatus === 2 && <RestAddress />}
      {modalStatus === 3 && <Auth />}
      {modalStatus === 4 && <Dish />}
      {modalStatus === 5 && <Basket />}
      {modalStatus === 6 && <Profile />}
      {modalStatus === 7 && <User />}
      {modalStatus === 8 && <Address />}
    </ModalContainer>
  );

  return (
    data && (
      <>
        <Routes>
          <Route exact path="/" element={<MenuPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        {modalStatus !== 0 && ModalComponent}
      </>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    activeRest: state.activeRest,
    data: state.data,
    modalStatus: state.modalStatus,
  };
};

const mapDispatchToProps = {
  updateData,
  updateUserData,
  getBasketList,
  updateModalStatus,
  updateRequestStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
