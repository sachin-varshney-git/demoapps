// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { VerticalConfig } from './types';

const retail: VerticalConfig = {
  id: 'retail',
  brandName: 'Everline',
  tagline: 'Everything you need, closer than you think.',
  heroCta: 'Shop Now',
  pageTitle: 'Everline - Home',
  footerTagline:
    'This is a demo storefront built by HCLTech to showcase full-stack observability across a multi-vertical commerce platform. It is not an actual shop.',
  categoryLabel: 'Featured Products',
  logoFile: 'logo.svg',
  bannerFile: 'banner.svg',
  colors: {
    primary: '#33459C',
    secondary: '#E8A33D',
    neutral: '#3A4150',
    danger: '#C1432D',
  },
};

export default retail;
