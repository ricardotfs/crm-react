import React from 'react'
import './Navbar.css'

//Components
import { NavLink, Link } from 'react-router-dom';

const NavbarLateral = () => {
    return (
        <nav id="mainnav-container">
            <div id="mainnav">
                <div id="mainnav-menu-wrap">
                    <div class="nano">
                        <div class="nano-content">

                            <div id="mainnav-profile" class="mainnav-profile">
                                <div class="profile-wrap text-center">
                                    <div class="pad-btm">
                                        <img class="img-circle img-md" src="../img/eu.jpg" alt="Profile Picture" />
                                    </div>
                                    <a href="#profile-nav" class="box-block" data-toggle="collapse" aria-expanded="false">
                                        <span class="pull-right dropdown-toggle">
                                            <i class="dropdown-caret"></i>
                                        </span>
                                        <p class="mnp-name">Ricardo Oliveira</p>
                                        <span class="mnp-desc">aaron.cha@themeon.net</span>
                                    </a>
                                </div>
                                <div id="profile-nav" class="collapse list-group bg-trans">
                                    <a href="#" class="list-group-item">
                                        <i class="demo-pli-male icon-lg icon-fw"></i> View Profile
                                    </a>
                                    <a href="#" class="list-group-item">
                                        <i class="demo-pli-gear icon-lg icon-fw"></i> Settings
                                    </a>
                                </div>
                            </div>


                            <div id="mainnav-shortcut" class="hidden">
                                <div class="list-unstyled shortcut-wrap row mr-1 ml-1">
                                    <div class="col-sm-1"></div>
                                    <div class="col-sm-3" data-content="My Profile">
                                        <a class="shortcut-grid" href="#">
                                            <div class="icon-wrap icon-wrap-sm icon-circle bg-mint">
                                                <i class="demo-pli-male"></i>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="col-sm-3" data-content="Messages">
                                        <a class="shortcut-grid" href="#">
                                            <div class="icon-wrap icon-wrap-sm icon-circle bg-warning">
                                                <i class="demo-pli-speech-bubble-3"></i>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="col-sm-3" data-content="Messages">
                                        <a class="shortcut-grid" href="#">
                                            <div class="icon-wrap icon-wrap-sm icon-circle bg-warning">
                                                <i class="demo-pli-speech-bubble-3"></i>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="col-sm-1"></div>
                                </div>
                            </div>

                            <ul id="mainnav-menu" class="list-group">

                                <li class="list-header">Navigation</li>

                                <li>
                                    <a href="#">
                                        <Link to={'/'}>
                                            <i class="demo-pli-receipt-4"></i>
                                            <span class="menu-title">Ticket</span>
                                        </Link>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarLateral;