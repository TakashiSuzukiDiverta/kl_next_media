'use client';

import getLimitedContentDetails from '@/fetch/getLimitedContentDetails';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Metadata from '@/components/common/Metadata';
import { METADATA } from '@/constants/config';

const LimitedContentBody = () => {
  const [data, setData] = useState([]);
  const [couponLink, setCouponLink] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split('/');
    segments.pop();
    const slug = segments.pop();

    if (!slug) {
      throw new Error('Invalid slug. Please check the URL.');
    }

    const fetchMemberOnlyData = async (slug) => {
      try {
        const limitedData = await getLimitedContentDetails(slug);
        console.log('limitedData', limitedData);
        setData(limitedData);
        setCouponLink(limitedData.couponLink);
      } catch (error) {
        console.error('Error fetching member-only list data :', error);
      }
    };
    fetchMemberOnlyData(slug); // Fetch member-only list initially
  }, [pathname]);

  return (
    <div>
      <section className='c-box c-memberArticle'>
        <Metadata title={METADATA.LIMITED_CONTENT} />
        <div className='c-heading--box__outer -oneLine'>
          <h2 className='c-heading--box'>今月の会員限定記事</h2>
        </div>
        <h2 className='c-heading--lv2'>{data.subject}</h2>

        <div className='c-memberArticle__type'>
          <p className='c-card__category'>{data.contents_type_nm}</p>
          <p className='c-card__area'>
            <svg className='c-map__icon c-svg'>
              <use xlinkHref='/svg/icon.svg#icon-map' />
            </svg>
            {data.area}
          </p>
          <time className='c-memberArticle__date'>{data.ymd}</time>
        </div>
        <div className='c-memberArticle__detail'>
          {data.introduction}
          <br />
          <br />
          <div dangerouslySetInnerHTML={{ __html: data.body }} />
        </div>
        <div className='c-memberArticle__coupon'>
          <dl className='c-memberArticle__coupon__info'>
            <dt className='c-memberArticle__coupon__title'>
              {couponLink.title}
            </dt>
            <dd className='c-memberArticle__coupon__url'>
              <Link
                href={`${couponLink.url}`}
                target='_blnak'
                className='c-memberArticle__coupon__link'
              >
                お得なクーポン詳細はこちら
              </Link>
            </dd>
          </dl>
        </div>
      </section>
    </div>
  );
};

export default LimitedContentBody;
