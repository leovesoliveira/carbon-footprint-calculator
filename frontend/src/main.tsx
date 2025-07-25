import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createTheme,
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import App from "./components/pages/app.tsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: teal,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
