// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { VerticalConfig } from './types';

// TODO(vertical-pack): stub only -- catalog is a 2-3 row placeholder (see
// src/postgresql/seeds/media/init.sql). Fill in real title/bundle data and
// swap the placeholder imagery in src/image-provider/static-src/media/ when
// this vertical gets built out.
const media: VerticalConfig = {
  id: 'media',
  brandName: 'Reelwave',
  tagline: 'Stories worth streaming.',
  heroCta: 'Start Watching',
  pageTitle: 'Reelwave - Home',
  footerTagline:
    'This is a demo storefront built by HCLTech to showcase full-stack observability across a multi-vertical commerce platform. It is not an actual streaming service.',
  categoryLabel: 'Featured Titles',
  logoFile: 'logo.svg',
  bannerFile: 'banner.svg',
  colors: {
    primary: '#4A2E6B',
    secondary: '#E24E8C',
    neutral: '#3A4150',
    danger: '#B23A2E',
  },
};

export default media;
