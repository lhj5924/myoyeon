import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  uprCdAtom,
  sigunguAtom,
  orgCdAtom,
  pageNumAtom,
  shelterAtom,
  petListAtom,
  upkindAtom,
  careAtom,
} from "../../Atom";
// import { useQuery } from "react-query";

function Search() {
  const uprCd = useRecoilValue(uprCdAtom);
  const orgCd = useRecoilValue(orgCdAtom);
  const care = useRecoilValue(careAtom);
  const pageNum = useRecoilValue(pageNumAtom);
  // 축종 코드 선택 upkind
  const upkind = useRecoilValue(upkindAtom);
  // beginDate, endDate 입력되면 URL 에 넣기... 상태로 관리?
  const beginDate = "";
  const endDate = "";
  const serviceKey = process.env.REACT_APP_ACCESS_KEY;

  // 시군구 목록 atom 설정
  const [sigungu, setSigungu] = useRecoilState(sigunguAtom);
  const [shelter, setShelter] = useRecoilState(shelterAtom);
  const [petList, setPetList] = useRecoilState(petListAtom);

  const queryParams = new URLSearchParams({
    ...(uprCd && { upr_cd: uprCd }),
    ...(orgCd && { org_cd: orgCd }),
    ...(beginDate && { bgnde: beginDate }),
    ...(endDate && { endde: endDate }),
    numOfRows: 9, // 한 페이지 결과 수
    ...(pageNum && { pageNo: pageNum }), // 페이지 번호
    _type: `json`, // &_type=json / 응답형태 (기본 xml 또는 json)
    // serviceKey, => serviseKey 가 toString 으로 변환되면 %가 인코딩되어서 URL 이 연결되지 않았다. 그래서 URLSearchParams 안에 넣어놓는 대신 URL 뒤에 그냥 붙여주는 걸로 바꿨다...
    ...(care && { care_reg_no: care }), // 페이지 번호
    ...(upkind && { upkind: upkind }), // 축종코드
  });

  const searchAll = async () => {
    // 1. 시도 코드 선택 안한 경우 전체 리스트 불러오기
    const URL = `${
      process.env.REACT_APP_API_URL
    }/abandonmentPublic?${queryParams.toString()}&serviceKey=${serviceKey}`;

    try {
      const res = await axios.get(URL);
      const data = res.data.response.body.items.item;
      setPetList(data);
      console.log(`PetList : &{data}`);
    } catch (error) {
      console.error(`Error : ${error}`);
    }

    // 2. 시도 코드만 있는 경우 시군구 리스트 불러오기
    const sigunguURL = `${
      process.env.REACT_APP_API_URL
    }/sigungu?${queryParams.toString()}&serviceKey=${serviceKey}`;

    try {
      const res = await axios.get(sigunguURL);
      const data = res.data.response.body.items.item;
      // value = orgCd, orgdownNm=orgdownNm
      setSigungu(data);
      setPetList(data);
      console.log(`sigungu data :${data}`);
      console.log(data);
    } catch (error) {
      console.error(`Error : ${error}`);
    }

    // 3. 시도코드, 시군구 코드가 있는 경우 보호소 번호 불러오기
    const shelterURL = `${
      process.env.REACT_APP_API_URL
    }/shelter?${queryParams.toString()}&serviceKey=${serviceKey}`;

    console.log(`orgCd : ${orgCd}`);

    try {
      const res = await axios.get(shelterURL);
      const data = res.data.response.body.items.item;
      // value = orgCd, orgdownNm=orgdownNm
      setShelter(data);
      setPetList(data);
      console.log(`shelter data :${data}`);
      console.log(data);
    } catch (error) {
      console.error(`Error : ${error}`);
    }
  };
  return { searchAll };
}

export default Search;
