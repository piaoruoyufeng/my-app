import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Login } from '../../api/account.js';
import { validate_email, validate_password } from '../../utils/validate.js';
import './index.scss';
import VerificationCode from '../../components/VerificationCode/index.js';
import CryptoJS from 'crypto-js';

export default class LoginForm extends Component {
    state = {
        username: "",
        password: "",
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
        Login(responseData).then(response => {

            for (let i = 0; i < response.data.length; i++) {
                if (responseData.username === response.data[i].username && responseData.password === response.data[i].password && responseData.verificationcode === response.data[i].verificationcode) {
                    this.setState({ loading: true });
                    message.success('登录成功!', 1);
                    return;
                }
                else {
                    this.setState({ loading: false });
                    message.error('登录失败!');
                    return;
                }
            }
        }).catch(error => {
            console.log('@error', error);
            this.setState({ loading: false });
            message.error('登录失败，请检查用户名或密码是否正确!');
            return;
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

    changeVerificationCode = (verificationcode) => {
        this.setState({ verificationcode });
    }

    render() {
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
                            <VerificationCode username={this.state.username} changeVerificationCode={this.changeVerificationCode} />
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    loading={this.state.loading}
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
