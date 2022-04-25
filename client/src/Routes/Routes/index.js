import { Routes, Route } from "react-router-dom";
import { AuthRoute } from "../PrivateRoutes/Auth";
import PageLogin from "../../pages/login";

export const Router = function () {
    return (
        <Routes>
            <Route path="/" element={<PageLogin />} />
            <Route path="/home" element={<AuthRoute><PageLogin /></AuthRoute>} />
        </Routes>
    )
}