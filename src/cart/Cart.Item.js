"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var firebase_1 = require("../tools/firebase");
var user = 'xyz';
var CartItem = (function (_super) {
    __extends(CartItem, _super);
    function CartItem(props) {
        var _this = _super.call(this, props) || this;
        _this.state = _this.props;
        _this.remove = _this.remove.bind(_this);
        return _this;
    }
    CartItem.prototype.remove = function () {
        firebase_1["default"].db.ref('cart/' + user + '/items/' + this.state.id).remove();
        return false;
    };
    CartItem.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState(nextProps);
    };
    CartItem.prototype.render = function () {
        if (this.state.inStock)
            return (React.createElement("li", null,
                React.createElement("h4", null, this.state.name),
                React.createElement("span", null, this.state.price),
                React.createElement("a", { onClick: this.remove, href: "#" }, "X")));
        else
            return null;
    };
    return CartItem;
}(React.Component));
exports.CartItem = CartItem;
