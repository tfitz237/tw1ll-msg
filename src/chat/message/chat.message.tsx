import * as React from "react";
import {IUser} from "../user/user";

export interface IMessage {
    id: string,
    timestamp: number;
    message: string;
    userInfo: IUser;
    selectUser: any;
}

class Message extends React.Component<IMessage,any> {

    selectUser() {
        this.props.selectUser(this.props.userInfo.uid)
    }
    render() {
        return (
        <li className="mdl-list__item--two-line" id={this.props.id}><a className="mdl-button mdl-buton--colored mdl-js-button mdl-js-ripple-effect" onClick={this.selectUser}>
            {new Date(this.props.timestamp).toLocaleTimeString()}
            [{this.props.userInfo.name}]</a><br/>
            {this.props.message}
        </li>
        )

    }



}

export default Message;