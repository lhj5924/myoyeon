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

const List = () => {
  // 시도 코드 atom 설정
  const [uprCd, setUprCd] = useRecoilState(uprCdAtom);
  // 시군구 목록 atom 불러오기
  const sigungu = useRecoilValue(sigunguAtom);
  // 선택한 시군구 코드
  const [orgCd, setOrgCd] = useRecoilState(orgCdAtom);
  // 보호소 목록 atom 불러오기
  const shelter = useRecoilValue(shelterAtom);
  // 선택한 보호소 코드
  const [care, setCare] = useRecoilState(careAtom);
  // 선택한 보호소
  const petList = useRecoilValue(petListAtom);
  const SidoOnChangeHandler = value => {
    setUprCd(value);
  };
  const SigunguOnChangeHandler = value => {
    setOrgCd(value);
  };
  const ShelterOnChangeHandler = value => {
    setCare(value);
  };

  const { searchAll } = Search();

  // 날짜 Atom 설정
  const [beginDate, setBeginDate] = useRecoilState(beginDateAtom);
  const [endDate, setEndDate] = useRecoilState(endDateAtom);
  const BeginDateOnChangeHandler = value => {
    console.log(`beginD : ${value}`);
    setBeginDate(value);
  };
  const EndDateOnChangeHandler = value => {
    console.log(`endD : ${value}`);
    setEndDate(value);
  };

  const [today, before1D, before1M, before3Y] = DateChecker();

  // 현재 pageNum 받아오기
  const [pageNum, setPageNum] = useRecoilState(pageNumAtom);
  const pageChangeHandler = value => {
    // console.log(value);
    setPageNum(value);
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
              value={before1M}
              min={before3Y}
              max={before1D}
              onChange={e => BeginDateOnChangeHandler(e.target.value)}
            />
            <label>종료날짜</label>
            <input
              type="date"
              className="endDate"
              value={today}
              min={before3Y}
              max={today}
              onChange={e => EndDateOnChangeHandler(e.target.value)}
            />
          </div>
          <span>지역 선택</span>
          <Select
            className="sido"
            name="searchUprCd"
            id="searchUprCd"
            title="시도선택"
            onChange={e => SidoOnChangeHandler(e.target.value)}
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
          <Select
            className="sigungu"
            name="sigunguCd"
            id="sigunguCd"
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
          <Select
            className="shelter"
            name="shelterCd"
            id="shelterCd"
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
          <Select
            className="upkind"
            name="upkind"
            id="upkind"
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
              <div key={el.id}>
                {/* <Img src={el.filename} alt="Thumbnail" /> */}
                {/* <Img src={el.popfile} alt="Image" /> */}
                <div>{el.processState}</div>
                <div>{el.desertionNo}</div>
                <div>{el.noticeComment}</div>
                <div>{el.kindCd}</div>
                <div>{el.processState}</div>
                <div>{el.sexCd}</div>
                <div>{el.age}</div>
                <div>{el.specialMark}</div>
                <div>{el.weight}</div>
              </div>
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
