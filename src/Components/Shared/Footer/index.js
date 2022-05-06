import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import device from "../../device";
import LogoBurg from "../../../Media/images/LogoBurg.svg";
import LogoSand from "../../../Media/images/LogoSand.svg";
import InstBurg from "../../../Media/images/InstBurg.svg";
import InstSand from "../../../Media/images/InstSand.svg";

const CopyrightText = styled.p`
  color: #bcbcbc;

  @media ${device.screenMaxto1280} {
    font-size: 23px;
    line-height: 25px;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    font-size: 18px;
    line-height: 20px;
  }

  @media ${device.screen767to425}, ${device.screen424to375} {
    font-size: 15px;
    line-height: 15px;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    font-size: 13px;
    line-height: 15px;
  }
`;

const CopyrightContainer = styled.div`
  width: 100%;
  border-top: 1.5px solid #f3f3f3;

  @media ${device.screenMaxto1280} {
    padding: 20px 0 25px 0;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    padding: 15px 0 20px 0;
  }

  @media ${device.screen767to425}, ${device.screen424to375} {
    padding: 10px 0 25px 0;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    padding: 10px 0 15px 0;
  }
`;

const ContactInstLink = styled.a`
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.source});

  @media ${device.screenMaxto1280} {
    width: 50px;
    height: 50px;
    background-size: 50px;
    &:first-child {
      margin-right: 15px;
    }
  }

  @media ${device.screen1279to1000},
    ${device.screen999to768},
    ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    width: 40px;
    height: 40px;
    background-size: 40px;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

const ContactInstContainer = styled.div`
  @media ${device.screenMaxto1280},
    ${device.screen1279to1000},
    ${device.screen999to768} {
    margin-bottom: 10px;
  }
  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const ContactMail = styled.a`
  color: #bcbcbc;
  @media ${device.screenMaxto1280} {
    margin-bottom: 15px;
    font-size: 23px;
    line-height: 25px;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    margin-bottom: 15px;
    font-size: 18px;
    line-height: 25px;
  }

  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 20px;
    grid-row-start: 3;
    justify-content: flex-start;
  }
`;

const ContactText = styled.p`
  color: #bcbcbc;
  @media ${device.screenMaxto1280} {
    margin-bottom: 10px;
    font-size: 17px;
    line-height: 20px;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 15px;
  }

  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    margin-bottom: 4px;
    font-size: 13px;
    line-height: 15px;
    grid-row-start: 2;
    justify-content: flex-start;
  }
`;

const ContactNumber = styled.a`
  font-family: "Cera Round Pro Medium", sans-serif;

  @media ${device.screenMaxto1280} {
    margin-bottom: 10px;
    font-size: 45px;
    line-height: 50px;
    line-height: 45px;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    margin-bottom: 10px;
    font-size: 34px;
    line-height: 45px;
  }

  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    grid-row-start: 1;
    font-size: 25px;
    line-height: 40px;
    justify-content: flex-start;
  }
`;

const ContactContainer = styled.div`
  flex-direction: column;
  width: 100%;
  @media ${device.screenMaxto1280},
    ${device.screen1279to1000},
    ${device.screen999to768} {
    align-items: flex-end;
  }

  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    order: -1;
    align-items: flex-start;
    flex-wrap: wrap;
    position: relative;
  }
`;

const Link = styled.a`
  cursor: pointer;
  color: #d8d8d8;
  @media ${device.screenMaxto1280} {
    font-size: 23px;
    line-height: 25px;
    margin-bottom: 15px;
  }
  @media ${device.screen1279to1000}, ${device.screen999to768} {
    font-size: 18px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  @media ${device.screen767to425}, ${device.screen424to375} {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  @media ${device.screen374to320}, ${device.screen319toMin} {
    font-size: 13px;
    line-height: 15px;
    margin-bottom: 10px;
  }

  white-space: nowrap;

  &:hover {
    color: #c91e25;
  }

  &:last-child {
    margin-bottom: unset;
  }
`;

const CategoryName = styled.p`
  font-family: "Cera Round Pro Medium", sans-serif;
  @media ${device.screenMaxto1280} {
    margin-bottom: 30px;
    font-size: 23px;
    line-height: 25px;
  }
  @media ${device.screen1279to1000}, ${device.screen999to768} {
    margin-bottom: 20px;
    font-size: 18px;
    line-height: 20px;
  }
  @media ${device.screen767to425}, ${device.screen424to375} {
    margin-bottom: 15px;
    font-size: 16px;
    line-height: 20px;
  }
  @media ${device.screen374to320}, ${device.screen319toMin} {
    margin-bottom: 15px;
    font-size: 15px;
    line-height: 15px;
  }
`;

const LinkChildContainer = styled.div`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  @media ${device.screenMaxto1280} {
    &:first-child {
      margin-right: 90px;
    }
  }
  @media ${device.screen1279to1000}, ${device.screen999to768} {
    &:first-child {
      margin-bottom: 30px;
    }
  }
  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: unset;
    }
  }
`;

const LinkContainer = styled.div`
  align-items: flex-start;
  width: 100%;
  @media ${device.screen1279to1000},
    ${device.screen999to768},
    ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    flex-direction: column;
  }
`;

const MediaContainer = styled.div`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  @media ${device.screenMaxto1280} {
    width: 1280px;
    padding: 40px 40px 60px 40px;
  }
  @media ${device.screen1279to1000}, ${device.screen999to768} {
    padding: 20px;
  }
  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }
`;

const Images = styled.img`
  @media ${device.screenMaxto1280} {
    &:first-child {
      width: 130px;
      height: 45px;
      margin-right: 15px;
    }

    &:last-child {
      width: 115px;
      height: 85px;
    }
  }
  @media ${device.screen1279to1000}, ${device.screen999to768} {
    &:first-child {
      width: 110px;
      height: 40px;
      margin-right: 10px;
    }

    &:last-child {
      width: 95px;
      height: 70px;
    }
  }
  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    &:first-child {
      width: 80px;
      height: 30px;
      margin-right: 5px;
    }

    &:last-child {
      width: 70px;
      height: 50px;
    }
  }
`;

const ImagesContainer = styled.div`
  justify-content: center;
  border-top: 1.5px solid #f3f3f3;
  border-bottom: 1.5px solid #f3f3f3;

  @media ${device.screenMaxto1280} {
    padding: 15px 0;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    padding: 10px 0;
  }

  @media ${device.screen767to425},
    ${device.screen424to375},
    ${device.screen374to320},
    ${device.screen319toMin} {
    padding: 5px 0;
  }
`;

const FooterContainer = styled.footer`
  margin-top: 105px;
  flex-direction: column;
  width: 100%;
  background-color: #fafafa;
  align-items: center;
  justify-content: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ImagesContainer>
        <Images
          src={LogoBurg}
          onClick={() => {
            document.location.reload();
            window.scrollTo(0, 0)
          }}
        />
        <Images
          src={LogoSand}
          onClick={() => {
            document.location.reload();
            window.scrollTo(0, 0)
          }}
        />
      </ImagesContainer>
      <MediaContainer>
        <LinkContainer>
          <LinkChildContainer>
            <CategoryName>Рестораны</CategoryName>
            <Link>Oldschool burgers</Link>
            <Link>Sandwich street</Link>
          </LinkChildContainer>
          <LinkChildContainer>
            <CategoryName>О компании</CategoryName>
            <Link>Доставка</Link>
            <Link>Пользовательское соглашение</Link>
            <Link>Вакансии</Link>
          </LinkChildContainer>
        </LinkContainer>
        <ContactContainer>
          <ContactNumber href="tel:333247">333-247</ContactNumber>
          <ContactText>Звонок бесплатный</ContactText>
          <ContactMail href="mailto:feedback@oldschool.group">
            feedback@oldschool.group
          </ContactMail>
          <ContactInstContainer>
            <ContactInstLink
              source={InstSand}
              href="https://www.instagram.com/sandwich_street/"
              target="_blank"
            />
            <ContactInstLink
              source={InstBurg}
              href="https://www.instagram.com/oldschoolburgers/"
              target="_blank"
            />
          </ContactInstContainer>
        </ContactContainer>
      </MediaContainer>
      <CopyrightContainer>
        <CopyrightText>
          © 2018–{new Date().getFullYear()} ООО «Олдскул групп»
        </CopyrightText>
      </CopyrightContainer>
    </FooterContainer>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Footer);
