import * as React from "react";
import fire from "../../utilities/firebase";
import mdl from "../../utilities/mdl";
import RoomDialog from "./chat.room-dialog";
import RoomModel from "./chat.room.model";
import {IRoom} from "./chat.room";



interface IChatNav {
    rooms: IRoom[],
}

class RoomList extends React.Component<any,IChatNav> {
    newRoomDialog: RoomDialog;
    ref: any;
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
        };
    }

    updateList =  () => {
        RoomModel.updateRoomList(this);
    }
    updateContent = (e) => {
        this.props.updateContent(e.currentTarget.id);
        mdl.toggleDrawer();
    };

    newRoomWindow = () => {
        this.newRoomDialog.newChat().then(() => {
            this.updateList();
        });
    };

    componentWillReceiveProps(newProps) {
        if(this.props.user != newProps.user) {
            this.updateList();
        }
    }
    componentWillMount() {
        if(fire.user())
            this.updateList();
    }


    render() {
        let list = RoomModel.createRoomList(this, this.state.rooms);
        return (
            <nav className="mdl-navigation">
                <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.newRoomWindow}>+ New Chat</a>
                <ul className="mdl-list">
                    {list}
                </ul>
                <RoomDialog ref={(r) => this.newRoomDialog = r} />
            </nav>
        );

    }
}

export {IRoom, RoomList};
