import React from 'react';
import { withRouter } from 'dva/router';
import { Icon, List, Button } from 'antd';
import DoctorManage from './doctorManage';

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
            role,
            current,
            isAdmin,
            showAddDoctorState,
            handleChangePage,
            handleChangePageSize,
            showReport,
            delfollows,
            follows,
            showAddDoctor
        } = this.props.option;

        return(
            <div className="Mobile-page">
                <p>共 <strong>{totalRecord}</strong> 条数据</p>
                {current === 'doctorManage' && isAdmin
                    && <Button type="primary"
                     className="addDoctor" 
                     onClick={showAddDoctor}>{showAddDoctorState?'医生列表':'添加医生'}</Button>}
                {showAddDoctorState 
                ? <div>{isAdmin && 
                    <div className='Mobile-doctorManage'>
                        <DoctorManage/>
                    </div>}
                </div>
                : <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: handleChangePage,
                        pageSize: pageSize,
                        total: totalRecord,
                        showSizeChanger: true,
                        onShowSizeChange: handleChangePageSize,
                    }}
                    dataSource={data}
                    renderItem={(item, index) => (
                        <div key={index} className="Mobile_list">
                            {(current === 'doctorManage' && isAdmin)
                            ? doctorList(item)
                            : medicalList(item, role, showReport, current, delfollows, follows)}
                        </div>
                    )}
                />}
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

function medicalList(item, role, showReport, current, delfollows, follows) {
    return <div>
        <div className="row">
            <span>ID号</span>
            <span>{item.hospExamDisplayId}</span>
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
        <div className="row actionRow">
            <span>操作</span>
            <span>
                <div className="action">
                    <a href={item.filmViewerUrl} target="_blank"><Icon type="picture" />影像</a>
                    <a onClick={() => showReport(item)}>
                        <Icon type="medicine-box" />报告</a>
                    {role === 2  ? (current === 'followedExams'
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
