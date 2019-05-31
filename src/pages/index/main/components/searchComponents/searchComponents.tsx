import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Icon, Button, Input, Checkbox, Modal} from 'antd';
import './searchComponents.less';

const Search = Input.Search;
const plainOptions = ['CT', 'DX', 'CR','US', 'MR', 'SC','MG', 'RF', 'ES','XA', 'PT', 'OP','PX', 'NM', 'OPT'];

interface Props {
    dispatch?: any,
    App?: any,
}

@connect(state => ({
    App: state.App,
}))
class SearchComponents extends React.PureComponent<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            showSearchBox: false,
            modalityTypes: [],
            patientName: '',
            displayId: ''
        }
    }
    
    onChange = (checkedValues) => {
        this.setState({
            modalityTypes: checkedValues
        });
    }

    toggleShowSearchBox = (val) => {
        this.setState({
            showSearchBox: val
        });
    }

    reset = () => {
        this.setState({
            modalityTypes: [],
            patientName: '',
            displayId: ''
        });
    }

    setValue = (e, type) => {
        this.setState({
            [type]: e.target.value
        });
    }

    setNameAndSubmit = (value) =>{
        this.props.dispatch({
            type: 'main/loadList',
            payload: {
                patientName: value,
            }
        });
    }

    submit = () => {
        const {
            modalityTypes,
            patientName,
            displayId
        } = this.state;

        let payload = {};

        if (this.props.App.roleArr.includes(1)) {
            if (patientName !== '' && displayId !== '') {
                payload = {
                    patientName: patientName,
                    displayId: displayId,
                }
            } else {
                Modal.error({title: '请填写完整搜索条件！'});
                return;
            }
        } else {
            payload = {
                patientName: patientName,
                displayId: displayId,
                modalityTypes: modalityTypes.join('&modalityTypes=')
            }
        }

        this.props.dispatch({
            type: 'main/loadList',
            payload: payload
        });
    }

    render() {
        const {
            modalityTypes,
            showSearchBox,
            patientName,
            displayId
        } = this.state;

        const {roleArr} = this.props.App;

        return(
            <div className="searchBox">
                {roleArr.includes(2) &&
                    <Search
                        className="search"
                        placeholder="姓名"
                        onSearch={value => this.setNameAndSubmit(value)}/>
                }
                <div className="button"
                    onMouseOver={()=>this.toggleShowSearchBox(true)}
                    onMouseOut={()=>this.toggleShowSearchBox(false)}>
                    高级筛选<Icon type="caret-down" />

                    <div className="positionBox" hidden={!showSearchBox}>
                        <div className="inputWrap">
                            <label className="label">姓名</label>
                            <Input className="input"
                             onChange={(e) => this.setValue(e, 'patientName')}
                             value={patientName} />
                        </div>
                        <div className="inputWrap">
                            <label className="label">ID号</label>
                            <Input className="input"
                             onChange={(e) => this.setValue(e, 'displayId')}
                             value={displayId} />
                        </div>
                        {roleArr.includes(2) &&
                            <div className="CheckboxWrap">
                                <label className="label">设备类型</label>
                                <Checkbox.Group
                                className="CheckboxGroup"
                                options={plainOptions} 
                                onChange={this.onChange}
                                value={modalityTypes} />
                            </div>
                        }
                        <div className="btn_wrap">
                            <Button type="primary" onClick={this.submit}>搜索</Button>
                            <Button type="default" onClick={this.reset}>重置</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchComponents);
