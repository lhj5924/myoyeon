import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { uprCdAtom, sigunguAtom, orgCdAtom } from "../../Atom";
// import { useQuery } from "react-query";

function Search() {
  const uprCd = useRecoilValue(uprCdAtom);
  const orgCd = useRecoilValue(orgCdAtom);
  // beginDate, endDate 입력되면 URL 에 넣기... 상태로 관리?
  const beginDate = "";
  const endDate = "";
  const serviceKey = process.env.REACT_APP_ACCESS_KEY;

  // 시군구 목록 atom 설정
  const [sigungu, setSigungu] = useRecoilState(sigunguAtom);

  const queryParams = new URLSearchParams({
    ...(uprCd && { upr_cd: uprCd }),
    ...(orgCd && { org_cd: orgCd }),
    ...(beginDate && { bgnde: beginDate }),
    ...(endDate && { endde: endDate }),
    numOfRows: 10, // 한 페이지 결과 수
    pageNo: 1, // 페이지 번호
    _type: `json`, // &_type=json / 응답형태 (기본 xml 또는 json)
    // serviceKey, => serviseKey 가 toString 으로 변환되면 %가 인코딩되어서 URL 이 연결되지 않았다. 그래서 URLSearchParams 안에 넣어놓는 대신 URL 뒤에 그냥 붙여주는 걸로 바꿨다...
  });
  // const URL = `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido?${queryParams.toString()}`;

  const searchSido = async () => {
    // 1-1. 시도만 선택 후 검색 버튼을 누른 경우 유기동물 데이터 받아오기 => 이거 쿼리 파람에 다 넣어놓으면 검색 함수 하나로 몰아넣을 수 있겠다!!

    const URL = `${
      process.env.REACT_APP_API_URL
    }/abandonmentPublic?${queryParams.toString()}&serviceKey=${serviceKey}`;

    try {
      const res = await axios.get(URL);
      const data = res.data.response.body.items.item;
      console.log(data);
    } catch (error) {
      console.error(`Error : ${error}`);
    }

    // 1-2. 선택한 시도에 따른 시군구 목록 받아오기//
    // http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sigungu?upr_cd=6110000&serviceKey=인증키(URL Encode)
    // 1-3. 시군구 목록을 상태로 저장하고, list 에서 option 태그 안에 매핑하기.//

    const sigunguURL = `${
      process.env.REACT_APP_API_URL
    }/sigungu?${queryParams.toString()}&serviceKey=${serviceKey}`;

    try {
      const res = await axios.get(sigunguURL);
      const data = res.data.response.body.items.item;
      // value = orgCd, orgdownNm=orgdownNm
      setSigungu(data);
      console.log(`sigungu data :${data}`);
    } catch (error) {
      console.error(`Error : ${error}`);
    }
  };

  const searchShelter = () => {
    // 3. 보호소 조회

    // 3-1. 보호소 요청 메시지 명세 :
    // ?org_cd
    let orgCd = `&org_cd=3220000`; // 임시 코드

    // 3-2. 보호소 요청 메시지 예제 :
    // http://apis.data.go.kr/1543061/abandonmentPublicSrvc/shelter?upr_cd=6110000&org_cd=3220000&serviceKey=인증키(URL Encode)

    // let URL =
    //   process.env.REACT_APP_API_URL +
    //   "/shelter" +
    //   uprCd +
    //   orgCd +
    //   serviceKey +
    //   typeJson;

    const getShelterData = axios
      .get(URL)
      .then(res => console.log(res.data.response.body.items.item))
      // res.data.response.body.items.item 의 반환 값 예시:
      // [{uprCd: '6110000', orgCd: '6119999', orgdownNm: '가정보호'}, {uprCd: '6110000', orgCd: '3220000', orgdownNm: '강남구'}]
      .catch(err => console.log(err));
    console.log(URL);
  };

  const searchKind = () => {
    // 4. 품종 조회

    // 4-1. 축종코드
    let kindCd = `?up_kind_cd=417000`;

    // 4-2. 보호소 요청 메시지 예제 :
    // http://apis.data.go.kr/1543061/abandonmentPublicSrvc/kind?up_kind_cd=417000&serviceKey=인증키(URL Encode)

    // let URL =
    //   process.env.REACT_APP_API_URL + "/kind" + kindCd + serviceKey + typeJson;

    const getShelterData = axios
      .get(URL)
      .then(res => console.log(res.data.response.body.items.item))
      // res.data.response.body.items.item 의 반환 값 예시:
      // [{uprCd: '6110000', orgCd: '6119999', orgdownNm: '가정보호'}, {uprCd: '6110000', orgCd: '3220000', orgdownNm: '강남구'}]
      .catch(err => console.log(err));
    console.log(URL);
  };
  return { searchSido, searchShelter, searchKind };
}

export default Search;
