import Head from 'next/head'
import ComingSoon from '../components/ComingSoon';
import { PageWrapper } from '../utils/page-wrapper';

const shop = () => {
  return (
    <>
      <Head>
        <title>Boutique | Afterwork Workflow</title>
        <meta name="description" content="Boutique Afterwork Workflow - Ressources et outils pour la conception paramétrique." />
        <link rel="canonical" href="https://www.wwworkflows.com/shop" />
      </Head>
      <PageWrapper>
        <div className="bg-cgrey">
          <ComingSoon />
        </div>
      </PageWrapper>
    </>
  )
}

export default shop