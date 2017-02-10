import * as React from "react";
import {IItem} from "./Item";
import fire from "../utilities/firebase";

const user = 'xyz';

class CartItem extends React.Component<IItem, IItem> {
    constructor(props) {
        super(props);

        this.state = this.props;
        this.remove = this.remove.bind(this);
    }

    remove() {
        fire.db.ref('cart/'+user+'/items/'+this.state.id).remove();
        return false;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {
            if (this.state.inStock)
                return (
                    <li>
                        <h4>{this.state.name}</h4>
                        <span>{this.state.price}</span>
                        <a onClick={this.remove} href="#">X</a>
                    </li>

                );
            else return null;

    }
}

export {CartItem};