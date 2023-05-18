import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import Main from '../pages/Main';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { getItem } from '../utils/storage'

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}
function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/SignIn' element={<SignIn />} />

            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path='/main' element={<Main />} />
            </Route>
        </Routes>
    )
}

export default MainRoutes;