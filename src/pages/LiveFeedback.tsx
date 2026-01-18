import React, { useState, useRef, useEffect } from "react";
import LiveFeedbackTracker from "../components/LiveFeedbackTracker";
import CountdownOverlay from "../components/CountdownOverlay";
import TutorialModal from "../components/TutorialModal";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const TUTORIAL_HIDE_KEY = "hideLiveTutorial";

export default function LiveFeedback() {
  const navigate = useNavigate();

  const [showTutorial, setShowTutorial] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 토글 상태
  const [isLiveFeedbackOn, setIsLiveFeedbackOn] = useState(true);
  const [isEmergencyOn, setIsEmergencyOn] = useState(false);

  // 모달창, 카운트다운 시 비디오 일시정지/재생
  useEffect(() => {
    if (!videoRef.current) return;

    if (showTutorial || showCountdown) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [showTutorial, showCountdown]);

  useEffect(() => {
    const hideTutorial = localStorage.getItem(TUTORIAL_HIDE_KEY);

    if (hideTutorial === "true") {
      setShowCountdown(true);
    } else {
      setShowTutorial(true);
    }
  }, []);

  // (선택) 상태 변경 확인용
  useEffect(() => {
    console.log("실시간 피드백:", isLiveFeedbackOn);
    console.log("돌발 상황:", isEmergencyOn);
  }, [isLiveFeedbackOn, isEmergencyOn]);

  return (
    <>
      <LiveFeedbackTracker />

      <div className="relative h-screen w-screen overflow-hidden">
        {/* 튜토리얼 */}
        {showTutorial && (
          <TutorialModal
            onClose={() => {
              setShowTutorial(false);
              setShowCountdown(true);
            }}
          />
        )}

        {/* 카운트다운 */}
        {showCountdown && (
          <CountdownOverlay onFinish={() => setShowCountdown(false)} />
        )}

        {/* 배경 비디오 */}
        <video
          ref={videoRef}
          src="./video/LivePeople.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* 비디오 위 콘텐츠 */}
        <div className="h-full relative z-10">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-35 bg-gradient-to-b from-[#5650FF]/60 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-35 bg-gradient-to-t from-[#5650FF]/60 to-transparent" />
          </div>

          <div className="h-full flex flex-col justify-between p-8 text-white relative z-10">
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <FaArrowLeftLong size={30} />
            </div>

            <div className="px-10 flex justify-between items-center">
              <div>
                <img src="./img/soundWave.png" className="h-28 w-28" />
              </div>

              <div className="text-right space-y-3">
                {/* 실시간 피드백 */}
                <div className="flex justify-end items-center gap-3">
                  <span>실시간 피드백</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isLiveFeedbackOn}
                      onChange={(e) => setIsLiveFeedbackOn(e.target.checked)}
                    />
                    <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#ACA9FE] transition-all"></div>
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                  </label>
                </div>

                {/* 돌발 상황 */}
                <div className="flex justify-end items-center gap-3">
                  <span>돌발 상황</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isEmergencyOn}
                      onChange={(e) => setIsEmergencyOn(e.target.checked)}
                    />
                    <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#ACA9FE] transition-all"></div>
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                  </label>
                </div>

                <div
                  onClick={() => {
                    // 녹화 종료
                    (window as any).stopRecording?.();

                    // 결과 페이지 이동
                    navigate("/result");
                  }}
                  className="cursor-pointer">
                  종료하기
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
