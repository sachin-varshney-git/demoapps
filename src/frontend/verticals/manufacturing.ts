// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { VerticalConfig } from './types';

// TODO(vertical-pack): stub only -- catalog is a 2-3 row placeholder (see
// src/postgresql/seeds/manufacturing/init.sql). Fill in real part/equipment
// data and swap the placeholder imagery in
// src/image-provider/static-src/manufacturing/ when this vertical gets built out.
const manufacturing: VerticalConfig = {
  id: 'manufacturing',
  brandName: 'Ironclad Works',
  tagline: 'Built to last, built to scale.',
  heroCta: 'Browse Equipment',
  pageTitle: 'Ironclad Works - Home',
  footerTagline:
    'This is a demo storefront built by HCLTech to showcase full-stack observability across a multi-vertical commerce platform. It is not an actual supplier.',
  categoryLabel: 'Featured Equipment',
  logoFile: 'logo.svg',
  bannerFile: 'banner.svg',
  colors: {
    primary: '#4A4E57',
    secondary: '#D9722C',
    neutral: '#3A4150',
    danger: '#B23A2E',
  },
};

export default manufacturing;
