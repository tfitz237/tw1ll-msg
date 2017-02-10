import * as React from "react";
import {RoomList} from "./room/chat.room-list";
import MessageList from "./message/chat.message-list";
import LoginBox from "../shared/LoginBox";
import fire from "../utilities/firebase";
import Header from "../layout/Header";
import {IUser} from "../User/User";
import MessageInput from "./message/chat.message.input";

interface IChat {
    title: string;
    user: IUser;
    roomId: string;
}

class Chat extends React.Component<any, IChat> {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Chat',
            user: fire.user(),
            roomId: null
        };

        fire.auth.onAuthStateChanged((user) =>{
            this.setState({user: user});
        });


    }

    updateContent = (id) => {
        this.setState({roomId: id });

    };

    render() {

        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <Header title={this.state.title} user={this.state.user} />
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">{this.props.title}</span>
                        <RoomList title={this.state.title} user={this.state.user} updateContent={this.updateContent}  />
                </div>
                <main className="mdl-layout__content">
                    {this.state.user ? (
                    <div className="page-content">
                        <MessageList roomId={this.state.roomId}/>
                    </div>
                    ) : (<LoginBox />) }
                </main>
                {(this.state.roomId && this.state.user) && (
                <footer className="chat-message-footer">
                    <MessageInput roomId={this.state.roomId}/>
                </footer>
                )}
            </div>
        );
    }

}

export default Chat;