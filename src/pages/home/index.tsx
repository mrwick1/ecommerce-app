/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Pagination } from "react-bootstrap";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./home.scss";
import { getQueryParam, updateQueryParam } from "../../helpers/queryParams";

interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(
    +(getQueryParam("page") || 1)
  );
  const [itemsPerPage] = useState<number>(6);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    getQueryParam("category")?.toString() || ""
  );
  const [sortOrder, setSortOrder] = useState<string>(
    getQueryParam("sort")?.toString() || ""
  );

  // pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    updateQueryParam("page", pageNumber);
  };

  const renderPagination = () => (
    <Pagination>
      <Pagination.First
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {Array.from({ length: totalPages }, (_, i) => (
        <Pagination.Item
          key={i + 1}
          active={i + 1 === currentPage}
          onClick={() => paginate(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => paginate(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    updateQueryParam("category", selectedCategory);
    updateQueryParam("sort", sortOrder);
    fetchProducts();
  }, [selectedCategory, sortOrder]);

  const fetchProducts = async () => {
    setLoading(true);
    const categoryUrl = selectedCategory ? `/category/${selectedCategory}` : "";
    const sortUrl = sortOrder ? `?sort=${sortOrder}` : "";
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products${categoryUrl}${sortUrl}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<any>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<any>) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container py-3">
      <div className="filters row">
        <Form className="col">
          <Form.Group controlId="categorySelect">
            <Form.Label>Select Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={handleSelectChange}
              className="text-capitalize"
            >
              <option value="">All</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        <Form className="col">
          <Form.Group controlId="sortSelect">
            <Form.Label>Sort</Form.Label>
            <Form.Control
              as="select"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="">Default</option>
              <option value="asc">Price: High to Low</option>
              <option value="desc">Price: Low to High</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div className="product-list row">
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <ProductCard key={index} loading={true} />
            ))
          : currentItems.map((product) => (
              <ProductCard key={product.id} {...product} loading={false} />
            ))}
      </div>
      {renderPagination()}
    </div>
  );
};

export default HomePage;
