import './App.css';
import {Suspense, lazy} from "react";
import {Router} from "./components/Router";
import {Route} from "./components/Route";
import HomePage from './pages/Home.jsx'
const LazyCommandPage = lazy(() => import('./pages/Command.jsx'))
const LazyMapArtPage = lazy(() => import('./pages/MapArt.jsx'))


function Main() {
  return (
      <div>test</div>
  );
}

const routes = [
    {
        path: '/commands',
        Component: LazyCommandPage
    },
    {
        path: '/',
        Component: HomePage
    }
]

function App() {
    return (
        <Suspense fallback={<h1>Cargando...</h1>}>
            <Router >
                <Route path='/mapArt/' Component={LazyMapArtPage}/>
                <Route path='/commands/' Component={LazyCommandPage} />
                <Route path='/' Component={HomePage} />
            </Router>
        </Suspense>
    );
}


export default App;
