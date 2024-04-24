import React, { useEffect, useState } from "react";
import ProductDetail, {
  Product,
} from "../../components/ProductDetail/ProductDetail";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get<Product>(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container py-3">
      <ProductDetail product={product} isLoading={loading} />
    </div>
  );
};

export default ProductDetailPage;
