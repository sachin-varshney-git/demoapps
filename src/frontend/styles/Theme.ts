// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { DefaultTheme } from 'styled-components';
import { VerticalConfig } from '../verticals/types';
import retail from '../verticals/retail';

/**
 * Base tokens shared by every vertical: neutrals, spacing, breakpoints and
 * typography. This is the HCLTech visual "chassis" -- it does not change
 * when the active vertical changes, only the accent colors (below) do.
 */
const baseTokens = {
  breakpoints: {
    desktop: '@media (min-width: 768px)',
  },
  sizes: {
    mxLarge: '22px',
    mLarge: '20px',
    mMedium: '14px',
    mSmall: '12px',
    dxLarge: '58px',
    dLarge: '40px',
    dMedium: '18px',
    dSmall: '16px',
    nano: '8px',
  },
  fonts: {
    bold: '700',
    regular: '500',
    semiBold: '600',
    light: '400',
  },
};

/**
 * Builds a full styled-components theme for a given vertical by layering its
 * accent palette on top of the shared base tokens. The `colors` object keeps
 * its original key names (otelBlue, otelYellow, ...) so every existing
 * component that references `theme.colors.otelBlue` etc. keeps working --
 * only the color *values* change per vertical.
 */
export function buildTheme(vertical: VerticalConfig): DefaultTheme {
  return {
    ...baseTokens,
    colors: {
      otelBlue: vertical.colors.primary,
      otelYellow: vertical.colors.secondary,
      otelGray: vertical.colors.neutral,
      otelRed: vertical.colors.danger,
      backgroundGray: 'rgba(58, 65, 80, 0.08)',
      lightBorderGray: hexToRgba(vertical.colors.primary, 0.25),
      borderGray: '#1C2230',
      textGray: '#1C2230',
      textLightGray: '#5C6472',
      white: '#FFFFFF',
    },
  };
}

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Default export kept for call sites that need a theme without going through
// VerticalProvider (e.g. Cypress component mounts): defaults to the retail brand.
const Theme: DefaultTheme = buildTheme(retail);

export default Theme;
