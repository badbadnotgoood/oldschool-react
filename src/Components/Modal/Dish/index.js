import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { updateModalStatus, updateBasketList } from "../../../Store/Actions";

const MemoSandItemPrice = styled.div`
  background: #f3f3f3;
  border-radius: 15px;
  width: 75px;
  height: 30px;
  padding: 5px 15px;
  background-repeat: no-repeat;
  background-position: center;

  ${(props) =>
    props.status === 1 &&
    `
      background-color: #199869;
      background-image: url("data:image/svg+xml,%3Csvg width='15' height='14' viewBox='0 0 15 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 1L6.10281 13L1 6.8222' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    `}

  ${(props) =>
    props.status === 2 &&
    `
      background-color: #199869; 
      color: white;
    `}
`;

const MemoSandItemName = styled.p`
  font-weight: 400;
  font-size: 19px;
  line-height: 19px;
  margin-left: 10px;
  margin-right: 10px;
`;

const MemoSandItem = styled.button`
  height: 35px;
  width: 100%;
  background: #fafafa;
  border-radius: 35px;
  margin-bottom: 10px;
  padding: 2.5px;
  justify-content: space-between;

  &:last-child {
    margin-bottom: unset;
  }
`;

const MemoSandContentContainer = styled.div`
  width: 100%;
  flex-direction: column;
  margin-top: 20px;
  align-items: flex-start;
`;

const MemoSandContainer = styled.div`
  width: max-content;
  flex-direction: column;
  margin-top: 20px;
  align-items: flex-start;
`;

const FillingBlock = styled.div``;

const FillingContainer = styled.div``;

const DishClickFillingMemoContainer = styled.div`
  flex-direction: column;
`;

const DishClickBottomButton = styled.button`
  width: 380px;
  height: 55px;

  background-color: #c91e25;
  background-color: ${(props) => props.rest === 0 ? "#c91e25" : props.rest === 1 && "#199869"};

  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  font-size: 18px;
  line-height: 20px;
  color: white;

  margin-left: 15px;
`;

const DishClickBottomCountPlus = styled.button`
  height: 55px;
  width: 55px;
  background-image: url("data:image/svg+xml,%3Csvg width='13' height='12' viewBox='0 0 13 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.68213 5.34064C1.24654 5.34064 0.893418 5.69376 0.893418 6.12935C0.893418 6.56494 1.24654 6.91806 1.68213 6.91806V5.34064ZM11.6821 6.91806C12.1177 6.91806 12.4708 6.56494 12.4708 6.12935C12.4708 5.69376 12.1177 5.34064 11.6821 5.34064V6.91806ZM1.68213 6.91806H6.05713V5.34064H1.68213V6.91806ZM6.05713 6.91806H11.6821V5.34064H6.05713V6.91806Z' fill='%232B2D36'/%3E%3Cpath d='M6.68219 1.13015V11.1301' stroke='%232B2D36' stroke-width='1.57742' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;
`;

const DishClickBottomCountText = styled.p`
  font-size: 17px;
  line-height: 55px;
`;

const DishClickBottomCountMinus = styled.button`
  height: 55px;
  width: 55px;
  background-image: url("data:image/svg+xml,%3Csvg width='13' height='2' viewBox='0 0 13 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.68225 0.158456C1.24666 0.158456 0.89354 0.511574 0.89354 0.947166C0.89354 1.38276 1.24666 1.73588 1.68225 1.73588V0.158456ZM11.6823 1.73588C12.1178 1.73588 12.471 1.38276 12.471 0.947166C12.471 0.511574 12.1178 0.158456 11.6823 0.158456V1.73588ZM1.68225 1.73588H6.05725V0.158456H1.68225V1.73588ZM6.05725 1.73588H11.6823V0.158456H6.05725V1.73588Z' fill='%23000'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;
`;

const DishClickBottomCountContainer = styled.div`
  border-radius: 25px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
`;

const DishClickBottomContainer = styled.div`
  width: 100%;
  padding: 20px;
  justify-content: flex-end;
  background: #fafafa;
  border-radius: 0px 0px 20px 20px;
  margin-top: 20px;
`;

const MemoAddsSecondHiddenContainer = styled.div`
  position: absolute;
  bottom: 100%;
  left: -15px;
  right: -15px;
  flex-direction: column;
  background: #f3f3f3;
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 5px;
`;

const MemoAddsSecondButton = styled.button`
  height: 40px;
  width: 40px;
  background-image: url("data:image/svg+xml,%3Csvg width='13' height='12' viewBox='0 0 13 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.68213 5.34064C1.24654 5.34064 0.893418 5.69376 0.893418 6.12935C0.893418 6.56494 1.24654 6.91806 1.68213 6.91806V5.34064ZM11.6821 6.91806C12.1177 6.91806 12.4708 6.56494 12.4708 6.12935C12.4708 5.69376 12.1177 5.34064 11.6821 5.34064V6.91806ZM1.68213 6.91806H6.05713V5.34064H1.68213V6.91806ZM6.05713 6.91806H11.6821V5.34064H6.05713V6.91806Z' fill='%232B2D36'/%3E%3Cpath d='M6.68219 1.13015V11.1301' stroke='%232B2D36' stroke-width='1.57742' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;

  border-radius: 20px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  margin-left: 30px;
  transition: all 0.2s linear;
  position: absolute;
  right: 0;
`;

const MemoAddsSecondText = styled.p`
  font-family: "Cera Round Pro Medium";
  font-size: 19px;
  line-height: 20px;
`;

const MemoAddsSecondContainer = styled.div`
  padding-right: 100px;
  position: relative;
  width: 100%;
  height: 40px;
  justify-content: space-between;
  margin-top: 30px;
`;

const DishClickAddCountPlus = styled.button`
  height: 40px;
  width: 40px;
  background-image: url("data:image/svg+xml,%3Csvg width='13' height='12' viewBox='0 0 13 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.68213 5.34064C1.24654 5.34064 0.893418 5.69376 0.893418 6.12935C0.893418 6.56494 1.24654 6.91806 1.68213 6.91806V5.34064ZM11.6821 6.91806C12.1177 6.91806 12.4708 6.56494 12.4708 6.12935C12.4708 5.69376 12.1177 5.34064 11.6821 5.34064V6.91806ZM1.68213 6.91806H6.05713V5.34064H1.68213V6.91806ZM6.05713 6.91806H11.6821V5.34064H6.05713V6.91806Z' fill='%232B2D36'/%3E%3Cpath d='M6.68219 1.13015V11.1301' stroke='%232B2D36' stroke-width='1.57742' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;
`;

const DishClickAddCountText = styled.p`
  font-size: 17px;
  line-height: 40px;
`;

const DishClickAddCountMinus = styled.button`
  height: 40px;
  width: 40px;
  background-image: url("data:image/svg+xml,%3Csvg width='13' height='2' viewBox='0 0 13 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.68225 0.158456C1.24666 0.158456 0.89354 0.511574 0.89354 0.947166C0.89354 1.38276 1.24666 1.73588 1.68225 1.73588V0.158456ZM11.6823 1.73588C12.1178 1.73588 12.471 1.38276 12.471 0.947166C12.471 0.511574 12.1178 0.158456 11.6823 0.158456V1.73588ZM1.68225 1.73588H6.05725V0.158456H1.68225V1.73588ZM6.05725 1.73588H11.6823V0.158456H6.05725V1.73588Z' fill='%23000'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;
`;

const DishClickAddCountContainer = styled.div`
  border-radius: 20px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  margin-left: 30px;
  position: absolute;
  right: 0;
`;

const DishClickAddPrice = styled.p`
  font-size: 19px;
  line-height: 20px;
  color: #199869;
`;

const DishClickAddName = styled.p`
  font-size: 19px;
  line-height: 20px;
  margin-right: 10px;
  white-space: nowrap;
`;

const DishClickAddInfoContainer = styled.div`
  justify-content: flex-start;
`;

const DishClickAddContainer = styled.div`
  padding-right: 100px;
  position: relative;
  width: 100%;
  height: 40px;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const DishClickAddsMemoContainer = styled.div`
  width: 100%;
  flex-direction: column;
  margin-top: 20px;
  align-items: flex-start;
`;

const DishClickModsCheckboxInput = styled.input.attrs({ type: "checkbox" })``;

const DishClickModsCheckboxLabelText = styled.span`
  & {
    font-size: 19px;
    line-height: 20px;
  }
`;

const DishClickModsCheckboxLabel = styled.label`
  width: 100%;
  justify-content: flex-start;

  & > input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  & > span {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }

  & > span::before {
    content: "";
    display: inline-block;
    width: 25px;
    height: 25px;
    flex-shrink: 0;
    flex-grow: 0;
    background-color: #f3f3f3;
    border-radius: 3.5px;
    margin-right: 10px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }

  & > input:checked + span::before {
    background-image: url("data:image/svg+xml,%3Csvg width='11' height='10' viewBox='0 0 11 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 1L4.53271 9L1 4.88147' stroke='%232B2D36' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  }

  & > input:disabled + span::before {
    background-color: #e9ecef;
  }
`;

const DishClickModsMemoContainer = styled.div`
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  width: 100%;

  & label {
    margin-bottom: 15px;
  }

  & label:last-child {
    margin-bottom: unset;
  }
`;

const DishClickModdifiersName = styled.p`
  font-size: 19px;
  line-height: 20px;
  font-family: "Cera Round Pro Medium";
`;

const DishClickAddsContainer = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

const DishClickModsContainer = styled.div`
  width: 100%;
  margin-right: 40px;
  flex-direction: column;
  align-items: flex-start;
`;

const DishClickModifiersContainer = styled.div`
  padding: 0 40px;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const DishClickExitCross = styled.div`
  background-color: #000000;
  width: 22px;
  position: absolute;
  border: 1.5px solid #000000;
  border-radius: 5px;
`;

const DishClickExit = styled.button`
  position: absolute;
  right: 20px;
  top: 30px;
  width: 25px;
  height: 25px;

  & ${DishClickExitCross}:first-child {
    transform: rotate(45deg);
  }

  & ${DishClickExitCross}:last-child {
    transform: rotate(-45deg);
  }
`;

const DishClickName = styled.p`
  font-size: 23px;
  line-height: 25px;
  font-family: "Cera Round Pro Medium";
`;

const DishClickNameContainer = styled.div`
  width: 100%;
  justify-content: flex-start;
  padding: 30px 40px 0;
  position: relative;
  margin-bottom: 30px;
`;

const DishClickContainer = styled.div`
  background-color: white;
  flex-direction: column;
  border-radius: 20px;
`;

const StandartRendering = ({
  activeDish,
  updateModalStatus,
  updateBasketList,
}) => {
  const [dishOrderCount, setDishOrderCount] = useState(1);
  const [dishOrderPrice, setDishOrderPrice] = useState(activeDish.price);
  const [dishOrderModsPrice, setDishOrderModsPrice] = useState(0);
  const [dishOrderAddsPrice, setDishOrderAddsPrice] = useState(0);

  const [dishOrderModsActive, setDishOrderModsActive] = useState([]);
  const [dishOrderAddsActive, setDishOrderAddsActive] = useState([]);

  const [dishOrder, setDishOrder] = useState({
    name: activeDish.name,
    code: activeDish.code,
    priceOne: dishOrderPrice / dishOrderCount,
    price: dishOrderPrice,
    count: dishOrderCount,
    mods: [],
    adds: [],
    rest: activeDish.rest,
  });

  const [modsCheckArray, setModsCheckArray] = useState([]);
  const [addsCountArray, setAddsCountArray] = useState([]);

  const [showHiddenAdds, setShowHiddenAdds] = useState(false);

  const AddsButtonRef = useRef(null);
  const AddsRef = useRef(null);

  const ModsArray = activeDish.mods;
  const AddsArray = activeDish.adds;

  useEffect(() => {
    setDishOrderModsActive([]);
    setDishOrderModsPrice(0);
    let tempNewModsArr = [];
    let tempNewModsPrice = 0;
    modsCheckArray.forEach((el) => {
      if (!el.checked) {
        tempNewModsArr.push(el);
        tempNewModsPrice = tempNewModsPrice + el.price;
      }
    });
    setDishOrderModsActive([...tempNewModsArr]);
    setDishOrderModsPrice(tempNewModsPrice);
  }, [modsCheckArray, setDishOrderModsActive, setDishOrderModsPrice]);

  useEffect(() => {
    setDishOrderAddsActive([]);
    setDishOrderAddsPrice(0);
    let tempNewAddsArr = [];
    let tempNewAddsPrice = 0;
    addsCountArray.forEach((el) => {
      if (el.count > 0) {
        tempNewAddsArr.push(el);
        tempNewAddsPrice = tempNewAddsPrice + el.price * el.count;
      }
    });
    setDishOrderAddsActive([...tempNewAddsArr]);
    setDishOrderAddsPrice(tempNewAddsPrice);
  }, [addsCountArray, setDishOrderAddsActive, setDishOrderAddsPrice]);

  useEffect(() => {
    setDishOrderPrice(
      (activeDish.price + dishOrderModsPrice + dishOrderAddsPrice) *
        dishOrderCount
    );
  }, [
    activeDish.price,
    setDishOrderPrice,
    dishOrderModsPrice,
    dishOrderAddsPrice,
    dishOrderCount,
  ]);

  useEffect(() => {
    setDishOrder({
      name: activeDish.name,
      code: activeDish.code,
      priceOne: dishOrderPrice / dishOrderCount,
      price: dishOrderPrice,
      count: dishOrderCount,
      mods: dishOrderModsActive,
      adds: dishOrderAddsActive,
      rest: activeDish.rest,
    });
  }, [
    activeDish,
    dishOrderPrice,
    dishOrderCount,
    dishOrderModsActive,
    dishOrderAddsActive,
  ]);

  useEffect(() => {
    setModsCheckArray([]);
    ModsArray.forEach((el) => {
      setModsCheckArray((arr) => [
        ...arr,
        {
          name: el.name,
          price: el.price,
          code: el.code,
          checked: true,
        },
      ]);
    });
  }, [ModsArray, setModsCheckArray]);

  useEffect(() => {
    setAddsCountArray([]);
    AddsArray.forEach((el) => {
      setAddsCountArray((arr) => [
        ...arr,
        {
          name: el.name,
          price: el.price,
          code: el.code,
          count: 0,
        },
      ]);
    });
  }, [AddsArray, setAddsCountArray]);

  const MemoMods = useMemo(() => {
    return (
      modsCheckArray && (
        <DishClickModsMemoContainer>
          {modsCheckArray.map((el, i) => (
            <DishClickModsCheckboxLabel key={i}>
              <DishClickModsCheckboxInput
                value={el.code}
                checked={el.checked}
                onChange={() => {
                  let tempModsArr = [...modsCheckArray];
                  tempModsArr[i].checked = !tempModsArr[i].checked;
                  setModsCheckArray(tempModsArr);
                }}
              />
              <DishClickModsCheckboxLabelText>
                {el.name}
              </DishClickModsCheckboxLabelText>
            </DishClickModsCheckboxLabel>
          ))}
        </DishClickModsMemoContainer>
      )
    );
  }, [modsCheckArray]);

  const MemoAdds = useMemo(() => {
    return (
      addsCountArray && (
        <DishClickAddsMemoContainer>
          {addsCountArray.map(
            (el, i) =>
              i < 8 && (
                <DishClickAddContainer key={i}>
                  <DishClickAddInfoContainer>
                    <DishClickAddName>{el.name}</DishClickAddName>
                    <DishClickAddPrice>{el.price + "₽"}</DishClickAddPrice>
                  </DishClickAddInfoContainer>
                  <DishClickAddCountContainer>
                    {el.count > 0 && (
                      <>
                        <DishClickAddCountMinus
                          onClick={() => {
                            let tempAddsArr = [...addsCountArray];
                            if (tempAddsArr[i].count > 0) {
                              tempAddsArr[i].count--;
                              setAddsCountArray(tempAddsArr);
                            }
                          }}
                        />
                        <DishClickAddCountText>
                          {el.count}
                        </DishClickAddCountText>
                      </>
                    )}
                    <DishClickAddCountPlus
                      onClick={() => {
                        let tempAddsArr = [...addsCountArray];
                        if (tempAddsArr[i].count < 5) {
                          tempAddsArr[i].count++;
                          setAddsCountArray(tempAddsArr);
                        }
                      }}
                    />
                  </DishClickAddCountContainer>
                </DishClickAddContainer>
              )
          )}
          {addsCountArray.length >= 8 && (
            <MemoAddsSecondContainer>
              <MemoAddsSecondText>Другие дополнения</MemoAddsSecondText>
              <MemoAddsSecondButton
                ref={AddsButtonRef}
                onClick={(e) => {
                  e.target.classList.toggle("active-adds");
                  setShowHiddenAdds(!showHiddenAdds);
                }}
              />
              {showHiddenAdds && (
                <MemoAddsSecondHiddenContainer ref={AddsRef}>
                  {addsCountArray.map(
                    (el, i) =>
                      i >= 8 && (
                        <DishClickAddContainer key={i}>
                          <DishClickAddInfoContainer>
                            <DishClickAddName>{el.name}</DishClickAddName>
                            <DishClickAddPrice>
                              {el.price + "₽"}
                            </DishClickAddPrice>
                          </DishClickAddInfoContainer>
                          <DishClickAddCountContainer>
                            {el.count > 0 && (
                              <>
                                <DishClickAddCountMinus
                                  onClick={() => {
                                    let tempAddsArr = [...addsCountArray];
                                    if (tempAddsArr[i].count > 0) {
                                      tempAddsArr[i].count--;
                                      setAddsCountArray(tempAddsArr);
                                    }
                                  }}
                                />
                                <DishClickAddCountText>
                                  {el.count}
                                </DishClickAddCountText>
                              </>
                            )}
                            <DishClickAddCountPlus
                              onClick={() => {
                                let tempAddsArr = [...addsCountArray];
                                if (tempAddsArr[i].count < 5) {
                                  tempAddsArr[i].count++;
                                  setAddsCountArray(tempAddsArr);
                                }
                              }}
                            />
                          </DishClickAddCountContainer>
                        </DishClickAddContainer>
                      )
                  )}
                </MemoAddsSecondHiddenContainer>
              )}
            </MemoAddsSecondContainer>
          )}
        </DishClickAddsMemoContainer>
      )
    );
  }, [addsCountArray, showHiddenAdds, setShowHiddenAdds]);

  return (
    activeDish && (
      <DishClickContainer
        onClick={(e) => {
          if (showHiddenAdds && !AddsRef.current.contains(e.target)) {
            AddsButtonRef.current.click();
          }
        }}
      >
        <DishClickNameContainer>
          <DishClickName>{dishOrder.name}</DishClickName>
          <DishClickExit
            onClick={() => {
              updateModalStatus(0);
            }}
          >
            <DishClickExitCross />
            <DishClickExitCross />
          </DishClickExit>
        </DishClickNameContainer>
        <DishClickModifiersContainer>
          {ModsArray.length > 0 && (
            <DishClickModsContainer>
              <DishClickModdifiersName>Состав</DishClickModdifiersName>
              {MemoMods}
            </DishClickModsContainer>
          )}
          {AddsArray.length > 0 && (
            <DishClickAddsContainer>
              <DishClickModdifiersName>Дополнения</DishClickModdifiersName>
              {MemoAdds}
            </DishClickAddsContainer>
          )}
        </DishClickModifiersContainer>
        <DishClickBottomContainer>
          <DishClickBottomCountContainer>
            <DishClickBottomCountMinus
              onClick={() => {
                if (dishOrderCount > 1) {
                  setDishOrderCount(dishOrderCount - 1);
                }
              }}
            />
            <DishClickBottomCountText>
              {dishOrderCount}
            </DishClickBottomCountText>
            <DishClickBottomCountPlus
              onClick={() => {
                if (dishOrderCount < 14) {
                  setDishOrderCount(dishOrderCount + 1);
                }
              }}
            />
          </DishClickBottomCountContainer>
          <DishClickBottomButton
            rest={activeDish.rest}
            onClick={() => {
              const data = {
                Order: dishOrder,
              };
              updateModalStatus(0);
              updateBasketList(data);
            }}
          >
            В корзину {dishOrderPrice + "₽"}
          </DishClickBottomButton>
        </DishClickBottomContainer>
      </DishClickContainer>
    )
  );
};

const SandwichRendering = ({
  activeDish,
  updateModalStatus,
  updateBasketList,
}) => {
  const [dishOrder, setDishOrder] = useState();

  const [showHiddenAdds, setShowHiddenAdds] = useState(false);

  const AddsButtonRef = useRef(null);
  const AddsRef = useRef(null);

  const [fillingArray, setFillingArray] = useState([]);
  const [fillingModsArray, setFillingModsArray] = useState([]);
  const [fillingAddsArray, setFillingAddsArray] = useState([]);

  const [disabled, setDisabled] = useState(true);
  const [activeFilling, setActiveFilling] = useState(null);
  const [activeModsArray, setActiveModsArray] = useState([]);
  const [activeAddsArray, setActiveAddsArray] = useState([]);

  const [dishOrderCount, setDishOrderCount] = useState(1);
  const [dishOrderPrice, setDishOrderPrice] = useState(
    activeDish.content[0].price
  );
  const [activeModsPrice, setActiveModsPrice] = useState(0);
  const [activeAddsPrice, setActiveAddsPrice] = useState(0);

  useEffect(() => {
    const content = activeDish.content;
    const tempArray = [];
    content.forEach((el) => {
      tempArray.push({
        name: el.name,
        price: el.price,
        addname: el.addname,
        addprice: el.addprice,
        addcode: el.addcode,
        active: false,
        addactive: false,
      });
    });
    setFillingArray(tempArray);
    const tempArrayMods = [];
    content[0].mods.forEach((el) => {
      if (el.name.length > 0) {
        tempArrayMods.push({
          name: el.name,
          price: el.price,
          code: el.code,
          checked: true,
        });
      }
    });
    setFillingModsArray(tempArrayMods);
    const tempArrayAdds = [];
    content[0].adds.forEach((el) => {
      if (el.name.length > 0) {
        tempArrayAdds.push({
          name: el.name,
          price: el.price,
          code: el.code,
          count: 0,
        });
      }
    });
    setFillingAddsArray(tempArrayAdds);
    setDishOrderPrice(content[0].price);
  }, [activeDish]);

  useEffect(() => {
    if (fillingArray.length > 0 && activeFilling !== null) {
      const tempArray = [];
      const content = activeDish.content;
      content.forEach((el, i) => {
        tempArray.push({
          name: el.name,
          price: el.price,
          addname: el.addname,
          addprice: el.addprice,
          addcode: el.addcode,
          active: i === activeFilling ? true : false,
          addactive: false,
        });
      });
      setFillingArray(tempArray);
      setFillingModsArray([]);
      const tempArrayMods = [];
      content[activeFilling].mods.forEach((el) => {
        if (el.name.length > 0) {
          tempArrayMods.push({
            name: el.name,
            price: el.price,
            code: el.code,
            checked: true,
          });
        }
      });
      setFillingModsArray(tempArrayMods);
      setFillingAddsArray([]);
      const tempArrayAdds = [];
      content[activeFilling].adds.forEach((el) => {
        if (el.name.length > 0) {
          tempArrayAdds.push({
            name: el.name,
            price: el.price,
            code: el.code,
            count: 0,
          });
        }
      });
      setFillingAddsArray(tempArrayAdds);
      setDishOrderPrice(content[activeFilling].price);
    }
  }, [
    activeDish,
    activeFilling,
    setFillingArray,
    setFillingModsArray,
    setFillingAddsArray,
  ]);

  useEffect(() => {
    setActiveModsArray([]);
    setActiveModsPrice(0);
    let tempNewModsArr = [];
    let tempNewModsPrice = 0;
    fillingModsArray.forEach((el) => {
      if (!el.checked) {
        tempNewModsArr.push(el);
        tempNewModsPrice = tempNewModsPrice + el.price;
      }
    });
    setActiveModsArray(tempNewModsArr);
    setActiveModsPrice(tempNewModsPrice);
  }, [fillingModsArray, setActiveModsArray, setActiveModsPrice]);

  useEffect(() => {
    setActiveAddsArray([]);
    setActiveAddsPrice(0);
    let tempNewAddsArr = [];
    let tempNewAddsPrice = 0;
    fillingAddsArray.forEach((el) => {
      if (el.count > 0) {
        tempNewAddsArr.push(el);
        tempNewAddsPrice = tempNewAddsPrice + el.price * el.count;
      }
    });
    fillingArray.forEach((el) => {
      if (el.addactive) {
        tempNewAddsArr.push({
          code: el.addcode,
          name: el.addname,
          price: el.addprice,
          count: 1,
        });
        tempNewAddsPrice = tempNewAddsPrice + el.addprice * 1;
      }
    });
    setActiveAddsArray(tempNewAddsArr);
    setActiveAddsPrice(tempNewAddsPrice);
  }, [fillingAddsArray, fillingArray, setActiveAddsArray, setActiveAddsPrice]);

  useEffect(() => {
    if (fillingArray.length > 0 && activeFilling !== null) {
      setDishOrderPrice(
        (fillingArray[activeFilling].price +
          activeAddsPrice +
          activeModsPrice) *
          dishOrderCount
      );
    }
  }, [
    activeFilling,
    fillingArray,
    setDishOrderPrice,
    activeAddsPrice,
    activeModsPrice,
    dishOrderCount,
  ]);

  useEffect(() => {
    if (activeFilling !== null) {
      const content = activeDish.content[activeFilling];
      setDishOrder({
        name: activeDish.name + " " + content.name.toLowerCase(),
        code: content.code,
        priceOne: dishOrderPrice / dishOrderCount,
        price: dishOrderPrice,
        count: dishOrderCount,
        mods: activeModsArray,
        adds: activeAddsArray,
        rest: activeDish.rest,
      });
      console.log(dishOrder);
    }
  }, [
    activeDish,
    fillingArray,
    dishOrderPrice,
    dishOrderCount,
    activeModsArray,
    activeAddsArray,
  ]);

  const FillingMemo = useMemo(() => {
    const tempArray = [...fillingArray];
    let isActiveGlobal = false;
    tempArray.forEach((el2, i2) => {
      if (el2.active) {
        isActiveGlobal = true;
      }
    });
    if (fillingArray.length > 0) {
      return (
        <MemoSandContentContainer>
          {fillingArray.map((el1, i1) => (
            <MemoSandItem
              key={i1}
              onClick={() => {
                const tempArray = [...fillingArray];
                const tempItem = { ...tempArray[i1] };
                let isActive = false;
                let isActiveId;
                tempArray.forEach((el2, i2) => {
                  if (el2.active) {
                    isActive = true;
                    isActiveId = i2;
                  }
                });
                if (!isActive) {
                  tempItem.active = true;
                  tempItem.addactive = false;
                  setActiveFilling(i1);
                  setDisabled(false);
                } else {
                  if (i1 === isActiveId) {
                    tempItem.active = false;
                    tempArray.forEach((el) => {
                      el.addactive = false;
                    });
                    setDisabled(true);
                    const tempModsArr = [...fillingModsArray];
                    tempModsArr.forEach((el) => {
                      el.checked = true;
                    });
                    const tempAddsArr = [...fillingAddsArray];
                    tempAddsArr.forEach((el) => {
                      el.count = 0;
                    });
                    setFillingModsArray(tempModsArr);
                    setFillingAddsArray(tempAddsArr);
                  } else {
                    if (!tempItem.addactive) {
                      tempItem.addactive = true;
                    } else {
                      tempItem.addactive = false;
                    }
                  }
                }
                tempArray[i1] = tempItem;
                setFillingArray(tempArray);
              }}
            >
              <MemoSandItemName>{el1.name}</MemoSandItemName>
              <MemoSandItemPrice
                status={(el1.active && 1) || (el1.addactive && 2)}
              >
                {isActiveGlobal
                  ? el1.active
                    ? ""
                    : el1.addprice + "₽"
                  : el1.price + "₽"}
              </MemoSandItemPrice>
            </MemoSandItem>
          ))}
        </MemoSandContentContainer>
      );
    }
  }, [fillingArray, setFillingArray, setDisabled]);

  const MemoMods = useMemo(() => {
    console.log(disabled);
    return (
      fillingModsArray && (
        <DishClickModsMemoContainer
          disabled={disabled ? true : false}
          style={disabled ? { opacity: 0.5 } : {}}
        >
          {fillingModsArray.map((el, i) => (
            <DishClickModsCheckboxLabel key={i}>
              <DishClickModsCheckboxInput
                disabled={disabled ? true : false}
                value={el.code}
                checked={el.checked}
                onChange={() => {
                  let tempModsArr = [...fillingModsArray];
                  tempModsArr[i].checked = !tempModsArr[i].checked;
                  setFillingModsArray(tempModsArr);
                }}
              />
              <DishClickModsCheckboxLabelText>
                {el.name}
              </DishClickModsCheckboxLabelText>
            </DishClickModsCheckboxLabel>
          ))}
        </DishClickModsMemoContainer>
      )
    );
  }, [fillingModsArray, activeFilling, disabled]);

  const MemoAdds = useMemo(() => {
    return (
      fillingAddsArray && (
        <DishClickAddsMemoContainer
          disabled={disabled ? true : false}
          style={disabled ? { opacity: 0.5 } : {}}
        >
          {fillingAddsArray.map(
            (el, i) =>
              i < 8 && (
                <DishClickAddContainer
                  key={i}
                  disabled={disabled ? true : false}
                >
                  <DishClickAddInfoContainer>
                    <DishClickAddName>{el.name}</DishClickAddName>
                    <DishClickAddPrice>{el.price + "₽"}</DishClickAddPrice>
                  </DishClickAddInfoContainer>
                  <DishClickAddCountContainer>
                    {el.count > 0 && (
                      <>
                        <DishClickAddCountMinus
                          disabled={disabled ? true : false}
                          onClick={() => {
                            let tempAddsArr = [...fillingAddsArray];
                            if (tempAddsArr[i].count > 0) {
                              tempAddsArr[i].count--;
                              setFillingAddsArray(tempAddsArr);
                            }
                          }}
                        />
                        <DishClickAddCountText>
                          {el.count}
                        </DishClickAddCountText>
                      </>
                    )}
                    <DishClickAddCountPlus
                      disabled={disabled ? true : false}
                      onClick={() => {
                        let tempAddsArr = [...fillingAddsArray];
                        if (tempAddsArr[i].count < 5) {
                          tempAddsArr[i].count++;
                          setFillingAddsArray(tempAddsArr);
                        }
                      }}
                    />
                  </DishClickAddCountContainer>
                </DishClickAddContainer>
              )
          )}
          {fillingAddsArray.length >= 8 && (
            <MemoAddsSecondContainer>
              <MemoAddsSecondText>Другие дополнения</MemoAddsSecondText>
              <MemoAddsSecondButton
                ref={AddsButtonRef}
                disabled={disabled ? true : false}
                onClick={(e) => {
                  e.target.classList.toggle("active-adds");
                  setShowHiddenAdds(!showHiddenAdds);
                }}
              />
              {showHiddenAdds && (
                <MemoAddsSecondHiddenContainer ref={AddsRef}>
                  {fillingAddsArray.map(
                    (el, i) =>
                      i >= 8 && (
                        <DishClickAddContainer key={i}>
                          <DishClickAddInfoContainer>
                            <DishClickAddName>{el.name}</DishClickAddName>
                            <DishClickAddPrice>{el.price}₽</DishClickAddPrice>
                          </DishClickAddInfoContainer>
                          <DishClickAddCountContainer>
                            {el.count > 0 && (
                              <>
                                <DishClickAddCountMinus
                                  disabled={disabled ? true : false}
                                  onClick={() => {
                                    let tempAddsArr = [...fillingAddsArray];
                                    if (tempAddsArr[i].count > 0) {
                                      tempAddsArr[i].count--;
                                      setFillingAddsArray(tempAddsArr);
                                    }
                                  }}
                                />
                                <DishClickAddCountText>
                                  {el.count}
                                </DishClickAddCountText>
                              </>
                            )}
                            <DishClickAddCountPlus
                              disabled={disabled ? true : false}
                              onClick={() => {
                                let tempAddsArr = [...fillingAddsArray];
                                if (tempAddsArr[i].count < 5) {
                                  tempAddsArr[i].count++;
                                  setFillingAddsArray(tempAddsArr);
                                }
                              }}
                            />
                          </DishClickAddCountContainer>
                        </DishClickAddContainer>
                      )
                  )}
                </MemoAddsSecondHiddenContainer>
              )}
            </MemoAddsSecondContainer>
          )}
        </DishClickAddsMemoContainer>
      )
    );
  }, [
    fillingAddsArray,
    activeFilling,
    showHiddenAdds,
    setShowHiddenAdds,
    disabled,
  ]);

  return (
    activeDish && (
      <DishClickContainer
        onClick={(e) => {
          if (showHiddenAdds && !AddsRef.current.contains(e.target)) {
            AddsButtonRef.current.click();
          }
        }}
      >
        <DishClickNameContainer>
          <DishClickName>{activeDish.name}</DishClickName>
          <DishClickExit
            onClick={() => {
              updateModalStatus(0);
            }}
          >
            <DishClickExitCross />
            <DishClickExitCross />
          </DishClickExit>
        </DishClickNameContainer>
        <DishClickModifiersContainer>
          {fillingArray.length > 0 && (
            <DishClickModsContainer>
              <DishClickModdifiersName>Выбор мяса</DishClickModdifiersName>
              {FillingMemo}
            </DishClickModsContainer>
          )}
          {fillingModsArray.length > 0 && (
            <DishClickModsContainer>
              <DishClickModdifiersName>Состав</DishClickModdifiersName>
              {MemoMods}
            </DishClickModsContainer>
          )}
          {fillingAddsArray.length > 0 && (
            <DishClickAddsContainer>
              <DishClickModdifiersName>Дополнения</DishClickModdifiersName>
              {MemoAdds}
            </DishClickAddsContainer>
          )}
        </DishClickModifiersContainer>
        <DishClickBottomContainer>
          <DishClickBottomCountContainer>
            <DishClickBottomCountMinus
              onClick={() => {
                if (dishOrderCount > 1) {
                  setDishOrderCount(dishOrderCount - 1);
                }
              }}
            />
            <DishClickBottomCountText>
              {dishOrderCount}
            </DishClickBottomCountText>
            <DishClickBottomCountPlus
              onClick={() => {
                if (dishOrderCount < 14) {
                  setDishOrderCount(dishOrderCount + 1);
                }
              }}
            />
          </DishClickBottomCountContainer>
          <DishClickBottomButton
            rest={activeDish.rest}
            disabled={disabled ? true : false}
            onClick={() => {
              if (!disabled) {
                const data = {
                  Order: dishOrder,
                };
                updateModalStatus(0);
                updateBasketList(data);
              }
            }}
          >
            В корзину {dishOrderPrice + "₽"}
          </DishClickBottomButton>
        </DishClickBottomContainer>
      </DishClickContainer>
    )
  );
};

const Dish = ({ activeDish, updateModalStatus, updateBasketList }) => {
  return (
    <>
      {activeDish && activeDish.constructor === false && (
        <StandartRendering
          activeDish={activeDish}
          updateModalStatus={updateModalStatus}
          updateBasketList={updateBasketList}
        />
      )}
      {activeDish && activeDish.constructor === true && (
        <SandwichRendering
          activeDish={activeDish}
          updateModalStatus={updateModalStatus}
          updateBasketList={updateBasketList}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
  modalStatus: state.modalStatus,
  activeDish: state.activeDish,
});

const mapDispatchToProps = {
  updateModalStatus,
  updateBasketList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dish);
