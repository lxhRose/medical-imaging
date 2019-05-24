import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import {Row, Col, Input, Button, Icon } from 'antd';
import './report.less';

const Search = Input.Search;
const { TextArea } = Input;

interface Props {
    dispatch?: any,
    report?: any,
    App?: any,
    option: any
}

@connect(state => ({
    report: state.report,
    App: state.App,
}))
class Report extends React.PureComponent<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            selectedRight: 'left',
            hover: '',
            openChild: false,
            xtzskData: ['新标签'],
            grzskData: [],
        }
    }

    componentDidMount() {
        this.getReport();
    }

    getReport = () => {
        const {option} = this.props;
        this.props.dispatch({
            type: 'report/getReport',
            payload: {
                examId: option.id,
                hospId: option.hospId
            }
        });
    }

    menuClick = (type) => {
        this.setState({
            selected: type
        });
    }
    
    rightMenuClick = (type) => {
        this.setState({
            selectedRight: type
        });
    }
    
    showAdd = (type) => {
        this.setState({
            hover: type
        });
    }

    hiddenAdd = () => {
        this.setState({
            hover: ''
        });
    }

    openChild = () => {
        this.setState({
            openChild: true
        });
    }

    hiddeChild = () => {
        this.setState({
            openChild: false
        });
    }

    onChange = (checked) => {
        console.log(`switch to ${checked}`);
    }
    
    render() {
        const {
            selected,
            hover, 
            xtzskData, 
            openChild, 
            grzskData, 
            selectedRight,
        } = this.state;
        const {
            isMobile,
        } = this.props.App;
        const {data} = this.props.report;
        const {option} = this.props;

        return(
            <div className={isMobile ? "Mobile-Report-page" : "Report-page"}>
                <div className="content">
                    <Row>
                        {/* {!isMobile && 
                            <Col className="left-box">
                                <div className="scroll">
                                    <div className="Search">
                                        <Search
                                        placeholder="Search"
                                        onSearch={value => console.log(value)}
                                        enterButton/>
                                    </div>
                                    <ul className="menu-ul">
                                        <li>
                                            <div className={selected === 'xtzsk' ? "selected title" : "title"}
                                            onClick={()=>this.menuClick('xtzsk')}
                                            onMouseOver={()=>this.showAdd('xtzsk')}
                                            onMouseOut={this.hiddenAdd}>
                                                <span className="Icon">
                                                    {xtzskData.length > 0 && 
                                                    <span>{openChild 
                                                        ? <span onClick={this.hiddeChild}><Icon type="down" /></span>
                                                        : <span onClick={this.openChild}><Icon type="right" /></span>}
                                                    </span>}
                                                </span>
                                                <span>
                                                    <Icon type="folder" theme="filled" />系统知识库
                                                    <span hidden={!(selected === 'xtzsk' || hover === 'xtzsk')}><Icon type="plus" /></span>
                                                </span>
                                            </div>
                                            <ul className="children" hidden={!openChild}>
                                                {xtzskData.map((item, index) => (
                                                    <li key={index}><Icon type="book" theme="filled" />{item}</li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li>
                                            <div className={selected === 'grzsk' ? "selected title" : "title"}
                                            onClick={()=>this.menuClick('grzsk')}
                                            onMouseOver={()=>this.showAdd('grzsk')}
                                            onMouseOut={this.hiddenAdd}>
                                                <span className="Icon">
                                                    {grzskData.length > 0 && 
                                                    <span>{openChild 
                                                        ? <span onClick={this.hiddeChild}><Icon type="down" /></span>
                                                        : <span onClick={this.openChild}><Icon type="right" /></span>}
                                                    </span>}
                                                </span>
                                                <span>
                                                    <Icon type="folder" theme="filled" />个人知识库
                                                    <span hidden={!(selected === 'grzsk' || hover === 'grzsk')}><Icon type="plus" /></span>
                                                </span>
                                                <ul className="children" hidden={!openChild}>
                                                    {grzskData.map((item, index) => (
                                                        <li key={index}><Icon type="book" theme="filled" />{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        } */}
                        <Col className="center-box">
                            <div className="scroll">
                                <div className="userInfo">
                                    <Row>
                                        <Col xxl={8} xl={12} span={24}><span className="label">姓名：</span> {option.patientName}</Col>
                                        <Col xxl={8} xl={12} span={24}><span className="label">性别：</span> {option.patientSex}</Col>
                                        <Col xxl={8} xl={12} span={24}><span className="label">年龄：</span> {option.patientExamAge}</Col>
                                        <Col xxl={8} xl={12} span={24}><span className="label">设备类型：</span> {option.modalityType}</Col>
                                        <Col xxl={8} xl={12} span={24}><span className="label">检查部位：</span> {option.examItemName}</Col>
                                        <Col xxl={8} xl={12} span={24}><span className="label">检查日期：</span> {option.examTime}</Col>
                                    </Row>
                                </div>
                                <div className="btn-group">
                                    {/* <Button type="default">查看申请</Button> */}
                                    <a href={option.filmViewerUrl} target="_blank">打开影像</a>
                                </div>
                                <div className="textarea-wrap">
                                    <h4>影像所见</h4>
                                    <TextArea rows={3} readOnly value={data.studyResult}></TextArea>
                                </div>
                                <div className="textarea-wrap">
                                    <h4>影像结论</h4>
                                    <TextArea rows={3} readOnly value={data.diagnoseResult}></TextArea>
                                </div>
                                <div className="textarea-wrap">
                                    <h4>医生建议</h4>
                                    <TextArea rows={3} readOnly value={data.doctorAdvice}></TextArea>
                                </div>
                                {isMobile 
                                    ? <Row>
                                        <Col span={24}>
                                            <span>报告医师：{data.reportDoctor}</span>
                                        </Col>
                                        <Col span={24}>
                                            <span>
                                                报告时间：{data.reportTime}
                                            </span>
                                        </Col>
                                        <Col span={24}>
                                            <span>审核医师：{data.reviewDoctor}</span>
                                        </Col>  
                                        <Col span={24}>
                                            <span>
                                                审核时间：{data.reviewTime}
                                            </span>
                                        </Col>  
                                    </Row>
                                    : <Row>
                                        <Col xxl={12} span={24}>
                                            <span style={{display: 'inline-block', width: '140px'}}>报告医师：{data.reportDoctor}</span>
                                            <span>
                                                报告时间：{data.reportTime}
                                            </span>
                                        </Col>
                                        <Col xxl={12} span={24}>
                                            <span style={{display: 'inline-block', width: '140px'}}>审核医师：{data.reviewDoctor}</span>
                                            <span>
                                                审核时间：{data.reviewTime}
                                            </span>
                                        </Col>  
                                    </Row>}
                            </div>
                        </Col>
                        {!isMobile && 
                            <Col className="right-box">
                                <div className="scroll">
                                    <ul className="ul-menu">
                                        <li className={selectedRight === 'left' && "activeLeft"}
                                        onClick={()=>this.rightMenuClick('left')}>检查信息</li>
                                        <li className={selectedRight === 'right' && "activeRight"}
                                        onClick={()=>this.rightMenuClick('right')}>历史检查</li>
                                    </ul>
                                    <ul className="leftBox" hidden={!(selectedRight === 'left')}>
                                        <li>
                                            <span>ID号</span>
                                            <span>{option.hospExamExternalId}</span>
                                        </li>
                                        <li>
                                            <span>姓名</span>
                                            <span>{option.patientName}</span>
                                        </li>
                                        <li>
                                            <span>性别</span>
                                            <span>{option.patientSex}</span>
                                        </li>
                                        <li>
                                            <span>出生日期</span>
                                            <span>{option.patientBirthday}</span>
                                        </li>
                                        <li>
                                            <span>年龄</span>
                                            <span>{option.patientExamAge}</span>
                                        </li>
                                        {/* <li>
                                            <span>体重</span>
                                            <span>{option.patientName}</span>
                                        </li> */}
                                        {/* <li>
                                            <span>是否紧急</span>
                                            <span>{option.patientName}</span>
                                        </li> */}
                                        {/* <li>
                                            <span>专家会诊</span>
                                            <span>{option.patientName}</span>
                                        </li> */}
                                        {/* <li>
                                            <span>来源类别</span>
                                            <span>{option.patientName}</span>
                                        </li> */}
                                        {/* <li>
                                            <span>申请科室</span>
                                            <span>{option.patientName}</span>
                                        </li> */}
                                        <li>
                                            <span>检查日期</span>
                                            <span>{option.examTime}</span>
                                        </li>
                                        <li>
                                            <span>设备类型</span>
                                            <span>{option.modalityType}</span>
                                        </li>
                                        <li>
                                            <span>检查部位</span>
                                            <span>{option.examItemName}</span>
                                        </li>
                                        {/* <li>
                                            <span>检查描述</span>
                                            <span>{option.patientName}</span>
                                        </li>
                                        <li>
                                            <span>临床诊断</span>
                                            <span>{option.patientName}</span>
                                        </li> */}
                                    </ul>
                                    <div className="rightBox" hidden={!(selectedRight === 'right')}>
                                        <div className="whiteBox">
                                            未找到历史检查     
                                        </div>
                                    </div>
                                    <div className="myRW">
                                        <h4>我的任务<span className="number-box">0</span></h4>
                                        <div className="whiteBox">
                                            暂时没有已分配任务     
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        }
                    </Row>
                </div>
            </div>
        )
    }
}

export default withRouter(Report);
