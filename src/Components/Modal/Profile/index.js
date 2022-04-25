import axios from "axios";
import React, {useRef} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { updateUserDataView, updateModalStatus, updateUserData } from "../../../Store/Actions";

const TempLink = styled(Link)`
  opacity: 0;
  width: 0;
  height: 0;
  z-index: -1;
`;

const ProfileLink = styled(Link)`
  font-size: 21px;
  line-height: 25px;
  margin-bottom: 10px;
`;

const ProfileButton = styled.button`
  font-size: 21px;
  line-height: 25px;
  margin-bottom: 10px;
`;

const ProfileContainer = styled.div`
  align-items: flex-start;
  padding: 25px 30px;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  & button:hover, & a:hover {
    color: #c91e25;
  }

  & button:last-child, & a:last-child {
    margin-bottom: unset;
  }
  position: absolute;
  top: 90px;
  right: 160px;
`;

const Profile = ({ updateUserDataView, updateModalStatus, updateUserData }) => {
  const tempLinkRef = useRef();

  return (
    <ProfileContainer>
      <ProfileButton
        onClick={() => {
          updateModalStatus(7);
          updateUserDataView({
            status1: true,
          });
        }}
      >
        Мои данные
      </ProfileButton>
      <ProfileButton
        onClick={() => {
          updateModalStatus(8);
          updateUserDataView({
            status2: true,
          });
        }}
      >
        Мои адреса
      </ProfileButton>
      <ProfileLink to="/history">История заказов</ProfileLink>
      <ProfileButton
        onClick={() => {
          axios.get("../api/0.1.0/deleteUserData").then((response) => {
            if (response.data.status === 1) {
              updateUserData();
              tempLinkRef.current.click();
              updateModalStatus(0)
            }
          });
        }}
      >
        Выйти
      </ProfileButton>
      <TempLink to="/" ref={tempLinkRef} />
    </ProfileContainer>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  updateUserData,
  updateUserDataView,
  updateModalStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
