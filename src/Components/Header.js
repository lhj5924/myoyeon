import { styled } from "styled-components";
import Nav from "./Nav";

const HeaderContainer = styled.div`
  height: 80px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Header = () => {
  return (
    <>
      <HeaderContainer className="HeaderContainer">
        <Nav />
      </HeaderContainer>
    </>
  );
};
export default Header;
