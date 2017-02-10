import * as React from "react";
import {RoomList} from "./room/chat.room-list";
import MessageList from "./message/chat.message-list";
import LoginBox from "./user/user.login.box";
import fire from "../utilities/firebase";
import Header from "../layout/Header";
import {IUser} from "./user/user";
import MessageInput from "./message/chat.message.input";
import DrawerHeader from "../layout/drawer.header";
import UserLoginDialog from "./user/user.login.dialog";
import mdl from "../utilities/mdl";

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
            mdl.upgradeDom();
        });


    }

    updateContent = (id) => {
        this.setState({roomId: id });

    };


    render() {

        if(this.state.user) return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <Header title={this.state.title} user={this.state.user} />
                <div className="mdl-layout__drawer">
                    <DrawerHeader user={this.state.user} />
                    <RoomList title={this.state.title} user={this.state.user} updateContent={this.updateContent}  />
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <MessageList roomId={this.state.roomId}/>
                    </div>
                </main>
                {this.state.roomId && (
                <footer className="chat-message-footer">
                    <MessageInput roomId={this.state.roomId}/>
                </footer>
                )}

            </div>
                );
        else return (<UserLoginDialog />);
    }

}

export default Chat;