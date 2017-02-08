import * as React from "react";
import fire from "../tools/firebase";
import {toArray} from "../tools/utilities";

class ChatContent extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            roomId: this.props.roomId,
            messages: {},
            room: null
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.roomId != this.props.roomId) {


            fire.db.ref("messages/"+newProps.roomId).on("value", (snap) => {

                let msgId = snap.key;
                let messages = snap.val();
                if(messages != null) {
                    if (messages.message) {
                        messages = {};
                        messages[msgId] = snap.val();
                    }
                    for (let i in messages) {
                        fire.db.ref("users/" + messages[i].user).once("value").then((snap) => {
                            messages[i].userInfo = snap.val();


                            this.setState({messages: messages});
                        });
                    }
                } else {
                    this.setState({messages: {}});
                }
            });
            fire.db.ref("rooms/"+newProps.roomId).on("value", (snap) => {
                this.setState({room: snap.val()});
            });

        }
    }

    render() {
        let list;

        if (this.state.messages != null && Object.keys(this.state.messages).length > 0) {
            list = toArray(this.state.messages).map((msg) => {
                return (
                    <li>{new Date(msg.timestamp).toLocaleString()}
                        &lt;{msg.userInfo.email}&gt;&nbsp;&nbsp;{msg.message}
                    </li>
                );
            });
        }
        if(this.state.messages != null && this.state.room != null) {
            return (
                <div>
                    <h1>{this.state.room.topic}</h1>
                    <ul>
                        {list}
                    </ul>
                </div>
            );
        } else return (<div></div>);
    }
}


export default ChatContent;