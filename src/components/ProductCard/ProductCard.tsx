import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

export interface ProductType {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: {
    rate: number;
    count: number;
  };
  loading?: boolean;
}

const ProductCard: React.FC<ProductType> = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  loading,
}) => {
  const navigation = useNavigate();
  return (
    <div className="p-2 col-12 col-md-4">
      <Card
        className="product-card h-100"
        onClick={() => navigation(`/products/${id}`)}
      >
        {loading ? (
          <Skeleton height={300} />
        ) : (
          <Card.Img
            variant="top"
            src={image}
            alt={title}
            height={300}
            className="object-fit-cover "
          />
        )}

        <Card.Body className="d-flex flex-column justify-content-between ">
          {loading ? (
            <>
              <Skeleton count={1} height={30} />
              <Skeleton count={1} height={30} width={100} />
              <Skeleton count={3} height={25} />
            </>
          ) : (
            <>
              <div>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  ${price?.toFixed(2)}
                </Card.Subtitle>
                <Badge className="text-capitalize">{category}</Badge>
                <Card.Text className="text-truncate">{description}</Card.Text>
                <div className="rating">
                  <span>{rating?.rate} </span>(
                  <span>{rating?.count} reviews</span>)
                </div>
              </div>
              <Button
                style={{ width: "fit-content" }}
                variant="primary"
                onClick={() =>
                  console.log(`Add to cart clicked for product id: ${id}`)
                }
              >
                Add to Cart
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
