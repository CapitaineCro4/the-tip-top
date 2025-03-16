import Review from '@/components/Review/Review';
import Hero from '@/components/Hero/Hero';
import store from '@/assets/images/store.jpg';
import ProductCarousel from '@/components/ProductCarousel/ProductCarousel';
import { Newsletter } from '@/components/Newsletter/Newsletter';

export default function Home() {
  return (
    <div>
      <Hero imageSrc={store.src} />
      <ProductCarousel />
      <Review />
      <Newsletter />
    </div>
  );
}
