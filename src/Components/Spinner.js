import FadeLoader from "react-spinners/FadeLoader";
import { styled, withTheme } from "styled-components";

function Spinner(props) {
  const { theme } = props;
  return (
    <SpinnerWrap className="loading">
      <FadeLoader color={theme.main2} />
    </SpinnerWrap>
  );
}
const SpinnerWrap = styled.div`
  // 배경 덮기
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: ${props => props.theme.blackOp50};
  // 스피너를 가운데에 놓기
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default withTheme(Spinner);

// 리액트 스피너 라이브러리에서 제공하는 컴포넌트인 FadeLoader 의 color 속성에 theme provider 에서 설정한 컬러를 적용하기 위해, 스타일드 컴포넌트에 내장된 HOC 인 withTheme 으로 컴포넌트 전체를 감싸서, 어디에서든 theme 을 props 로 받아올수 있게 함.
