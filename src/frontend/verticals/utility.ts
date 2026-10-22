// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { VerticalConfig } from './types';

// TODO(vertical-pack): stub only -- catalog is a 2-3 row placeholder (see
// src/postgresql/seeds/utility/init.sql). Fill in real service/plan data and
// swap the placeholder imagery in src/image-provider/static-src/utility/ when
// this vertical gets built out.
const utility: VerticalConfig = {
  id: 'utility',
  brandName: 'GridPoint Energy',
  tagline: 'Power you can count on.',
  heroCta: 'View Services',
  pageTitle: 'GridPoint Energy - Home',
  footerTagline:
    'This is a demo storefront built by HCLTech to showcase full-stack observability across a multi-vertical commerce platform. It is not an actual utility provider.',
  categoryLabel: 'Featured Services',
  logoFile: 'logo.svg',
  bannerFile: 'banner.svg',
  colors: {
    primary: '#1E5631',
    secondary: '#E0A93A',
    neutral: '#3A4150',
    danger: '#B23A2E',
  },
};

export default utility;
