import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Login } from '../../api/account.js';
import { validate_email } from '../../utils/validate.js';
import './index.scss';
import VerificationCode from '../../components/VerificationCode/index.js';

export default class LoginForm extends Component {
    state = {
        username: "",
        password: "",
        verificationcode: "",
    }

    onFinish = (values) => {
        const { username, password, verificationcode } = this.state;
        const responseData = {
            username,
            password,
            verificationcode,
        }
        Login(responseData).then(response => {
            console.log('@response.data', response.data);
            console.log('@value', values);
            console.log('@responseData', responseData);
        }).catch(error => {
            console.log('@error', error);
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
                                rules={[{ required: true, message: '请输入密码!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="请输入密码!"
                                    onChange={this.changePassword}
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
