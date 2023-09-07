import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  uprCdAtom,
  orgCdAtom,
  beginDateAtom,
  endDateAtom,
  pageNumAtom,
  petListAtom,
  upkindAtom,
  careAtom,
} from "../../Atom";

function Search() {
  const uprCd = useRecoilValue(uprCdAtom);
  const orgCd = useRecoilValue(orgCdAtom);
  const care = useRecoilValue(careAtom);
  const pageNum = useRecoilValue(pageNumAtom);
  const upkind = useRecoilValue(upkindAtom);
  const beginDate = useRecoilValue(beginDateAtom);
  const endDate = useRecoilValue(endDateAtom);
  const serviceKey = process.env.REACT_APP_ACCESS_KEY;

  // 시군구 목록 atom 설정
  const [petList, setPetList] = useRecoilState(petListAtom);
  // const [sigungu, setSigungu] = useRecoilState(sigunguAtom);
  // const [shelter, setShelter] = useRecoilState(shelterAtom);

  const queryParams = {
    ...(uprCd && { upr_cd: uprCd }),
    ...(orgCd && { org_cd: orgCd }),
    ...(beginDate && { bgnde: beginDate.replaceAll("-", "") }),
    ...(endDate && { endde: endDate.replaceAll("-", "") }),
    numOfRows: 10,
    pageNo: pageNum,
    _type: "json",
    ...(care && { care_reg_no: care }),
    ...(upkind && { upkind: upkind }),
    state: "protect", // 공고 상태 - 보호중
  };

  const generateURL = path => {
    return `${
      process.env.REACT_APP_API_URL
    }${path}?serviceKey=${serviceKey}&${new URLSearchParams(
      queryParams,
    ).toString()}`;
  };

  const fetchData = async (url, dataSetter) => {
    try {
      const res = await axios.get(url);
      const data = res.data.response.body.items.item;
      // data 가 빈 배열이 아닌 경우 포함 (&& data.length > 0)
      data && data.length > 0 && dataSetter(data);

      return dataSetter(data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const searchAll = async () => {
    const petListURL = generateURL("/abandonmentPublic");
    await fetchData(petListURL, setPetList);
  };
  return { searchAll, generateURL, fetchData };
}

export default Search;
