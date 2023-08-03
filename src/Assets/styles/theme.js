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
  main: `#1A5F7A`,
  main2: `#086E7D`,
  sub: `#FFC900`,
  sub2: `#FFF89A`,
  bg: `#ffffff`,
  gray200: `#868e96`,
  gray100: `#adb5bd`,
  gray50: `#dee2e6`,
  black: `#000000`,
  blackOp50: `rgba(0, 0, 0, 50%)`,
  white: `#ffffff`,
  whiteOp50: `rgba(255, 255, 255, 50%)`,
  shadow: `2px 2px 5px rgba(0, 0, 0, 0.3)`,
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
    main: "#001F3F",
    main2: "#083358",
    sub: "#4A3F35",
    sub2: "#4A3F35",
    bg: `#000`,
  },
};
export default themes;
