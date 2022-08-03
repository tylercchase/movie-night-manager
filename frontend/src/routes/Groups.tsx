import { Link } from "react-router-dom";

import './Groups.css'
export default function Groups() {
    return (
        <div>
            <div className="row">
                <span>Gamer Group</span>
                <Link to="/groups/gamer/manage" className="link">Manage</Link>
                <Link to="/groups/gamer" className="link">Suggest</Link>
            </div>
        </div>
    )
}