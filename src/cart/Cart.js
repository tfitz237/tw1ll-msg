"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var firebase_1 = require("../tools/firebase");
var Cart_Item_1 = require("./Cart.Item");
var utilities_1 = require("../tools/utilities");
var user = 'xyz';
var Cart = (function (_super) {
    __extends(Cart, _super);
    function Cart(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { items: [] };
        firebase_1["default"].db.ref('cart/' + user + '/items').on('value', function (snap) {
            var ids = snap.val();
            ids.forEach(function (id) {
                firebase_1["default"].db.ref('item/' + id).on('value', function (sna) {
                    var item = sna.val();
                    item["key"] = sna.key;
                    var idx = utilities_1.findIndexByProp("key", item["key"], _this.state.items);
                    if (idx == -1) {
                        _this.state.items.push(item);
                    }
                    else {
                        _this.state.items[idx] = item;
                    }
                    _this.setState({ items: _this.state.items });
                });
            });
        });
        return _this;
    }
    Cart.prototype.count = function () {
        return this.state.items.filter(function (x) { return x.inStock; }).length;
    };
    Cart.prototype.render = function () {
        var items;
        if (this.state.items.length > 0) {
            items = this.state.items.map(function (item) {
                return (React.createElement(Cart_Item_1.CartItem, { key: item.key, id: item.key, name: item.name, price: item.price, inStock: item.inStock }));
            });
        }
        return (React.createElement("div", null,
            React.createElement("h1", null,
                "Cart: ",
                this.count()),
            items));
    };
    return Cart;
}(React.Component));
exports.__esModule = true;
exports["default"] = Cart;
