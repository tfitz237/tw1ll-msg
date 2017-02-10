"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var firebase_1 = require("../tools/firebase");
var NewChatDialog_1 = require("./../NewChatDialog");
var ChatNav = (function (_super) {
    __extends(ChatNav, _super);
    function ChatNav(props) {
        var _this = _super.call(this, props) || this;
        _this.updateList = function () {
            _this.ref = firebase_1.default.db.ref("users/" + firebase_1.default.user().uid + "/rooms");
            _this.setState({ rooms: [] });
            _this.ref.on("value", function (snap) {
                if (snap.val()) {
                    var roomIds = Object.keys(snap.val());
                    roomIds.forEach(function (roomId) {
                        firebase_1.default.db.ref("rooms/" + roomId).on("value", function (snap) {
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
            users: [],
        };
        return _this;
    }
    ChatNav.prototype.componentWillReceiveProps = function (newProps) {
        if (this.props.user != newProps.user) {
            this.updateList();
        }
    };
    ChatNav.prototype.componentWillMount = function () {
        if (firebase_1.default.user())
            this.updateList();
    };
    ChatNav.prototype.render = function () {
        var _this = this;
        var list;
        return (<div className="mdl-layout__drawer">
                <NewChatDialog_1.default ref={function (r) { return _this.newChatDialog = r; }}/>
                <span className="mdl-layout-title">{this.props.title}</span>
                <a className="mdl-button mdl-buton--colored mdl-js-button mdl-js-ripple-effect" onClick={this.newChat}>+ New Chat</a>
                <nav className="mdl-navigation">
                    <ul className="mdl-list">
                        {list}
                    </ul>
                </nav>


            </div>);
    };
    return ChatNav;
}(React.Component));
exports.ChatNav = ChatNav;
