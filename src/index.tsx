import dva from 'dva';
import RouterConfig from './router';

import {
    reportModel,
    loginModel,
    mainModel,
    AppModel
} from './layout/index';

import './index.less';

const app = dva();

app.model(loginModel);
app.model(mainModel);
app.model(reportModel);
app.model(AppModel);
app.router(RouterConfig);
app.start('#root');
