import { searchSido, searchSigungu } from "../Assets/API";
import { styled } from "styled-components";

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

const List = () => {
  return (
    <>
      <SearchContainer>
        <SearchBox>
          <Select className="sido">
            <option value="6110000">서울특별시</option>
            <option value="서울특별시">서울특별시</option>
            <option value="서울특별시">서울특별시</option>
            <option value="서울특별시">서울특별시</option>
          </Select>
          <Select className="sigungu"></Select>
          <Select className="care_reg"></Select>
          <Select className="kind"></Select>
        </SearchBox>
        <SearchBox>
          <button>검색</button>
        </SearchBox>
      </SearchContainer>
      <button onClick={searchSido}>searchSido</button>
      <button onClick={searchSigungu}>searchSigungu</button>
      <div>List</div>
    </>
  );
};
export default List;
