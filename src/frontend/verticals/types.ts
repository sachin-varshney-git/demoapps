// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

/**
 * A VerticalConfig is a cosmetic + content brand pack: naming, copy, imagery
 * and accent colors for one industry vertical. It never changes service
 * behavior or page flow -- only what the storefront looks and reads like.
 *
 * Logo/banner/product images are served by the image-provider service from
 * `static-src/<id>/` at container start (see src/image-provider/docker-entrypoint.sh),
 * so `logoFile`/`bannerFile` here must match filenames that exist in that folder.
 */
export interface VerticalConfig {
  id: string;
  brandName: string;
  tagline: string;
  heroCta: string;
  pageTitle: string;
  footerTagline: string;
  categoryLabel: string;
  logoFile: string;
  bannerFile: string;
  colors: {
    primary: string;
    secondary: string;
    neutral: string;
    danger: string;
  };
}
