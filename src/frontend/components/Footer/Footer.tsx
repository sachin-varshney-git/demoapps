// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';
import * as S from './Footer.styled';
import SessionGateway from '../../gateways/Session.gateway';
import { CypressFields } from '../../utils/enums/CypressFields';
import PlatformFlag from '../PlatformFlag';
import { useVertical } from '../../providers/Vertical.provider';

const currentYear = new Date().getFullYear();

const { userId } = SessionGateway.getSession();

const Footer = () => {
  const [sessionId, setSessionId] = useState('');
  const { brandName, footerTagline } = useVertical();

  useEffect(() => {
    setSessionId(userId);
  }, []);

  return (
    <S.Footer>
      <div>
        <p>{footerTagline}</p>
        <p>
          <span data-cy={CypressFields.SessionId}>session-id: {sessionId}</span>
        </p>
      </div>
      <p>
        &copy; {currentYear} {brandName} &mdash; Built by HCLTech
      </p>
      <PlatformFlag />
    </S.Footer>
  );
};

export default Footer;
