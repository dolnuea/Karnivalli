import Button from "@restart/ui/esm/Button";
import { useHistory } from 'react-router-dom';
import React from "react";



const Navbar = (props) => {
    const history = useHistory();
    const routeChange = (path) => {
        const userDetails = props.state.state
        history.push(path, userDetails);
    }

    const user = props.state.state
    return (
        <nav className='navbar navbar-expand-md navbar-light bg-primary mb-4'
        >
            <div className='container d-flex justify-content-between'>
                <img
                    className='mr-2'
                    src='./favicon.ico'
                    alt='Company Logo'
                    width='40'
                    height='40'
                />
                <h2 className="m-2 text-white">Karnivali</h2>
                <div className='navbar-collapse collapse w-100 order-3 dual-collapse2'>
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item'
                            style={{ display: user.isGuest ? "none" : true }}>
                            <Button className='btn btn-dark' onClick={() => {
                                routeChange("welcome")
                            }}>
                                Home
                            </Button>
                        </li>
                        <li className='nav-item'
                            style={{ display: user.isGuest ? "none" : true }}>
                            <Button className='btn btn-dark' onClick={() => {
                                routeChange("userProfile")
                            }}>
                                {user.username}
                            </Button>
                        </li>
                        <li
                            className='nav-item mr-md-3'
                            style={{ display: user.isGuest ? true : "none" }}
                        >
                            <Button className='btn btn-dark' onClick={() => {
                                routeChange("")
                            }}>
                                Login
                            </Button>
                        </li>
                        <li
                            className='nav-item'
                            style={{ display: user.isGuest ? true : "none" }}
                        >
                            <Button className='btn btn-dark' onClick={() => {
                                routeChange("sign-up")
                            }}>
                                Signup
                            </Button>
                        </li>
                        <li
                            className='nav-item'
                            style={{ display: user.isGuest ? "none" : true }}
                        >
                            <Button className='btn btn-dark' onClick={() => {
                                routeChange("logout")
                            }}>
                                Logout
                            </Button>
                        </li>
                    </ul>
                </div>


            </div>
        </nav>
    );
};

export default Navbar;