"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var firebase_1 = require("../tools/firebase");
var utilities_1 = require("../tools/utilities");
var NewChatDialog_1 = require("./NewChatDialog");
var ChatNav = (function (_super) {
    __extends(ChatNav, _super);
    function ChatNav(props) {
        var _this = _super.call(this, props) || this;
        _this.updateList = function () {
            _this.ref = firebase_1["default"].db.ref("users/" + firebase_1["default"].user().uid + "/rooms");
            _this.setState({ rooms: [] });
            _this.ref.on("value", function (snap) {
                if (snap.val()) {
                    var roomIds = Object.keys(snap.val());
                    roomIds.forEach(function (roomId) {
                        firebase_1["default"].db.ref("rooms/" + roomId).on("value", function (snap) {
                            var room = snap.val();
                            if (room) {
                                room.roomId = roomId;
                            }
                            _this.state.rooms[roomId] = room;
                            _this.setState({ rooms: _this.state.rooms });
                        });
                    });
                }
            });
        };
        _this.updateContent = function (e) {
            _this.props.updateContent(e.currentTarget.id);
            var layout = document.querySelector('.mdl-layout');
            layout.MaterialLayout.toggleDrawer();
        };
        _this.newChat = function () {
            _this.newChatDialog.newChat().then(function () {
                _this.updateList();
            });
        };
        _this.state = {
            rooms: [],
            user: _this.props.user,
            users: []
        };
        return _this;
    }
    ChatNav.prototype.componentWillReceiveProps = function (newProps) {
        if (this.props.user != newProps.user) {
            this.updateList();
        }
    };
    ChatNav.prototype.componentWillMount = function () {
        if (firebase_1["default"].user())
            this.updateList();
    };
    ChatNav.prototype.render = function () {
        var _this = this;
        var list;
        if (this.state.rooms != null && Object.keys(this.state.rooms).length > 0) {
            list = utilities_1.toArray(this.state.rooms).map(function (room) {
                if (room)
                    return (React.createElement("li", { className: "mdl-list__item mdl-list__item--three-line", id: room.roomId, key: room.roomId, onClick: _this.updateContent },
                        React.createElement("span", { className: "mdl-list__item-primary-content" },
                            React.createElement("i", { className: "material-icons mdl-list__item-avatar" }, "person"),
                            React.createElement("span", null, room.topic),
                            React.createElement("span", { className: "mdl-list__item-text-body" }, room.lastMessage)),
                        React.createElement("span", { className: "mdl-list__item-secondary-content" },
                            React.createElement("a", { className: "mdl-list__item-secondary-action", href: "#" },
                                React.createElement("i", { className: "material-icons" }, "star")))));
            });
        }
        return (React.createElement("div", { className: "mdl-layout__drawer" },
            React.createElement(NewChatDialog_1["default"], { ref: function (r) { return _this.newChatDialog = r; } }),
            React.createElement("span", { className: "mdl-layout-title" }, this.props.title),
            React.createElement("a", { className: "mdl-button mdl-buton--colored mdl-js-button mdl-js-ripple-effect", onClick: this.newChat }, "+ New Chat"),
            React.createElement("nav", { className: "mdl-navigation" },
                React.createElement("ul", { className: "mdl-list" }, list))));
    };
    return ChatNav;
}(React.Component));
exports.__esModule = true;
exports["default"] = ChatNav;
