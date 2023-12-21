import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChartPie } from 'react-icons/fa';

const scale = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(1.1);
  }
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PieLoader = () => {
  const [color, setColor] = useState('#bdb3e1d9'); // Initial color

  // Simulate loading by changing the color after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setColor('#154360'); // New color
    }, 2000);

    return () => clearTimeout(timer);
  }, []); // Run once on component mount

  return (
    <Container>
      <FaChartPie size={80} color={color} />
    </Container>
  );
};

export default PieLoader;
