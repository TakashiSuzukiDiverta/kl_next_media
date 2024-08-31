import getAllContentList from '@/fetch/getAllContentList';

export default async function sitemap() {
  const items = await getAllContentList();
  const articleDetails = items.map((item) => ({
    url: `https://www.kl-good.net/article/${item.topics_id}/`,
    lastModified: new Date(item.update_ymdhi),
  }));
  const features = await getAllContentList();
  const featureDetails = features.map((item) => ({
    url: `https://www.kl-good.net/feature/${item.topics_id}/`,
    lastModified: new Date(item.update_ymdhi),
  }));
  return [
    {
      url: `https://www.kl-good.net/privacy/`,
    },
    {
      url: `https://www.kl-good.net/contact/`,
    },
    {
      url: `https://www.kl-good.net/article/`,
    },
    ...articleDetails,
    ...featureDetails,
  ];
}
