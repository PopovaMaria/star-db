import React, {Component} from 'react';

import "./item-details.css";

const Record = ({item, field, label}) => {
    return (
        <li className="list-group-item">{`${label}: ${item[field]}`}</li>
    );
};

export {
    Record
};

export default class ItemDetails extends Component {


    state = {
        item: null,
        image: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item)
                });
            });
    }

    render() {

        const {item, image} = this.state;

        if (!item) {
            return <span>Select an item from the list</span>
        }

        const { name } = item;

        return (
            <div className="item-details jumbotron">
                <img className="item-image"
                     src={image}/>
                <div>
                    <h1>{name}</h1>
                    <ul className="list-group list-group-flush">
                        { React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}