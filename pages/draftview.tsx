import * as React from 'react';

import { NotionPage } from 'components';
import { domain } from 'lib/config';
import { resolveNotionPage } from 'lib/resolve-notion-page';

export const getServerSideProps = async ({ params }) => {
  try {
    const slug = params.slug; // Assuming your dynamic segment is named 'slug'
    const props = await resolveNotionPage(domain, slug, { draftView: true });

    return { props };
  } catch (err) {
    console.error('page error', domain, err);

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err;
  }
};

export default function NotionDomainPage(props) {
  // console.log(props);
  return <NotionPage draftView {...props} />;
}
