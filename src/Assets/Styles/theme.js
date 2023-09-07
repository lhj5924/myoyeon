// 공통 속성
const size = {
  mobile: "767px",
  tablet: ["768px", "1179px"],
  desktop: "1180px",
};
const mediaQuery = {
  mobile: `screen and (max-width: ${size.mobile})`,
  tablet: `screen and (min-width: ${size.tablet[0]}) and (max-width: ${size.tablet[1]})`,
  desktop: `screen and (min-width: ${size.desktop})`,
};
const color = {
  // https://colorhunt.co/palette/f6f1e9ffd93dff84004f200d
  main: `#00A19D`, // 초록
  main2: `#FFB344`, //주황
  sub: `#E05D5D`, //빨강
  sub2: `#116D6E`, // 딥그린
  bg: `#F6F1E9`, // 베이지
  // main: `#FFD93D`, // 노랑
  // main2: `#FF8400`, //주황
  // sub: `#4F200D`, //갈색
  // sub2: `#FFF89A`,
  // bg: `#F6F1E9`, // 베이지
  gray200: `#868e96`,
  gray100: `#adb5bd`,
  gray50: `#dee2e6`,
  black: `#000000`,
  blackOp50: `rgba(0, 0, 0, 50%)`,
  white: `#ffffff`,
  whiteOp50: `rgba(255, 255, 255, 50%)`,
  shadow: `2px 2px 5px rgba(0, 0, 0, 0.3)`,
  font: `#000000`,
};

const commonTheme = {
  mediaQuery,
  ...color,
};

// 개별 속성
const themes = {
  light: { ...commonTheme },
  dark: {
    ...commonTheme,
    // https://colorhunt.co/palette/001f3f0833580d63a5ffd717
    main: "#FFD717",
    main2: "#0D63A5",
    sub: "#083358",
    sub2: "#001F3F",
    bg: `#000`,
    font: `#FF8400`,
  },
};
// 사용법
// color : ${props => props.theme.main};
export default themes;
