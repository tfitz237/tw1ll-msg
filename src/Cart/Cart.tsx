import * as React from "react";
import fire from "../tools/firebase";
import {IItem} from "./Item";
import {CartItem} from "./Cart.Item";
import {findIndexByProp} from "../tools/utilities";

const user = 'xyz';

interface CartStates {
    items: IItem[]
}

class Cart extends React.Component<any,  CartStates> {
    constructor(props) {
        super(props);
        this.state = { items: []};
        fire.db.ref('cart/'+user+'/items').on('value', (snap) => {
            let ids = snap.val();
            ids.forEach(id => {
                fire.db.ref('item/'+id).on('value', (sna) =>{
                    let item = sna.val();
                    item["key"] = sna.key;
                    let idx = findIndexByProp("key", item["key"], this.state.items);
                     if (idx == -1) {
                         this.state.items.push(item);
                     } else {
                         this.state.items[idx] = item;
                     }
                     this.setState({items: this.state.items});
                });
            });
        });

    }

    count() {
        return this.state.items.filter(x => x.inStock).length;
    }


    render() {
        let items;
        if(this.state.items.length > 0) {
            items = this.state.items.map((item) => {
                return (<CartItem
                            key={item.key}
                            id={item.key}
                            name={item.name}
                            price={item.price}
                            inStock={item.inStock}
                />);
            });
        }
        return (
            <div>
                <h1>Cart: {this.count()}</h1>
                {items}
            </div>
        );
    }
}


export default Cart;