import { styled } from "styled-components";

const Cards = props => {
  // console.log(props.el);
  const neuterCheck = neuteCd => {
    if (neuteCd === "U") {
      return <span>미상</span>;
    } else if (neuteCd === "Y") {
      return <span>완료</span>;
    } else if (neuteCd === "N") {
      return <span>미완료</span>;
    }
  };
  return (
    <>
      <Card>
        <ImgBox className="ImgBox">
          <Img src={props.el.popfile} alt="Thumbnail" />
        </ImgBox>
        <InfoBox className="InfoBox">
          <TextBox className="TextBox">
            <span>공고상태 : </span>
            <span>{props.el.processState}</span>
          </TextBox>
          <TextBox>
            <span>공고번호 : </span>
            <span>{props.el.noticeNo}</span>
          </TextBox>
          <TextBox>
            <span>접수일자 : </span>
            <span>{props.el.happenDt}</span>
          </TextBox>
          <TextBox>
            <span>공고기간 : </span>
            <span>
              {props.el.noticeSdt}~{props.el.noticeEdt}
            </span>
          </TextBox>
          <TextBox>
            <span>축종 : </span>
            <span>{props.el.kindCd}</span>
          </TextBox>
          <TextBox>
            <span>성별 : </span>
            <span>{props.el.sexCd}</span>
          </TextBox>
          <TextBox>
            <span>나이 : </span>
            <span>{props.el.age}</span>
          </TextBox>
          <TextBox>
            <span>중성화여부 : </span>
            <span>{neuterCheck(props.el.neuterYn)}</span>
          </TextBox>
          <TextBox>
            <span>특징 : </span>
            <span>{props.el.specialMark}</span>
          </TextBox>
        </InfoBox>
      </Card>
    </>
  );
};
export default Cards;

const Card = styled.section`
  width: 250px;
  height: 400px;
  background-color: azure;
  border: 1px dotted green;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Box = styled.div`
  width: 100%;
  border: 1px dashed pink;
  margin: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ImgBox = styled(Box)`
  height: 50%;
  width: 100%;
  overflow: hidden; // 이미지가 확대되었을때 상위 요소를 벗어나지 않으려면?
  :hover {
    transform: scale(1.05);
    transition: all.3s ease-in-out;
  }
`;
const Img = styled.img`
  max-width: 80%;
  max-height: 90%;
  background: center no-repeat;
  background-size: contain;
`;
const InfoBox = styled(Box)`
  height: 50%;
  font-size: 0.75rem;
`;
const TextBox = styled.div`
  overflow: hidden;
`;
