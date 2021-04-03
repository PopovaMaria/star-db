import React from 'react';
import { Link } from "react-router-dom";

import './header.css';

const Header = () => {
    return (
    <div className="header d-flex">
        <h1>
            <Link to="/">Star DB</Link>
        </h1>
        <ul className="d-flex">
            <li>
                <Link to="/people">People</Link>
            </li>
            <li><Link to="/planets">Planets</Link></li>
            <li><Link to="/starships">Starships</Link></li>
        </ul>
    </div>
    );
};

export default Header;