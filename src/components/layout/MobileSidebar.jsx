import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Sidebar from "./Sidebar";

const MobileSidebar = ({ open, setOpen }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer */}

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 z-50 h-screen w-72 bg-[#0B1120] shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-end p-5">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 transition hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>

            <Sidebar />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;