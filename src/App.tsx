import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { Portal } from "@stores/context/Portal";

import { Routes } from "./pages/Routes";
import theme from "./theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Portal.Provider>
          <Routes />
        </Portal.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
