import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { validate_password, validate_email } from '../../utils/validate.js';
import { Register } from '../../api/account.js';
import './index.scss';
import VerificationCode from '../../components/VerificationCode/index.js';
import CryptoJS from 'crypto-js';
export default class RegisterForm extends Component {
    state = {
        username: "",
        password: "",
        passwordagain: "",
        verificationcode: "",
        loading: false,
    }

    onFinish = () => {
        const { username, password, verificationcode } = this.state;
        const responseData = {
            username,
            password: CryptoJS.MD5(CryptoJS.MD5(password).toString()).toString(),
            verificationcode,
        }
        Register(responseData).then(response => {
            console.log(responseData)
            console.log(response)
            for (let i = 0; i < response.data.length;) {
                if (responseData.username !== response.data[i].username) {
                    i++;
                }
                else {
                    this.setState({ loading: true });
                    message.warn('该用户已注册，自动返回登录页面中......', 1);
                    setTimeout(() => {
                        this.denglu();
                    }, 3000);
                    return;
                }
            }
            this.setState({ loading: true });
            message.success('注册成功，自动返回登录页面中......', 1);
            setTimeout(() => {
                this.denglu();
            }, 3000);
            return;
        }).catch(error => {
            this.setState({ loading: false });
            message.error('注册失败!', 1);
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

    changeVerificationCode = (verificationcode) => {
        this.setState({ verificationcode });
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
                                { pattern: validate_password, message: '密码格式错误!' },
                                ({ getFieldValue }) => ({
                                    validator(_, password) {
                                        if (getFieldValue('passwordagain') && getFieldValue('passwordagain') !== password) {
                                            return Promise.reject(new Error('两次输入的密码不一致!'));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                                ]}
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
                                        if (getFieldValue('password') && getFieldValue('password') !== passwordagain) {
                                            return Promise.reject(new Error('两次输入的密码不一致!'));
                                        }
                                        return Promise.resolve();
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
                            <VerificationCode username={this.state.username} changeVerificationCode={this.changeVerificationCode} />
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    loading={this.state.loading}
                                    block>
                                    注册
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div >
        )
    }
}
