import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <Container className="text-center">
        <small>&copy; {new Date().getFullYear()} Cricket Realm. All rights reserved.</small>
      </Container>
    </footer>
  );
}
// This Footer component provides a simple footer with a dark background and light text.