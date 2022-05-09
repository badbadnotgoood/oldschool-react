import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AddressSuggestions } from "react-dadata";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {
  updateActiveDeliveryAddress,
  updateModalStatus,
} from "../../../Store/Actions";

const TempLink = styled(Link)`
  opacity: 0;
  width: 0;
  height: 0;
  z-index: -1;
`;

const AddressAcceptButton = styled.button`
  width: 100%;
  height: 55px;
  margin-top: 30px;
  background: #2b2d36;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: white;
`;

const AddressButtonContainer = styled.div`
  width: 100%;
  padding: 0 30px 30px 30px;
`;

const AddressNewComment = styled.textarea`
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

const AddressAddNewContainer = styled.div`
  flex-direction: column;
  width: 100%;
  padding: 0 30px;

  & > * {
    width: 100%;
  }
`;

const AddressComment = styled.p`
  font-size: 17px;
  line-height: 20px;
  color: #a5a5a5;
`;

const AddressName = styled.p`
  font-size: 21px;
  line-height: 25px;
  font-family: "Cera Round Pro Medium";
  color: black;
`;

const AddressContainer = styled.div`
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: flex-start;
  border-bottom: 1px solid #eeeeee;
`;

const AddressItemIndicatorChecked = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: black;
`;

const AddressItemIndicator = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #8d929e;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  left: 0;

  & + ${AddressItemIndicatorChecked} {
    border: 2px solid black;
  }
`;

const AddressItem = styled.button`
  position: relative;
  width: 645px;
  height: 50px;
  justify-content: flex-start;
  padding-left: 40px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: unset;
  }
`;

const OrderRestExitCross = styled.div`
  background-color: #000000;
  width: 22px;
  position: absolute;
  border: 1.5px solid #000000;
  border-radius: 5px;
`;

const OrderRestkExit = styled.button`
  position: absolute;
  right: 20px;
  top: 30px;
  width: 25px;
  height: 25px;

  & ${OrderRestExitCross}:first-child {
    transform: rotate(45deg);
  }

  & ${OrderRestExitCross}:last-child {
    transform: rotate(-45deg);
  }
`;

const OrderRestTitle = styled.p`
  font-size: 23px;
  line-height: 25px;
  width: 100%;
  margin-bottom: 25px;
  font-family: "Cera Round Pro Medium";
  justify-content: flex-start;
`;

const AddressListContainer = styled.div`
  padding: 30px 30px;
  flex-direction: column;
  align-items: flex-start;
`;

const OrderRestContainer = styled.div`
  background-color: white;
  border: 1px solid #eceef5;
  border-radius: 20px;
  flex-direction: column;
  position: relative;
`;

function Address({
  userData,
  updateActiveDeliveryAddress,
  activeDeliveryAddress,
  setModalStatus,
  updateModalStatus,
}) {
  const [activeAddress, setActiveAddress] = useState(activeDeliveryAddress.id);
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const tempLinkRef = useRef();

  useEffect(() => {
    setActiveAddress(activeDeliveryAddress.id);
  }, [activeDeliveryAddress]);

  return (
    <OrderRestContainer>
      {userData && userData.AddressArray && (
        <>
          <OrderRestkExit
            onClick={() => {
              updateModalStatus(0);
            }}
          >
            <OrderRestExitCross />
            <OrderRestExitCross />
          </OrderRestkExit>
          <AddressListContainer>
            <OrderRestTitle>Укажите адрес</OrderRestTitle>
            {userData.AddressArray.map((el, i) => (
              <AddressItem
                key={i}
                onClick={() => {
                  setActiveAddress(i);
                  console.log(userData.AddressArray[i])
                }}
              >
                <AddressItemIndicator>
                  {activeAddress === i && <AddressItemIndicatorChecked />}
                </AddressItemIndicator>
                <AddressContainer>
                  <AddressName>{el.Address}</AddressName>
                  <AddressComment>{el.Comment}</AddressComment>
                </AddressContainer>
              </AddressItem>
            ))}
            <AddressItem
              onClick={() => {
                setActiveAddress("newAddress");
              }}
            >
              <AddressItemIndicator>
                {activeAddress === "newAddress" && (
                  <AddressItemIndicatorChecked />
                )}
              </AddressItemIndicator>
              <AddressContainer>
                <AddressName>Указать новый адрес</AddressName>
              </AddressContainer>
            </AddressItem>
          </AddressListContainer>
          {activeAddress === "newAddress" && (
            <AddressAddNewContainer>
              <AddressSuggestions
                token="a31eb2568e95f86dbfbfab4d80ae0c904debd9ab"
                value={address}
                onChange={setAddress}
                inputProps={{ placeholder: "Адрес доставки" }}
              />
              <AddressTitle>Комментарий к заказу</AddressTitle>
              <AddressNewComment
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  console.log(address.value, comment)
                }}
              />
            </AddressAddNewContainer>
          )}
          <AddressButtonContainer>
            <AddressAcceptButton
              onClick={() => {
                if (activeAddress !== "newAddress") {
                  updateActiveDeliveryAddress({
                    Address: userData.AddressArray[activeAddress].Address,
                    Comment: userData.AddressArray[activeAddress].Comment,
                  });
                  if (document.location.pathname.includes("/basket")) {
                    tempLinkRef.current.click();
                  } else {
                    updateModalStatus(0);
                  }
                } else if (address !== "" && address.value !== undefined) {
                  axios
                    .post("../api/0.1.0/addAddress", {
                      Address: address.value,
                      Comment: comment,
                    })
                    .then((response) => {
                      if (response.data.status === 1) {
                        updateActiveDeliveryAddress({
                          Address: address.value,
                          Comment: comment,
                        });
                        if (document.location.pathname.includes("/basket")) {
                          tempLinkRef.current.click();
                        } else {
                          updateModalStatus(0);
                        }
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }}
            >
              Подтвердить адрес
            </AddressAcceptButton>
          </AddressButtonContainer>
          <TempLink to="/order" ref={tempLinkRef} />
        </>
      )}
    </OrderRestContainer>
  );
}

const mapStateToProps = (state) => ({
  userData: state.userData,
  activeDeliveryAddress: state.activeDeliveryAddress,
});

const mapDispatchToProps = {
  updateActiveDeliveryAddress,
  updateModalStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);
