import { Router } from './routes/Router';
import { BrowserRouter } from 'react-router-dom';
// Global styles imported in main.tsx

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
