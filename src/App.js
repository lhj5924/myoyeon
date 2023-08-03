import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { styled, createGlobalStyle, ThemeProvider } from "styled-components";
import { Main, List, Info } from "./Pages/index";
import theme from "./Assets/Styles/theme";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// * css reset 설정
const GlobalStyle = createGlobalStyle`
	/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
* { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	line-height: 1;

  min-height: 100vh;
  min-height: 100dvh;
  padding-top: 80px; // 헤더 높이만큼 빼주기...다른 방법은 없나?
  display: flex;
  transition: background-color 0.5s ease;
  background-color: ${props => props.theme.bg};
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
ol, ul {
	list-style: none;
}
a {
  text-decoration: none;
  &:visited{
    color: inherit;
  }
  &:hover{
    text-decoration: underline;
  }
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
`;
const StyledApp = styled.div`
  text-align: center;
`;

function App() {
  const [selectedTheme, setSelectedTheme] = useState(theme.light);

  const themeSelector = () => {
    selectedTheme === theme.light
      ? setSelectedTheme(theme.dark)
      : setSelectedTheme(theme.light);
    console.log(selectedTheme.main);
  };

  return (
    <>
      <ThemeProvider theme={selectedTheme}>
        <GlobalStyle />
        <StyledApp>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route
                path="/"
                element={<Main themeSelector={themeSelector} />}
              />
              <Route path="/list" element={<List />} />
              <Route path="/info" element={<Info />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </StyledApp>
      </ThemeProvider>
    </>
  );
}

export default App;
