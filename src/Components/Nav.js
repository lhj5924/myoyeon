import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { MdMenu, MdMenuOpen } from "react-icons/md";

const NavContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff89a;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const HmbgBtn = styled.button`
  width: 48px;
  height: 48px;
  background-color: #086e7d;
`;
const Ul = styled.ul`
  background-color: #fff;
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
                <li>
                  <Link to={"/"}>홈</Link>
                </li>
                <li>
                  <Link to={"list"}>입양 공고 게시판</Link>
                </li>
                <li>
                  <Link to={"info"}>입양 관련 정보</Link>
                </li>
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
