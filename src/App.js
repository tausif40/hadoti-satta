import './App.css';
import Header from './component/NavBar/Header';
import TopNav from './component/NavBar/TopNav';
import FastResult from './component/FastResult/FastResult';
import ResultsTable from './component/LiveResult/ResultsTable';
import ResultChat from './component/ResultChat/ResultChat';
import Faq from './component/Faq/Faq';
import Footer from './component/Footer/Footer';
import AdminLogin from './component/Admin/Login/AdminLogin';
import UpdateResult from './component/Admin/UpdateResult/UpdateResult';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {


  return (
    <>

      <Toaster position="top-right" reverseOrder={false} />
      <Routes>

        <Route path="/" element={
          <>
            <TopNav />
            <Header />
            <FastResult />
            {/* <ResultsTable /> */}
            <ResultChat />
            <Faq />
            <Footer />
          </>
        } />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/update-result" element={
          <>
            <TopNav />
            <UpdateResult />
          </>
        } />
        {/* <Route path="/update-result" element={<UpdateResult />} /> */}
      </Routes>
    </>
  );
}

export default App;
