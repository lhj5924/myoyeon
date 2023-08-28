import Search from "../Assets/API";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  uprCdAtom,
  sigunguAtom,
  orgCdAtom,
  beginDateAtom,
  endDateAtom,
  pageNumAtom,
  shelterAtom,
  petListAtom,
  upkindAtom,
  careAtom,
} from "../Atom";
import { styled } from "styled-components";
import DateChecker from "../Atom/todayDate";
import PageBtn from "../Components/PageBtn";
import { useEffect } from "react";

const List = () => {
  // 선택한 시도 코드 atom 설정
  const [uprCd, setUprCd] = useRecoilState(uprCdAtom);
  // 시군구 목록 atom 설정
  const [sigungu, setSigungu] = useRecoilState(sigunguAtom);
  // 선택한 시군구 코드 atom 설정
  const [orgCd, setOrgCd] = useRecoilState(orgCdAtom);
  // 보호소 목록 atom 설정
  const [shelter, setShelter] = useRecoilState(shelterAtom);
  // 선택한 보호소 코드
  const [care, setCare] = useRecoilState(careAtom);
  // 검색결과 리스트
  const [petList, setPetList] = useRecoilState(petListAtom);

  const { searchAll, generateURL, fetchData } = Search();

  const totalCount = 90;
  // 1. 페이지가 실행될 때 최초로 리스트(petList) 불러오기
  useEffect(() => {
    console.log("searchAll 최초 실행");
    searchAll();
  }, []);

  // 2-1. 시도 선택
  const SidoOnChangeHandler = value => {
    setUprCd(value); // 선택한 시도 코드를 uprCdAtom 에 넣어주기
    setOrgCd(""); // 시도 선택 시 시군구 선택 초기화
    setCare(""); // 시도 선택 시 보호소 선택 초기화
  };

  // 2-2. 시도코드(uprCd)가 변경될 때마다 시군구 목록을 재로딩하기.
  useEffect(() => {
    if (uprCd) {
      // 시군구 목록을 불러와서 sigunguAtom 에 넣어주기
      const sigunguURL = generateURL("/sigungu");
      fetchData(sigunguURL, setSigungu);
    } else {
      // 시도 전체 선택 시 전체 리스트 불러오기
      searchAll();
      console.log("시도 전체");
    }
  }, [uprCd]);

  // 3-1. 시군구 선택
  const SigunguOnChangeHandler = value => {
    setOrgCd(value);
    setCare(""); // 시군구 선택 시 보호소 선택 초기화
  };
  // 3-2. 시군구코드(orgCd)가 변경될 때마다 보호소 목록을 재로딩하기.
  useEffect(() => {
    if (orgCd) {
      console.log("orgCd : ", orgCd);
      // if (orgCd && orgCd !== "6119999") {
      // 가정보호(orgCd === 6119999) 일 경우 에러 발생. 왜? 내용이 없어서?
      const shelterURL = generateURL("/shelter");
      fetchData(shelterURL, setShelter, val => {
        console.log(val);
      });
    } else {
      console.log("검색결과 없음");
    }
  }, [orgCd]);

  const ShelterOnChangeHandler = value => {
    setCare(value);
  };
  const [today, before1D, before1M, before3Y] = DateChecker();
  // 날짜 Atom 설정
  const [beginDate, setBeginDate] = useRecoilState(beginDateAtom);
  const [endDate, setEndDate] = useRecoilState(endDateAtom);
  const BeginDateOnChangeHandler = value => {
    setBeginDate(value);
  };
  const EndDateOnChangeHandler = value => {
    setEndDate(value);
  };

  // 현재 pageNum 받아오기
  const [pageNum, setPageNum] = useRecoilState(pageNumAtom);
  const pageChangeHandler = value => {
    // console.log(value);
    if (typeof value === "number") {
      setPageNum(value);
    } else if (value === "prev") {
      setPageNum(pageNum - 1);
    } else if (value === "next") {
      setPageNum(pageNum + 1);
    } else if (value === "first") {
      setPageNum(1);
    } else if (value === "last") {
      setPageNum(Math.ceil(totalCount / 9));
    }

    console.log(`PageNum : ${value}`);
  };

  // 축종(개, 고양이, 기타) 선택하기
  const [upkind, setUpkind] = useRecoilState(upkindAtom);
  const UpkindOnChangeHandler = value => {
    setUpkind(value);
  };
  return (
    <>
      <SearchContainer>
        <SearchBox>
          <div>
            <label>시작날짜</label>
            <input
              type="date"
              className="beginDate"
              defaultValue={before1M}
              value={beginDate}
              min={before3Y}
              max={before1D}
              onChange={e => BeginDateOnChangeHandler(e.target.value)}
            />
            <label>종료날짜</label>
            <input
              type="date"
              className="endDate"
              value={endDate}
              min={before3Y}
              max={today}
              onChange={e => EndDateOnChangeHandler(e.target.value)}
            />
          </div>
          <span>시도</span>
          <Select
            className="sido"
            name="searchUprCd"
            title="시도선택"
            onChange={e => {
              SidoOnChangeHandler(e.target.value);
            }}
          >
            <option value="">전체</option>
            <option value="6110000">서울특별시 </option>
            <option value="6260000">부산광역시 </option>
            <option value="6270000">대구광역시 </option>
            <option value="6280000">인천광역시 </option>
            <option value="6290000">광주광역시 </option>
            <option value="5690000">세종특별자치시 </option>
            <option value="6300000">대전광역시 </option>
            <option value="6310000">울산광역시 </option>
            <option value="6410000">경기도 </option>
            <option value="6420000">강원특별자치도 </option>
            <option value="6430000">충청북도 </option>
            <option value="6440000">충청남도 </option>
            <option value="6450000">전라북도 </option>
            <option value="6460000">전라남도 </option>
            <option value="6470000">경상북도 </option>
            <option value="6480000">경상남도 </option>
            <option value="6500000">제주특별자치도 </option>
          </Select>
          <span>시군구</span>
          <Select
            className="sigungu"
            title="시군구선택"
            onChange={e => SigunguOnChangeHandler(e.target.value)}
          >
            <option value="">전체</option>
            {uprCd &&
              sigungu.map(org => (
                <option key={org.orgCd} value={org.orgCd}>
                  {org.orgdownNm}
                </option>
              ))}
          </Select>
          <span>보호소</span>
          <Select
            className="shelter"
            title="보호소선택"
            onChange={e => ShelterOnChangeHandler(e.target.value)}
          >
            <option value="">전체</option>
            {orgCd &&
              shelter.map(el => (
                <option key={el.careRegNo} value={el.careRegNo}>
                  {el.careNm}
                </option>
              ))}
          </Select>
          <span>축종</span>
          <Select
            className="upkind"
            title="축종선택"
            onChange={e => UpkindOnChangeHandler(e.target.value)}
          >
            <option value="">전체</option>
            <option value="417000">개</option>
            <option value="422400">고양이</option>
            <option value="429900">기타</option>
          </Select>
        </SearchBox>
        <SearchBox>
          <button onClick={searchAll}>검색</button>
        </SearchBox>
      </SearchContainer>
      <div className="petListContainer">
        {petList &&
          petList.map(el => {
            return (
              <Card key={el.id}>
                {/* <Img src={el.filename} alt="Thumbnail" /> */}
                {/* <Img src={el.popfile} alt="Image" /> */}
                <div>{el.processState}</div>
                <div>{el.noticeNo}</div>
                <div>{el.noticeSdt}</div>
                <div>{el.noticeEdt}</div>
                <div>{el.kindCd}</div>
                <div>{el.careNm}</div>
                <div>{el.orgNm}</div>
                <div>{el.sexCd}</div>
                <div>{el.age}</div>
                <div>{el.neuterYn}</div>
              </Card>
            );
          })}
      </div>
      <div
        className="btnContainer"
        onClick={e => pageChangeHandler(e.target.value)}
      >
        <PageBtn value="first" />
        <PageBtn value="prev" />
        <PageBtn value="1" />
        <PageBtn value="2" />
        <PageBtn value="next" />
        <PageBtn value="last" />
      </div>
    </>
  );
};
export default List;

const SearchContainer = styled.div`
  width: 850px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightpink;
`;
const SearchBox = styled.div`
  width: 100%;
  background-color: beige;
`;
const Select = styled.select``;
const Img = styled.img`
  width: 300px;
`;
const Card = styled.div`
  margin: 1rem;
  background-color: antiquewhite;
  border: 1px solid salmon;
`;
