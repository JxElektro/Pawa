import React from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaBone, FaCat, FaClinicMedical, FaPaw } from 'react-icons/fa';

const MarketplaceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductIcon = styled.div`
  font-size: 3em;
  margin-bottom: 10px;
  color: #3498db;
`;

const ProductTitle = styled.h3`
  margin: 0 0 10px 0;
`;

const ProductPrice = styled.p`
  font-weight: bold;
  color: #2ecc71;
`;

const BuyButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #2980b9;
  }
`;

const products = [
  { id: 1, name: "Premium Dog Food", price: "$29.99", icon: <FaBone /> },
  { id: 2, name: "Cat Toy Set", price: "$14.99", icon: <FaCat /> },
  { id: 3, name: "Pet First Aid Kit", price: "$39.99", icon: <FaClinicMedical /> },
  { id: 4, name: "Comfortable Pet Bed", price: "$49.99", icon: <FaPaw /> },
];

const Marketplace: React.FC = () => {
  return (
    <MarketplaceContainer>
      <h1>Pet Supplies Marketplace</h1>
      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ProductIcon>{product.icon}</ProductIcon>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductPrice>{product.price}</ProductPrice>
            <BuyButton>Add to Cart</BuyButton>
          </ProductCard>
        ))}
      </ProductGrid>
    </MarketplaceContainer>
  );
};

export default Marketplace;