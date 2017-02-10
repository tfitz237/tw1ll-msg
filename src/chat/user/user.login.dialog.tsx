import * as React from "react";
import Dialog from "../../shared/dialog";
import LoginBox from "./user.login.box";
import mdl from "../../utilities/mdl";


class UserLoginDialog extends React.Component<any,any> {
    componentDidMount() {
        mdl.dialog("login", "open");
    }
    render() {
        let content = (<LoginBox/>);
        return (
            <Dialog
                title="Login"
                subtitle="Enter your credentials"
                actionLink={() => location.href="http://google.com"}
                actionTitle="Leave Site"
                widthClass="width-500"
                content={content} />
        );
    }
}
export default UserLoginDialog;