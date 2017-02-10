import * as React from "react";
import fire from "../utilities/firebase";
import {toArray} from "../utilities/utilities";
import {Promise} from "firebase";

class NewChatDialog extends React.Component<any,any> {
    chat: any = {
            topic: "New chat",
            lastMessage: " ",
            users: {},
            timestamp: null
    };
    resolve: any;
    reject: any;
    constructor(props) {
        super(props);
        this.state = {
          users:{}
        };



    }
    newChat = () => {
        return new Promise((res, rej) => {
            let dialog = document.querySelector('dialog') as any;
            fire.db.ref("users").once("value").then((snap) => {
                let users = snap.val();
                delete users[fire.user().uid];
                this.setState({users: users});
                dialog.showModal();
            });

            dialog.querySelector('.close').addEventListener('click', function() {
                dialog.close();
            });

            this.resolve = res;
            this.reject = rej;
        });
    };

    addUserToNewChat = (e) => {
        let uid = e.target.id;
        this.chat["users"][uid] = uid;

    };

    createChat = () => {
        this.chat["users"][fire.user().uid] = fire.user().uid;
        this.chat["timestamp"] = new Date().getTime();
        let newChat = fire.db.ref("rooms").push(this.chat);
        for(let i in this.chat["users"]) {
            let user = this.chat["users"][i];
            fire.db.ref("users/"+user+"/rooms/"+newChat.key).set(this.chat["timestamp"]);
        }

        let dialog = document.querySelector('dialog')as any;
        dialog.close();

        this.resolve();
    };

    render() {
        let users;
        if (this.state.users != null && Object.keys(this.state.users).length > 0) {
            users = toArray(this.state.users).map((user) => {
                return (
                    <li className="mdl-list__item" key={user.uid}>
                        <span className="mdl-list__item-primary-content">
                          <i className="material-icons  mdl-list__item-avatar">person</i>
                            {user.email}
                        </span>
                        <span className="mdl-list__item-secondary-action">
                          <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={user.uid}>
                            <input type="checkbox" id={user.uid} className="mdl-checkbox__input" onChange={this.addUserToNewChat} />
                          </label>
                        </span>
                    </li>
                );
            })
        }
        return (
            <dialog className="mdl-dialog">
                <h4 className="mdl-dialog__title">Create new chat:</h4>
                <div className="mdl-dialog__content">
                    <h5>Select User:</h5>
                    <ul className="demo-list-control mdl-list">
                        {users}
                    </ul>
                </div>
                <div className="mdl-dialog__actions">
                    <button type="button" className="mdl-button" onClick={this.createChat}>Create Chat</button>
                    <button type="button" className="mdl-button close">Cancel</button>
                </div>
            </dialog>
        );
    }


}


export default NewChatDialog;


