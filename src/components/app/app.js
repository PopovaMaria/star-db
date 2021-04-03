import React, { Component } from 'react';
import Header from "../header";
import RandomPlanet from "../random-planet";
import {SwapiServiceProvider} from '../swapi-service-context';
import {PeoplePage, StarshipsPage, PlanetsPage} from "../pages";
import './app.css';
import SwapiService from "../../services/swapi-service";

import { BrowserRouter as Router, Route } from "react-router-dom";
import StarshipDetails from "../sw-components/starship-details";


export default class App extends Component {

    swapiService = new SwapiService();

    render() {

        return(
            <div>
                <SwapiServiceProvider value={this.swapiService}>
                    <Router>
                    <Header />
                    <RandomPlanet />
                    <Route path="/" render={()=><h2>Welcome to StarDB</h2>}
                    exact={true} />
                    <Route path="/people" component={PeoplePage} />
                    <Route path="/planets" component={PlanetsPage} />
                    <Route path="/starships" exact={true} component={StarshipsPage} />
                    <Route path="/starships/:id"
                           render={({ match }) => {
                               const {id} = match.params;
                               return <StarshipDetails itemId={id} />
                           }} />
                    </Router>
                </SwapiServiceProvider>
            </div>
        );
    }
};
