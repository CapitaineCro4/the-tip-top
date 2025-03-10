import Image from 'next/image';
import { productContent } from '@/content/productContent';
import teaLogo from '@/assets/icons/tea.webp';
const ProductCarousel: React.FC = () => {
  const { products } = productContent;

  return (
    <section className="">
      <div className="flex justify-center items-center bg-[#f2cb7d] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-16 rotate-180">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,50 C300,150 600,-50 900,50 C1200,150 1440,-50 1440,50 L1440,100 L0,100 Z"
              fill="#16803C"
            />
          </svg>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 z-10 mt-32 md:mt-40 md:mb-20">
          Découvrez les merveilles à remporter
        </h2>
      </div>
      <div className="max-full mx-auto">
        <div className="flex md:grid md:grid-cols-5  overflow-x-auto snap-x snap-mandatory md:snap-none scrollbar-hide">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex-none w-[80vw] md:w-auto snap-start p-6 py-24 flex flex-col items-center justify-center"
              style={{ backgroundColor: product.backgroundColor }}
            >
              <div className="bg-white p-4 mb-4">
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  width={200}
                  height={300}
                  className="object-contain"
                />
                <p className="text-center text-sm mt-2 text-gray-700">
                  {product.details}
                </p>
              </div>
              <h3 className="text-lg font-semibold text-white text-center md:mt-5">
                {product.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center bg-[#f2cb7d] pt-6 md:pt-0 pb-20">
        <div className="flex items-center justify-center"></div>

        <div className="flex flex-col items-center justify-center max-w-4xl md:mt-12">
          <Image src={teaLogo} alt="lot" width={180} height={180} />

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 z-10  md:mb-6 text-white">
            Comment participer ?
          </h2>
          <p className="text-center text-sm md:text-xl mt-2 text-white">
            Pour participer, il vous suffit d&apos;effectuer un achat pour un
            montant de 49€. En plus de savourer nos délicieux thés, vous aurez
            la chance de remporter l&apos;un de nos nombreux lots
          </p>
          <p className="text-center text-sm md:text-xl mt-2 text-white">
            * Un grand tirrage final sera organisé et designera le gagnat du
            grand prix. d&apos;une valeur de 360€.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
