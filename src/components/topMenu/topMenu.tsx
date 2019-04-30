import React from 'react';
import { connect } from 'dva';
import {Icon} from 'antd';
import './topMenu.less';

interface Props {
    App?: any
}

@connect(state => ({
    App: state.App
}))
class TopMenu extends React.PureComponent<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            showLanguageModal: false,
            showUserModal: false,
        }
    }

    showModal = (type) => {
        if (type === "language") {
            this.setState({
                showLanguageModal: true
            });
        } else if (type === "user") {
            this.setState({
                showUserModal: true
            });
        }
    }

    closeModal = (type) => {
        if (type === "language") {
            this.setState({
                showLanguageModal: false
            });
        } else if (type === "user") {
            this.setState({
                showUserModal: false
            });
        }
    }

    render() {
        const {showLanguageModal, showUserModal} = this.state;
        const {isMobile} = this.props.App;

        return(
            <div className={isMobile? "Mobile-TopMenu-page" : "TopMenu-page"}>
                <span>影像报告</span>
                <div className="right">
                    <div className="language"
                     onMouseOver={()=>this.showModal("language")}
                     onMouseOut={()=>this.closeModal("language")}>
                        <Icon type="global" />简体中文
                        <div className="language-modal" hidden={!showLanguageModal}>
                            <p className="select">简体中文</p>
                            <p>English</p>
                        </div>
                    </div>
                    <div className="user"
                     onMouseOver={()=>this.showModal("user")}
                     onMouseOut={()=>this.closeModal("user")}>
                        mecby<Icon type="caret-down" />
                        <div className="language-modal user-modal" hidden={!showUserModal}>
                            <p>当前账号：mecby</p>
                            <p>我的团队</p>
                            <p>设置</p>
                            <p>帮助</p>
                            <p onClick={() => window.location.href = "#/login"}>退出</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopMenu;
