import { lazy } from "react";
import { Navigate } from "react-router-dom";
import authService from "../service/auth-service";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const Movies = lazy(() => import("../views/ui/Movies"));
const Actor = lazy(() => import("../views/ui/Actor.js"));
const Pricing = lazy(() => import("../views/ui/Pricing.js"));
const Genre = lazy(() => import("../views/ui/Genre.js"));
const UserPricing = lazy(() => import("../views/ui/UserPricing.js"));
const Login = lazy(() => import("../views/ui/Login.js"));

/*****Routes******/

const ThemeRoutes = [
    {
        path: "/login",
        exact: true,
        element: <Login />,
    },
    {
        path: "/",
        element: <FullLayout />,
        children: [
            { path: "/", exact: true, element: <Starter /> },
            { path: "/about", exact: true, element: <About /> },
            { path: "/alerts", exact: true, element: <Alerts /> },
            { path: "/badges", exact: true, element: <Badges /> },
            { path: "/buttons", exact: true, element: <Buttons /> },
            { path: "/cards", exact: true, element: <Cards /> },
            { path: "/grid", exact: true, element: <Grid /> },
            { path: "/accounts", exact: true, element: <Tables /> },
            { path: "/movies", exact: true, element: <Movies /> },
            { path: "/forms", exact: true, element: <Forms /> },
            { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
            { path: "/actors", exact: true, element: <Actor /> },
            { path: "/pricings", exact: true, element: <Pricing /> },
            { path: "/userpricing", exact: true, element: <UserPricing /> },
            { path: "/genres", exact: true, element: <Genre /> },
        ],
    },
];

export default ThemeRoutes;
