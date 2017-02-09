"use strict";
var _this = this;
var firebase_1 = require("../tools/firebase");
var React = require("react");
var utilities_1 = require("../tools/utilities");
var ChatMessage_1 = require("./ChatMessage");
var Model = {
    updateMessages: function (component, roomId) {
        firebase_1.default.db.ref("messages/" + roomId).on("value", function (snap) {
            var msgId = snap.key;
            var messages = snap.val();
            if (messages != null) {
                if (messages.message) {
                    messages = {};
                    messages[msgId] = snap.val();
                }
                var _loop_1 = function (i) {
                    firebase_1.default.db.ref("users/" + messages[i].user).once("value").then(function (snap) {
                        messages[i].userInfo = snap.val();
                        component.setState({ messages: messages });
                    });
                };
                for (var i in messages) {
                    _loop_1(i);
                }
            }
            else {
                component.setState({ messages: null });
            }
        });
        firebase_1.default.db.ref("rooms/" + roomId).on("value", function (snap) {
            component.setState({ room: snap.val() });
        });
    },
    createMessageList: function (messages) {
        if (messages != null && Object.keys(messages).length > 0) {
            return utilities_1.toArray(messages).map(function (msg, index) {
                return (<ChatMessage_1.default key={index} timestamp={msg.timestamp} message={msg.message} user={msg.user} userInfo={msg.userInfo}/>);
            });
        }
        return null;
    },
    createRoomList: function (rooms) {
        if (rooms != null && Object.keys(rooms).length > 0) {
            return utilities_1.toArray(rooms).map(function (room) {
                if (room)
                    return (<li className="mdl-list__item mdl-list__item--three-line" id={room.roomId} key={room.roomId} onClick={_this.updateContent}>
                            <span className="mdl-list__item-primary-content">
                                <i className="material-icons mdl-list__item-avatar">person</i>
                                <span>{room.topic}</span>
                                <span className="mdl-list__item-text-body">
                                    {room.lastMessage}
                                </span>
                            </span>
                            <span className="mdl-list__item-secondary-content">
                                <a className="mdl-list__item-secondary-action" href="#">
                                    <i className="material-icons">star</i>
                                </a>
                            </span>
                        </li>);
            });
        }
        return null;
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Model;
