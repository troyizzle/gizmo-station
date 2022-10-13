import "./App.css";
import Layout from "./components/Layout";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import { WidgetProvider } from "./context/WidgetContext";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <WidgetProvider>
          <Navbar />
          <Main />
        </WidgetProvider>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
