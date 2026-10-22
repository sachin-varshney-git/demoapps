// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { VerticalConfig } from './types';
import retail from './retail';
import bfsi from './bfsi';
import telco from './telco';
import utility from './utility';
import hightech from './hightech';
import media from './media';
import manufacturing from './manufacturing';

export const verticals: Record<string, VerticalConfig> = {
  retail,
  bfsi,
  telco,
  utility,
  hightech,
  media,
  manufacturing,
};

export const DEFAULT_VERTICAL_ID = 'retail';

export const getVertical = (id: string | undefined): VerticalConfig =>
  (id && verticals[id]) || verticals[DEFAULT_VERTICAL_ID];

export type { VerticalConfig };
