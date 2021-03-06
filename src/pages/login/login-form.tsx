import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import React from 'react';
import { withRouter } from 'dva/router'
import { connect } from 'dva';
// import MD5 from 'crypto-js/md5';
import {Modal, Row, Col} from 'antd';

const FormItem = Form.Item;
const TOKEN = 'token';

interface Props {
  dispatch?: any,
  location?: any,
  history?: any
}

@connect((state) => ({
}))
class NormalLoginForm extends React.Component<Props & FormComponentProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            sendSms: false,
            countDown: 60,
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'login/Login',
                    payload: {
                        phoneNo: values.mobile,
                        code: values.code
                    }
                }).then((response) => {
                    if (parseInt(response.meta.code) === 200) {
                        sessionStorage.setItem(TOKEN, response.body.token);
                        // this.props.dispatch({
                        //     type: 'main/changeRole',
                        //     payload: { role: response.body.role }
                        // });
                        const { history } = this.props;
                        history.replace(`/main`);
                    }
                })
            }
        });
    }

    sendSms = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {mobile} = values;
                const path = /^[1][3,4,5,7,8][0-9]{9}$/;
                const isVali = path.test(mobile);
                    if (isVali) {
                        this.setState({
                            sendSms: true
                        });
                        const timer = setInterval(() => {
                            this.setState({ countDown: this.state.countDown - 1 });
                            if (this.state.countDown === 0) {
                            this.setState({ sendSms: false, countDown: 60 });
                            clearInterval(timer);
                            }
                        }, 1000);
                        this.props.dispatch({
                            type: 'login/sendSms',
                            payload: {
                                phoneNo: mobile
                            }
                        });
                    } else {
                        Modal.error({title: '提示', content: '请填写正确的手机号！'});
                    }
                }
        });
    }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('mobile', {
          })(
            <Input prefix={<Icon type="mobile" 
            style={{ color: 'rgba(0,0,0,.25)' }} />} 
            placeholder="请输入您的手机号" />
          )}
        </FormItem>
        <FormItem>
          <Row gutter={16}>
            <Col span={14}>
              {getFieldDecorator('code', {})(
                <Input placeholder="请输入短信验证码" />
              )}
            </Col>
            <Col span={10}>
              {this.state.sendSms ? <Button type="primary" disabled>{this.state.countDown}s</Button> 
              : <Button type="primary" onClick={this.sendSms}>发送验证码</Button>}
            </Col>
          </Row>
        </FormItem>
        <FormItem className="login_submit_btn">
          <Button type="primary" size="large" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default withRouter(WrappedNormalLoginForm);
