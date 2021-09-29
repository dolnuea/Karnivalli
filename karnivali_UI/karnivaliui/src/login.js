import React, {Component} from 'react'
import {List,InputItem,WingBlank,WhiteSpace, Button} from 'antd-mobile'

class Login extends Component {
    render() {
        return (
            <div>
                <Login />
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <List>
                    <InputItem>account</InputItem>
                    <InputItem>password</InputItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    <Button type="player">login</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.goToRegPag.bind(this)} type="player">go to register</Button>
                </WingBlank>
            </div>
        )
    }
    
    goToRegPag() {
        this.props.history.push('/register');
    }
}