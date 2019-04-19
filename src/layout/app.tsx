import React from 'react';
import { withRouter, Link } from 'dva/router';
import { connect } from 'dva';
import { RouteComponentProps } from 'react-router';
import {TopMenu} from './../components/index';
import {message} from 'antd';

import './app.less';

interface Props {
    dispatch?: any,
    App?: any
}

@connect((state) => ({
    App: state.App
}))
class App extends React.PureComponent<Props & RouteComponentProps<any, any>, any> {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="App-page">
                <TopMenu></TopMenu>
                {this.props.children}
            </div>
        );
    }
}

function withRenderApp(WrappedComponent) {
    return class WithRenderApp extends React.PureComponent<any, any> {
      render() {
         if (sessionStorage.getItem('token')) {
          return <WrappedComponent {...this.props}/>
         } else {
           message.error('您还未登录，请先登录！');
           return window.location.href = '#/login';
         }
      }
    }
  }
export default withRenderApp(withRouter(App));
  