"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var RoomLink = (function (_super) {
    __extends(RoomLink, _super);
    function RoomLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomLink.prototype.render = function () {
        return (React.createElement("li", { className: "mdl-list__item mdl-list__item--three-line", id: this.props.roomId, key: this.props.roomId, onClick: this.props.updateContent },
            React.createElement("span", { className: "mdl-list__item-primary-content" },
                React.createElement("i", { className: "material-icons mdl-list__item-avatar" }, "person"),
                React.createElement("span", null, this.props.topic),
                React.createElement("span", { className: "mdl-list__item-text-body" }, this.props.lastMessage)),
            React.createElement("span", { className: "mdl-list__item-secondary-content" },
                React.createElement("a", { className: "mdl-list__item-secondary-action", href: "#" },
                    React.createElement("i", { className: "material-icons" }, "star")))));
    };
    return RoomLink;
}(React.Component));
exports.__esModule = true;
exports["default"] = RoomLink;
