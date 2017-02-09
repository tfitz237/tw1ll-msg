import * as React from "react";
import fire from "../tools/firebase";
import mdl from "../tools/mdl";
import NewChatDialog from "./NewChatDialog";
import Model from "./Model";
interface IChatNav {
    rooms: IRoom[],
}

interface IRoom {
    topic: string,
    lastMessage: string,
    status: boolean,
    timestamp: number,
}



class ChatNav extends React.Component<any,IChatNav> {
    newChatDialog: NewChatDialog;
    ref: any;
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
        };
    }

    updateContent = (e) => {
        this.props.updateContent(e.currentTarget.id);
        mdl.toggleDrawer();
    };

    newChatWindow = () => {
        this.newChatDialog.newChat().then(() => {
            Model.updateRoomList(this);
        });
    };

    componentWillReceiveProps(newProps) {
        if(this.props.user != newProps.user) {
            Model.updateRoomList(this);
        }
    }
    componentWillMount() {
        if(fire.user())
            Model.updateRoomList(this);
    }


    render() {
        let list = Model.createRoomList(this);
        return (
            <div className="mdl-layout__drawer">
                <NewChatDialog ref={(r) => this.newChatDialog = r} />
                <span className="mdl-layout-title">{this.props.title}</span>
                <a className="mdl-button mdl-buton--colored mdl-js-button mdl-js-ripple-effect" onClick={this.newChatWindow}>+ New Chat</a>
                <nav className="mdl-navigation">
                    <ul className="mdl-list">
                        {list}
                    </ul>
                </nav>
            </div>
        );

    }
}

export {IRoom, ChatNav};
