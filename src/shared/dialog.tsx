import * as React from "react";
import mdl from "../utilities/mdl";
import {toClassName} from "../utilities/utilities";

export interface IDialog {
    title: string;
    subtitle: string;
    content: any;
    actionLink: any;
    actionTitle: string;
    widthClass: string;
}


class Dialog extends React.Component<IDialog, any> {
    componentDidMount() {
        mdl.dialog(toClassName(this.props.title), "event");
    }
    render() {
        return (
            <dialog id={toClassName(this.props.title)} className={"mdl-dialog " + this.props.widthClass}>
                <h4 className="mdl-dialog__title">{this.props.title}</h4>
                <div className="mdl-dialog__content">
                    <h5>{this.props.subtitle}</h5>
                    {this.props.content}
                </div>
                <div className="mdl-dialog__actions">
                    <button type="button" className="mdl-button" onClick={this.props.actionLink}>{this.props.actionTitle}</button>
                    <button type="button" className="mdl-button close">Cancel</button>
                </div>
            </dialog>
        );
    }
}

export default Dialog;