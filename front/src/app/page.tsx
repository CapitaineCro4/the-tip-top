import Review from '@/components/ui/Review';
import Hero from '@/components/ui/Hero';
import store from '@/assets/images/store.jpg';
import ProductCarousel from '@/components/ui/ProductCarousel';
import { Newsletter } from '@/components/ui/Newsletter/Newsletter';

export default function Home() {
  return (
    <div>
      <Hero imageSrc={store} />
      <ProductCarousel />
      <Review />
      <Newsletter />
    </div>
  );
}
