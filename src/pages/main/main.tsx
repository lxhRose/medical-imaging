import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { ColumnProps } from 'antd/lib/table';
import { Table, Menu, Icon } from 'antd';
import { BadgeProps } from 'antd/lib/badge';
import Report from './../report/report';
import './main.less';

const {Column} = Table;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const data = [
    {
        id: "DR0110580",
        xm: "WANG PENG CEN JIN 488909",
        xb: "女",
        jcnl: "4岁",
        sblx: "CR",
        jcbw: "ANKLE",
        jgmc: "贵航300医院",
        jcrq: "2019-02-20",
        scsj: "29 天前",
        zpdx: "",
        bgzt: "无报告",
    },
    {
        id: "DR0110580",
        xm: "WANG PENG CEN JIN 488909",
        xb: "女",
        jcnl: "4岁",
        sblx: "CR",
        jcbw: "ANKLE",
        jgmc: "贵航300医院",
        jcrq: "2019-02-20",
        scsj: "29 天前",
        zpdx: "",
        bgzt: "无报告",
    },
    {
        id: "DR0110580",
        xm: "WANG PENG CEN JIN 488909",
        xb: "女",
        jcnl: "4岁",
        sblx: "CR",
        jcbw: "ANKLE",
        jgmc: "贵航300医院",
        jcrq: "2019-02-20",
        scsj: "29 天前",
        zpdx: "",
        bgzt: "无报告",
    },
    {
        id: "DR0110580",
        xm: "WANG PENG CEN JIN 488909",
        xb: "女",
        jcnl: "4岁",
        sblx: "CR",
        jcbw: "ANKLE",
        jgmc: "贵航300医院",
        jcrq: "2019-02-20",
        scsj: "29 天前",
        zpdx: "",
        bgzt: "无报告",
    },
    {
        id: "DR0110580",
        xm: "WANG PENG CEN JIN 488909",
        xb: "女",
        jcnl: "4岁",
        sblx: "CR",
        jcbw: "ANKLE",
        jgmc: "贵航300医院",
        jcrq: "2019-02-20",
        scsj: "29 天前",
        zpdx: "",
        bgzt: "无报告",
    },
    {
        id: "DR0110580",
        xm: "WANG PENG CEN JIN 488909",
        xb: "女",
        jcnl: "4岁",
        sblx: "CR",
        jcbw: "ANKLE",
        jgmc: "贵航300医院",
        jcrq: "2019-02-20",
        scsj: "29 天前",
        zpdx: "",
        bgzt: "无报告",
    },
    {
        id: "DR0110580",
        xm: "WANG PENG CEN JIN 488909",
        xb: "女",
        jcnl: "4岁",
        sblx: "CR",
        jcbw: "ANKLE",
        jgmc: "贵航300医院",
        jcrq: "2019-02-20",
        scsj: "29 天前",
        zpdx: "",
        bgzt: "无报告",
    },
    {
        id: "DR0110580",
        xm: "WANG PENG CEN JIN 488909",
        xb: "女",
        jcnl: "4岁",
        sblx: "CR",
        jcbw: "ANKLE",
        jgmc: "贵航300医院",
        jcrq: "2019-02-20",
        scsj: "29 天前",
        zpdx: "",
        bgzt: "无报告",
    },
]

interface Props {
    dispatch?: any,
    main?: any,
}

@connect(state => ({
    main: state.main
}))
class Main extends React.PureComponent<Props, any> {
    private columns: Array < ColumnProps < any >>;
    constructor(props) {
        super(props);
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
        }]
        this.state = {
            current: 'alipay',
            showReport: false,
            option: {}
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

    loadList = () => {
        this.props.dispatch({
            type: 'main/loadList'
        })
    }

    // 更改页码
    handleChangePage = (page: number, values?) => {
        this
        .props
        .dispatch({type: 'main/changePage', payload: page});
        // this.loadList(values); // 页码改变 获取新页列表
    };

    // 更改页码大小
    handleChangePageSize = (page: number, pageSize: number) => {
        this
        .props
        .dispatch({type: 'main/changePageSize', payload: pageSize});
        this.handleChangePage(page); // 更每页条数 导致页码改变
    };

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
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
    
    render() {
        const {
            loading,
            data,
            pageNumber,
            pageSize,
            totalRecord,
        } = this.props.main;

        const {showReport, option} = this.state;

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
                            <Menu.Item key="alipay2">
                                <a>我的任务</a>
                            </Menu.Item>
                            <SubMenu title={<span className="submenu-title-wrapper">快捷查询<Icon type="caret-down" /></span>}>
                                <Menu.Item key="setting:1">今日检查</Menu.Item>
                                <Menu.Item key="setting:2">今日普放</Menu.Item>
                                <Menu.Item key="setting:3">今日CT</Menu.Item>
                            </SubMenu>
                        </Menu>
                        <Table
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
                                width="150px"
                                align={"center"}
                                render={(text, record) => (
                                    <div className="action">
                                        <a><Icon type="picture" />影像</a>
                                        <a onClick={() => this.showReport(record)}><Icon type="medicine-box" />报告</a>
                                    </div>
                            )}/>
                        </Table>
                    </div>
                </div>}
            </div>
        )
    }
}

export default withRouter(Main);
