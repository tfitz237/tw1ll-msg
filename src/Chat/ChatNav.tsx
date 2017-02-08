import * as React from "react";
import fire from "../tools/firebase";
import {toArray} from "../tools/utilities";
import NewChatDialog from "./NewChatDialog";
interface IChatNav {
    rooms: IChatInfo[],
    user: any,
    users: any,
}

interface IChatInfo {
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
            user: this.props.user,
            users: [],
        };
    }
    updateList = () => {

       this.ref = fire.db.ref("users/"+fire.user().uid+"/rooms");
       this.setState({rooms: []});
       this.ref.on("value", (snap) => {
           if (snap.val()) {
               let roomIds = Object.keys(snap.val());
               roomIds.forEach(roomId => {
                   fire.db.ref("rooms/" + roomId).on("value", (snap) => {
                       let room = snap.val();
                       if(room) {
                           room.roomId = roomId;
                       }
                       this.state.rooms[roomId] = room;

                       this.setState({rooms: this.state.rooms});
                   });
               });
           }
       });
    };

    updateContent = (e) => {
        this.props.updateContent(e.currentTarget.id);
        var layout = document.querySelector('.mdl-layout') as any;
        layout.MaterialLayout.toggleDrawer();
    };

    newChat = () => {
        this.newChatDialog.newChat().then(() => {
            this.updateList();
        });
    };

    componentWillReceiveProps(newProps) {
        if(this.props.user != newProps.user) {
            this.updateList()
        }
    }
    componentWillMount() {
        if(fire.user())
        this.updateList();
    }


    render() {
        let list;
        if (this.state.rooms != null && Object.keys(this.state.rooms).length > 0) {
            list = toArray(this.state.rooms).map((room) => {
                if(room)
                return (
                    <li className="mdl-list__item mdl-list__item--three-line" id={room.roomId} key={room.roomId} onClick={this.updateContent}>
                    <span className="mdl-list__item-primary-content" >
                        <i className="material-icons mdl-list__item-avatar">person</i>
                        <span>{room.topic}</span>
                        <span className="mdl-list__item-text-body">
                            {room.lastMessage}
                        </span>
                    </span>
                        <span className="mdl-list__item-secondary-content">
                        <a className="mdl-list__item-secondary-action" href="#"><i
                            className="material-icons">star</i></a>
                        </span>
                    </li>

                );
            });
        }


        return (
            <div className="mdl-layout__drawer">
                <NewChatDialog ref={(r) => this.newChatDialog = r} />
                <span className="mdl-layout-title">{this.props.title}</span>
                <a className="mdl-button mdl-buton--colored mdl-js-button mdl-js-ripple-effect" onClick={this.newChat}>+ New Chat</a>
                <nav className="mdl-navigation">
                    <ul className="mdl-list">
                        {list}
                    </ul>
                </nav>


            </div>

        );

    }
}

export default ChatNav;
