
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/navbar/Navbar';
import Ticket from './pages/ticket/Ticket';

function App() {
  const {auth,loading} = useAuth();

  if(loading){
    return <p>Carregando ...</p>
  }
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/> } />
          <Route path='/ticket/:id' element={<Ticket/> } />
        </Routes>
        <nav id="mainnav-container">
          <div id="mainnav">
            <div id="mainnav-menu-wrap">
              <div class="nano">
                <div class="nano-content">

                  <div id="mainnav-profile" class="mainnav-profile">
                    <div class="profile-wrap text-center">
                      <div class="pad-btm">
                        <img class="img-circle img-md" src="img/profile-photos/1.png" alt="Profile Picture"/>
                      </div>
                      <a href="#profile-nav" class="box-block" data-toggle="collapse" aria-expanded="false">
                        <span class="pull-right dropdown-toggle">
                          <i class="dropdown-caret"></i>
                        </span>
                        <p class="mnp-name">Aaron Chavez</p>
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
                      <div class="col-sm-2" data-content="My Profile">
                        <a class="shortcut-grid" href="#">
                          <div class="icon-wrap icon-wrap-sm icon-circle bg-mint">
                            <i class="demo-pli-male"></i>
                          </div>
                        </a>
                      </div>
                      <div class="col-sm-2" data-content="Messages">
                        <a class="shortcut-grid" href="#">
                          <div class="icon-wrap icon-wrap-sm icon-circle bg-warning">
                            <i class="demo-pli-speech-bubble-3"></i>
                          </div>
                        </a>
                      </div>
                      <div class="col-sm-2" data-content="Messages">
                        <a class="shortcut-grid" href="#">
                          <div class="icon-wrap icon-wrap-sm icon-circle bg-warning">
                            <i class="demo-pli-speech-bubble-3"></i>
                          </div>
                        </a>
                      </div>
                      <div class="col-sm-2" data-content="Messages">
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
                        <i class="demo-pli-home"></i>
                        <span class="menu-title">Dashboard</span>
                        <i class="arrow"></i>
                      </a>

                      <ul class="collapse">
                        <li><a href="index.html">Dashboard 1</a></li>
                        <li><a href="dashboard-2.html">Dashboard 2</a></li>
                        <li><a href="dashboard-3.html">Dashboard 3</a></li>

                      </ul>
                    </li>

                    <li>
                      <a href="#">
                        <i class="demo-pli-split-vertical-2"></i>
                        <span class="menu-title">Layouts</span>
                        <i class="arrow"></i>
                      </a>

                      <ul class="collapse">
                        <li><a href="layouts-collapsed-navigation.html">Collapsed Navigation</a></li>
                        <li><a href="layouts-offcanvas-navigation.html">Off-Canvas Navigation</a></li>
                        <li><a href="layouts-offcanvas-slide-in-navigation.html">Slide-in Navigation</a></li>
                        <li><a href="layouts-offcanvas-revealing-navigation.html">Revealing Navigation</a></li>
                        <li class="list-divider"></li>
                        <li><a href="layouts-aside-right-side.html">Aside on the right side</a></li>
                        <li><a href="layouts-aside-left-side.html">Aside on the left side</a></li>
                        <li><a href="layouts-aside-dark-theme.html">Dark version of aside</a></li>
                        <li class="list-divider"></li>
                        <li><a href="layouts-fixed-navbar.html">Fixed Navbar</a></li>
                        <li><a href="layouts-fixed-footer.html">Fixed Footer</a></li>

                      </ul>
                    </li>

                    <li>
                      <a href="widgets.html">
                        <i class="demo-pli-gear"></i>
                        <span class="menu-title">
                          Widgets
                          <span class="pull-right badge badge-warning">24</span>
                        </span>
                      </a>
                    </li>

                    <li class="list-divider"></li>

                    <li class="list-header">Components</li>

                    <li>
                      <a href="#">
                        <i class="demo-pli-boot-2"></i>
                        <span class="menu-title">UI Elements</span>
                        <i class="arrow"></i>
                      </a>

                      <ul class="collapse">
                        <li><a href="ui-buttons.html">Buttons</a></li>
                        <li><a href="ui-panels.html">Panels</a></li>
                        <li><a href="ui-modals.html">Modals</a></li>
                        <li><a href="ui-progress-bars.html">Progress bars</a></li>
                        <li><a href="ui-components.html">Components</a></li>
                        <li><a href="ui-typography.html">Typography</a></li>
                        <li><a href="ui-list-group.html">List Group</a></li>
                        <li><a href="ui-tabs-accordions.html">Tabs &amp; Accordions</a></li>
                        <li><a href="ui-alerts-tooltips.html">Alerts &amp; Tooltips</a></li>

                      </ul>
                    </li>

                    <li>
                      <a href="#">
                        <i class="demo-pli-pen-5"></i>
                        <span class="menu-title">Forms</span>
                        <i class="arrow"></i>
                      </a>

                      <ul class="collapse">
                        <li><a href="forms-general.html">General</a></li>
                        <li><a href="forms-components.html">Advanced Components</a></li>
                        <li><a href="forms-validation.html">Validation</a></li>
                        <li><a href="forms-wizard.html">Wizard</a></li>
                        <li><a href="forms-file-upload.html">File Upload</a></li>
                        <li><a href="forms-text-editor.html">Text Editor</a></li>
                        <li><a href="forms-markdown.html">Markdown</a></li>

                      </ul>
                    </li>

                    <li>
                      <a href="#">
                        <i class="demo-pli-receipt-4"></i>
                        <span class="menu-title">Tables</span>
                        <i class="arrow"></i>
                      </a>

                      <ul class="collapse">
                        <li><a href="tables-static.html">Static Tables</a></li>
                        <li><a href="tables-bootstrap.html">Bootstrap Tables</a></li>
                        <li><a href="tables-datatable.html">Data Tables</a></li>
                        <li><a href="tables-footable.html">Foo Tables</a></li>

                      </ul>
                    </li>

                    <li class="list-header">More</li>

                    <li class="active-sub">
                      <a href="#">
                        <i class="demo-pli-computer-secure"></i>
                        <span class="menu-title">App Views</span>
                        <i class="arrow"></i>
                      </a>

                      <ul class="collapse in">
                        <li><a href="app-file-manager.html">File Manager</a></li>
                        <li><a href="app-users.html">Users</a></li>
                        <li><a href="app-users-2.html">Users 2</a></li>
                        <li><a href="app-profile.html">Profile</a></li>
                        <li class="active-link"><a href="app-calendar.html">Calendar</a></li>
                        <li><a href="app-taskboard.html">Taskboard</a></li>
                        <li><a href="app-chat.html">Chat</a></li>
                        <li><a href="app-contact-us.html">Contact Us</a></li>

                      </ul>
                    </li>

                    <li>
                      <a href="#">
                        <i class="demo-pli-speech-bubble-5"></i>
                        <span class="menu-title">Blog Apps</span>
                        <i class="arrow"></i>
                      </a>

                      <ul class="collapse">
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="blog-list.html">Blog List</a></li>
                        <li><a href="blog-list-2.html">Blog List 2</a></li>
                        <li><a href="blog-details.html">Blog Details</a></li>
                        <li class="list-divider"></li>
                        <li><a href="blog-manage-posts.html">Manage Posts</a></li>
                        <li><a href="blog-add-edit-post.html">Add Edit Post</a></li>

                      </ul>
                    </li>

            
                    <li class="list-header">Extras</li>

        
                    <li>
                      <a href="#">
                        <i class="demo-pli-happy"></i>
                        <span class="menu-title">Icons Pack</span>
                        <i class="arrow"></i>
                      </a>

                      <ul class="collapse">
                        <li><a href="icons-ionicons.html">Ion Icons</a></li>
                        <li><a href="icons-themify.html">Themify</a></li>
                        <li><a href="icons-font-awesome.html">Font Awesome</a></li>
                        <li><a href="icons-flagicons.html">Flag Icon CSS</a></li>
                        <li><a href="icons-weather-icons.html">Weather Icons</a></li>

                      </ul>
                    </li>

                  
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
 
      </BrowserRouter>
    </div>
  );
}

export default App;
