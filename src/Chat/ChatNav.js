"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var firebase_1 = require("../tools/firebase");
var mdl_1 = require("../tools/mdl");
var NewChatDialog_1 = require("./NewChatDialog");
var Model_1 = require("./Model");
var ChatNav = (function (_super) {
    __extends(ChatNav, _super);
    function ChatNav(props) {
        var _this = _super.call(this, props) || this;
        _this.updateContent = function (e) {
            _this.props.updateContent(e.currentTarget.id);
            mdl_1["default"].toggleDrawer();
        };
        _this.newChatWindow = function () {
            _this.newChatDialog.newChat().then(function () {
                Model_1["default"].updateRoomList(_this);
            });
        };
        _this.state = {
            rooms: []
        };
        return _this;
    }
    ChatNav.prototype.componentWillReceiveProps = function (newProps) {
        if (this.props.user != newProps.user) {
            Model_1["default"].updateRoomList(this);
        }
    };
    ChatNav.prototype.componentWillMount = function () {
        if (firebase_1["default"].user())
            Model_1["default"].updateRoomList(this);
    };
    ChatNav.prototype.render = function () {
        var _this = this;
        var list = Model_1["default"].createRoomList(this);
        return (React.createElement("div", { className: "mdl-layout__drawer" },
            React.createElement(NewChatDialog_1["default"], { ref: function (r) { return _this.newChatDialog = r; } }),
            React.createElement("span", { className: "mdl-layout-title" }, this.props.title),
            React.createElement("a", { className: "mdl-button mdl-buton--colored mdl-js-button mdl-js-ripple-effect", onClick: this.newChatWindow }, "+ New Chat"),
            React.createElement("nav", { className: "mdl-navigation" },
                React.createElement("ul", { className: "mdl-list" }, list))));
    };
    return ChatNav;
}(React.Component));
exports.ChatNav = ChatNav;
