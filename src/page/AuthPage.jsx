import Layout from "components/Layout/Layout";
import { Outlet } from "react-router-dom";

function AuthPage() {
    return (<>
        <Layout />
        <Outlet />
    </>)
}

export default AuthPage