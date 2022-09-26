import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CountContext, AllContext } from '../../../pages/Booking/Booking';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px 20px 0 0;
`;
const TitleArea = styled.div`
  position: relative;
  margin-left: 20px;
  padding: 0 0 0 28px;
  span {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background-image: url(https://img.megabox.co.kr/static/pc/images/common/txt/txt-age-small-15.png);
    background-position: center;
    background-repeat: no-repeat;
  }
`;
const Title = styled.p`
  padding: 1px 0 0 0;
  font-size: 1.0667em;
  font-weight: 400;
  line-height: 1.1;
`;
const Cate = styled.p`
  padding: 4px 0 0 0;
  font-size: 0.8667em;
  color: #aaa;
  line-height: 1.1;
`;

const InfoArea = styled.div`
  position: relative;
  min-height: 105px;
  margin-left: 48px;
  padding: 0 104px 0 0;
  font-size: 0.8667em;
`;

const Theater = styled.p`
  padding: 1px 0 0 0;
  font-size: 1.0667em;
  font-weight: 400;
  line-height: 1.1;
  margin-top: 10px;
  color: #c4c4c4;
  font-size: 1em;
`;

const TheaterDetail = styled.p`
  padding: 1px 0 0 0;
  font-size: 1.0667em;
  font-weight: 400;
  line-height: 1.1;
  margin-top: 3px;
  color: #c4c4c4;
  font-size: 1em;
`;

const Date = styled.p`
  padding: 1px 0 0 0;
  font-size: 1.0667em;
  font-weight: 400;
  line-height: 1.1;
  margin-top: 5px;
  color: #c4c4c4;
  font-size: 1em;
  display: flex;
`;

const Time = styled.p`
  position: relative;
  margin-left: 10px;
  padding-left: 11px;
  color: #c4c4c4;
  font-size: 0.8667em;
  line-height: 1.1;
  display: flex;
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    width: 1px;
    height: 12px;
    margin-top: -7px;
    background-color: #747474;
  }
  i {
    margin-top: -2px;
    margin-right: 3px;
    overflow: hidden;
    width: 13px;
    height: 13px;
    background-image: url(https://img.megabox.co.kr/static/pc/images/common/ico/ico-clock-white.png);
    display: inline-block;
  }
`;

const SeatArea = styled.div`
  position: relative;
  min-height: 240px;
  margin: 10px 0 0 20px;
  border-radius: 5px;
  border: 1px solid #434343;
`;

const SeatType = styled.div`
  float: left;
  padding: 16px 0 0 20px;
  em {
    color: #c4c4c4;
    font-size: 0.8667em;
    letter-spacing: -1px;
    font-style: normal;
  }
  li {
    display: flex;
    margin-bottom: 5px;
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    right: 117px;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: #434343;
  }
`;

const SeatImg = styled.div`
  width: 14px;
  height: 14px;
  margin: 2px 8px 0px 0px;
`;

const SeatNum = styled.div`
  float: right;
  width: 116px;
  p {
    height: 38px;
    font-size: 0.8667em;
    color: #c4c4c4;
    text-align: center;
    padding-top: 17px;
  }
`;

const SeatSelect = styled.div`
  display: block;
  float: left;
  width: 40px;
  height: 35px;
  margin: 7px 0 0 8px;
  padding-top: 5px;
  font-size: 0.9333em;
  border: 1px solid #5c5c5c;
  text-align: center;
  font-family: Roboto, Dotum, '돋움', sans-serif;
  font-weight: 300;
`;

const PayArea = styled.div`
  position: absolute;
  left: 0;
  bottom: 56px;
  width: 100%;
  padding: 10px 20px;
  strong {
    font-size: 1.6em;
    color: #59bec9;
    margin-right: 5px;
  }
`;

const ButtonArea = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  button {
    display: block;
    float: left;
    width: 50%;
    height: 40px;
    font-size: 1.2em;
    line-height: 40px;
    text-align: center;
    vertical-align: middle;
    color: #fff;
    border: 0;
    cursor: pointer;
    background-color: #53565b;
  }
  a {
    display: block;
    float: left;
    width: 50%;
    height: 40px;
    font-size: 1.2em;
    line-height: 40px;
    text-align: center;
    vertical-align: middle;
    color: #fff;
    border: 0;
    cursor: pointer;
    background-color: #53565b;
  }
`;

function Result() {
  const { adultNum, setAdultNum, teenNum, setTeenNum } = useContext(CountContext);
  const { allSelectArray, setAllSelectArray } = useContext(AllContext);

  const [all, setAll] = useState([]);
  const [totalPay, setTotalPay] = useState(0);

  const clickHandler = event => {
    if (!(allSelectArray.length === adultNum + teenNum && allSelectArray.length !== 0)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    let test = new Array(allSelectArray);
    if (allSelectArray.length >= 1) {
      for (let i = 0; i < test[0].length; i++) {
        if (test[0][i].includes('Z')) {
          let te = test[0][i];
          te = te.slice(0, -1);
          test[0][i] = te;
        }
      }
    }
    setAll(test[0]);
  }, [allSelectArray]);

  useEffect(() => {
    setTotalPay(adultNum * 12000 + teenNum * 10000);
  }, [adultNum, teenNum]);

  return (
    <>
      <Container>
        <TitleArea>
          <span />
          <Title>공조2: 인터내셔날</Title>
          <Cate>2D</Cate>
        </TitleArea>
        <InfoArea>
          <Theater>동대문/컴포트1관</Theater>
          {/* <TheaterDetail>컴포트1관</TheaterDetail> */}
          <Date>
            2022.09.23(금)
            <Time>
              <i />
              15:20~17:39
            </Time>
          </Date>
        </InfoArea>
        {/* <SeatArea>
          <SeatType>
            <ul>
              <li>
                <SeatImg
                  style={{
                    backgroundImage:
                      'url(https://img.megabox.co.kr/static/pc/images/common/bg/bg-seat-condition-choice-s.png)',
                  }}
                />
                <em>선택</em>
              </li>
              <li>
                <SeatImg
                  style={{
                    backgroundImage:
                      'url(https://img.megabox.co.kr/static/pc/images/common/bg/bg-seat-condition-finish-s.png)',
                  }}
                />
                <em>예매완료</em>
              </li>
              <li>
                <SeatImg
                  style={{
                    backgroundImage:
                      'url(https://img.megabox.co.kr/static/pc/images/common/bg/bg-seat-condition-common-s.png)',
                  }}
                />
                <em>일반</em>
              </li>
            </ul>
          </SeatType>
          <SeatNum>
            <p>선택좌석</p>
            <div style={{ padding: '10px 6px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(el => {
                return (
                  <SeatSelect
                    key={el}
                    className={adultNum + teenNum >= el ? 'possible' : 'initial'}
                    style={{ backgroundColor: all[el - 1] && '#503396' }}
                  >
                    {all[el - 1] ? all[el - 1] : '-'}
                  </SeatSelect>
                );
              })}
            </div>
          </SeatNum>
        </SeatArea> */}
        <PayArea>
          <p style={{ float: 'left', marginTop: '9px' }}>최종결제금액</p>
          <p style={{ float: 'right' }}>
            <strong>
              {totalPay === 0
                ? 0
                : String(totalPay).slice(0, -3) + ',' + String(totalPay).slice(-3)}
            </strong>
            원
          </p>
        </PayArea>
        <ButtonArea>
          <button style={{ borderRadius: '0px 0px 0px 4px' }}>이전</button>
          <Link
            style={{
              borderRadius: '0px 0px 4px 0px',
              backgroundColor:
                allSelectArray.length === adultNum + teenNum && allSelectArray.length !== 0
                  ? '#329eb1'
                  : '#e0e0e0',
              color:
                allSelectArray.length === adultNum + teenNum && allSelectArray.length !== 0
                  ? 'white'
                  : '#aaa',
              cursor:
                allSelectArray.length === adultNum + teenNum && allSelectArray.length !== 0
                  ? 'pointer'
                  : 'auto',
              textDecoration: 'none',
            }}
            disabled={
              allSelectArray.length === adultNum + teenNum && allSelectArray.length !== 0
                ? false
                : true
            }
            to='../Payment'
            onClick={clickHandler}
          >
            결제
          </Link>
        </ButtonArea>
      </Container>
    </>
  );
}

export default Result;
