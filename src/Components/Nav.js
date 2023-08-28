import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { MdMenu, MdMenuOpen } from "react-icons/md";

const NavContainer = styled.div`
  width: 100%;
  height: 80px;
  color: ${props => props.theme.font};
  background-color: ${props => props.theme.bg};
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
`;

const Btn = styled.button``;
const HmbgBtn = styled(Btn)``;
const Ul = styled.ul``;
const Li = styled.li`
  margin: 1rem;
  border: none;
  transition: 0.3s;

  &::before,
  &::after {
    position: absolute;
    content: "";
    left: 0;
    width: 100%;
    height: 1px;
    background: ${props => props.theme.black};
    opacity: 0;
    transform: scaleX(0);
    transition: 0.4s ease-in-out;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  &:hover {
    color: ${props => props.theme.main2};
    background: transparent;

    &::before,
    &::after {
      opacity: 1;
      transform: scaleX(1.2);
    }
  }
`;

const HomeBtn = styled.div``;

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // 컴포넌트가 업데이트될 때 실행되는 부분
    // isOpen의 값이 변경될 때마다 이 효과가 발생합니다.
    // 이 곳에 메뉴가 열릴 때/닫힐 때의 추가적인 처리를 넣을 수 있습니다.
  }, [isOpen]);

  return (
    <>
      <NavContainer className="NavContainer">
        <HmbgBtn onClick={toggleMenu} className="HmbgBtn">
          {isOpen ? (
            <>
              <MdMenuOpen size={32} />
              <Ul>
                <Li>
                  <Link to={"/"}>홈</Link>
                </Li>
                <Li>
                  <Link to={"list"}>입양 공고 게시판</Link>
                </Li>
                <Li>
                  <Link to={"info"}>입양 관련 정보</Link>
                </Li>
              </Ul>
            </>
          ) : (
            <MdMenu size={32} />
          )}
        </HmbgBtn>
        <HomeBtn>
          <Link to={"/"}>묘연</Link>
        </HomeBtn>
        <div>회원가입</div>
      </NavContainer>
    </>
  );
};
export default Nav;
