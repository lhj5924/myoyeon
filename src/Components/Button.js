import { styled } from "styled-components";

const BtnBox = styled.div`
  display: flex;
  /* 
  button {
    width: 200px;
    padding: 8px;
    background-color: ${props => props.theme.main};
    color: ${props => props.theme.white};
    font-weight: 600;
    box-shadow: ${props => props.theme.shadow};
    border: 1px solid ${props => props.theme.bg};
    border-radius: 16px;
    &:hover {
      cursor: pointer;
      background: radial-gradient(
        circle,
        ${props => props.theme.main} 50%,
        ${props => props.theme.sub2} 100%
      );
      box-shadow: none;
      transition: all 0.1s ease-in-out; //
    }
    &:focus {
      border: 1px dotted ${props => props.theme.bg};
    }
    &:active {
      background-color: pink;
    }
  } */

  box-sizing: border-box;
  font-size: 1.25rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  min-height: 2rem;
  background: #fff;

  button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
  }
  button.btn {
    font-weight: 600;
    color: #382b22;
    text-transform: uppercase;
    padding: 0.5em 1em;
    background: #fff0f0;
    border: 2px solid #b18597;
    border-radius: 0.75em;
    transition: transform 0.15s;
    transform-style: preserve-3d;
  }
  button.btn::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f9c4d2;
    border-radius: inherit;
    box-shadow:
      0 0 0 2px #b18597,
      0 0.625em 0 0 #ffe3e2;
    transform: translate3d(0, 0.75em, -1em);
    transition:
      transform 0.15s,
      box-shadow 0.15s;
  }

  button.btn:hover {
    background: #ffe9e9;
    transform: translate(0, 0.25em);
  }
  button.btn:hover::before {
    box-shadow:
      0 0 0 2px #b18597,
      0 0.5em 0 0 #ffe3e2;
    transform: translate3d(0, 0.5em, -1em);
  }
  button.btn:active {
    background: #ffe9e9;
    transform: translate(0em, 0.75em);
  }
  button.btn:active::before {
    box-shadow:
      0 0 0 2px #b18597,
      0 0 #ffe3e2;
    transform: translate3d(0, 0, -1em);
  }
`;

export default BtnBox;
