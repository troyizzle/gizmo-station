import "./App.css";
import Layout from "./components/Layout";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { SettingProvider } from "./context/SettingContext";
import { ThemeProvider } from "./context/ThemeContext";
import { WidgetProvider } from "./context/WidgetContext";

function App() {
  return (
    <ThemeProvider>
      <SettingProvider>
        <Layout>
          <WidgetProvider>
            <Navbar />
            <Main />
          </WidgetProvider>
        </Layout>
      </SettingProvider>
    </ThemeProvider>
  );
}

export default App;
