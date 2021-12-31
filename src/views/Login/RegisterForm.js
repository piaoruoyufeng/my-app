import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { validate_password, validate_email } from '../../utils/validate.js';
import { Login } from '../../api/account.js';
import './index.scss';
import VerificationCode from '../../components/VerificationCode/index.js';

export default class RegisterForm extends Component {
    state = {
        username: "",
        password: "",
        passwordagain: "",
        verificationcode: "",
    }

    onFinish = (values) => {
        const responseData = {
            username: this.state.username,
            password: this.state.password,
            verificationcode: this.state.verificationcode
        }
        Login(responseData).then(response => {
            console.log('@response.data', response.data);
            console.log('@value', values);
            console.log('@responseData', responseData);
        }).catch(error => {
            console.log('@error', error);
        })
    }

    denglu = () => {
        this.props.changeForm();
    }

    changeUsername = (event) => {
        this.setState({ username: event.target.value });
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    changePasswordAgain = (event) => {
        this.setState({ passwordagain: event.target.value });
    }

    render() {
        return (
            <div className='form-wrap'>
                <div>
                    <div className='form-header'>
                        <span className='column-left'>注册</span>
                        <span className='column-right' onClick={this.denglu}>已有账户？返回登录</span>
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
                                rules={[{ required: true, message: '请输入用户名!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (getFieldValue('username') && validate_email(value)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('用户名格式错误!'));
                                    },
                                }),]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="请输入用户名!" onChange={this.changeUsername}
                                    autoComplete="true"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' },
                                { pattern: validate_password, message: '密码格式错误!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="请输入密码!"
                                    onChange={this.changePassword}
                                    autoComplete="true"
                                />
                            </Form.Item>
                            <Form.Item
                                name="passwordagain"
                                rules={[{ required: true, message: '请再次输入密码!' },
                                { pattern: validate_password, message: '密码格式错误!' },
                                ({ getFieldValue }) => ({
                                    validator(_, passwordagain) {
                                        if (!passwordagain || getFieldValue('password') === passwordagain) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次输入的密码不一致!'));
                                    },
                                }),
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="请再次输入密码!"
                                    onChange={this.changePasswordAgain}
                                    autoComplete="true"
                                />
                            </Form.Item>
                            <VerificationCode username={this.state.username} />
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    block>
                                    注册
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
