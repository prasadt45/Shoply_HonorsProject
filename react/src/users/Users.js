import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserList from './user-list';
import EditUser from './edit-user';
import {Container, Row, Col, Navbar, Nav} from 'react-bootstrap'

export default function Users() {
  // get current location path
  const location = useLocation();
  const pathArr = location.pathname.split('/');
  const path = pathArr[pathArr.length - 1];
  console.log(path)
  return (
    <div>

          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/"} className='nav-link'>
                  Home
                </Link>
              </Navbar.Brand>
                <Nav>
                  {path !== "add" ? <Link to="/users/add" className='nav-link'>Add User</Link> : <Link to="/users/" className='nav-link'>User Management</Link>}
                </Nav>
              
            </Container>
          </Navbar>
      {/* hide add link if already on add new user component */}
      
      <Container className='pt-4'>
        <Row>
          <Col md={12}>
            <div className='wrapper'>
            {path !== 'add' && path.length === 0 ? <UserList/> : path !== 'add' && path.length > 0 ? <EditUser id={path} /> : <h2>Add User</h2>}

            </div>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}