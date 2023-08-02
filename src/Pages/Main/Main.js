import { styled } from "styled-components";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const MainContainer = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  padding-top: 80px; // 헤더 높이만큼 빼주기...다른 방법은 없나?
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const Test = styled.div`
  width: 80%;
  /* height: 200vh; */
  min-height: 200px;
  background-color: lightcyan;
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
  background-color: #fff89a;
  color: #1a5f7a;
  display: flex;
  align-items: center;
  justify-content: center;
  & > span {
    color: #086e7d;
    font-weight: 600;
  }
`;
const RandomImg = styled.img`
  width: 300px;
  height: 300px;
`;

const Main = () => {
  return (
    <>
      <MainContainer className="MainContainer">
        <Header />
        <MainP>
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

        <Footer />
      </MainContainer>
    </>
  );
};
export default Main;
