
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const newsScroll = () => {
  return (
      <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-md"
            onClick={() =>
              scroll.scrollTo(window.innerHeight, { smooth: true, offset: -50 })
            }
          >
            View All News ↓
          </button>
    </div>
  )
}

export default newsScroll
