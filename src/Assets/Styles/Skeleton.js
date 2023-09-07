import { styled } from "styled-components";
const Skeleton = () => {
  return <SkeletonBox />;
};

const SkeletonBox = styled.div`
  width: 100%;
  height: 100%;
  animation: bg 2s infinite ease-in-out;
  background-color: ${props => props.theme.gray50};
  @keyframes bg {
    50% {
      opacity: 0.5;
    }
  }
`;
export default Skeleton;
