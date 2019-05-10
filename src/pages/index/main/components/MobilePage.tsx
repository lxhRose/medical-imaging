import React from 'react';
import { withRouter } from 'dva/router';
import { Icon, List } from 'antd';

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
            handleChangePage,
            handleChangePageSize,
            showReport,
            delfollows,
            follows
        } = this.props.option;

        return(
            <div className="Mobile-page">
                <p>共 <strong>{totalRecord}</strong> 条数据</p>
                <List
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
                            <div className="row">
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
                    )}
                />
            </div>
        )
    }
}

export default withRouter(MobilePage);
