import * as React from "react";
import Model from "./Model";


class ChatContent extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            room: null,
            messages: {}
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.roomId != this.props.roomId) {
            Model.updateMessages(this, newProps.roomId);
        }
    }

    render() {
        let list = Model.createMessageList(this.state.messages);

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