import * as React from "react";
import {IUser} from "../User/User";

interface IMessage {
    timestamp: string;
    message: string;
    user: string;
    userInfo: IUser;
}

class ChatMessage extends React.Component<IMessage,any> {

    render() {
        return (
        <li>{new Date(this.props.timestamp).toLocaleTimeString()}
            [{this.props.userInfo.email}]&nbsp;&nbsp;{this.props.message}
        </li>
        )

    }



}

export default ChatMessage;