import Search from "../Assets/API";
import { useRecoilValue, useRecoilState } from "recoil";
import { uprCdAtom, sigunguAtom, orgCdAtom } from "../Atom";
import { styled } from "styled-components";

const List = () => {
  // 시도 코드 atom 설정
  const [uprCd, setUprCd] = useRecoilState(uprCdAtom);
  const [orgCd, setOrgCd] = useRecoilState(orgCdAtom);
  const SidoOnClickHandler = value => {
    setUprCd(value);
  };
  const SigunguOnClickHandler = value => {
    setOrgCd(value);
  };
  // 시군구 목록 atom 설정
  const sigungu = useRecoilValue(sigunguAtom);
  // 시군구 리스트 매핑하기

  const { searchSido, searchShelter, searchKind } = Search();

  return (
    <>
      <SearchContainer>
        <SearchBox>
          <Select
            className="sido"
            name="searchUprCd"
            id="searchUprCd"
            title="시도선택"
            onChange={e => SidoOnClickHandler(e.target.value)}
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
            name="searchOrgCd"
            id="searchOrgCd"
            title="시군구선택"
            onChange={e => SigunguOnClickHandler(e.target.value)}
          >
            <option value="">전체</option>
            {uprCd &&
              sigungu.map(org => (
                <option key={org.orgCd} value={org.orgCd}>
                  {org.orgdownNm}
                </option>
              ))}
          </Select>

          <Select className="care_reg"></Select>
          <Select className="kind"></Select>
        </SearchBox>
        <SearchBox>
          <button>검색</button>
        </SearchBox>
      </SearchContainer>
      <button onClick={searchSido}>searchSido</button>
      <button onClick={searchShelter}>searchShelter</button>
      <button onClick={searchKind}>searchKind</button>
      <div>List</div>
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
