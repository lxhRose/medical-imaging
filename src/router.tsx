import * as React from 'react';
import { LocaleProvider } from 'antd';
import * as zhCN from 'antd/lib/locale-provider/zh_CN';
import { Router, Route, Switch, Redirect } from 'dva/router';

import Login from './pages/login/login-route';

import {
    App,
    Index
} from './layout/index';

const setTitle = (title) => document.title = title;

// 路由配置
function RouterConfig({ history, app }) {
    return (
        <LocaleProvider locale={zhCN as any}>
            <Router history={history}>
                <Switch>
                    <Route path= "/login" key="login" exact component={Login} />
                    <Route path="/" render={(props)=>(
                        <App>
                            <Switch>
                                <Route path= "/main" key="Index" exact component={Index} />
                                {/* <Route path= "/report" key="Report" exact component={Report} /> */}
                                <Route path="/" exact render={()=><Redirect to="/main"/>}/>
                            </Switch>
                        </App>
                    )} />
                </Switch>
            </Router>
        </LocaleProvider>
    );
}

export default RouterConfig;
