import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Login } from '../../api/account.js';
import './index.scss';

export default class LoginForm extends Component {
    onFinish = (values) => {
        Login().then(response => {
            console.log(response.data);
            console.log(values);
        }).catch(error => {
            console.log(error);
        })
    };
    zhuCe = () => {
        this.props.changeForm();
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
                                rules={[{ required: true, message: 'Please input your Username!' }, { type: 'email', message: 'Not a valid email!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
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
