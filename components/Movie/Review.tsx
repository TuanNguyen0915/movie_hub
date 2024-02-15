import { getCreateDate } from "@/actions/getDate";

interface IReview {
  author: string;
  created_at: string;
  content: string;
}

const Review = ({ review }: { review: IReview }) => {
  const reviewDate = getCreateDate(review.created_at);
  return (
    <div className="mx-auto flex h-[300px] w-[300px] flex-col gap-4 rounded-lg bg-slate-400/10 p-4 backdrop-blur-sm">
      <div>
        <p className="w-full text-xl font-semibold">{review.author}</p>
        <p className="w-full text-base italic">{reviewDate}</p>
      </div>
      <p className="w-full flex-1  text-sm italic text-gray-200 ">
        {review.content.length > 350
          ? `${review.content.slice(0, 350)} ...`
          : review.content}
      </p>
    </div>
  );
};

export default Review;
