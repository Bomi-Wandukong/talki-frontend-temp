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
      <div className="relative bg-white rounded-2xl w-[900px] max-w-[90%] p-6">
        {/* X 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <IoClose size={24} />
        </button>

        {/* 콘텐츠 영역 */}
        <div className="h-[400px] flex items-center justify-center text-gray-500">
          튜토리얼 설명 & 이미지 영역
        </div>

        {/* 하단 영역 */}
        <div className="mt-6 flex justify-between items-center">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            다시 보지 않기
          </label>

          <button
            onClick={handleClose}
            className="px-6 py-2 rounded-lg bg-[#5650FF] text-white text-sm">
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
