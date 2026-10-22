// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { VerticalConfig } from './types';

// TODO(vertical-pack): stub only -- catalog is a 2-3 row placeholder (see
// src/postgresql/seeds/telco/init.sql). Fill in real plan/device data and
// swap the placeholder imagery in src/image-provider/static-src/telco/ when
// this vertical gets built out.
const telco: VerticalConfig = {
  id: 'telco',
  brandName: 'Wavelength',
  tagline: 'Stay connected, everywhere.',
  heroCta: 'View Plans',
  pageTitle: 'Wavelength - Home',
  footerTagline:
    'This is a demo storefront built by HCLTech to showcase full-stack observability across a multi-vertical commerce platform. It is not an actual carrier.',
  categoryLabel: 'Featured Plans & Devices',
  logoFile: 'logo.svg',
  bannerFile: 'banner.svg',
  colors: {
    primary: '#0E6E6E',
    secondary: '#F07C3C',
    neutral: '#3A4150',
    danger: '#B23A2E',
  },
};

export default telco;
