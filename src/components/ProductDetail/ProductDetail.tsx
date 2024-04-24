import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface ProductDetailProps {
  product: Product | null;
  isLoading: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  isLoading,
}) => {
  if (isLoading || !product) {
    return (
      <Container>
        <Row>
          <Col lg={6}>
            <Skeleton height={400} />
          </Col>
          <Col lg={6}>
            <Skeleton count={6} />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row>
        <Col lg={6}>
          <Image src={product.image} alt={product.title} height={400} />
        </Col>
        <Col lg={6} className="d-flex flex-column">
          <h2>{product.title}</h2>
          <hr />
          <p>{product.description}</p>
          <h4>${product.price.toFixed(2)}</h4>{" "}
          <p>
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </p>
          <Button variant="primary" size="lg">
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
