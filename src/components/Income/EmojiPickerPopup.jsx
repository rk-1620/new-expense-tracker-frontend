import { useEffect, useState } from "react";
import { LuImage, LuX } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(icon);
  useEffect(() => {
    setSelectedIcon(icon); // react to changes from parent
  }, [icon]);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
          {selectedIcon ? <span className="text-2xl">{selectedIcon}</span> : <LuImage />}
        </div>

        <p className="text-sm font-medium text-gray-700">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {isOpen && (
        <div className="relative z-50">
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

          <EmojiPicker
            onEmojiClick={(emoji) => {
              const emojiChar = emoji.emoji;
              setSelectedIcon(emoji?.imageUrl); // local state for instant UI
              onSelect(emojiChar);        // send to parent
              setIsOpen(false);           // auto-close on select
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
