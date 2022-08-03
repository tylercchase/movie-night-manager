import { Link, Outlet } from "react-router-dom";

export default function Groups() {
    return (
        <div>
            <Link to="/groups/gamer">Gamer group</Link>
            <Outlet></Outlet>
        </div>
    )
}