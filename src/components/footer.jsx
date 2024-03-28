import React from 'react';
import '../App.css';

export const FooterTab = () => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand fixed-bottom rounded-top-4 p-0" id="navbar-menus">
        <ul className="navbar-nav nav-justified w-100 align-items-center">
            <li className="nav-item">
                <a className="nav-link" href="#home">
                    <i className="fas fa-home"></i>
                    <span className="d-block" style={{fontSize: "0.7rem"}}>Home</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#couple">
                    <i className="fa-solid fa-user-group"></i>
                    <span className="d-block" style={{fontSize: "0.7rem"}}>Couple</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#date">
                    <i className="fa-solid fa-calendar-check"></i>
                    <span className="d-block" style={{fontSize: "0.7rem"}}>Date</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#gallery">
                    <i className="fa-solid fa-images"></i>
                    <span className="d-block" style={{fontSize: "0.7rem"}}>Gallery</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#comment">
                    <i className="fa-solid fa-comments"></i>
                    <span className="d-block" style={{fontSize: "0.7rem"}}>Comments</span>
                </a>
            </li>
        </ul>
    </nav>
    )
}