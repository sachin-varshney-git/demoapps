// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { VerticalConfig } from './types';

// TODO(vertical-pack): stub only -- catalog is a 2-3 row placeholder (see
// src/postgresql/seeds/bfsi/init.sql). Fill in real product/service data and
// swap the placeholder imagery in src/image-provider/static-src/bfsi/ when
// this vertical gets built out.
const bfsi: VerticalConfig = {
  id: 'bfsi',
  brandName: 'Meridian Trust',
  tagline: 'Banking, simplified.',
  heroCta: 'Explore Products',
  pageTitle: 'Meridian Trust - Home',
  footerTagline:
    'This is a demo storefront built by HCLTech to showcase full-stack observability across a multi-vertical commerce platform. It is not an actual bank.',
  categoryLabel: 'Featured Products',
  logoFile: 'logo.svg',
  bannerFile: 'banner.svg',
  colors: {
    primary: '#1B2A4A',
    secondary: '#C7A24B',
    neutral: '#3A4150',
    danger: '#B23A2E',
  },
};

export default bfsi;
