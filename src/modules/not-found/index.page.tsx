import Lottie from "react-lottie";
import NotFoundLottie from "assets/images/not-found.json";

export const notFoundRouteName = "/404";
const NotFoundPage = () => {
  return (
    <div className="w-full h-screen max-h-full flex flex-col items-center justify-center">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: NotFoundLottie,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={400}
        width={400}
      />
      <div className="font-semibold text-2xl mt-6">Uh-Oh...</div>
      <div className="text-lg text-gray-500 max-w-xl text-center">
        The page you are looking for may have been moved, deleted, or possibly
        never existed.
      </div>
    </div>
  );
};

export default NotFoundPage;
