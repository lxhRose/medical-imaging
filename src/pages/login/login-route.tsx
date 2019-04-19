import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import WrappedNormalLoginForm from "./login-form";
import {TopMenu} from './../../components/index';

// import { Icon } from 'antd';

// import login_banner_ele from '../../assets/img/login/login_banner_ele@2x.png';
import './login.less';

interface Props {
    dispatch?: any,
    login?: any
}

@connect(state => ({
    login: state.login
}))
class LoginRoute extends React.PureComponent<Props, any> {
    render() {
        return(
            <div className="login_wrap comment_page">
                <TopMenu></TopMenu>
                <div className="login_content_warp ant-row comment_content">
                    <div className="ant-col-sm-15 ant-row login_text_wrap">
                        <div className="ant-col-sm-16 ant-col-sm-offset-5">
                            {/* <h3>PR宣传文案</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum</p>
                            <p>dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.</p> */}
                        </div>
                        <div className="ant-col-sm-13 ant-col-offset-6">
                            {/* <img src={login_banner_ele} /> */}
                        </div>
                    </div>
                    <div className="login_form_warp ant-col-sm-9 ant-row">
                        <div className="login_form_box ant-col-sm-15">
                            <div className="login_form_head">
                                <h2>用户登录</h2>
                                {/* <span><a href="#/register">免费注册</a><Icon type="right" /></span> */}
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
