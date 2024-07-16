import { AnimatePresence, motion, Variants } from "framer-motion";
import { X } from "lucide-react";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";

interface Props {
  toggleModal: Dispatch<SetStateAction<boolean>>;
  isModalActive: boolean;
  children: ReactNode;
}

const modalBgAnimation: Variants = {
  close: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  },
  open: {
    opacity: 1,
    display: "flex",
  },
};

const modalContentAnimation: Variants = {
  close: {
    scale: 0,
    opacity: 0,
  },
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
};

export const Modal: FC<Props> = ({ children, isModalActive, toggleModal }) => {
  return (
    <AnimatePresence>
      <motion.div
        variants={modalBgAnimation}
        initial="close"
        animate={isModalActive ? "open" : "close"}
        exit={{ display: "none" }}
        className={`absolute top-0 left-0 w-full h-full z-30 bg-black/20 backdrop-blur-sm flex items-center justify-center`}
      >
        <motion.div
          variants={modalContentAnimation}
          initial={"close"}
          animate={isModalActive ? "open" : "close"}
          exit={{ display: "none" }}
          className=" bg-white rounded-md flex flex-col items-center w-full max-w-sm lg:max-w-2xl md:max-w-md"
        >
          <button
            type="button"
            className="ml-auto pt-4 pr-4"
            onClick={() => toggleModal(!isModalActive)}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="px-10 pt-5 pb-10 w-full">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
