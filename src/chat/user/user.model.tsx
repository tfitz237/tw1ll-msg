import * as React from "react";
import fire from "../../utilities/firebase";
import {Promise} from "firebase";
import mdl from "../../utilities/mdl";
import {toArray, toClassName} from "../../utilities/utilities";


let UserModel = {

    updateUserList: (component) => {
        return new Promise((res, rej) => {
            component.roomCreated = res;
            component.roomRejected = rej;
            fire.db.ref("users").once("value").then((snap) => {
                let usersRaw = snap.val();
                delete usersRaw[fire.user().uid];
                let users = [];
                for (let key in usersRaw) {
                    users.push(usersRaw[key]);
                }
                component.setState({users: users});
                mdl.dialog(toClassName(component.dialogTitle), "open");
            });
        });
    },

    createUserList: (users, addUser) => {
        if (users != null && users.length > 0) {
            return users.map((user) => {
                return (
                    <li className="mdl-list__item" key={user.uid}>
                        <span className="mdl-list__item-primary-content">
                          <i className="material-icons  mdl-list__item-avatar">person</i>
                            {user.email}
                        </span>
                        <span className="mdl-list__item-secondary-action">
                          <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={user.uid}>
                            <input type="checkbox" id={user.uid} className="mdl-checkbox__input" onChange={addUser} />
                          </label>
                        </span>
                    </li>
                );
            })
        }
    },




};


export default UserModel;