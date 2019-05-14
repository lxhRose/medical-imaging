import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Menu, Modal } from 'antd'; 
import PCPage from './components/PCPage';
import MobilePage from './components/MobilePage';
import './main.less';

interface Props {
    dispatch?: any,
    main?: any,
    form?: any,
    App?: any,
}

@connect(state => ({
    main: state.main,
    App: state.App
}))
class Main extends React.PureComponent<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            current: sessionStorage.getItem('current') || 'alipay',
            showAddDoctorState: false,
            paginationCurrent: 1
        }
    }

    componentDidMount() {
        this.handleChangePage(1);
    }

    // 全部影像
    loadList = () => {
        this.props.dispatch({
            type: 'main/loadList'
        })
    }

    // 我的关注
    followedExams = () => {
        this.props.dispatch({
            type: 'main/followedExams'
        });
    }

    // 医生列表
    loadDoctors = () => {
        this.props.dispatch({
            type: 'main/loadDoctors'
        });
    }

    // 更改页码
    handleChangePage = (page: number) => {
        this.props.dispatch({
            type: 'main/changePage', 
            payload: page
        });
        this.setState({
            paginationCurrent: page
        });
        switch(this.state.current) {
            case 'alipay': this.loadList();break;
            case 'followedExams': this.followedExams();break;
            case 'doctorManage': this.loadDoctors();break;
            default: this.loadList();break;
        }
    };

    // 更改页码大小
    handleChangePageSize = (page: number, pageSize: number) => {
        this.props.dispatch({
            type: 'main/changePageSize', 
            payload: pageSize
        });
        this.handleChangePage(page); // 更每页条数 导致页码改变
    };

    handleClick = (e) => {
        this.props.dispatch({
            type: 'main/clearData'
        });
        sessionStorage.setItem('current', e.key);
        this.setState({
            current: e.key,
            showAddDoctorState: false
        }, () => { // 利用回调函数，保证在setState成功后执行以下函数
            this.handleChangePage(1);
        });
    }

    showReport = (item) => {
        // 在切换页面时向history中加入一条记录（当前路由），以便在回退的时候保持在当前页，模拟路由跳转
        history.pushState(null, null, document.URL);
        this.props.dispatch({
            type: 'index/changeShowReport',
            payload: true
        });
        this.props.dispatch({
            type: 'index/appendOption',
            payload: item
        });
    }

    follows = (item) => {
        this.props.dispatch({
            type: 'main/follows',
            payload: item.id
        }).then((res) => {
            if (parseInt(res.meta.code) === 200) {
                Modal.success({
                    title: '操作成功',
                    content: '关注成功!',
                    onOk: () => this.loadList()
                });
            }
        });
    }

    delfollows = (item) => {
        this.props.dispatch({
            type: 'main/delfollows',
            payload: item.id
        }).then((res) => {
            if (parseInt(res.meta.code) === 200) {
                Modal.success({
                    title: '操作成功',
                    content: '已取消关注!',
                    onOk: () => this.followedExams()
                });
            }
        });
    }
    
    showAddDoctor = () => {
        this.setState({
            showAddDoctorState: !this.state.showAddDoctorState
        });
    }

    render() {
        const {
            loading,
            data,
            pageNumber,
            pageSize,
            totalRecord,
        } = this.props.main;

        const {
            isMobile,
            role,
            isAdmin
        } = this.props.App;

        const {
            current,
            showAddDoctorState,
            paginationCurrent
        } = this.state;

        const option = {
            loading,
            data,
            pageNumber,
            pageSize,
            totalRecord,
            role,
            isAdmin,
            current,
            paginationCurrent,
            showAddDoctorState,
            handleChangePage: this.handleChangePage.bind(this),
            handleChangePageSize: this.handleChangePageSize.bind(this),
            showReport: this.showReport.bind(this),
            delfollows: this.delfollows.bind(this),
            showAddDoctor: this.showAddDoctor.bind(this),
            follows: this.follows.bind(this)
        }

        return(
            <div className="main-page">
                <div className="content">
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        className={isMobile ? 'Mobile-Menu' : 'PC-Menu'}
                    >
                        <Menu.Item key="alipay">
                            <a>全部影像</a>
                        </Menu.Item>
                        {role === 2 &&
                            <Menu.Item key="followedExams">
                                <a>我的关注</a>
                            </Menu.Item>
                        }
                        {isAdmin &&
                            <Menu.Item key="doctorManage">
                                <a>医生管理</a>
                            </Menu.Item>
                        }
                    </Menu>
                    <div>
                        {isMobile 
                        ? <MobilePage option={option} />
                        : <PCPage option={option} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Main);
