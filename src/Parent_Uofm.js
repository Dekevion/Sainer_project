import React, {Component} from 'react';
import './Style.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class Parent_Uofm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                isLoggedIn: false,
                userId: 0,
                username: "",
                image: "",
                // power: 0,
            },


            create_new_user_msg: "",
            new_user_error_msg: "",

        };
        console.log('state position')

    }


    // loggedIn = (given_username, given_id) => {
    //     this.setState({user: {isLoggedIn: true, userId: given_id, username: given_username}})
    // };


// DEFAULT STATE
    loggedOut = () => {
        console.log('logging Out');
        this.setState({user: {isLoggedIn: false, userId: 0, username: " "}})
    };


    log_me_in = (e) => {
        e.preventDefault();
        let user_username = document.getElementById("username").value;
        let user_password = document.getElementById("password").value;
        fetch('/verify_user/', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json',
            },
            body: JSON.stringify({
                username: user_username,
                password: user_password,


            })
        })
            .then(data => data.json())

            .then(response => {
                if (response.logged_in === false) {
                    this.setState({error_msg: 'Wrong Username or Password'})
                } else {
                    console.log("response: " + response);

                    this.setState({
                        user: {
                            isLoggedIn: true,
                            username: user_username,
                            userId: response.id,
                            major: response.major,
                            graduation_date: response.graduation_date,
                            year_in_school: response.year_in_school,
                        }
                    });

                }
            })
    };


    create_user = (e) => {
        e.preventDefault();
        let usernameFromInput = document.getElementById("new_username").value;
        let passwordFromInput = document.getElementById("new_password").value;
        let graduation_date_from_input = document.getElementById("new_graduation_date").value;
        let year_in_school = document.getElementById("year_in_school").value;
        fetch("/user/", {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: usernameFromInput,
                password: passwordFromInput,
                graduation: graduation_date_from_input,
                year: year_in_school,
            })
        })
            .then(data => data.json())
            .then(resp => {
                console.log("Response1");
                if (resp === false) {
                    this.setState({new_user_error_msg: "Username is already taken!"});
                } else {
                    console.log("response2: " + resp);
                    this.setState(
                        {
                            user: {
                                isLoggedIn: true,
                                username: resp.username,
                                major: resp.major,
                                graduation_date: resp.graduation_date,
                                year_in_school: resp.year_in_school,
                                userID: resp.id
                            },

                        });
                }
            });
    };


// componentDidMount() {
//     console.log(this.state.health)
// }

    render() {
        console.log('Log:' + this.state.user.isLoggedIn);

        if (this.state.user.isLoggedIn === true) {
            return (<Router>
                    <h1></h1>
                    {/*<ShopComponent></ShopComponent>*/}
                    <Link className='link_link' to='/'>Home/Profile</Link>
                    {/*<Link className='link_link' to='/profile'>profile</Link>*/}
                    <Link onClick={this.loggedOut} className='link_link' to='/'>Log out</Link>

                    <Switch>





                    </Switch>


                </Router>

            )
        } else {
            return (
                <Router>
                    <div id='form_thing'>

                        {/*<h2>Sign in!</h2>*/}

                        {/*<br/>*/}

                        {/*<form onSubmit={this.log_me_in} className='form1'>*/}
                        {/*    {this.state.error_msg}*/}
                        {/*    <div>*/}
                        {/*        <label htmlFor="username">Username: </label>*/}
                        {/*        <input type="text" id='username'/>*/}
                        {/*    </div>*/}

                        {/*    <div>*/}
                        {/*        <label htmlFor="password">Password: </label>*/}
                        {/*        <input type="text" id='password'/>*/}
                        {/*    </div>*/}

                        {/*    <button>Submit</button>*/}
                        {/*</form>*/}
                        {/*<hr/>*/}
                        <p id='dont'>Don't have an account yet? </p>
                        <p id='sign'> Sign up here </p>
                        {this.state.new_user_error_msg} <br/>
                        <form onSubmit={this.create_user} className='form1'>
                            <div className='divvy'>
                            <label htmlFor="new_username">Enter Username: </label>
                            <input type="text" id="new_username"/><br/>
                            </div>

                            <div className='divvy'>
                            <label htmlFor="new_password">Enter Password: </label>
                            <input type="text" id="new_password"/><br/>
                            </div>

                            <div className='divvy'>
                            <label htmlFor="profile_pic">Enter Major: </label>
                            <input type="text" id="profile_pic"/> <br/>
                            </div>

                                <div className='divvy'>
                                <label htmlFor="Year">Select Your Year: </label>
                                    <select name ='year' id='year'>
                                    <option value="">Please choose an option</option>
                                    <option value="Freshman">Freshman</option>
                                    <option value="Sophomore">Sophomore</option>
                                    <option value="Junior">Junior</option>
                                    <option value="Senior">Senior</option>
                                    </select>

                                {/*<input type="select" id="Year"/>*/}
                                </div>
                            <button id='btn'>Submit</button>



                        </form>
                        <br/>

                    </div>
                </Router>
            );


        }
    }
}

export default Parent_Uofm;





