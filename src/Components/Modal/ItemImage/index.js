import React from "react";
import styled from "styled-components";

import device from "../../device";

import defburg from "../../../Media/images/dish/defburg.svg";
import defsand from "../../../Media/images/dish/defsand.svg";
import defhot from "../../../Media/images/dish/defhot.png";

const ItemImg = styled.div`
  width: 100%;

  background-image: url(${(props) => props.source});
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;

  @media ${device.screenMaxto1280} {
    height: 235px;
    border-radius: 22px 22px 0 0;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    height: 185px;
    border-radius: 18px 18px 0 0;
  }

  @media ${device.screen767to425} {
    height: 155px;
    border-radius: 14px 14px 0 0;
  }

  @media ${device.screen424to375} {
    height: 130px;
    border-radius: 12px 12px 0 0;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    height: 100px;
    border-radius: 10px 10px 0 0;
  }
`;

const ItemImage = (props) => {
  const defhotarr = [
    "чай",
    "кофе",
    "мокаччино",
    "раф",
    "флэтуайт",
    "фраппе",
    "латте",
    "капучино",
    "эспрессо",
    "какао",
    "горячийшоколад",
    "американо",
  ];

  const name = props.name.replace(/ /g, "").toLowerCase();
  const rest = props.rest;
  const style = props.style;
  const defstyle = props.defstyle;
  try {
    const src = require("../../../Media/images/dish/" + name + ".png");
    if (rest === 0) {
      return (
        <ItemImg style={{ backgroundSize: "110%", ...style }} source={src} />
      );
    }
    if (rest === 1) {
      return (
        <ItemImg style={{ backgroundSize: "175%", ...style }} source={src} />
      );
    }
  } catch {
    if (defhotarr.some((el) => name.includes(el))) {
      return (
        <ItemImg 
          style={{ backgroundSize: "120%", ...defstyle }}
          source={defhot}
        />
      );
    } else {
      if (rest === 0) {
        return (
          <ItemImg
            style={{ backgroundSize: "50%", ...defstyle }}
            source={defburg}
          />
        );
      }
      if (rest === 1) {
        return (
          <ItemImg
            style={{ backgroundSize: "50%", ...defstyle }}
            source={defsand}
          />
        );
      }
    }
  }
};
export default ItemImage;
