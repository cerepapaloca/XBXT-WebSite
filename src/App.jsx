import './App.css';
import {Suspense, lazy} from "react";
import {Router} from "./components/Router";
import {Route} from "./components/Route";
import HomePage from './pages/Home.jsx'

const LazyCommandPage = lazy(() => import('./pages/Command.jsx'))
const LazyMapArtPage = lazy(() => import('./pages/MapArt.jsx'))
const LazySingleMapArtPage = lazy(() => import('./pages/SingleMapArt.jsx'))

const routes = [
    {
        path: '/mapArt/id/:uuid',
        Component: LazySingleMapArtPage
    }
]

function App() {
    return (
        <Suspense fallback={
            <div className="centerContent Transparent">
                <p className="loading-text">Cargando</p>
            </div>}>
            <Router routes={routes}>
                <Route path='/mapArt/' Component={LazyMapArtPage}/>
                <Route path='/commands/' Component={LazyCommandPage} />
                <Route path='/mapArt/id/:uuid' Component={LazySingleMapArtPage}/>
                <Route path='/' Component={HomePage}/>
            </Router>
        </Suspense>
    );
}


export default App;
