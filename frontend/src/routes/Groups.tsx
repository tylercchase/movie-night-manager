import { Link } from "react-router-dom";

import './Groups.css'
export default function Groups() {
    return (
        <div>
            <div className="row">
                Gamer Group
                <Link to="/groups/gamer/manage">Manage</Link>
                <Link to="/groups/gamer">Suggest</Link>
            </div>
        </div>
    )
}