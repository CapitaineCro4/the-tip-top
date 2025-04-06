import { FaStar } from 'react-icons/fa';
import { reviewContent } from '@/content/reviewContent';

const Review: React.FC = () => {
  const { title, reviews } = reviewContent;

  return (
    <section className="py-10 px-4 md:py-20 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-24">
          {title}
          <span className="block h-1 w-12 bg-green-700 mx-auto mt-2"></span>
        </h2>

        <div
          className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory md:snap-none scrollbar-hide overflow-y-hidden"
          style={{
            scrollbarWidth: 'none',
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex-none w-[70vw] md:w-auto snap-start rounded-md border-2 border-[#242E61] p-6 "
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-5 h-5 roundeed-md ${
                      i < review.rating ? 'text-orange-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
