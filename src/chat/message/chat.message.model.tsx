import * as React from "react";
import Message from "./chat.message";
import {toArray, IError} from "../../utilities/utilities";
import {IMessage} from "./chat.message";
import fire from "../../utilities/firebase";
import {IRoom} from "../room/chat.room";
import {INewMessage} from "./chat.message.input";
import {Promise} from "firebase";
import mdl from "../../utilities/mdl";

export interface IMessageDb {
    message: string;
    timestamp: number;
    user: string;
}

let MessageModel = {



    createMessageList : (messages: IMessage[]) => {
        if (messages != null && messages.length > 0) {
            return messages.map((msg) => {
                return (<Message key={msg.id}
                                 id={msg.id}
                                 timestamp={msg.timestamp}
                                 message={msg.message}
                                 userInfo={msg.userInfo}
                                 selectUser={this.selectUser}
                />);
            });
        }
        return null;
    },

    updateMessageList: (component, roomId) => {

        fire.db.ref("messages/" + roomId).on("value", (snap) => {
            let messages = [];
            let msg = snap.val();
            if(msg != null) {
                let messageCount = Object.keys(msg).length;
                let i = 1;
                new Promise((res, rej) => {
                    for (let key in msg) {
                        if (msg.hasOwnProperty(key)) {
                            msg[key].id = key;
                            fire.db.ref("users/" + msg[key].user).once("value").then((snap) => {
                                msg[key].userInfo = snap.val();
                                messages.push(msg[key]);
                                i++;
                                if (i == messageCount) {
                                    res(i);
                                }
                            });
                        }
                    }

                }).then((e) => {
                    fire.db.ref("rooms/" + roomId).on("value", (snap) => {
                        let room = snap.val();
                        messages = messages.sort((x: IMessage, y: IMessage) => x.timestamp - y.timestamp);
                        component.setState({messages: messages, room: room});
                        mdl.scrollBottom();

                    });
                });
            } else {
                component.setState({messages: {}, room: {}});
            }
        });
    },

    sendMessage: (msg: INewMessage) => {

        let roomRef = fire.db.ref("rooms/"+msg.roomId);
        roomRef.once("value", (snap) => {
                let room: IRoom = snap.val();
                room.lastMessage = msg.message;
                room.timestamp = Date.now();
                roomRef.set(room);
        });
        let message: IMessageDb  = {
            message: msg.message,
            timestamp: Date.now(),
            user:  fire.user().uid
        };
        fire.db.ref("messages/"+msg.roomId).push(message);
    }
};

export default MessageModel