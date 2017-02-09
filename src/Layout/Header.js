"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var firebase_1 = require("../tools/firebase");
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        return (React.createElement("header", { className: "mdl-layout__header" },
            React.createElement("div", { className: "mdl-layout__header-row" },
                React.createElement("div", { className: "mdl-layout-icon" }),
                React.createElement("span", { className: "mdl-layout-title" }, this.props.title),
                React.createElement("div", { className: "mdl-divider" }, this.props.user != null &&
                    React.createElement("button", { className: "mdl-button mdl-js-button mdl-js-ripple-effect", onClick: firebase_1["default"].sign.out },
                        React.createElement("i", { className: "material-icons" }, "exit_to_app"))))));
    };
    return Header;
}(React.Component));
exports.__esModule = true;
exports["default"] = Header;
