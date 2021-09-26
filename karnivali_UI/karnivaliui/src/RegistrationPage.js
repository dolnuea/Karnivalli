import React from "react";
import { ReactDOM } from "react";
import {List, InputIrrem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'

    class Register extends Component{
        constructor(props){
            this.state={
                playername:'',
                password:'',
                conpassword:'',
            }


        render(){
            const RadioItem=Radio.RadioItem
            return(
                <div className='pag-register'>
                    <logo/>
                    <list>
                        <InputItem onChange={value=>this.makeleChange('playername', value)}>lbj-playername</InputItem>
                        <InputItem onChange={value=>this.makeleChange('password', value)}>lbj-password</InputItem>
                        <InputItem onChange={value=>this.makeChange('conpassword', value)}>lbj-conpassword</InputItem>
                    </list>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace>
                        <Button type="player">login</Button>
                        <WhiteSpace></WhiteSpace>
                        <Button onClick={this.makeLogin.bing(this)} type ="player">you already have an account</Button>
                    </WhiteSpace>
                    

                </div>
                
            )
        }

        makeLogin(){
            this.props.history.push('/login')

        }

        makeChange(num1,num2){
            this.setState({
                [num1]:num2
            })
        }



    }

}