import * as React from "react";
import MessageModel from "../message/chat.message.model";
import {IRoom} from "../room/chat.room";
interface IStateMessageList {
    room: IRoom;
    messages: any;
}

class MessageList extends React.Component<any,IStateMessageList> {
    constructor(props) {
        super(props);
        this.state = {
            room: {
                topic: null,
                lastMessage: null,
                status: null,
                timestamp: null,
            },
            messages: {}
        }
    }

    updateList = (roomId) => {
        MessageModel.updateMessageList(this, roomId);
    };

    componentWillReceiveProps(newProps) {
        if(newProps.roomId != this.props.roomId) {
            this.updateList(newProps.roomId);
        }
    }



    render() {
        let list = MessageModel.createMessageList(this.state.messages);

            return (
                <div className="chat-message-list">
                    <h1>{this.state.room.topic}</h1>
                    <ul className="mdl-list">
        {list}
    </ul>
        </div>
            );
    }
}


export default MessageList;