import React from "react";
import { ReactDOM } from "react";
import { useHistory } from 'react-router-dom';

Router.post('/logout',async(prev,next)=>{

    let user=prev.request.body
    let userName= user.userName
    prev.user={
        message:"you are logout"
    }
})