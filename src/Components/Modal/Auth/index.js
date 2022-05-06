import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import InputMask from "react-input-mask";
import PulseLoader from "react-spinners/PulseLoader";

import axios from "axios";
import {
  updateAuthStatus,
  updateAuthTimer,
  updateModalStatus,
  updateUserData,
} from "../../../Store/Actions";

import LogoBurg from "../../../Media/images/LogoBurg.svg";
import LogoSand from "../../../Media/images/LogoSand.svg";
import device from "../../device";

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  line-height: 20px;
  justify-content: flex-start;
  width: 100%;
`;

const SendCode = styled.button`
  margin-top: 20px;
  width: 100%;
  height: 55px;
  box-shadow: 0px 3.03131px 3.03131px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  background-color: #2b2d36;
  color: white;
`;

const CodeInput = styled(InputMask)`
  font-size: 14px;
  line-height: 20px;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #eceef5;
`;

const CodeInputContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  flex-direction: column;
`;

const PhoneInputSendCode = styled.button`
  background: #f3f3f3;
  color: black;
  font-size: 13px;
  line-height: 15px;
  width: 145px;
  height: 40px;
  border-radius: 5px;
`;

const PhoneInput = styled(InputMask)`
  font-size: 14px;
  line-height: 20px;
  min-width: 200px;
  margin-right: 25px;
  height: 100%;
  border-bottom: 1px solid #eceef5;
`;

const PhoneInputPreNumber = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #8d929e;
  margin-right: 10px;
`;

const PhoneInputContainer = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 30px;
`;

const AuthText = styled.p`
  @media ${device.screenMaxto1280} {
    font-size: 14px;
    line-height: 20px;
  }
`;

const Logo = styled.div`
  background-image: url(${(props) => props.source});
  background-position: center;
  background-repeat: no-repeat;
  height: 55px;
  width: 90px;
`;

const LogoContainer = styled.div`
  &:first-child {
    margin-right: 10px;
  }
  @media ${device.screenMaxto1280} {
    margin-bottom: 15px;
  }
`;

const AuthContainer = styled.div`
  padding: 50px 50px 40px 50px;
  border-radius: 20px;
  background-color: white;
  flex-direction: column;
`;

function Auth({
  updateAuthStatus,
  updateAuthTimer,
  updateUserData,
  updateModalStatus,
  deliveryStatus,
  timerStatus,
  timer,
}) {
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");
  const [sendStatus, setSendStatus] = useState(false);

  const [tempCode, setTempCode] = useState(false);

  const codeInputRef = useRef();

  const [codeError, setCodeError] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerStatus) {
      interval = setInterval(() => {
        updateAuthTimer(timer - 1);
      }, 1000);
    }
    if (timer <= 0) {
      updateAuthStatus(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, timerStatus, updateAuthStatus, updateAuthTimer]);

  return (
    <AuthContainer>
      <LogoContainer>
        <Logo source={LogoBurg} />
        <Logo source={LogoSand} />
      </LogoContainer>
      <AuthText>Пожалуйста, укажите</AuthText>
      <AuthText>свой телефон</AuthText>
      {tempCode && tempCode}
      <PhoneInputContainer>
        <PhoneInputPreNumber>+7</PhoneInputPreNumber>
        <PhoneInput
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          placeholder="Телефон для связи"
          maskChar={null}
          mask=" 999 999-99-99"
        />
        <PhoneInputSendCode
          disabled={timerStatus || number.replace(/[^+\d]/g, "").length < 10}
          onClick={() => {
            updateAuthTimer(30);
            updateAuthStatus(true);
            axios
              .post("../api/0.1.0/sendCode", {
                number: number.replace(/[^+\d]/g, ""),
              })
              .then((response) => {
                setTempCode(response.data.code);
              })
              .catch(() => {});
          }}
        >
          {timerStatus
            ? timer < 10
              ? `00:0${timer}`
              : `00:${timer}`
            : "Получить код"}
        </PhoneInputSendCode>
      </PhoneInputContainer>
      <CodeInputContainer>
        {codeError && <ErrorText>Неправильный код.</ErrorText>}
        <CodeInput
          ref={codeInputRef}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          placeholder="Введите код из смс"
          maskChar={null}
          mask="999-999"
        />
      </CodeInputContainer>
      <SendCode
        disabled={
          code.replace(/[^+\d]/g, "").length < 6 ||
          sendStatus ||
          number.replace(/[^+\d]/g, "").length < 10
        }
        onClick={() => {
          setSendStatus(true);
          axios
            .post("../api/0.1.0/checkCode", {
              number: number.replace(/[^+\d]/g, ""),
              code: code.replace(/[^+\d]/g, ""),
            })
            .then((response) => {
              const { status } = response.data;
              if (status === 1) {
                updateUserData();
                if (document.location.pathname.includes("/basket")) {
                  if (deliveryStatus === 0) {
                    updateModalStatus(8);
                  } else {
                    updateModalStatus(0);
                  }
                } else {
                  updateModalStatus(0);
                }
                updateAuthTimer(30);
                updateAuthStatus(false);
              } else {
                setSendStatus(false);
                setCodeError(true);
                setCode("");
              }
            })
            .catch(() => {});
        }}
      >
        {sendStatus ? <PulseLoader size={5} color="white" /> : "Далее"}
      </SendCode>
    </AuthContainer>
  );
}

const mapStateToProps = (state) => ({
  timerStatus: state.timerStatus,
  timer: state.timer,
  deliveryStatus: state.deliveryStatus,
});

const mapDispatchToProps = {
  updateAuthStatus,
  updateAuthTimer,
  updateModalStatus,
  updateUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
