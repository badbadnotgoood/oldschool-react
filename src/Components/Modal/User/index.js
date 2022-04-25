import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import InputMask from "react-input-mask";
import axios from "axios";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

import { updateModalStatus, updateUserData } from "../../../Store/Actions";

const AddressDeleteButton = styled.button`
  font-size: 14px;
  line-height: 15px;
  text-decoration-line: underline;
  color: #8d929e;

  &:hover {
    color: #c91e25;
  }
`;

const AddressContentComment = styled.p`
  font-size: 14px;
  line-height: 15px;
  color: #8d929e;
  margin-bottom: 5px;
`;

const AddressContentAddress = styled.p`
  font-size: 14px;
  line-height: 15px;
  height: 100%;
`;

const AddressContent = styled.div`
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
`;

const AddressItem = styled.div`
  height: 40px;
  border-bottom: 1px solid #f0f0f0;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

const AddressContainer = styled.div`
  width: 100%;
  flex-direction: column;
  & ${AddressItem}:last-child {
    margin-bottom: unset;
  }
  margin-bottom: 30px;
`;

const AddressCancelButton = styled.button`
  background-color: #f3f3f3;
  color: black;
  border-radius: 8px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
`;

const AddressSaveButton = styled.button`
  background-color: #2b2d36;
  color: white;
  border-radius: 8px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
`;

const AddressButtonContainer = styled.div`
  & button {
    height: 55px;
    width: calc(100% / 2);
  }
  width: 100%;
  margin-top: 30px;
`;

const AddressComment = styled.textarea`
  width: 100%;
  height: 80px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 10px;
`;

const AddressTitle = styled.p`
  font-size: 14px;
  line-height: 15px;
  color: #8d929e;
  margin-bottom: 10px;
  width: 100%;
  justify-content: flex-start;
`;

const AddressAddButton = styled.button`
  width: 185px;
  height: 55px;
  background-color: #f3f3f3;
  color: black;
  border-radius: 8px;
  width: 420px;
`;

const DataCancelButton = styled.button`
  width: 160px;
  height: 55px;
  background-color: #f3f3f3;
  color: black;
  border-radius: 8px;
`;

const DataSaveButton = styled.button`
  width: 270px;
  height: 55px;
  background-color: #2b2d36;
  color: white;
  margin-right: 15px;
  border-radius: 8px;
`;

const DataButtonContainer = styled.div`
  margin-top: 20px;
`;

const DataPhoneInput = styled(InputMask)`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #f3f3f3;
`;

const DataInput = styled.input`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #f3f3f3;
`;

const DataName = styled.p`
  position: absolute;
  left: 0;
`;

const DataContainer = styled.div`
  position: relative;
  height: 40px;
  width: 100%;
  padding-left: 100px;
  margin-bottom: 20px;
`;

const Title = styled.p`
  font-size: 24px;
  line-height: 25px;
  margin-bottom: 30px;
  width: 100%;
  justify-content: flex-start;
`;

const UserContainer = styled.div`
  padding: 30px;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
`;

const DataComponent = ({ userData, updateModalStatus, updateUserData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    userData.Name !== null && setName(userData.Name);
    userData.Email !== null && setEmail(userData.Email);
    userData.Phone !== null && setPhone(userData.Phone);
  }, [userData]);

  return (
    <UserContainer>
      <Title>Мои данные</Title>
      <DataContainer>
        <DataName>Имя</DataName>
        <DataInput
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DataContainer>
      <DataContainer>
        <DataName>Эл. почта</DataName>
        <DataInput
          placeholder="Введите почту"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DataContainer>
      <DataContainer>
        <DataName>Телефон</DataName>
        <DataPhoneInput
          placeholder="Телефон для связи"
          maskChar={null}
          mask="8 (999) 999 99 99"
          value={phone}
          disabled={true}
        />
      </DataContainer>
      <DataButtonContainer>
        <DataSaveButton
          onClick={() => {
            axios
              .post("../api/0.1.0/editUserData", {
                Phone: phone,
                Name: name,
                Email: email,
              })
              .then((response) => {
                if (response.data.status === 1) {
                  updateUserData();
                  updateModalStatus(0);
                }
              });
          }}
        >
          Сохранить изменения
        </DataSaveButton>
        <DataCancelButton
          onClick={() => {
            updateModalStatus(0);
          }}
        >
          Отмена
        </DataCancelButton>
      </DataButtonContainer>
    </UserContainer>
  );
};

const AddressComponent = ({ updateUserData, userData, updateModalStatus }) => {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  return (
    <UserContainer>
      <Title>Мои адреса</Title>
      {!show ? (
        <>
          {userData.AddressArray.length > 0 && (
            <AddressContainer>
              {userData.AddressArray.map((el, i) => (
                <AddressItem key={i}>
                  <AddressContent>
                    <AddressContentAddress>{el.Address}</AddressContentAddress>
                    {el.Comment !== "" && (
                      <AddressContentComment>
                        {el.Comment}
                      </AddressContentComment>
                    )}
                  </AddressContent>
                  <AddressDeleteButton
                    onClick={() => {
                      axios
                        .post("../api/0.1.0/deleteAddress", {
                          Index: i,
                        })
                        .then((response) => {
                          if (response.data.status === 1) {
                            updateUserData();
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    Удалить
                  </AddressDeleteButton>
                </AddressItem>
              ))}
            </AddressContainer>
          )}
          <AddressAddButton
            onClick={() => {
              setShow(true);
              setAddress("");
              setComment("");
            }}
          >
            Добавить адрес
          </AddressAddButton>
        </>
      ) : (
        <>
          <AddressSuggestions
            token="a31eb2568e95f86dbfbfab4d80ae0c904debd9ab"
            value={address}
            onChange={setAddress}
            inputProps={{ placeholder: "Адрес доставки" }}
          />
          <AddressTitle>Комментарий к заказу</AddressTitle>
          <AddressComment
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <AddressButtonContainer>
            <AddressSaveButton
              onClick={() => {
                axios
                  .post("../api/0.1.0/addAddress", {
                    Address: address.value,
                    Comment: comment,
                  })
                  .then((response) => {
                    if (response.data.status === 1) {
                      updateUserData();
                      setShow(false);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              Сохранить
            </AddressSaveButton>
            <AddressCancelButton
              onClick={() => {
                setShow(false);
                setAddress("");
                setComment("");
              }}
            >
              Отмена
            </AddressCancelButton>
          </AddressButtonContainer>
        </>
      )}
    </UserContainer>
  );
};

const HistoryComponent = () => {};

const User = ({
  userData,
  updateUserData,
  userDataView,
  updateModalStatus,
}) => {
  return (
    <>
      {userDataView.status1 && (
        <DataComponent
          userData={userData}
          updateUserData={updateUserData}
          updateModalStatus={updateModalStatus}
        />
      )}
      {userDataView.status2 && (
        <AddressComponent
          userData={userData}
          updateUserData={updateUserData}
          updateModalStatus={updateModalStatus}
        />
      )}
      {userDataView.status3 && <HistoryComponent userData={userData} />}
    </>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
  userDataView: state.userDataView,
});

const mapDispatchToProps = { updateModalStatus, updateUserData };

export default connect(mapStateToProps, mapDispatchToProps)(User);
