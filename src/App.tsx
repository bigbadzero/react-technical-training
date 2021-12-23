import "./App.css";
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import QuestionsPage from './pages/QuestionsPage';
import UserBasicInfoPage from './pages/UserBasicInfoPage';

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<UserBasicInfoPage />}  />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
      </Routes>
    </Layout>
  );
}
export default App;
