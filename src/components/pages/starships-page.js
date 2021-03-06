import React from 'react';
import { StarshipList } from "../sw-components";
import { withRouter } from "react-router-dom";


const StarShipPage = ({ history }) => {
    return (
            <StarshipList onItemSelected={ (itemId) => {
                history.push(`/starships/${itemId}`);
            }} />
        );
}

export default withRouter(StarShipPage);