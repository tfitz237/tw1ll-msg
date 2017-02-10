import * as React from "react";
import fire from "../../utilities/firebase";
import {toClassName} from "../../utilities/utilities";
import {Promise} from "firebase";
import Dialog from "../../shared/dialog";
import UserModel from "../user/user.model";
import RoomModel from "./chat.room.model";
import {IRoom} from "./chat.room";
import mdl from "../../utilities/mdl";
class RoomDialog extends React.Component<any,any> {
    chat: IRoom;
    roomCreated: any;
    roomRejected: any;
    dialogTitle: any;
    constructor(props) {
        super(props);
        this.state = {
          users: []
        };
        this.chat = {
            topic: "New chat",
            lastMessage: " ",
            users: {},
            timestamp: null,
            status: true,
        };
        this.dialogTitle = "Create new chat";

    }
    newChat = () => {
        return UserModel.updateUserList(this);
    };

    addUserToNewChat = (e) => {
        let uid = e.target.id;
        this.chat["users"][uid] = uid;
    };

    createChat = () => {
        RoomModel.createRoom(this.chat).then(() => {
            mdl.dialog(toClassName(this.dialogTitle), "close");
            this.roomCreated();
        });
    };

    render() {
        let users = UserModel.createUserList(this.state.users, this.addUserToNewChat);
        let content = (
            <ul className="demo-list-control mdl-list">
                {users}
            </ul>
        );
        return (
            <Dialog title={this.dialogTitle}
                    subtitle="Select User:"
                    content={content}
                    actionLink={this.createChat}
                    actionTitle="Create Chat"
                    widthClass="width-500"
            />
        );
    }


}


export default RoomDialog;


