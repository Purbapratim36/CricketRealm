import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const posts = [
  { id: 1, title: 'Match Preview: India vs Australia', excerpt: 'A thrilling series ahead...' },
  { id: 2, title: 'Top 10 ODI Innings of All Time', excerpt: 'We look back at some classics...' },
];

export default function BlogList() {
  return (
    <div>
      <h2>Cricket Blog</h2>
      <Row>
        {posts.map(post => (
          <Col sm={12} md={6} lg={4} key={post.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.excerpt}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
