// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createContext, useContext, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { useStringFlagValue } from '@openfeature/react-sdk';
import { getVertical, DEFAULT_VERTICAL_ID, VerticalConfig } from '../verticals';
import { buildTheme } from '../styles/Theme';

interface IContext {
  vertical: VerticalConfig;
}

export const Context = createContext<IContext>({
  vertical: getVertical(DEFAULT_VERTICAL_ID),
});

interface IProps {
  children: React.ReactNode;
}

export const useVertical = () => useContext(Context).vertical;

/**
 * Reads the `currentVertical` flagd flag (same OpenFeature pattern already
 * used for fault-injection flags like `imageSlowLoad`) and exposes the
 * matching VerticalConfig + a derived styled-components theme. Flipping the
 * flag in flagd-ui re-themes the storefront live, no rebuild or redeploy.
 */
const VerticalProvider = ({ children }: IProps) => {
  const verticalId = useStringFlagValue('currentVertical', DEFAULT_VERTICAL_ID);
  const vertical = useMemo(() => getVertical(verticalId), [verticalId]);
  const theme = useMemo(() => buildTheme(vertical), [vertical]);

  const value = useMemo(() => ({ vertical }), [vertical]);

  return (
    <Context.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Context.Provider>
  );
};

export default VerticalProvider;
