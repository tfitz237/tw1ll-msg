"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var firebase_1 = require("../tools/firebase");
var utilities_1 = require("../tools/utilities");
var ChatContent = (function (_super) {
    __extends(ChatContent, _super);
    function ChatContent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            roomId: _this.props.roomId,
            messages: {},
            room: null
        };
        return _this;
    }
    ChatContent.prototype.componentWillReceiveProps = function (newProps) {
        var _this = this;
        if (newProps.roomId != this.props.roomId) {
            firebase_1["default"].db.ref("messages/" + newProps.roomId).on("value", function (snap) {
                var msgId = snap.key;
                var messages = snap.val();
                if (messages != null) {
                    if (messages.message) {
                        messages = {};
                        messages[msgId] = snap.val();
                    }
                    var _loop_1 = function (i) {
                        firebase_1["default"].db.ref("users/" + messages[i].user).once("value").then(function (snap) {
                            messages[i].userInfo = snap.val();
                            _this.setState({ messages: messages });
                        });
                    };
                    for (var i in messages) {
                        _loop_1(i);
                    }
                }
                else {
                    _this.setState({ messages: {} });
                }
            });
            firebase_1["default"].db.ref("rooms/" + newProps.roomId).on("value", function (snap) {
                _this.setState({ room: snap.val() });
            });
        }
    };
    ChatContent.prototype.render = function () {
        var list;
        if (this.state.messages != null && Object.keys(this.state.messages).length > 0) {
            list = utilities_1.toArray(this.state.messages).map(function (msg) {
                return (React.createElement("li", null,
                    new Date(msg.timestamp).toLocaleString(),
                    "<",
                    msg.userInfo.email,
                    ">\u00A0\u00A0",
                    msg.message));
            });
        }
        if (this.state.messages != null && this.state.room != null) {
            return (React.createElement("div", null,
                React.createElement("h1", null, this.state.room.topic),
                React.createElement("ul", null, list)));
        }
        else
            return (React.createElement("div", null));
    };
    return ChatContent;
}(React.Component));
exports.__esModule = true;
exports["default"] = ChatContent;
