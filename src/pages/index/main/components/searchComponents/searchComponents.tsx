import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Icon, Button, Input, Checkbox} from 'antd';
import './searchComponents.less';

const Search = Input.Search;
const plainOptions = ['CT', 'DX', 'CR','US', 'MR', 'SC','MG', 'RF', 'ES','XA', 'PT', 'OP','PX', 'NM', 'OPT'];

interface Props {
    dispatch?: any,
    main?: any,
    form?: any,
}

@connect(state => ({
    main: state.main,
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

    render() {
        const {
            modalityTypes,
            showSearchBox,
            patientName,
            displayId
        } = this.state;

        return(
            <div className="searchBox">
                <Search
                    className="search"
                    placeholder="姓名"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}/>
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
                        <div className="CheckboxWrap">
                            <label className="label">设备类型</label>
                            <Checkbox.Group
                            className="CheckboxGroup"
                            options={plainOptions} 
                            onChange={this.onChange}
                            value={modalityTypes} />
                        </div>
                        <div className="btn_wrap">
                            <Button type="primary">搜索</Button>
                            <Button type="default" onClick={this.reset}>重置</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchComponents);
