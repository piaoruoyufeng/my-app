import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { GetVerificationCode } from '../../api/account.js';
import { validate_email } from '../../utils/validate.js';

export default class VerificationCode extends Component {
    state = {
        username: "",
        verificationcode_button_loading: false,
        verificationcode_button_text: "获取验证码",
        count_down_number: 6,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const oldState = prevState;
        const newState = nextProps;
        if (oldState !== newState) {
            const username = newState;
            return username
        }
        new VerificationCode(nextProps).setState({ username: nextProps });
        return null;
    }

    changeVerificationCode = (event) => {
        this.props.changeVerificationCode(event.target.value);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    getVerificationCode = () => {
        const { username } = this.state;
        if (username === "") {
            message.warning('用户名或密码不能为空', 1);
            return false;
        }
        if (!validate_email(username)) {
            message.warning('用户名格式错误!', 1);
            return false;
        }
        this.setState({ verificationcode_button_loading: true, verificationcode_button_text: "获取中" })
        const responseData = {
            username,
        }
        GetVerificationCode(responseData).then(response => {
            message.success(`获取验证码成功，验证码是:${response.data.verificationcode}`, 1);
            this.countDown();
        }).catch(error => {
            console.log(error);
            this.setState({
                verificationcode_button_loading: false,
                verificationcode_button_text: "重新获取",
            })
        })
    }

    countDown = () => {
        this.timer = setInterval(() => {
            const { count_down_number } = this.state;
            this.setState({
                verificationcode_button_text: `${count_down_number}S`,
                count_down_number: count_down_number - 1,
            }, console.log(count_down_number))
            if (count_down_number <= 0) {
                clearInterval(this.timer);
                this.setState({
                    verificationcode_button_loading: false,
                    verificationcode_button_text: "重新获取",
                    count_down_number: 6,
                })
                return false;
            }
        }, 1000)
    }

    render() {
        const { username, verificationcode_button_loading, verificationcode_button_text } = this.state;
        return (
            <Form.Item
                name="verification code"
                rules={[{ required: true, message: '请输入六位验证码!', len: 6 }]}>
                <Row gutter={13}>
                    <Col span={15}>
                        <Input
                            prefix={<SafetyCertificateOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入验证码!"
                            autoComplete="true"
                            onChange={this.changeVerificationCode}
                        />
                    </Col>
                    <Col span={9}>
                        <Button
                            type="danger"
                            htmlType="button"
                            className="login-form-button"
                            onClick={this.getVerificationCode}
                            disabled={username === "" ? true : false}
                            loading={verificationcode_button_loading}
                            block>
                            {verificationcode_button_text}
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        )
    }
}
