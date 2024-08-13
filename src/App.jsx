import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const Clock = styled.div`
  position: relative;
  width: 270px;
  height: 270px;
  background-color: ${(props) => props.bg_color};
  border: ${(props) => props.border_weight}px solid
    ${(props) => props.border_color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 270px;
  position: relative;
  top: 5px;
  border: 1px solid #d1d1d1;
  padding: 30px;
  padding-top: 45px;
  border-radius: 15px;
`;

Clock.defaultProps = {
  bg_color: "#f7f7f7",
  border_color: "#f7f7f7",
  border_weight: 1,
};

const HH = styled.div`
  height: ${(props) => (props.h12 ? "100%" : "75%")};
  position: absolute;
  text-align: center;
  transform: translateY(-50%) rotate(${(props) => props.rotate}deg);
  margin: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  top: 50%;
`;

HH.defaultProps = {
  h12: true,
};

const Head = styled.div`
  width: 2px;
  height: ${(props) =>
    props.isEmpity ? "37%" : props.isSmall ? "24%" : "43%"};
  background-color: ${(props) => props.color};
  position: absolute;
  bottom: 50%;
  transform: rotate(${(props) => props.rotate}deg);
  transform-origin: bottom;
`;

Head.defaultProps = {
  color: "#FCE376",
};

const Center = styled.div`
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

Center.defaultProps = {
  color: "#FFD61F",
};

const Hour = styled.h3`
  user-select: none;
  font-size: 0.8rem;
  display: inline-block;
  color: ${(props) => props.color};
  transform: rotate(${(props) => -props.rotate}deg);
  margin: ${(props) => props.my}px 0;
  padding: ${(props) =>
    props.isEmity ? "9px" : props.isOne ? "8px 11px" : "9px"};
  border-radius: 50%;
  transition: all 0.1s;
  background-color: ${(props) => props.active && "#FCE376"};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.active ? "#FFD61F" : "#FCE376")};
  }

  &::selection {
    background-color: transparent;
  }
`;

Hour.defaultProps = {
  color: "#000",
  my: 4,
};

const ClockDigital = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  ${(props) =>
    props.isSub
      ? css`
          margin-top: 15px;
        `
      : css`
          margin-bottom: 17px;
        `}
`;

const ItemDigital = styled.button`
  padding: 11px 29px;
  border: 0;
  border-radius: 5px;
  font-weight: 500;
  font-size: 1.2rem;
  background-color: #f5f5f5;
  transition: all 0.2s;
  cursor: pointer;
  &.active {
    background-color: #ffd61f;
  }
  ${(props) =>
    props.btnSub &&
    css`
      width: 135px;
      padding: 7px 0;
      margin: 0 2px;
      &:hover {
        background-color: #d0aa02;
      }
    `}

  ${(props) =>
    props.isCancel &&
    css`
      &:hover {
        background-color: #e0e0e0;
      }
    `}

  &:disabled {
    color: #000;
  }
`;

const ColomDigital = styled.p`
  font-size: 2rem;
  margin: 0;
`;

const Paragraph = styled.p`
  position: absolute;
  top: -9px;
  right: 13px;
  font-size: 18px;
  font-weight: 600;
  z-index: 10000;
`;

const Input = styled.input`
  width: 241px;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 20px;
  text-align: end;
  padding-right: 15px;
  color: #e0e0e0;
  outline: 0;
`;

function App() {
  const hours12 = [
    { t: 12, b: 6, r: 0 },
    { t: 1, b: 7, r: 1 },
    { t: 2, b: 8, r: 2 },
    { t: 3, b: 9, r: 3 },
    { t: 4, b: 10, r: 4 },
    { t: 5, b: 11, r: 5 },
  ];

  const hours24 = [
    { t: 0, b: 18, r: 0 },
    { t: 13, b: 19, r: 1 },
    { t: 14, b: 20, r: 2 },
    { t: 15, b: 21, r: 3 },
    { t: 16, b: 22, r: 4 },
    { t: 17, b: 23, r: 5 },
  ];

  const minutes = [
    { t: 0, r: 0, b: 30 },
    { t: 1, r: 1, b: 31 },
    { t: 2, r: 2, b: 32 },
    { t: 3, r: 3, b: 33 },
    { t: 4, r: 4, b: 34 },
    { t: 5, r: 5, b: 35 },
    { t: 6, r: 6, b: 36 },
    { t: 7, r: 7, b: 37 },
    { t: 8, r: 8, b: 38 },
    { t: 9, r: 9, b: 39 },
    { t: 10, r: 10, b: 40 },
    { t: 11, r: 11, b: 41 },
    { t: 12, r: 12, b: 42 },
    { t: 13, r: 13, b: 43 },
    { t: 14, r: 14, b: 44 },
    { t: 15, r: 15, b: 45 },
    { t: 16, r: 16, b: 46 },
    { t: 17, r: 17, b: 47 },
    { t: 18, r: 18, b: 48 },
    { t: 19, r: 19, b: 49 },
    { t: 20, r: 20, b: 50 },
    { t: 21, r: 21, b: 51 },
    { t: 22, r: 22, b: 52 },
    { t: 23, r: 23, b: 53 },
    { t: 24, r: 24, b: 54 },
    { t: 25, r: 25, b: 55 },
    { t: 26, r: 26, b: 56 },
    { t: 27, r: 27, b: 57 },
    { t: 28, r: 28, b: 58 },
    { t: 29, r: 29, b: 59 },
  ];

  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [clickHour, setClickHour] = useState(false);
  const [num, setNum] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [clock, setClock] = useState({ m: 0, h: 0 });
  const ref = useRef();

  document.addEventListener(
    "click",
    (e) => {
      if (!ref.current?.contains(e.target)) setIsShowModal(false);
    },
    { capture: true }
  );

  useEffect(() => {
    if (clickHour) {
      setTimeout(() => {
        setNum(true);
      }, 500);
    }
  }, [num, clickHour]);

  return (
    <>
      <Input
        type="text"
        onClick={() => {
          setIsShowModal(true);
        }}
        value={` ${String(clock.h).padStart(2, 0)}:${String(clock.m).padStart(
          2,
          0
        )}`}
      />
      {isShowModal && (
        <Container ref={ref}>
          <Paragraph>ساعت ورود</Paragraph>
          <ClockDigital isSub={false}>
            <ItemDigital
              type="button"
              disabled={!num}
              onClick={() => {
                setNum(false);
                setClickHour(false);
              }}
              className={!num && "active"}
            >
              {String(hour).padStart(2, 0)}
            </ItemDigital>
            <ColomDigital>:</ColomDigital>
            <ItemDigital
              type="button"
              disabled={num}
              onClick={() => {
                setNum(true);
                setClickHour(true);
              }}
              className={num && "active"}
            >
              {String(minute).padStart(2, 0)}
            </ItemDigital>
          </ClockDigital>
          <Clock
            onMouseLeave={() => setIsClick(false)}
            onMouseUp={() => setIsClick(false)}
          >
            {(num ? minutes : hours12).map((item) => (
              <HH rotate={(num ? 6 : 30) * item.r} key={item.r}>
                <Hour
                  h={12}
                  onMouseDown={() => {
                    setIsClick(true);
                  }}
                  onMouseUp={() => {
                    setIsClick(false);
                    setClickHour(true);
                  }}
                  onMouseOver={() => {
                    if (isClick) {
                      num ? setMinute(item.t) : setHour(item.t);
                    }
                  }}
                  onClick={() => {
                    setClickHour(true);
                    num ? setMinute(item.t) : setHour(item.t);
                  }}
                  active={num ? item.t === minute : item.t === hour}
                  isOne={item.t > 9 ? false : true}
                  rotate={(num ? 6 : 30) * item.r}
                  isEmity={num ? true : false}
                >
                  {num ? item.t % 5 === 0 && item.t : item.t}
                </Hour>
                <Hour
                  onMouseDown={() => {
                    setIsClick(true);
                  }}
                  onMouseUp={() => {
                    setIsClick(false);
                    setClickHour(true);
                  }}
                  onMouseOver={() => {
                    if (isClick) {
                      num ? setMinute(item.b) : setHour(item.b);
                    }
                  }}
                  h={12}
                  onClick={() => {
                    setClickHour(true);
                    num ? setMinute(item.b) : setHour(item.b);
                  }}
                  active={num ? item.b === minute : item.b === hour}
                  isOne={item.b > 9 ? false : true}
                  rotate={(num ? 6 : 30) * item.r}
                  isEmity={num ? true : false}
                >
                  {num ? item.b % 5 === 0 && item.b : item.b}
                </Hour>
              </HH>
            ))}
            {/* 24 */}
            {!num &&
              hours24.map((item) => (
                <HH h12={false} rotate={30 * item.r} key={item.r}>
                  <Hour
                    onMouseDown={() => {
                      setIsClick(true);
                    }}
                    onMouseUp={() => {
                      setIsClick(false);
                      setClickHour(true);
                    }}
                    onMouseOver={() => {
                      if (isClick) {
                        num ? setMinute(item.t) : setHour(item.t);
                      }
                    }}
                    onClick={() => {
                      setClickHour(true);
                      num ? setMinute(item.t) : setHour(item.t);
                    }}
                    active={num ? item.t === minute : item.t === hour}
                    isOne={item.t > 9 ? false : true}
                    rotate={30 * item.r}
                  >
                    {item.t}
                  </Hour>
                  <Hour
                    onMouseDown={() => {
                      setIsClick(true);
                    }}
                    onMouseUp={() => {
                      setIsClick(false);
                      setClickHour(true);
                    }}
                    onMouseOver={() => {
                      if (isClick) {
                        num ? setMinute(item.b) : setHour(item.b);
                      }
                    }}
                    onClick={() => {
                      setClickHour(true);
                      num ? setMinute(item.b) : setHour(item.b);
                    }}
                    active={num ? item.b === minute : item.b === hour}
                    isOne={item.b > 9 ? false : true}
                    rotate={30 * item.r}
                  >
                    {item.b}
                  </Hour>
                </HH>
              ))}

            <Head
              isEmpity={num && minute % 5 === 0 ? true : false}
              isSmall={!num && hour > 12 ? true : false}
              rotate={30 * (num ? minute / 5 : hour)}
            />
            <Center size={8} />
          </Clock>
          <ClockDigital isSub={true}>
            <ItemDigital
              type="button"
              isCancel={true}
              btnSub={true}
              onClick={() => {
                setIsShowModal(false);
              }}
            >
              پاک کردن
            </ItemDigital>
            <ItemDigital
              type="button"
              btnSub={true}
              className="active"
              onClick={() => {
                setClock({ m: minute, h: hour });
                setIsShowModal(false);
              }}
            >
              ثبت
            </ItemDigital>
          </ClockDigital>
        </Container>
      )}
    </>
  );
}

export default App;
