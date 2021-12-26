import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Login, GetVerificationCode } from '../../api/account.js';
import { validate_email } from '../../utils/validate.js';
import './index.scss';

export default class LoginForm extends Component {
    state = {
        username: "",
        password: "",
        verificationcode: "",
        verificationcode_button_disabled: true,
        verificationcode_button_loading: false,
        verificationcode_button_text: "获取验证码",
    }
    onFinish = (values) => {
        const responseData = {
            username: this.state.username,
            password: this.state.password,
            verificationcode: this.state.verificationcode
        }
        Login(responseData).then(response => {
            console.log(response.data);
            console.log(values);
            console.log(responseData);
        }).catch(error => {
            console.log(error);
        })
    }

    getVerificationCode = () => {
        if (!(this.state.username && this.state.password)) {
            message.warning('用户名或密码不能为空', 1);
            return false;
        }
        this.setState({ verificationcode_button_loading: true, verificationcode_button_text: "获取中" })
        const responseData = {
            username: this.state.username,
        }
        GetVerificationCode(responseData).then(response => {
            console.log(response.data);
            console.log(responseData);
        }).catch(error => {
            console.log(error);
        })
    }

    zhuCe = () => {
        this.props.changeForm();
    }

    changeUsername = (event) => {
        this.setState({ username: event.target.value });
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    changeVerificationCode = (event) => {
        this.setState({ verificationcode: event.target.value });
    }

    render() {
        const _this = this;
        return (
            <div className='form-wrap'>
                <div>
                    <div className='form-header'>
                        <span className='column-left'>登录</span>
                        <span className='column-right' onClick={this.zhuCe}>没有账号？前去注册</span>
                    </div>
                    <div className='form-content'>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' },
                                // { type: 'email', message: 'Not a valid username!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (getFieldValue('username') && validate_email(value)) {
                                            _this.setState({ verificationcode_button_disabled: false });
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Not a valid username!'));
                                    },
                                }),]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Username" onChange={this.changeUsername} />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.changePassword}
                                />
                            </Form.Item>
                            <Form.Item
                                name="verification code"
                                rules={[{ required: true, message: 'Please input Verification Code!' }]}>
                                <Row gutter={13}>
                                    <Col span={15}>
                                        <Input
                                            prefix={<SafetyCertificateOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="Verification Code"
                                            onChange={this.changeVerificationCode}
                                        />
                                    </Col>
                                    <Col span={9}>
                                        <Button
                                            type="danger"
                                            htmlType="button"
                                            className="login-form-button"
                                            onClick={this.getVerificationCode}
                                            disabled={this.state.verificationcode_button_disabled}
                                            loading={this.state.verificationcode_button_loading}
                                            block>
                                            {this.state.verificationcode_button_text}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    block>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
