import './App.scss';
import { Header, Footer } from './components';
import { BrowserRouter } from 'react-router-dom';
import { SiteRoutes } from './config/Routes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SiteRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
