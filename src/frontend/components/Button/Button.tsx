// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import styled, { css } from 'styled-components';

const Button = styled.button<{ $type?: 'primary' | 'secondary' | 'link' }>`
  background-color: ${({ theme }) => theme.colors.otelBlue};
  color: white;
  display: inline-block;
  border: solid 1px ${({ theme }) => theme.colors.otelBlue};
  padding: 8px 16px;
  outline: none;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  border-radius: 8px;
  height: 62px;
  cursor: pointer;
  transition: filter 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    filter: brightness(1.08);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  }

  ${({ $type = 'primary' }) =>
    $type === 'secondary' &&
    css`
      background: none;
      color: ${({ theme }) => theme.colors.otelBlue};

      &:hover {
        box-shadow: none;
      }
    `};

  ${({ $type = 'primary' }) =>
    $type === 'link' &&
    css`
      background: none;
      color: ${({ theme }) => theme.colors.otelBlue};
      border: none;

      &:hover {
        box-shadow: none;
      }
    `};
`;

export default Button;
