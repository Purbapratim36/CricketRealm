import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Spinner, Button } from 'react-bootstrap';
import './News.css';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 initially
  const [loading, setLoading] = useState(true);

  const apiKey = 'pub_56a81fc0d1454d63a56d0084811ed2b3';

  useEffect(() => {
    fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&q=cricket&language=en&country=in`
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  }, []);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="news-section">
      <Container className="py-5">
        <h2 className="news-heading text-center mb-4">🗞️ Cricket News</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="light" />
            <p className="text-light">Loading latest news...</p>
          </div>
        ) : (
          <>
            <Row xs={1} md={2} lg={3} className="g-4">
              {articles.slice(0, visibleCount).map((news, idx) => (
                <Col key={idx}>
                  <Card className="news-card h-100">
                    {news.image_url && (
                      <Card.Img
                        variant="top"
                        src={news.image_url}
                        alt={news.title}
                        className="news-image"
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{news.title}</Card.Title>
                      <Card.Text>
                        {news.description?.slice(0, 100)}...
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-end">
                      <a
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="news-link"
                      >
                        Read More →
                      </a>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>

            {visibleCount < articles.length && (
              <div className="text-center mt-4">
                <Button variant="light" className="see-more-btn" onClick={handleSeeMore}>
                  See More
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
// This News component fetches and displays cricket news articles with a "See More" button to load additional articles.