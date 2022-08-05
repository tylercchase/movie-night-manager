import { Link } from "react-router-dom";

import './Groups.css'
export default function Groups() {
    return (
        <div>
            <div className="row">
                <span>Gamers Group</span>
                <Link to="/groups/gamers/manage" className="link">Manage</Link>
                <Link to="/groups/gamers" className="link">Suggest</Link>
            </div>
        </div>
    )
}