import React from 'react';
import ReactDOM from 'react-dom';

class Yahoo extends React.Component{
    render(){
        return (<div>
                     <h1>Sign Up</h1>

                    <label ><b>firstName</b></label>
                    <input type="text" placeholder="Enter firstName" name="firstName" />

                    <label ><b>lastName</b></label>
                    <input type="text" placeholder="Enter lastName" name="lastName" />

                    <label ><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" />

                    <label ><b>country</b></label>
                    <input type="text" placeholder="Enter country" name="country" />

                    <label ><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" />

                    <label ><b>Repeat Password</b></label>
                    <input type="userName" placeholder="userName" name="userName"/ >

                    <button type="button" class="signinbtn">SignIn</button>
                    <button type="submit" class="signupbtn">Sign Up</button>
            </div>)
    }
}
           

ReactDOM.render(<Yahoo/>,document.getElementById('app'));