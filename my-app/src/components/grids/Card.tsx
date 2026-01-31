import Card from 'react-bootstrap/Card';
import './Card.css'; 

type Product = {
  id: number;
  asin: string;
  title: string;
  price: string;
  currency: string;
  list_price?: string;
  discount_percent?: number;
  rating?: string;
  reviews_count?: number;
  main_image_url?: string;
  bullet_points?: string[];
  is_prime?: boolean;
  rank?: number;
  best_sellers_rank?: string;
  created_at?: string;
  updated_at?: string;
  category?: number | null;
};

interface CustomCardProps {
  product?: Product;
  loading?: boolean;
}

function CustomCard({ product, loading }: CustomCardProps) {
  if (loading) {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Loading...</Card.Title>
          <Card.Text>Loading product details...</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  if (!product) return null;

  return (
<Card className="custom-card">
  <Card.Img
    variant="top"
    src={product.main_image_url || 'holder.js/100px180'}
    alt={product.title}
  />
  <Card.Body className="custom-card-body">
    <Card.Title>{product.title}</Card.Title>

    {product.discount_percent ? (
      <Card.Text>
        <span className="list-price">{product.list_price ? `${product.currency}${product.list_price}` : ''}</span>
        <span className="price">{product.currency}{product.price}</span>
        <span className="discount"> ({product.discount_percent}% off)</span>
      </Card.Text>
    ) : (
      <Card.Text className="price">
        {product.currency}{product.price}
      </Card.Text>
    )}

    {product.rating && product.reviews_count && (
      <Card.Text>
        ⭐ {product.rating} ({product.reviews_count})
      </Card.Text>
    )}

    {product.rank && <Card.Text>Rank: {product.rank}</Card.Text>}
    {product.best_sellers_rank && <Card.Text>Best Sellers Rank: {product.best_sellers_rank}</Card.Text>}
    {product.is_prime && <Card.Text>Prime Eligible ✅</Card.Text>}
    {product.asin && <Card.Text>ASIN: {product.asin}</Card.Text>}
    {product.category !== null && <Card.Text>Category ID: {product.category}</Card.Text>}

    {product.bullet_points && product.bullet_points.length > 0 && (
      <ul>
        {product.bullet_points.map((bp, idx) => (
          <li key={idx}>{bp}</li>
        ))}
      </ul>
    )}

    {product.created_at && <Card.Text>Created: {new Date(product.created_at).toLocaleDateString()}</Card.Text>}
    {product.updated_at && <Card.Text>Updated: {new Date(product.updated_at).toLocaleDateString()}</Card.Text>}
  </Card.Body>
</Card>
  );
}

export default CustomCard;
