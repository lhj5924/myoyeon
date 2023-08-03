import axios from "axios";
import { useQuery } from "react-query";

const API_URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc";
const ACCESS_KEY =
  "bDG5HWWHggalcRAgMF%2Bic%2FZahmi3OCFvyjCJATvWkE7al%2F3B1QuiG%2BV%2BGDzQVEur9ehW5CK%2B4HHqjNCNvcMieA%3D%3D";
// &serviceKey=${ACCESS_KEY} / 인증키 (URL Encode)
const serviceKey = `&serviceKey=${ACCESS_KEY}`;
// &numOfRows=10 / 한페이지 결과 수
let rowNum = 100;
// &pageNo=1 / 페이지 번호
let pageNo = 1;
// &_type=json / 응답형태 (기본 xml 또는 json)
const typeJson = `&_type=json`;

// 1. 시도 조회 => 선택된 uprCd 상태 변경해서 시군구 검색에 넘겨주기
let searchLocation = "/sido";

const searchSido = () => {
  // 1-1. 시도 요청 메시지 명세 :

  // 1-2. 시도 요청 메시지 예제 :
  // http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido?numOfRows=3&pageNo=1&serviceKey=인증키(URL Encode)

  let URL =
    API_URL +
    searchLocation +
    `?numOfRows=${rowNum}` +
    `&pageNo=${pageNo}` +
    serviceKey +
    typeJson;

  const getData = axios
    .get(URL)
    .then(res => console.log(res.data.response.body.items.item))
    // res.data.response.body.items.item 의 반환 값 예시:
    // [{orgCd: '6110000', orgdownNm: '서울특별시'}, {orgCd: '6260000', orgdownNm: '부산광역시'}, ... ]
    .catch(err => console.log(err));
  console.log(URL);
};

const searchSigungu = () => {
  // 2. 시군구 조회
  searchLocation = "/sigungu";

  // 2-1. 시도 요청 메시지 명세 :
  // ?upr_cd=
  let uprCd = `?upr_cd=6110000`; // 임시 서울 코드

  // 2-2. 시도 요청 메시지 예제 :
  // http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sigungu?upr_cd=6110000&serviceKey=인증키(URL Encode)

  let URL = API_URL + searchLocation + uprCd + typeJson;

  const getSigunguData = axios
    .get(URL)
    .then(res => console.log(res.data.response.body.items.item))
    // res.data.response.body.items.item 의 반환 값 예시:
    // [{uprCd: '6110000', orgCd: '6119999', orgdownNm: '가정보호'}, {uprCd: '6110000', orgCd: '3220000', orgdownNm: '강남구'}]
    .catch(err => console.log(err));
  console.log(URL);
};

export { searchSido, searchSigungu };
