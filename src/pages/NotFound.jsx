
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f7f5ec] px-5 py-[30px] text-center">

      <h1 className="m-0 text-[100px] font-bold text-[#285d3c] max-[600px]:text-[75px]">
        404
      </h1>

      <h2 className="my-[10px] font-[Georgia,serif] text-2xl font-bold text-[#285d3c] max-[600px]:text-xl">
        Oops! Recipe Not Found
      </h2>

      <p className="max-w-[400px] leading-[1.6] text-[#555] max-[600px]:text-sm">
        Looks like this page is not on our menu.
        Let's get you back to something delicious!
      </p>

      <Link
        to="/"
        className="mt-5 inline-block rounded-full bg-[#e9a900] px-[25px] py-3 font-semibold text-[#222] no-underline transition-colors duration-200 hover:bg-[#d89500]"
      >
        Back to Home
      </Link>

    </div>
  );
}

export default NotFound;
