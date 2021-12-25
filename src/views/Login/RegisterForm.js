import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { validate_password } from '../../utils/validate.js';
import { Login } from '../../api/account.js';
import './index.scss';

export default class RegisterForm extends Component {
    onFinish = (values) => {
        Login().then(response => {
            console.log(response.data);
            console.log(values);
        }).catch(error => {
            console.log(error);
        })
    };
    denglu = () => {
        this.props.changeForm();
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
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }, { pattern: validate_password, message: 'Not a valid password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="passwordagain"
                                rules={[{ required: true, message: 'Please input your Password Again!' }, { pattern: validate_password, message: 'Not a valid password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, passwordagain) {
                                        if (!passwordagain || getFieldValue('password') === passwordagain) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password Again"
                                />
                            </Form.Item>
                            <Form.Item
                                name="verification code"
                                rules={[{ required: true, message: 'Please input Verification Code!' }]}>
                                <Row gutter={13}>
                                    <Col span={15}>
                                        <Input
                                            prefix={<SafetyCertificateOutlined className="site-form-item-icon" />}
                                            type="number"
                                            placeholder="Verification Code"
                                        /></Col>
                                    <Col span={9}>
                                        <Button type="danger" htmlType="button" className="login-form-button">
                                            获取验证码
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" block>
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
