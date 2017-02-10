import fire from "../../utilities/firebase";
import * as React from "react";
import {toArray} from "../../utilities/utilities";
import Message, {IMessage} from "../message/chat.message";
import Room from "./chat.room";
import {Promise} from "firebase";
import {IRoom} from "./chat.room";

let RoomModel =  {

    selectUser: (userId: string) => {

    },


    createRoom: (room: IRoom) => {
        return new Promise((res, rej) => {
            room.timestamp = Date.now();
            room.users[fire.user().uid] = fire.user().uid;
            let newRoom = fire.db.ref("rooms").push(room);
            let userCount = room.users.length;
            let i = 0;
            for (let key in room.users) {
                let user = room.users[i];
                fire.db.ref("users/" + user + "/rooms/" + newRoom.key).set(this.chat["timestamp"]);
                i++;
                if(i == userCount) {
                    res(i);
                }
            }


        });
    },

    createRoomList: (component, rooms) => {
        if (rooms != null && rooms.length > 0) {
            let roomList = rooms.map((room) => {
                return (<Room key={room.roomId}
                              roomId={room.roomId}
                              topic={room.topic}
                              message={room.lastMessage}
                              updateContent={component.updateContent} />
                );
            });
            return roomList;
        }
        return null;
    },


    updateRoomList: (component) => {
            fire.db.ref("users/" + fire.user().uid + "/rooms").on("value", (snap) => {
                let roomIds = snap.val();
                let rooms = [];
                if (roomIds) {
                    let roomCount = Object.keys(roomIds).length;
                    let i = 0;
                    new Promise((res, rej) => {
                        for (let roomId in roomIds) {
                            fire.db.ref("rooms/" + roomId).on("value", (snap) => {
                                let room = snap.val();
                                if (room) {
                                    room.roomId = roomId;
                                    rooms.push(room);
                                    i++;
                                    if (i == roomCount) {
                                        res(i);
                                    }
                                }
                            });
                        }
                    }).then((e) => {

                        component.setState({rooms:rooms});
                    });
                }
            });
    }
};

export default RoomModel;