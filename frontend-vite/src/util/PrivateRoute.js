import {useSelector} from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const isLoggedIn = useSelector((state) => !!state.auth.token);

    return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}