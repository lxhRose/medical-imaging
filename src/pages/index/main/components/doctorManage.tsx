import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Form, Input, Button, Checkbox, Modal } from 'antd';

interface Props {
    dispatch?: any,
    main?: any,
    form?: any,
}

@connect(state => ({
    main: state.main,
}))
class DoctorManage extends React.PureComponent<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.props.dispatch({
                type: 'main/doctors',
                payload: [{
                    name: values.name,
                    englishName: values.englishName,
                    phoneNo: values.phoneNo,
                    department: values.department,
                    professionalTitle: values.professionalTitle,
                    isAdmin: this.state.checked,
                }]
            }).then((res) => {
                if (parseInt(res.meta.code) === 200) {
                    Modal.success({
                        title: '操作成功',
                        content: '添加医生成功!'
                    });
                }
            })
          }
        });
    }

    onChange = (e) => {
        this.setState({
            checked: e.target.checked
        });
    }

    valiPhone = (e) => {
        const val = e.target.value;
        if (val) {
            const path = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            const isVali = path.test(val);
            if (!isVali) {
                this.props.form.setFields({
                    phoneNo: {
                        value: val,
                        errors: [new Error('手机号码格式不正确，请重新输入!')],
                    },
                });
            }
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    label="姓名"
                    >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '姓名不能为空!',
                        }],
                    })(
                        <Input type="text" placeholder="请输入医生姓名" />
                    )}
                </Form.Item>
                <Form.Item
                    label="&nbsp;&nbsp;英文名"
                    >
                    {getFieldDecorator('englishName', {})(
                        <Input type="text" placeholder="请输入医生英文名" />
                    )}
                </Form.Item>
                <Form.Item
                    label="手机号码"
                    >
                    {getFieldDecorator('phoneNo', {
                        rules: [{ required: true, message: '手机号码不能为空!' }],
                    })(
                        <Input addonBefore="+86" 
                        placeholder="请输入手机号码" 
                        type="number"
                        onBlur={this.valiPhone} style={{ width: '100%' }} />
                    )}
                </Form.Item>
                <Form.Item
                    label="&nbsp;&nbsp;科室"
                    >
                    {getFieldDecorator('department', {})(
                        <Input type="text" placeholder="请输入医生科室" />
                    )}
                </Form.Item>
                <Form.Item
                    label="&nbsp;&nbsp;职位"
                    >
                    {getFieldDecorator('professionalTitle', {})(
                        <Input type="text" placeholder="请输入医生职位" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Checkbox onChange={this.onChange}>设置为管理员</Checkbox>
                </Form.Item>
                <Button type="primary" size="large" htmlType="submit" className="sbmit-btn">添加医生</Button>
            </Form>
        )
    }
}

export default withRouter(Form.create()(DoctorManage));
