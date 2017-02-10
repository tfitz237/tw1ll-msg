import * as React from "react";
import fire from "../../utilities/firebase";
import MessageModel from "./chat.message.model";
import mdl from "../../utilities/mdl";

export interface INewMessage {
    message: string;
    roomId: string;
}

class MessageInput extends React.Component<any, any> {
    NewMessage: INewMessage;
    constructor(props) {
        super(props);
        this.NewMessage =  {
            message: null,
            roomId: null,
        };
    }

    sendMessage = (e) => {
        this.NewMessage.message = e.target.value;
        if(e.key === 'Enter') {
            this.NewMessage.roomId = this.props.roomId;
            MessageModel.sendMessage(this.NewMessage);
            e.target.value = "";
            mdl.scrollBottom();
        }

    }

    render() {
        return (
            <div>
                <input className="mdl-textfield__input" type="text" id="chat-message-input" onKeyUp={this.sendMessage} />
            </div>
        );
    }


}

export default MessageInput;