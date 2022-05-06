import React, {
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  useRef,
} from "react";
import styled from "styled-components";
import device from "../../device";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import { Events } from "react-scroll";
import { scroller } from "react-scroll";
import PulseLoader from "react-spinners/PulseLoader";
import { connect } from "react-redux";

import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import ItemImage from "../../Modal/ItemImage";

import { updateModalStatus, updateActiveDish } from "../../../Store/Actions";

const Loader = styled.div`
  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    padding: 10px 20px;
    font-size: 20px;
    margin: 0 2.5px;
    border-radius: 40px;
    & * {
      height: 25px;
    }
  }

  @media ${device.screen999to768} {
    padding: 10px 20px;
    font-size: 18px;
    margin: 0 2.5px;
    border-radius: 35px;
    & * {
      height: 20px;
    }
  }

  @media ${device.screen767to425}, ${device.screen424to375} {
    padding: 6px 12px;
    font-size: 15px;
    line-height: 26px;
    margin: 0 2.5px;
    border-radius: 40px;
    & * {
      height: 26px;
    }
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    padding: 5px 10px;
    font-size: 12px;
    line-height: 20px;
    margin: 0 2.5px;
    border-radius: 40px;
    & * {
      height: 20px;
    }
  }
`;

const Category = styled.button`
  ${(props) => {
    if (props.theme === "1") {
      return `
        background-color: #FFEDEE;
        color: #C91E25;
        `;
    } else if (props.theme === "2") {
      return `
        background-color: #E9F9F3;
        color: #199869;
        `;
    }
  }}

  transition: all 0.25s;

  ${(props) => {
    if (props.theme === "1" || props.theme === "2") {
      return `
        @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
          padding: 10px 20px;
          font-size: 20px;
          line-height: 25px;
          margin: 0 2.5px;
          border-radius: 40px;
        }
        
        @media ${device.screen999to768} {
          padding: 10px 20px;
          font-size: 18px;
          line-height: 20px;
          margin: 0 2.5px;
          border-radius: 35px;
        }
        
        @media ${device.screen767to425}, ${device.screen424to375} {
          padding: 6px 12px;
          font-size: 15px;
          line-height: 26px;
          margin: 0 2.5px;
          border-radius: 40px;
        }
        
        @media ${device.screen374to320}, ${device.screen319toMin} {
          padding: 5px 10px;
          font-size: 12px;
          line-height: 20px;
          margin: 0 2.5px;
          border-radius: 40px;
        }
        `;
    } else {
      return `
        @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
          font-size: 20px;
          line-height: 25px;
          margin: 0 10px;
        }
        
        @media ${device.screen999to768} {
          background-color: #FAFAFA;
          color: #8D929E;
          padding: 10px 20px;
          font-size: 18px;
          line-height: 20px;
          margin: 0 2.5px;
          border-radius: 35px;
        }
        
        @media ${device.screen767to425}, ${device.screen424to375} {
          background-color: #FAFAFA;
          color: #8D929E;
          padding: 6px 12px;
          font-size: 15px;
          line-height: 26px;
          margin: 0 2.5px;
          border-radius: 40px;
        }
        
        @media ${device.screen374to320}, ${device.screen319toMin} {
          background-color: #FAFAFA;
          color: #8D929E;
          padding: 5px 10px;
          font-size: 12px;
          line-height: 20px;
          margin: 0 2.5px;
          border-radius: 40px;
        }
        `;
    }
  }};
`;

const Container = styled.div`
  justify-content: flex-start;
  overflow-x: scroll;
  white-space: nowrap;
  flex-wrap: nowrap;
  width: 100%;

  & ${Category}:first-child {
    margin-left: 0;
  }

  & ${Category}:last-child {
    margin-right: 0;
  }

  @media ${device.screenMaxto1280} {
    min-width: 1280px;
    width: max-content;
    padding-left: 55px;
    padding-right: 55px;
  }

  @media ${device.screen1279to1000} {
    width: max-content;
    padding-left: 40px;
    padding-right: 40px;
    min-width: 1000px;
  }

  @media ${device.screen999to768} {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media ${device.screen767to425} {
    padding-left: 18px;
    padding-right: 18px;
  }

  @media ${device.screen424to375} {
    padding-left: 18px;
    padding-right: 18px;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const Categories = styled.div`
  width: 100%;
  position: sticky;
  background-color: white;
  border-bottom: 1.5px solid #f3f3f3;
  border-top: 1.5px solid #f3f3f3;
  z-index: 2;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    padding: 15px 0;
  }

  @media ${device.screen999to768} {
    padding: 10px 0;
  }

  @media ${device.screen767to425}, ${device.screen424to375} {
    padding: 6px 0;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    padding: 5px 0;
  }

  & ${Container}::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const DisabledDish = styled.p`
  @media ${device.screenMaxto1280} {
    font-size: 25px;
    line-height: 25px;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    font-size: 20px;
    line-height: 20px;
  }

  @media ${device.screen767to425} {
    font-size: 16px;
    line-height: 16px;
  }

  @media ${device.screen424to375} {
    font-size: 14px;
    line-height: 14px;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    font-size: 13px;
    line-height: 13px;
  }

  color: #bcbcbc;
  opacity: 1 !important;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const DisabledContainer = styled.div`
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ItemDeskPrice = styled.p`
  color: #bcbcbc;
  font-family: "Cera Round Pro Medium", sans-serif;

  @media ${device.screenMaxto1280} {
    font-size: 25px;
    line-height: 25px;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    font-size: 20px;
    line-height: 20px;
  }

  @media ${device.screen767to425} {
    font-size: 16px;
    line-height: 16px;
  }

  @media ${device.screen424to375} {
    font-size: 14px;
    line-height: 14px;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    font-size: 13px;
    line-height: 13px;
  }
`;

const ItemDeskName = styled.p`
  color: black;
  font-family: "Cera Round Pro Medium", sans-serif;

  @media ${device.screenMaxto1280} {
    font-size: 25px;
    line-height: 25px;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    font-size: 20px;
    line-height: 20px;
  }

  @media ${device.screen767to425} {
    font-size: 16px;
    line-height: 16px;
  }

  @media ${device.screen424to375} {
    font-size: 14px;
    line-height: 14px;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    font-size: 13px;
    line-height: 13px;
  }
`;

const ItemDeskContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  @media ${device.screenMaxto1280} {
    padding: 25px 25px 20px 25px;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    padding: 16px 20px 12px 20px;
  }

  @media ${device.screen767to425} {
    padding: 12px 16px 14px 16px;
  }

  @media ${device.screen424to375} {
    padding: 10px 15px 12px 15px;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    padding: 10px 12px;
  }
`;

const Item = styled.button`
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  margin: 0 20px 25px 0;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;

  @media ${device.screenMaxto1280} {
    width: 290px;
    height: 365px;
    border-radius: 22px;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    width: 225px;
    height: 285px;
    border-radius: 18px;
  }

  @media ${device.screen767to425} {
    width: 190px;
    height: 235px;
    border-radius: 14px;
  }

  @media ${device.screen424to375} {
    width: 165px;
    height: 205px;
    border-radius: 12px;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    width: 140px;
    height: 175px;
    border-radius: 10px;
  }
`;

const ItemsContainer = styled.div`
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;

  @media ${device.screenMaxto1280}, ${device.screen1279to1000} {
    & ${Item} {
      margin: 0 20px 25px 0;
    }

    & ${Item}:nth-child(4n + 4) {
      margin: 0 0 25px 0;
    }
  }

  @media ${device.screen999to768} {
    & ${Item} {
      margin: 0 20px 25px 0;
    }

    & ${Item}:nth-child(3n + 3) {
      margin: 0 0 25px 0;
    }
  }

  @media ${device.screen767to425}, ${device.screen424to375} {
    & ${Item} {
      margin: 0 15px 15px 0;
    }

    & ${Item}:nth-child(2n + 2) {
      margin: 0 0 15px 0;
    }
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    & ${Item} {
      margin: 0 10px 10px 0;
    }

    & ${Item}:nth-child(2n + 2) {
      margin: 0 0 10px 0;
    }
  }
`;

const SectionDesk = styled.p`
  justify-content: flex-start;
  width: 100%;
  @media ${device.screenMaxto1280} {
    font-size: 30px;
    line-height: 25px;
    padding-left: 25px;
    margin: 40px 0;
  }

  @media ${device.screen1279to1000}, ${device.screen999to768} {
    font-size: 20px;
    line-height: 20px;
    padding-left: 20px;
    margin: 25px 0;
  }

  @media ${device.screen767to425} {
    font-size: 20px;
    line-height: 20px;
    padding-left: 15px;
    margin: 15px 0;
  }

  @media ${device.screen424to375} {
    font-size: 20px;
    line-height: 20px;
    padding-left: 15px;
    margin: 15px 0;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    font-size: 20px;
    line-height: 20px;
    padding-left: 15px;
    margin: 15px 0;
  }
`;

const Section = styled.section`
  flex-direction: column;
  width: 100%;
`;

const SectionsContainer = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;

  @media ${device.screenMaxto1280} {
    max-width: 1220px;
  }

  @media ${device.screen1279to1000} {
    max-width: 960px;
  }

  @media ${device.screen999to768} {
    max-width: 715px;
  }

  @media ${device.screen767to425} {
    max-width: 395px;
  }

  @media ${device.screen424to375} {
    max-width: 345px;
  }

  @media ${device.screen374to320}, ${device.screen319toMin} {
    max-width: 290px;
  }
`;

const SectionNameComponent = ({ name }) => {
  const [upperName, setUpperName] = useState(name.toUpperCase())
  return <span>{upperName}</span>;
};

const Menu = ({ data, requestStatus, updateModalStatus, updateActiveDish }) => {
  const [offset, setOffset] = useState();
  const [activeSection, setActiveSection] = useState(0);
  const [scrollStatus, setScrollStatus] = useState(false);

  const HeaderContainerRef = useRef(null);
  const CategoriesContainerRef = useRef(null);
  const SectionsContainerRef = useRef(null);

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setOffset(HeaderContainerRef.current.offsetHeight);
    });
  }, [setOffset, HeaderContainerRef]);

  useEffect(() => {
    setOffset(HeaderContainerRef.current.offsetHeight);
  }, [setOffset, HeaderContainerRef]);

  useEffect(() => {
    if (requestStatus) {
      const categoriesArr = [...CategoriesContainerRef.current.children];
      const active = categoriesArr[activeSection];
      if (active.innerHTML === "Бургеры") {
        active.classList.add("active-burgers");
      } else if (active.innerText === "Сэндвичи") {
        active.classList.add("active-sandwiches");
      } else {
        active.classList.add("active-default");
      }
    }
  }, [CategoriesContainerRef, requestStatus, activeSection]);

  useEffect(() => {
    const sectionsArr = [...SectionsContainerRef.current.children];
    const categoriesArr = [...CategoriesContainerRef.current.children];
    const offset =
      CategoriesContainerRef.current.parentNode.offsetHeight +
      HeaderContainerRef.current.offsetHeight;
    const handleScroll = () => {
      if (!scrollStatus) {
        sectionsArr.forEach((el, i) => {
          if (
            window.pageYOffset >= el.offsetTop - offset * 2 &&
            window.pageYOffset < el.offsetTop + el.offsetHeight - offset * 2 &&
            i !== activeSection
          ) {
            const sectionText = sectionsArr[i].children[0].innerText;
            categoriesArr[activeSection].classList.remove(
              "active-burgers",
              "active-sandwiches",
              "active-default"
            );
            categoriesArr[i].classList.add(
              sectionText === "БУРГЕРЫ"
                ? "active-burgers"
                : sectionText === "СЭНДВИЧИ"
                ? "active-sandwiches"
                : "active-default"
            );
            scrollIntoView(categoriesArr[i], {
              inline: "center",
              behavior: "smooth",
              boundary: CategoriesContainerRef.current,
            });
            setActiveSection(i);
          }
        });
      }
    };

    Events.scrollEvent.register("begin", () => {
      setScrollStatus(true);
    });

    Events.scrollEvent.register("end", () => {
      setScrollStatus(false);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    activeSection,
    scrollStatus,
    HeaderContainerRef,
    CategoriesContainerRef,
    SectionsContainerRef,
    requestStatus,
  ]);

  const MemoCategories = useMemo(() => {
    return (
      data && (
        <Container ref={CategoriesContainerRef} id="container">
          {data.categories.map((el, i) => (
            <Category
              key={i}
              theme={el === "Бургеры" ? "1" : el === "Сэндвичи" ? "2" : "0"}
              onClick={() => {
                if (!scrollStatus) {
                  const sectionsArr = [
                    ...SectionsContainerRef.current.children,
                  ];
                  const categoriesArr = [
                    ...CategoriesContainerRef.current.children,
                  ];
                  const offsetFull =
                    CategoriesContainerRef.current.parentNode.offsetHeight +
                    offset;
                  categoriesArr.forEach((el) => {
                    el.classList.remove(
                      "active-burgers",
                      "active-sandwiches",
                      "active-default"
                    );
                  });
                  setActiveSection(i);
                  const sectionText = sectionsArr[i].children[0].innerText;
                  console.log(sectionText)
                  categoriesArr[i].classList.add(
                    sectionText === "БУРГЕРЫ"
                      ? "active-burgers"
                      : sectionText === "Сэндвичи"
                      ? "active-sandwiches"
                      : "active-default"
                  );
                  scrollIntoView(categoriesArr[i], {
                    inline: "center",
                    behavior: "smooth",
                    boundary: CategoriesContainerRef.current,
                  });
                  scroller.scrollTo("section-" + i, {
                    duration: 800,
                    delay: 0,
                    smooth: "easeInOutQuart",
                    ignoreCancelEvents: true,
                    offset: -offsetFull,
                  });
                }
              }}
            >
              {el}
            </Category>
          ))}
        </Container>
      )
    );
  }, [
    SectionsContainerRef,
    data,
    offset,
    CategoriesContainerRef,
    requestStatus,
    scrollStatus,
  ]);

  const MemoSections = useMemo(() => {
    return (
      data &&
      data.categories.map((el1, i1) => (
        <Section key={i1} name={"section-" + i1}>
          <SectionDesk>
            <SectionNameComponent name={el1} />
          </SectionDesk>
          <ItemsContainer>
            {data.menu &&
              data.menu.map(
                (el2, i2) =>
                  el2.categname === el1 &&
                  (el2.constructor !== true ? (
                    <Item
                      disabled={el2.stop === 0 ? true : false}
                      key={i2}
                      onClick={() => {
                        if (el2.stop !== 0) {
                          console.log(el2);
                          updateModalStatus(4);
                          updateActiveDish(el2);
                        }
                      }}
                    >
                      {el2.stop === 0 && (
                        <DisabledContainer>
                          <DisabledDish>
                            В данный момент недоступно
                          </DisabledDish>
                        </DisabledContainer>
                      )}
                      <ItemImage name={el2.name} rest={el2.rest} />
                      <ItemDeskContainer>
                        <ItemDeskName>{el2.name}</ItemDeskName>
                        <ItemDeskPrice>{el2.price}₽</ItemDeskPrice>
                      </ItemDeskContainer>
                    </Item>
                  ) : (
                    <Item
                      key={i2}
                      onClick={() => {
                        console.log(el2);
                        updateModalStatus(4);
                        updateActiveDish(el2);
                      }}
                    >
                      <ItemImage name={el2.name} rest={el2.rest} />
                      <ItemDeskContainer>
                        <ItemDeskName>{el2.name}</ItemDeskName>
                        <ItemDeskPrice>{el2.price}₽</ItemDeskPrice>
                      </ItemDeskContainer>
                    </Item>
                  ))
              )}
          </ItemsContainer>
        </Section>
      ))
    );
  }, [data, requestStatus, updateActiveDish, updateModalStatus]);

  return (
    <>
      <Header HeaderContainerRef={HeaderContainerRef} />
      <Categories style={{ top: offset }}>{MemoCategories}</Categories>
      <SectionsContainer ref={SectionsContainerRef}>
        {MemoSections}
      </SectionsContainer>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
  requestStatus: state.requestStatus,
});

const mapDispatchToProps = {
  updateModalStatus,
  updateActiveDish,
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Menu);
