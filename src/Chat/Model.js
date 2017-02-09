"use strict";
var firebase_1 = require("../tools/firebase");
var React = require("react");
var utilities_1 = require("../tools/utilities");
var ChatMessage_1 = require("./ChatMessage");
var RoomLink_1 = require("./RoomLink");
var Model = {
    updateMessages: function (component, roomId) {
        firebase_1["default"].db.ref("messages/" + roomId).on("value", function (snap) {
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
        firebase_1["default"].db.ref("rooms/" + roomId).on("value", function (snap) {
            component.setState({ room: snap.val() });
        });
    },
    createMessageList: function (messages) {
        if (messages != null && Object.keys(messages).length > 0) {
            return utilities_1.toArray(messages).map(function (msg, index) {
                return (React.createElement(ChatMessage_1["default"], { key: index, timestamp: msg.timestamp, message: msg.message, user: msg.user, userInfo: msg.userInfo }));
            });
        }
        return null;
    },
    createRoomList: function (component) {
        var rooms = component.state.rooms;
        if (rooms != null && Object.keys(rooms).length > 0) {
            return utilities_1.toArray(rooms).map(function (room, index) {
                if (room)
                    return (React.createElement(RoomLink_1["default"], { key: index, roomId: room.roomId, topic: room.topic, message: room.lastMessage, updateContent: component.updateContent }));
            });
        }
        return null;
    },
    updateRoomList: function (component) {
        var ref = firebase_1["default"].db.ref("users/" + firebase_1["default"].user().uid + "/rooms");
        component.setState({ rooms: [] });
        ref.on("value", function (snap) {
            if (snap.val()) {
                var roomIds = Object.keys(snap.val());
                roomIds.forEach(function (roomId) {
                    firebase_1["default"].db.ref("rooms/" + roomId).on("value", function (snap) {
                        var room = snap.val();
                        if (room) {
                            room.roomId = roomId;
                        }
                        component.state.rooms[roomId] = room;
                        component.setState({ rooms: component.state.rooms });
                    });
                });
            }
        });
    }
};
exports.__esModule = true;
exports["default"] = Model;
