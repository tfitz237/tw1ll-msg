"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ChatNav_1 = require("./ChatNav");
var ChatContent_1 = require("./ChatContent");
var LoginBox_1 = require("../LoginBox");
var firebase_1 = require("../tools/firebase");
var Chat = (function (_super) {
    __extends(Chat, _super);
    function Chat(props) {
        var _this = _super.call(this, props) || this;
        _this.updateContent = function (id) {
            _this.setState({ roomId: id });
        };
        _this.state = { title: 'Chat', user: firebase_1["default"].user() };
        firebase_1["default"].auth.onAuthStateChanged(function (user) {
            _this.setState({ user: user });
        });
        return _this;
    }
    Chat.prototype.render = function () {
        var header = (React.createElement("header", { className: "mdl-layout__header" },
            React.createElement("div", { className: "mdl-layout__header-row" },
                React.createElement("div", { className: "mdl-layout-icon" }),
                React.createElement("span", { className: "mdl-layout-title" }, this.state.title),
                React.createElement("div", { className: "mdl-divider" }, this.state.user != null && React.createElement("button", { className: "mdl-button mdl-js-button mdl-js-ripple-effect", onClick: firebase_1["default"].sign.out },
                    React.createElement("i", { className: "material-icons" }, "exit_to_app"))))));
        return (React.createElement("div", { className: "mdl-layout mdl-js-layout mdl-layout--fixed-header" },
            header,
            React.createElement(ChatNav_1["default"], { title: this.state.title, user: this.state.user, updateContent: this.updateContent }),
            React.createElement("main", { className: "mdl-layout__content" },
                React.createElement("div", { className: "page-content" }, this.state.user ? (React.createElement(ChatContent_1["default"], { roomId: this.state.roomId })) : (React.createElement(LoginBox_1["default"], null))))));
    };
    return Chat;
}(React.Component));
exports.__esModule = true;
exports["default"] = Chat;
