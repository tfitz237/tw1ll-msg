import * as React from "react";
import {ChatNav} from "./ChatNav";
import ChatContent from "./ChatContent";
import LoginBox from "../LoginBox";
import fire from "../tools/firebase";
import Header from "../Layout/Header";


class Chat extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { title: 'Chat', user: fire.user()};

        fire.auth.onAuthStateChanged((user) =>{
            this.setState({user: user});
        });


    }

    updateContent = (id) => {
        this.setState({roomId: id });

    }

    render() {

        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <Header title={this.state.title} user={this.state.user} />
                <ChatNav title={this.state.title} user={this.state.user} updateContent={this.updateContent}  />
                <main className="mdl-layout__content">
                    <div className="page-content">
                        {this.state.user ? (<ChatContent roomId={this.state.roomId}/>) : (<LoginBox />) }
                    </div>
                </main>
            </div>
        );
    }

}

export default Chat;