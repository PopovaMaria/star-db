import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./random-planet.css";

import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

    static defaultProps = {
        updateInterval: 2000
    };

    static propTypes = {
        updateInterval: PropTypes.number
    };

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };


    componentDidMount() {
        const {updateInterval} = this.props;
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, updateInterval);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    };


    onPlanetLoaded = (planet) => {
        this.setState({planet, loading: false})
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    };

    updatePlanet = () => {
        const id = Math.floor(Math.random()*17) + 2;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }

    render() {

        const { planet, loading, error } = this.state;

        const hasData = !(loading || error)

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <div className="spinner"><Spinner/></div> : null;
        const content = hasData ? <PlanetView planet={planet}/> : null;

        return(
            <div className="random-planet jumbotron div-col-md-2">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}



const PlanetView = ({planet}) => {

    const {id, name, population, rotationPeriod, diameter} = planet;

    return (
        <React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
            <div>
                <h1>{name}</h1>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"></li>
                    <li className="list-group-item">Population {population}</li>
                    <li className="list-group-item">Rotation Period {rotationPeriod}</li>
                    <li className="list-group-item">Diameter {diameter}</li>
                </ul>
            </div>
        </React.Fragment>
    );
};