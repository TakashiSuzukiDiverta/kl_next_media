import { useEffect } from 'react';
import GTMInitializer from '../lyaouts/GTMInitializer'; // インポート

const Metadata = ({ title }) => {
  useEffect(() => {
    const currentTitle = document.title;
    if (!currentTitle.startsWith(title + ' | ')) {
      document.title = `${title} | ${currentTitle}`;
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', title);
    }
  }, [title]);

  return <div></div><GTMInitializer />;
};

export default Metadata;
