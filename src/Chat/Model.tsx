import fire from "../tools/firebase";
import * as React from "react";
import {toArray} from "../tools/utilities";
import ChatMessage from "./ChatMessage";
import RoomLink from "./RoomLink";

let Model =  {
    updateMessages: (component, roomId) => {

        fire.db.ref("messages/" + roomId).on("value", (snap) => {
            let msgId = snap.key;
            let messages = snap.val();
            if (messages != null) {
                if (messages.message) {
                    messages = {};
                    messages[msgId] = snap.val();
                }
                for (let i in messages) {
                    fire.db.ref("users/" + messages[i].user).once("value").then((snap) => {
                        messages[i].userInfo = snap.val();
                        component.setState({messages: messages});
                    });
                }
            } else {
                component.setState({messages: null});
            }
        });
        fire.db.ref("rooms/" + roomId).on("value", (snap) => {
            component.setState({room: snap.val()});
        });


    },
    
    createMessageList : (messages) => {

        if (messages != null && Object.keys(messages).length > 0) {
            return toArray(messages).map((msg, index) => {
                return (<ChatMessage key={index}
                                     timestamp={msg.timestamp}
                                     message={msg.message} user={msg.user}
                                     userInfo={msg.userInfo} />);
            });
        }
        return null;
    },

    createRoomList: (component) => {
        let rooms = component.state.rooms;
        if (rooms != null && Object.keys(rooms).length > 0) {
            return toArray(rooms).map((room, index) => {
                if(room)
                    return (
                        <RoomLink key={index}
                                  roomId={room.roomId}
                                  topic={room.topic}
                                  message={room.lastMessage}
                                  updateContent={component.updateContent} />
                    );
            });
        }
        return null;
    },

    updateRoomList: (component) => {
        let ref = fire.db.ref("users/"+fire.user().uid+"/rooms");
        component.setState({rooms: []});
        ref.on("value", (snap) => {
            if (snap.val()) {
                let roomIds = Object.keys(snap.val());
                roomIds.forEach(roomId => {
                    fire.db.ref("rooms/" + roomId).on("value", (snap) => {
                        let room = snap.val();
                        if(room) {
                            room.roomId = roomId;
                        }
                        component.state.rooms[roomId] = room;

                        component.setState({rooms: component.state.rooms});
                    });
                });
            }
        });

    }
};

export default Model;