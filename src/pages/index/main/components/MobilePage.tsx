import React from 'react';
import { withRouter } from 'dva/router';
import { Icon, List, Button, Pagination } from 'antd';
import DoctorManage from './doctorManage';
import SearchComponents from './searchComponents/searchComponents';

interface Props {
    option: any,
}

class MobilePage extends React.PureComponent<Props, any> {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {
            data,
            pageSize,
            totalRecord,
            roleArr,
            current,
            paginationCurrent,
            showAddDoctorState,
            handleChangePage,
            showReport,
            delfollows,
            follows,
            showAddDoctor
        } = this.props.option;

        return(
            <div className="Mobile-page">
                {current === 'doctorManage' && roleArr.includes(3)
                && <Button className="addDoctor"
                        onClick={showAddDoctor}>{showAddDoctorState?'医生列表':'添加医生'}</Button>}
                {current === 'alipay' && (roleArr.includes(2) || roleArr.includes(1))
                    && <SearchComponents/>}
                {showAddDoctorState 
                ? <div>{roleArr.includes(3) && 
                    <div className='Mobile-doctorManage'>
                        <DoctorManage/>
                    </div>}
                </div>
                : <div>
                    <Pagination
                        total={totalRecord}
                        onChange={handleChangePage}
                        pageSize={pageSize}
                        current={paginationCurrent}
                        // hideOnSinglePage={true}
                        showTotal = {(totalNum, range) => <span>共有 <strong>{totalNum}</strong> 条记录</span>}
                        style={{textAlign: 'center', paddingTop: '10px'}} />
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            total: totalRecord,
                            onChange: handleChangePage,
                            pageSize: pageSize,
                            hideOnSinglePage: true,
                            current: paginationCurrent,
                            showTotal: (totalNum, range) => <span>共有 <strong>{totalNum}</strong> 条记录</span>
                        }}
                        dataSource={data}
                        renderItem={(item, index) => (
                            <div key={index} className="Mobile_list">
                                {current === 'doctorManage' && roleArr.includes(3) 
                                    && doctorList(item)}
                                {current === 'logSearch' && roleArr.includes(4) 
                                    && logList(item)}
                                {(current === 'alipay' || current === 'followedExams') 
                                    && (roleArr.includes(1) || roleArr.includes(2))
                                    && medicalList(item, roleArr, showReport, current, delfollows, follows)}
                            </div>
                        )}
                    />
                </div>}
            </div>
        )
    }
}

function doctorList(item) {
    return <div>
        <div className="row">
            <span>姓名</span>
            <span>{item.name}</span>
        </div>
        <div className="row">
            <span>英文名</span>
            <span>{item.englishName}</span>
        </div>
        <div className="row">
            <span>手机号码</span>
            <span>{item.phoneNo}</span>
        </div>
        <div className="row">
            <span>科室</span>
            <span>{item.department}</span>
        </div>
        <div className="row">
            <span>职位</span>
            <span>{item.professionalTitle}</span>
        </div>
        <div className="row">
            <span>是否管理员</span>
            <span>{item.isAdmin ? '是' : '否'}</span>
        </div>
    </div>
}

function logList(item) {
    return <div>
        <div className="row">
            <span>用户手机号</span>
            <span>{item.userId}</span>
        </div>
        <div className="row">
            <span>操作类型</span>
            <span>{item.operationType}</span>
        </div>
        <div className="row">
            <span>操作明细</span>
            <span>{item.operationDetail}</span>
        </div>
        <div className="row">
            <span>创建时间</span>
            <span>{item.createTime}</span>
        </div>
        <div className="row">
            <span>修改时间</span>
            <span>{item.updateTime}</span>
        </div>
    </div>
}

function medicalList(item, roleArr, showReport, current, delfollows, follows) {
    return <div>
        <div className="row">
            <span>ID号</span>
            <span>{item.hospExamDisplayId}</span>
        </div>
        {roleArr.includes(2) &&
            <div className="row">
                <span>姓名</span>
                <span>{item.patientName}</span>
            </div>}
        {roleArr.includes(2) &&
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
        <div className="row actionRow">
            <span>操作</span>
            <span>
                <div className="action">
                    <a href={item.filmViewerUrl} target="_blank"><Icon type="picture" />影像</a>
                    <a onClick={() => showReport(item)}>
                        <Icon type="medicine-box" />报告</a>
                    {roleArr.includes(2)  ? (current === 'followedExams'
                        ? <a onClick={() => delfollows(item)}>
                            <Icon 
                                type="star" 
                                theme="filled" 
                                style={{color: '#faad14'}} />取消关注</a>
                        : <a onClick={() => follows(item)}>
                            <Icon type="star" />关注</a>) : null
                    }
                </div>
            </span>
        </div>
    </div>
}

export default withRouter(MobilePage);
