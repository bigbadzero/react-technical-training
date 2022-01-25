import "./App.css";
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import QuestionsPage from './pages/QuestionsPage';
import AllResultsPage from './pages/AllResultsPage';

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<QuestionsPage />}  />
        <Route path="/login" element={<AuthPage />} />
        <Route path='/results' element={<AllResultsPage />} />
      </Routes>
    </Layout>
  );
}
export default App;
