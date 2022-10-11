import "./App.css";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Widget from "./components/Widget";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Navbar />
        <Widget />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
