import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { ColumnProps } from 'antd/lib/table';
import { Table, Menu, Icon, List, Modal} from 'antd';
import Report from './../report/report';
import './main.less';

const {Column} = Table;
const SubMenu = Menu.SubMenu;

interface Props {
    dispatch?: any,
    main?: any,
    App?: any,
}

@connect(state => ({
    main: state.main,
    App: state.App
}))
class Main extends React.PureComponent<Props, any> {
    private columns: Array < ColumnProps < any >>;
    constructor(props) {
        super(props);
        if (this.props.App.role === 2) {
            this.columns = [
                {
                    dataIndex: 'hospExamExternalId',
                    title: 'ID号'
                }, {
                    dataIndex: 'patientName',
                    title: '姓名'
                }, {
                    dataIndex: 'patientSex',
                    title: '性别',
                },  {
                    dataIndex: 'patientExamAge',
                    title: '检查年龄',
                },
                {
                    dataIndex: 'modalityType',
                    title: '设备类型'
                }, {
                    dataIndex: 'examItemName',
                    title: '检查部位'
                }, {
                    dataIndex: 'hospName',
                    title: '机构名称',
                },  {
                    dataIndex: 'examTime',
                    title: '检查日期',
                }
            ]
        } else {
            this.columns = [
            {
                dataIndex: 'hospExamExternalId',
                title: 'ID号'
            },  {
                dataIndex: 'patientExamAge',
                title: '检查年龄',
            },{
                dataIndex: 'modalityType',
                title: '设备类型'
            }, {
                dataIndex: 'examItemName',
                title: '检查部位'
            }, {
                dataIndex: 'hospName',
                title: '机构名称',
            },  {
                dataIndex: 'examTime',
                title: '检查日期',
            }]
        }
        this.state = {
            current: 'alipay',
            showReport: false,
            option: {},
        }
    }

    componentWillMount() {
        window.addEventListener('popstate', this.listenPopstate, false);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.listenPopstate, false);
    }

    listenPopstate = () => {
        const {showReport} = this.state;

        if (showReport) {
            this.setState({
                showReport: false
            });
        }
    }

    componentDidMount() {
        this.loadList();
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

    // 更改页码
    handleChangePage = (page: number) => {
        this.props.dispatch({
            type: 'main/changePage', 
            payload: page
        });
        switch(this.state.current) {
            case 'alipay': this.loadList();break;
            case 'followedExams': this.followedExams();break;
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
       this.setCurrent(e.key).then(() => {
           this.handleChangePage(1);
       })
    }

    setCurrent = (current):Promise<any> => {
        return new Promise((resolve, reject) => {
            this.setState({
                current: current,
            });
            resolve();
        });
    }

    showReport = (item) => {
        // 在切换页面时向history中加入一条记录（当前路由），以便在回退的时候保持在当前页，模拟路由跳转
        history.pushState(null, null, document.URL);
        this.setState({
            option: item,
            showReport: true
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
            role
        } = this.props.App;

        const {
            showReport,
            option,
            current
        } = this.state;

        console.log(role)

        return(
            <div>
                {showReport
                ?<Report option={option}></Report>
                :<div className="main-page">
                    <div className="content">
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                        >
                            <Menu.Item key="alipay">
                                <a>全部影像</a>
                            </Menu.Item>
                            {role === 2 &&
                                <Menu.Item key="followedExams">
                                    <a>我的关注</a>
                                </Menu.Item>
                            }
                            {/* <SubMenu title={<span className="submenu-title-wrapper">快捷查询<Icon type="caret-down" /></span>}>
                                <Menu.Item key="setting:1">今日检查</Menu.Item>
                                <Menu.Item key="setting:2">今日普放</Menu.Item>
                                <Menu.Item key="setting:3">今日CT</Menu.Item>
                            </SubMenu> */}
                        </Menu>
                        {isMobile 
                        ? <div className="Mobile-page">
                            <p>共 <strong>{totalRecord}</strong> 条数据</p>
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    onChange: this.handleChangePage,
                                    pageSize: pageSize,
                                    total: totalRecord,
                                    showSizeChanger: true,
                                    onShowSizeChange: this.handleChangePageSize,
                                }}
                                dataSource={data}
                                renderItem={(item, index) => (
                                    <div key={index} className="Mobile_list">
                                        <div className="row">
                                            <span>ID号</span>
                                            <span>{item.hospExamExternalId}</span>
                                        </div>
                                        {role === 2 &&
                                            <div className="row">
                                                <span>姓名</span>
                                                <span>{item.patientName}</span>
                                            </div>}
                                        {role === 2 &&
                                            <div className="row">
                                                <span>性别</span>
                                                <span>{item.patientSex}</span>
                                            </div>}
                                        <div className="row">
                                            <span>检查年龄</span>
                                            <span>{item.patientExamAge}</span>
                                        </div>
                                        <div className="row">
                                            <span>设备类型</span>
                                            <span>{item.modalityType}</span>
                                        </div>
                                        <div className="row">
                                            <span>检查部位</span>
                                            <span>{item.examItemName}</span>
                                        </div>
                                        <div className="row">
                                            <span>机构名称</span>
                                            <span>{item.hospName}</span>
                                        </div>
                                        <div className="row">
                                            <span>检查日期</span>
                                            <span>{item.examTime}</span>
                                        </div>
                                        <div className="row">
                                            <span>操作</span>
                                            <span>
                                                <div className="action">
                                                    <a><Icon type="picture" />影像</a>
                                                    <a onClick={() => this.showReport(item)}>
                                                        <Icon type="medicine-box" />报告</a>
                                                    {role === 2  ? (current === 'followedExams'
                                                        ? <a onClick={() => this.delfollows(item)}>
                                                            <Icon 
                                                                type="star" 
                                                                theme="filled" 
                                                                style={{color: '#faad14'}} />取消关注</a>
                                                        : <a onClick={() => this.follows(item)}>
                                                            <Icon type="star" />关注</a>) : null
                                                    }
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        : <Table
                            dataSource={data}
                            rowKey="id"
                            className="myTable"
                            loading={loading}
                            locale={{
                                emptyText: loading
                                    ? '加载中...'
                                    : '暂无数据'
                            }}
                            pagination={{
                                current: pageNumber,
                                pageSize,
                                showQuickJumper: true,
                                showSizeChanger: true,
                                pageSizeOptions: [
                                    '10', '20', '50', '100'
                                ],
                                total: totalRecord,
                                onChange: this.handleChangePage,
                                onShowSizeChange: this.handleChangePageSize,
                                showTotal: (totalNum, range) =>
                                `显示 ${range[0]} 到 ${range[1]}, 共有${totalNum} 条记录`,
                            }}>
                            {this.columns.map((column, i) => <Column {...column} key={i} align={"center"}/>)}
                            <Column
                                title="操作"
                                dataIndex="action"
                                width="250px"
                                align={"center"}
                                render={(text, record) => (
                                    <div className="action">
                                        <a><Icon type="picture" />影像</a>
                                        <a onClick={() => this.showReport(record)}>
                                            <Icon type="medicine-box" />报告</a>
                                        {role === 2  ? (current === 'followedExams'
                                            ? <a onClick={() => this.delfollows(record)}>
                                                <Icon 
                                                    type="star" 
                                                    theme="filled" 
                                                    style={{color: '#faad14'}} />取消关注</a>
                                            : <a onClick={() => this.follows(record)} >
                                                <Icon type="star" />关注</a>) : null
                                        }
                                    </div>
                            )}/>
                        </Table>}
                    </div>
                </div>}
            </div>
        )
    }
}

export default withRouter(Main);
