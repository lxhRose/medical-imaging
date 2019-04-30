import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import WrappedNormalLoginForm from "./login-form";
import {TopMenu} from './../../components/index';
import isMobile from './../../utils/isMobile';

import './login.less';

interface Props {
    dispatch?: any,
    login?: any
}

@connect(state => ({
    login: state.login
}))
class LoginRoute extends React.PureComponent<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: isMobile()
        }
    }

    componentWillMount = () => {
        window.addEventListener('resize', () => {
            this.setState({
                isMobile: isMobile()
            })
        });
    }

    render() {
        const {isMobile} = this.state;

        return(
            <div className="login-page">
               <div className={isMobile ? "mobile-page" : "pc-page"}>
                        <TopMenu></TopMenu>
                        <div className="login_content_warp">
                            <div className="login_form_box">
                                <div className="login_form_head">
                                    <h2>登录</h2>
                                </div>
                                <WrappedNormalLoginForm />
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginRoute);
