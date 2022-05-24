import React, { Component } from 'react';
import { Layout } from 'antd';
import "./index.scss";
import MySider from '../../components/MySider';
import MyHeader from '../../components/MyHeader';
import { removeToken } from '../../utils/session';
import Patterning from '../Patterning'

const { Header, Footer, Sider, Content } = Layout;

export default class Home extends Component {
    render() {
        removeToken('超时失效');
        return (
            <Layout className='layout-wrap'>
                <Header className='layout-header'><MyHeader /></Header>
                <Layout>
                    <Sider width="250px"><MySider /></Sider>
                    <Content className='layout-main'><Patterning /></Content>
                </Layout>
                <Footer className='layout-footer'>我爱学习</Footer>
            </Layout>
        )
    }
}
