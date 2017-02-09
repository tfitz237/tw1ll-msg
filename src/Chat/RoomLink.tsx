import * as React from "react";

class RoomLink extends React.Component<any,any> {
    render() {
        return (
                <li className="mdl-list__item mdl-list__item--three-line" id={this.props.roomId} key={this.props.roomId} onClick={this.props.updateContent}>
                    <span className="mdl-list__item-primary-content" >
                        <i className="material-icons mdl-list__item-avatar">person</i>
                        <span>{this.props.topic}</span>
                        <span className="mdl-list__item-text-body">
                            {this.props.lastMessage}
                        </span>
                    </span>
                    <span className="mdl-list__item-secondary-content">
                        <a className="mdl-list__item-secondary-action" href="#">
                            <i className="material-icons">star</i>
                        </a>
                    </span>
                </li>
        );
    }
}



export default RoomLink