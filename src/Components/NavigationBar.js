import React, { useState, useEffect } from 'react';
import {
  Navbar, Container, Nav, NavDropdown, Button, Modal, Form, Badge
} from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { auth } from './firebase';
import {
  handleSignup,
  handleLogin,
  handleLogout,
  signInWithGoogle
} from './SignupLogic';
import {
  FaTrophy,
  FaHome,
  FaNewspaper,
  FaQuestionCircle,
  FaChartLine,
  FaUsers,
  FaInfoCircle
} from 'react-icons/fa';
import './NavigationBar.css';

export default function NavigationBar() {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => {
      setUser(u);
      setShowModal(false);
    });
    return unsub;
  }, []);

  const handleEmail = async e => {
    e.preventDefault();
    try {
      if (isLogin) await handleLogin(email, password);
      else await handleSignup(name, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome className="me-1" /> },
    { path: '/livescore', label: 'Live Scores', icon: <FaChartLine className="me-1" /> },
    { path: '/news', label: 'News', icon: <FaNewspaper className="me-1" /> },
    { path: '/trivia-battle', label: 'Trivia', icon: <FaQuestionCircle className="me-1" /> },
    { path: '/explore', label: 'Explore', icon: <FaUsers className="me-1" /> },
    { path: '/match-highlights', label: 'Match Highlights', icon: <FaTrophy className="me-1" />, badge: 'New' },
    { path: '/match-predictor', label: 'Match Predictor', icon: <FaChartLine className="me-1" /> },
    { path: '/about', label: 'About', icon: <FaInfoCircle className="me-1" /> }
  ];

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm sticky-top">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="brand-logo d-flex align-items-center">
            <img src={`${process.env.PUBLIC_URL}/Favicon.png`} alt="Cricket Realm" height="40" className="me-3 logo-img" />
            Cricket Realm
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              {navItems.map((item) => (
                <Nav.Link
                  as={NavLink}
                  to={item.path}
                  key={item.path}
                  className={`nav-link-underline d-flex align-items-center ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <Badge pill bg="danger" className="ms-1">
                      {item.badge}
                    </Badge>
                  )}
                </Nav.Link>
              ))}
            </Nav>

            <Nav className="align-items-center">
              {user ? (
                <NavDropdown
                  title={
                    <>
                      <img
                        src={user.photoURL || '/images/avatar.png'}
                        className="avatar me-2"
                        alt="avatar"
                        width="32"
                        height="32"
                      />
                      <span className="d-none d-lg-inline">
                        {user.displayName || user.email.split('@')[0]}
                      </span>
                    </>
                  }
                  align="end"
                >
                  <NavDropdown.Item as={NavLink} to="/profile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/my-teams">
                    My Fantasy Teams
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Button
                    variant="outline-light"
                    onClick={() => { setIsLogin(true); setShowModal(true); }}
                    className="me-2"
                  >
                    Login
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => { setIsLogin(false); setShowModal(true); }}
                    className="d-none d-lg-block"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Auth Modal */}
      <Modal show={showModal} centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? 'Login to Cricket Realm' : 'Create an Account'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEmail}>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength="6"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </Form>

          <div className="text-center mb-3">OR</div>

          {/* Google login button with PNG logo */}
          <Button
            variant="outline-danger"
            className="w-100 d-flex align-items-center justify-content-center"
            onClick={signInWithGoogle}
          >
            <img
              src={`${process.env.PUBLIC_URL}/google-logo.png`}
              alt="Google"
              width="20"
              height="20"
              className="me-2"
            />
            Continue with Google
          </Button>

          <div className="text-center mt-3">
            <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
