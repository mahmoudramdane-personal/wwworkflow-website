import ComingSoon from '../components/ComingSoon';
import { PageWrapper } from '../utils/page-wrapper';


const shop = ({ products }) => {


  return (

    <PageWrapper>
      <div className="bg-cgrey">
        
        <ComingSoon />
      </div>
    </PageWrapper>
  )
}

export default shop

export async function getStaticProps() {
  // Check if Gumroad credentials are configured
  if (!process.env.ACCESS_TOKEN || !process.env.APPLICATION_ID || !process.env.APPLICATION_SECRET) {
    console.warn('Gumroad environment variables not set. Returning empty products array.');
    return {
      props: {
        products: [],
      },
      revalidate: 3600,
    };
  }

  try {
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `https://api.gumroad.com/v2/products?access_token=${process.env.ACCESS_TOKEN}&app_id=${process.env.APPLICATION_ID}&app_secret=${process.env.APPLICATION_SECRET}`,
      options
    );
    
    if (!res.ok) {
      console.warn('Failed to fetch Gumroad products:', res.status);
      return {
        props: {
          products: [],
        },
        revalidate: 3600,
      };
    }
    
    const data = await res.json();
    const products = data.products || [];

    return {
      props: {
        products,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching Gumroad products:', error);
    return {
      props: {
        products: [],
      },
      revalidate: 3600,
    };
  }
}