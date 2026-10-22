// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import RouterLink from 'next/link';

export const Link = styled(RouterLink)`
  text-decoration: none;
`;

export const Image = styled.div<{ $src: string }>`
  width: 100%;
  height: 150px;
  background: ${({ $src }) => `url("${$src}")`} no-repeat center;
  background-size: contain;
  border-radius: 8px;

  ${({ theme }) => theme.breakpoints.desktop} {
    height: 300px;
  }
`;

export const ProductCard = styled.div`
  cursor: pointer;
  border-radius: 10px;
  padding: 12px;
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(28, 34, 48, 0.12);
    transform: translateY(-2px);
  }
`;

export const ProductName = styled.p`
  margin: 0;
  margin-top: 10px;
  font-size: ${({ theme }) => theme.sizes.dSmall};
`;

export const ProductPrice = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.sizes.dMedium};
  font-weight: ${({ theme }) => theme.fonts.bold};
`;
