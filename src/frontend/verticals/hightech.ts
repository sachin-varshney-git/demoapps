// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { VerticalConfig } from './types';

// TODO(vertical-pack): stub only -- catalog is a 2-3 row placeholder (see
// src/postgresql/seeds/hightech/init.sql). Fill in real product data and
// swap the placeholder imagery in src/image-provider/static-src/hightech/
// when this vertical gets built out.
const hightech: VerticalConfig = {
  id: 'hightech',
  brandName: 'Vertex Systems',
  tagline: "Engineering what's next.",
  heroCta: 'Browse Catalog',
  pageTitle: 'Vertex Systems - Home',
  footerTagline:
    'This is a demo storefront built by HCLTech to showcase full-stack observability across a multi-vertical commerce platform. It is not an actual vendor.',
  categoryLabel: 'Featured Products',
  logoFile: 'logo.svg',
  bannerFile: 'banner.svg',
  colors: {
    primary: '#2B2F42',
    secondary: '#2FB6C4',
    neutral: '#3A4150',
    danger: '#B23A2E',
  },
};

export default hightech;
