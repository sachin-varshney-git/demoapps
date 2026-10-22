// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import Link from 'next/link';
import * as S from './Banner.styled';
import { useVertical } from '../../providers/Vertical.provider';

const Banner = () => {
  const { tagline, heroCta, bannerFile, brandName } = useVertical();

  return (
    <S.Banner>
      <S.ImageContainer>
        <S.BannerImg src={`/images/${bannerFile}`} alt={brandName} />
      </S.ImageContainer>
      <S.TextContainer>
        <S.Title>{tagline}</S.Title>
        <Link href="#hot-products"><S.GoShoppingButton>{heroCta}</S.GoShoppingButton></Link>
      </S.TextContainer>
    </S.Banner>
  );
};

export default Banner;
