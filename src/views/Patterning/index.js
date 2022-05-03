import { Button } from 'antd';
import React, { Component } from 'react'
import gif from './test.gif'

export default class index extends Component {
  state = {
    time: 5
  }

  daojishi = () => {
    this.timer = setInterval(() => {
      const { time } = this.state;
      this.setState({ time: time - 1 });
      if (time <= 0) {
        clearInterval(this.timer);
        this.setState({ time: 5 });
      }
    }, 1000)
  }

  render() {
    return (
      <div>{this.state.time !== 0 ? <h1>{'距离 下班'}<br/>{'倒计时:' + this.state.time + 'S'}<br/></h1> : <img src={gif} alt='test.gif' />}
        <br /><br />
        <Button onClick={this.daojishi} >开始倒计时</Button>
      </div>
    )
  }
}
