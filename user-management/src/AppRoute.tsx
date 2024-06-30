import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "./layout/Layout.tsx";
import {LoginPage} from "./page/LoginPage.tsx";
import {DashboardPage} from "./page/DashboardPage.tsx";
import {AuthCheck} from "./auth/AuthCheck.tsx";
import Unauthorized from "./page/Unauthorized.tsx";

const AppRoutes = () => {

    return (

        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/" element={<Layout/>}>
                <Route element={<AuthCheck allowedRoles={['user','admin']}/> }>
                    <Route path="/dashboard" element={<DashboardPage />}/>
                </Route>
                <Route element={<AuthCheck allowedRoles={['admin']}/> }>
                    {/*<Route path="/admin" element={<AdminPage />}/>*/}
                </Route>
                <Route path="/unauthorized" element={<Unauthorized/> }/>
                <Route path="/" element={<Navigate to="/dashboard" /> }/>
                <Route path="*" element={<Navigate to="/dashboard" /> }/>
            </Route>

        </Routes>
    );
};

export default AppRoutes;
