import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
    {
        title: "Dashboard",
        href: "/",
        icon: "bi bi-speedometer2",
    },
    {
        title: "Quản lý tài khoản",
        href: "/accounts",
        icon: "bi bi-people",
    },
    {
        title: "Quản lý phim",
        href: "/movies",
        icon: "bi bi-textarea-resize",
    },
    {
        title: "Quản lý diễn viên",
        href: "/actors",
        icon: "bi bi-people",
    },
    {
        title: "Quản lý thể loại",
        href: "/genres",
        icon: "bi bi-patch-check",
    },
    {
        title: "Quản lý dịch vụ",
        href: "/pricings",
        icon: "bi bi-hdd-stack",
    },
    {
        title: "Quản lý hoá đơn",
        href: "/userpricing",
        icon: "bi bi-card-text",
    },
    // {
    //     title: "Alert",
    //     href: "/alerts",
    //     icon: "bi bi-bell",
    // },
    // {
    //     title: "Badges",
    //     href: "/badges",
    //     icon: "bi bi-patch-check",
    // },
    // {
    //     title: "Buttons",
    //     href: "/buttons",
    //     icon: "bi bi-hdd-stack",
    // },
    // {
    //     title: "Cards",
    //     href: "/cards",
    //     icon: "bi bi-card-text",
    // },
    // {
    //     title: "Grid",
    //     href: "/grid",
    //     icon: "bi bi-columns",
    // },

    // {
    //     title: "Forms",
    //     href: "/forms",
    //     icon: "bi bi-textarea-resize",
    // },
    // {
    //     title: "Breadcrumbs",
    //     href: "/breadcrumbs",
    //     icon: "bi bi-link",
    // },
    // {
    //     title: "About",
    //     href: "/about",
    //     icon: "bi bi-layout-split",
    // },
];

const Sidebar = () => {
    const showMobilemenu = () => {
        document.getElementById("sidebarArea").classList.toggle("showSidebar");
    };
    let location = useLocation();

    return (
        <div className="p-3">
            <div className="d-flex align-items-center">
                <span className="ms-auto d-lg-none">
                    <Button
                        close
                        size="sm"
                        className="ms-auto d-lg-none"
                        onClick={() => showMobilemenu()}
                    ></Button>
                </span>
            </div>
            <div className="pt-4 mt-2">
                <Nav vertical className="sidebarNav">
                    {navigation.map((navi, index) => (
                        <NavItem key={index} className="sidenav-bg">
                            <Link
                                to={navi.href}
                                className={
                                    location.pathname === navi.href
                                        ? "text-primary nav-link py-3"
                                        : "nav-link text-secondary py-3"
                                }
                            >
                                <i className={navi.icon}></i>
                                <span className="ms-3 d-inline-block">
                                    {navi.title}
                                </span>
                            </Link>
                        </NavItem>
                    ))}
                </Nav>
            </div>
        </div>
    );
};

export default Sidebar;
