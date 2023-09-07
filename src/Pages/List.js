import Search from "../Assets/API";
import { useRecoilState } from "recoil";
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
import { Cards, BtnBox } from "../Components";

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

  // 1. 페이지가 실행될 때 최초로 리스트(petList) 불러오기
  useEffect(() => {
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
      // if (orgCd && orgCd !== "6119999") {
      // 가정보호(orgCd === 6119999) 일 경우 에러 발생. 왜? 내용이 없어서?
      const shelterURL = generateURL("/shelter");
      fetchData(shelterURL, setShelter);
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

  // 검색결과로 받아온 총 데이터 숫자
  const totalCount = 90;

  const [pageNum, setPageNum] = useRecoilState(pageNumAtom);

  // 총 페이지 숫자
  const pageCount = Math.ceil(totalCount / 10);

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
      setPageNum(Math.ceil(totalCount / 10));
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
      <ListContainer className="ListContainer">
        <SearchContainer className="SearchContainer">
          <SearchBox>
            <SearchBox>
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
            </SearchBox>
            <SearchBox>
              <label>종료날짜</label>
              <input
                type="date"
                className="endDate"
                value={endDate}
                min={before3Y}
                max={today}
                onChange={e => EndDateOnChangeHandler(e.target.value)}
              />
            </SearchBox>
            <SearchBox>
              <label>시도</label>
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
            </SearchBox>
            <SearchBox>
              {" "}
              <label>시군구</label>
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
            </SearchBox>
            <SearchBox>
              <label>보호소</label>
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
            </SearchBox>
            <SearchBox>
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
          </SearchBox>
          <BtnBox>
            <button className="btn" onClick={searchAll}>
              검색
            </button>
          </BtnBox>
        </SearchContainer>
        <PetListContainer className="petListContainer">
          {petList &&
            petList.map(el => {
              return <Cards key={el.id} el={el}></Cards>;
            })}
        </PetListContainer>
        <div
          className="btnContainer"
          onClick={e => pageChangeHandler(e.target.value)}
        >
          <PageBtn value="first" />
          <PageBtn value="prev" />
          {}
          <PageBtn value="1" className="매핑하기" />
          <PageBtn value="2" />
          <PageBtn value="next" />
          <PageBtn value="last" />
        </div>
      </ListContainer>
    </>
  );
};
export default List;

const ListContainer = styled.section`
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SearchContainer = styled.div`
  margin: 1rem;
  width: 100%;
  max-width: 1200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${props => props.theme.whiteOp50};
  border-radius: 16px;
`;
const SearchBox = styled.div`
  /* width: 100%; */
  background-color: beige;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  grid-gap: 16px;
`;
const Select = styled.select``;

const PetListContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 1rem;
  background-color: antiquewhite;
  border: 1px solid salmon;

  height: max-content;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
