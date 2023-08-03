import { styled } from "styled-components";

const MainContainer = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  padding-top: 80px; // 헤더 높이만큼 빼주기...다른 방법은 없나?
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  transition: background-color 0.5s ease;
`;
const Test = styled.div`
  width: 80%;
  /* height: 200vh; */
  min-height: 200px;
  background-color: ${props => props.theme.main};
  margin: 0 auto;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MainP = styled.p`
  background-color: ${props => props.theme.sub2};
  color: ${props => props.theme.main};
  display: flex;
  align-items: center;
  justify-content: center;
  & > span {
    color: ${props => props.theme.main2};
    font-weight: 600;
  }
`;
const RandomImg = styled.img`
  width: 300px;
  height: 300px;
`;

const Main = ({ themeSelector }) => {
  return (
    <>
      <MainContainer className="MainContainer">
        <MainP>
          <button onClick={themeSelector}>dark</button>
          <span>묘연</span>에서 당신의 인연을 찾아보세요!
        </MainP>
        <Test className="Test">
          <FlexBox>
            <RandomImg
              src="https://source.unsplash.com/random/300x300/?cat"
              alt="cat"
            />
          </FlexBox>
          <MainP>인연을 기다리고 있어요!</MainP>
        </Test>
      </MainContainer>
    </>
  );
};
export default Main;
