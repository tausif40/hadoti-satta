import './App.css';
import Header from './component/NavBar/Header';
import TopNav from './component/NavBar/TopNav';
import FastResult from './component/FastResult/FastResult';
import ResultsTable from './component/LiveResult/ResultsTable';
import StarLineResult from './component/StarLineResult/StarLineResult';
import Faq from './component/Faq/Faq';
import Footer from './component/Footer/Footer';

function App() {
  return (
    <>
      <TopNav />
      <Header />
      <FastResult />
      <ResultsTable />
      <StarLineResult />
      <Faq />
      <Footer />
    </>
  );
}

export default App;
