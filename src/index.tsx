import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import App from './app';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/404';
import ErrorBoundary from './components/ErrorBoundary';
import PokeDetail from './components/PokeDetail';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="detail/:detail" element={<PokeDetail />} />
        </Route>
        <Route path="page/:page" element={<App />}>
          <Route path="detail/:detail" element={<PokeDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);
