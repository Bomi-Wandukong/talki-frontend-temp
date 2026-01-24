import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

interface TutorialModalProps {
  onClose: () => void;
}

const TUTORIAL_HIDE_KEY = "hideLiveTutorial";

export default function TutorialModal({ onClose }: TutorialModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem(TUTORIAL_HIDE_KEY, "true");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex justify-center items-center">
      <div className="relative bg-white rounded-2xl w-[900px] max-w-[90%] p-6 shadow-none">
        {/* X 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
          <IoClose size={24} />
        </button>

        {/* 콘텐츠 영역 */}
        <div className="pt-10 flex items-center justify-center">
          <img
            src="/imgs/LiveFeedbackTutorial.png"
            alt="튜토리얼 이미지"
            className="max-h-full max-w-full"
          />
        </div>

        {/* 하단 영역 */}
        <div className="mt-2 flex justify-end items-center">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            다시 보지 않기
          </label>
        </div>
      </div>
    </div>
  );
}
