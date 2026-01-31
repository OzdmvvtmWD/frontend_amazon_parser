import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomCard from './Card';
import './GridLayout.css'; 

interface GridLayoutProps {
  products: any[];
  loading: boolean;
}

function GridLayout({ products, loading }: GridLayoutProps) {
  const displayProducts = loading ? Array.from({ length: 12 }, () => ({})) : products;

  return (
    <Container className="grid-container">
      <Row xs={1} sm={2} md={4} className="g-4 grid-row">
        {displayProducts.map((product, index) => (
          <Col key={index}>
            <CustomCard product={product} loading={loading} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default GridLayout;
