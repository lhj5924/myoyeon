import { styled } from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
`;

const Footer = () => {
  return (
    <>
      <FooterContainer className="FooterContainer">
        <p>footer</p>
      </FooterContainer>
    </>
  );
};
export default Footer;
