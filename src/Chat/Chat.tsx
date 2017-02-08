import * as React from "react";
import ChatNav from "./ChatNav";
import ChatContent from "./ChatContent";
import LoginBox from "../LoginBox";
import fire from "../tools/firebase";


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

        var header = (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <div className="mdl-layout-icon"></div>
                    <span className="mdl-layout-title">{this.state.title}</span>
                    <div className="mdl-divider">
                        {this.state.user != null &&<button className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={fire.sign.out}>
                            <i className="material-icons">exit_to_app</i>
                        </button>}

                    </div>
                </div>
            </header>

        );
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                {header}
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