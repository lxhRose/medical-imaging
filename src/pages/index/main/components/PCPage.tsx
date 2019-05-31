import React from 'react';
import { withRouter } from 'dva/router';
import { ColumnProps } from 'antd/lib/table';
import { Table, Icon, Button, Input, Checkbox} from 'antd';
import DoctorManage from './doctorManage';
import SearchComponents from './searchComponents/searchComponents';

const {Column} = Table;

interface Props {
    option: any
}

class PCPage extends React.PureComponent<Props, any> {
    private columns: Array < ColumnProps < any >>;
    constructor(props) {
        super(props);
    }

    createdColumns = (roleArr, current) => {
        this.columns = [];
        if (current === 'doctorManage' && roleArr.includes(3)) {
            this.columns = [
                {
                    dataIndex: 'name',
                    title: '姓名'
                }, {
                    dataIndex: 'englishName',
                    title: '英文名',
                }, {
                    dataIndex: 'phoneNo',
                    title: '手机号码',
                },  {
                    dataIndex: 'department',
                    title: '科室',
                }, {
                    dataIndex: 'professionalTitle',
                    title: '职位'
                }, {
                    dataIndex: 'isAdmin',
                    title: '是否管理员',
                    render: (text, record, index) => { return <span>{record.isAdmin ? '是' : '否'}</span>}
                }
            ];
        } else if(current === 'logSearch' &&  roleArr.includes(4)) {
            this.columns = [
                {
                    dataIndex: 'userId',
                    title: '用户手机号'
                }, {
                    dataIndex: 'operationType',
                    title: '操作类型',
                }, {
                    dataIndex: 'operationDetail',
                    title: '操作明细',
                },  {
                    dataIndex: 'createTime',
                    title: '创建时间',
                }, {
                    dataIndex: 'updateTime',
                    title: '修改时间'
                }
            ];
        } else if (roleArr.includes(1) || roleArr.includes(2)) {
            let arr = [
                {
                    dataIndex: 'hospExamDisplayId',
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
            ];
            arr.map((item) => {
                if ( roleArr.includes(2)) {
                    this.columns.push(item);
                } else {
                    if (item.dataIndex !== 'patientName' && item.dataIndex !== 'patientSex') {
                        this.columns.push(item);
                    }
                }
            });
        }
    }
    
    render() {
        const {
            data,
            pageSize,
            totalRecord,
            roleArr,
            current,
            loading,
            pageNumber,
            showAddDoctorState,
            handleChangePage,
            handleChangePageSize,
            showReport,
            delfollows,
            follows,
            showAddDoctor
        } = this.props.option;
        this.createdColumns(roleArr, current);

        return(
            <div className="PC-page">
                {current === 'doctorManage' && roleArr.includes(3)
                    && <Button type="primary"
                     className="addDoctor" 
                     onClick={showAddDoctor}>{showAddDoctorState?'医生列表':'添加医生'}</Button>}
                {current === 'alipay' && (roleArr.includes(2) || roleArr.includes(1))
                    && <SearchComponents/>}
                {showAddDoctorState 
                ? <div>{roleArr.includes(3) && 
                    <div className='PC-doctorManage'>
                        <DoctorManage/>
                    </div>}
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
                        onChange: handleChangePage,
                        onShowSizeChange: handleChangePageSize,
                        showTotal: (totalNum, range) =>
                        `显示 ${range[0]} 到 ${range[1]}, 共有${totalNum} 条记录`,
                    }}>
                    {this.columns.map((column, i) => <Column {...column} key={i} align={"center"}/>)}
                    {(roleArr.includes(2) || roleArr.includes(1)) && current !== 'doctorManage' && current !== 'logSearch' && 
                        <Column
                            title="操作"
                            dataIndex="action"
                            width="250px"
                            align={"center"}
                            render={(text, record:any) => (
                                <div className="action">
                                    <a href={record.filmViewerUrl} target="_blank"><Icon type="picture" />影像</a>
                                    <a onClick={() => showReport(record)}>
                                        <Icon type="medicine-box" />报告</a>
                                    {roleArr.includes(2)  ? (current === 'followedExams'
                                        ? <a onClick={() => delfollows(record)}>
                                            <Icon 
                                                type="star" 
                                                theme="filled" 
                                                style={{color: '#faad14'}} />取消关注</a>
                                        : <a onClick={() => follows(record)} >
                                            <Icon type="star" />关注</a>) : null
                                    }
                                </div>
                        )}/>
                    }
                </Table>}
            </div>
        )
    }
}

export default withRouter(PCPage);
