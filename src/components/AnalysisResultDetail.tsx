import React, { useEffect, useRef, useState } from "react";
import RepeatWordChart from "./RepeatWordChart";

export default function AnalysisResultDetail() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 타임스탬프를 초 단위로 변환하는 함수
  const parseTimestamp = (timestamp: string): number => {
    const [minutes, seconds] = timestamp.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  // 비디오 특정 시점으로 이동하는 함수
  const seekToTime = (timestamp: string) => {
    if (videoRef.current) {
      const timeInSeconds = parseTimestamp(timestamp);
      videoRef.current.currentTime = timeInSeconds;
      videoRef.current.play();

      // 비디오 위치로 스크롤
      videoRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
            );
            setVisibleSections((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 },
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="w-screen bg-[#F7F7F8] text-[#3B3B3B]">
        <div className="fontLight leading-6 w-full py-20 px-[20%]">
          <span className="text-[25px] fontBold pb-3 border-b border-[#D7D6F1]">
            세부 분석 결과
          </span>

          {/* 음성 분석 결과 */}
          <div
            ref={(el) => (sectionRefs.current[0] = el)}
            data-index="0"
            className={`mt-10 w-full bg-white rounded-2xl border border-[#D7D6F1] px-8 pt-10 pb-15 transition-all duration-700 ${
              visibleSections.includes(0)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}>
            <p className="text-[20px] fontBold">
              <span className="text-[#5650FF]">음성</span> 분석 결과
            </p>

            <div className="mt-8 px-5">
              <div className="flex flex-col justify-center">
                <p className="text-[#5650FF] text-[16px] fontBold">
                  발화 속도 결과
                </p>

                <p className="text-[14px] mt-6">
                  발화 속도가 약간 느린 편이에요. 발표 상황에 따라 템포를 조금
                  더 살리면 전달력이 더 좋아질 수 있어요.
                </p>
              </div>

              <div className="mt-12 flex flex-col justify-center">
                <p className="text-[#5650FF] text-[16px] fontBold">
                  반복어 분석 결과
                </p>
                <p className="text-[14px] mt-6">
                  "음…", "어…", "그…"와 같은 생각하는 순간 나오는 습관 반복어가
                  소량 포함되어 있었어요. 하지만 대화형 발표에서는 자연스럽게
                  나타나는 부분이고, 전체 발화량 대비 과도하게 많지는 않은
                  편이었습니다.
                  <br />
                  <br />
                  특히 "음…"과 "어…"가 전체 반복어의 대부분을 차지하고 있었으니,
                  이 두 가지 표현만 조금 줄여도 발표의 전문성이 크게 올라가
                  보여요!
                </p>
                <RepeatWordChart />
              </div>
            </div>
          </div>

          {/* 시선 분석 결과 */}
          <div
            ref={(el) => (sectionRefs.current[1] = el)}
            data-index="1"
            className={`mt-10 w-full bg-white rounded-2xl border border-[#D7D6F1] px-8 pt-10 pb-15 transition-all duration-700 ${
              visibleSections.includes(1)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}>
            <p className="text-[20px] fontBold">
              <span className="text-[#5650FF]">시선</span> 분석 결과
            </p>

            <div className="mt-5 px-2">
              <div className="flex justify-between rounded-xl bg-[#F7F7F8] p-6">
                <p className="text-[15px] text-gray-600">카메라 응시율</p>
                <p className="text-[32px] fontBold text-[#5650FF] text-right">
                  72%
                </p>
              </div>

              <p className="mt-5 text-[14px]">
                카메라를 비교적 잘 바라보면서 말하고 있어요. 지금 정도만
                유지해도 충분히 안정적인 인상이에요.
              </p>
            </div>
          </div>

          {/* 행동 분석 결과 */}
          <div
            ref={(el) => (sectionRefs.current[2] = el)}
            data-index="2"
            className={`mt-10 w-full bg-white rounded-2xl border border-[#D7D6F1] px-8 pt-10 pb-15 transition-all duration-700 ${
              visibleSections.includes(2)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}>
            <p className="text-[20px] fontBold">
              <span className="text-[#5650FF]">행동</span> 분석 결과
            </p>

            <div className="mt-5 px-2">
              {/* 비디오 플레이어 */}
              <div className="w-full max-w-4xl mx-auto">
                <video
                  ref={videoRef}
                  className="w-full rounded-lg shadow-lg"
                  controls
                  src="./video/TimeStampTest.mp4">
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="mt-8">
                <p className="text-[#5650FF] text-[16px] fontBold">
                  강점 포인트
                </p>

                <div className="mt-4 text-[14px] border-2 border-[#D7D6F1] rounded-xl overflow-hidden">
                  <div className="flex border-b border-[#D7D6F1] hover:bg-gray-50 transition-colors">
                    <div className="w-[80%] flex items-center justify-center py-3 px-4 text-center border-r border-[#D7D6F1]">
                      핵심 문장을 말할 때 억양이 안정적으로 유지되어 전달력이
                      높았던 구간
                    </div>
                    <button
                      onClick={() => seekToTime("0:02")}
                      className="w-[20%] flex items-center justify-center py-3 px-4 text-[#5678FF] hover:bg-[#5650FF] hover:text-white transition-colors cursor-pointer">
                      0:02
                    </button>
                  </div>

                  <div className="flex border-b border-[#D7D6F1] hover:bg-gray-50 transition-colors">
                    <div className="w-[80%] flex items-center justify-center py-3 px-4 text-center border-r border-[#D7D6F1]">
                      시선을 카메라에 꾸준히 고정하며 자신감 있는 태도를 보여준
                      구간
                    </div>
                    <button
                      onClick={() => seekToTime("0:08")}
                      className="w-[20%] flex items-center justify-center py-3 px-4 text-[#5678FF] hover:bg-[#5650FF] hover:text-white transition-colors cursor-pointer">
                      0:08
                    </button>
                  </div>

                  <div className="flex border-b border-[#D7D6F1] hover:bg-gray-50 transition-colors">
                    <div className="w-[80%] flex items-center justify-center py-3 px-4 text-center border-r border-[#D7D6F1]">
                      손 제스처가 자연스럽게 내용과 결합되어 설명이 명확하게
                      들렸던 구간
                    </div>
                    <button
                      onClick={() => seekToTime("0:20")}
                      className="w-[20%] flex items-center justify-center py-3 px-4 text-[#5678FF] hover:bg-[#5650FF] hover:text-white transition-colors cursor-pointer">
                      0:20
                    </button>
                  </div>

                  <div className="flex border-b border-[#D7D6F1] hover:bg-gray-50 transition-colors">
                    <div className="w-[80%] flex items-center justify-center py-3 px-4 text-center border-r border-[#D7D6F1]">
                      속도와 톤이 일정하게 유지되어 청중이 내용에 몰입할 수
                      있었던 구간
                    </div>
                    <button
                      onClick={() => seekToTime("0:31")}
                      className="w-[20%] flex items-center justify-center py-3 px-4 text-[#5678FF] hover:bg-[#5650FF] hover:text-white transition-colors cursor-pointer">
                      0:31
                    </button>
                  </div>

                  <div className="flex hover:bg-gray-50 transition-colors">
                    <div className="w-[80%] flex items-center justify-center py-3 px-4 text-center border-r border-[#D7D6F1]">
                      중요 포인트를 강조할 때 목소리 톤 변화가 적절해 설득력이
                      높았던 구간
                    </div>
                    <button
                      onClick={() => seekToTime("0:55")}
                      className="w-[20%] flex items-center justify-center py-3 px-4 text-[#5678FF] hover:bg-[#5650FF] hover:text-white transition-colors cursor-pointer">
                      0:55
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-[#5650FF] text-[16px] fontBold">
                  개선 포인트
                </p>

                <div className="mt-4 text-[14px] border-2 border-[#D7D6F1] rounded-xl overflow-hidden">
                  <div className="flex border-b border-[#D7D6F1] hover:bg-gray-50 transition-colors">
                    <div className="w-[80%] flex items-center justify-center py-3 px-4 text-center border-r border-[#D7D6F1]">
                      문장 시작 부분에서 속도가 조금 빨라져 내용이 급하게
                      느껴졌던 구간
                    </div>
                    <button
                      onClick={() => seekToTime("0:02")}
                      className="w-[20%] flex items-center justify-center py-3 px-4 text-[#5678FF] hover:bg-[#5650FF] hover:text-white transition-colors cursor-pointer">
                      0:02
                    </button>
                  </div>

                  <div className="flex border-b border-[#D7D6F1] hover:bg-gray-50 transition-colors">
                    <div className="w-[80%] flex items-center justify-center py-3 px-4 text-center border-r border-[#D7D6F1]">
                      시선이 잠시 화면 밖으로 이동해 집중도가 떨어져 보였던 구간
                    </div>
                    <button
                      onClick={() => seekToTime("0:08")}
                      className="w-[20%] flex items-center justify-center py-3 px-4 text-[#5678FF] hover:bg-[#5650FF] hover:text-white transition-colors cursor-pointer">
                      0:08
                    </button>
                  </div>

                  <div className="flex border-b border-[#D7D6F1] hover:bg-gray-50 transition-colors">
                    <div className="w-[80%] flex items-center justify-center py-3 px-4 text-center border-r border-[#D7D6F1]">
                      말을 잇는 과정에서 '음...', '어...' 등의 반복어가 나타난
                      구간
                    </div>
                    <button
                      onClick={() => seekToTime("0:20")}
                      className="w-[20%] flex items-center justify-center py-3 px-4 text-[#5678FF] hover:bg-[#5650FF] hover:text-white transition-colors cursor-pointer">
                      0:20
                    </button>
                  </div>

                  <div className="flex border-b border-[#D7D6F1] hover:bg-gray-50 transition-colors">
                    <div className="w-[80%] flex items-center justify-center py-3 px-4 text-center border-r border-[#D7D6F1]">
                      손 제스처가 다소 크고 빈번하게 사용되어 메세지가 흐려졌던
                      구간
                    </div>
                    <button
                      onClick={() => seekToTime("0:31")}
                      className="w-[20%] flex items-center justify-center py-3 px-4 text-[#5678FF] hover:bg-[#5650FF] hover:text-white transition-colors cursor-pointer">
                      0:31
                    </button>
                  </div>

                  <div className="flex hover:bg-gray-50 transition-colors">
                    <div className="w-[80%] flex items-center justify-center py-3 px-4 text-center border-r border-[#D7D6F1]">
                      문장 마무리 시 톤이 약해져 전달력이 다소 떨어진 구간
                    </div>
                    <button
                      onClick={() => seekToTime("0:55")}
                      className="w-[20%] flex items-center justify-center py-3 px-4 text-[#5678FF] hover:bg-[#5650FF] hover:text-white transition-colors cursor-pointer">
                      0:55
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-[#5650FF] text-[16px] fontBold">돌발 질문</p>

                <div className="mt-4 text-[14px] border-2 border-[#D7D6F1] rounded-xl overflow-hidden">
                  <div className="flex border-b border-[#D7D6F1] hover:bg-gray-50 transition-colors">
                    <div className="w-[80%] flex items-center justify-center py-3 px-4 text-center border-r border-[#D7D6F1]">
                      Q. 사회불안장애가 정확히 무엇인가요? <br />
                      A. 사회적인 상황에서 생기는 불안 증상들을 사회불안장애라고
                      합니다.
                    </div>
                    <button
                      onClick={() => seekToTime("0:02")}
                      className="w-[20%] flex items-center justify-center py-3 px-4 text-[#5678FF] hover:bg-[#5650FF] hover:text-white transition-colors cursor-pointer">
                      0:02
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 발표 내용 분석 결과 */}
          <div
            ref={(el) => (sectionRefs.current[3] = el)}
            data-index="3"
            className={`mt-10 w-full bg-white rounded-2xl border border-[#D7D6F1] px-8 py-10 transition-all duration-700 ${
              visibleSections.includes(3)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}>
            <p className="text-[20px] fontBold">
              <span className="text-[#5650FF]">발표 내용</span> 분석 결과
            </p>
            <div className="mt-5 px-2 flex">
              <p className="text-[14px] mt-7 pl-5 pr-10">
                발표 내용이 전반적으로 주제에 잘 맞게 구성되어 있고, 핵심에서
                크게 벗어나는 부분 없이 흐름이 잘 유지되고 있어요.
                <br />
                <br />
                전체적인 전개는 이해하기 쉽지만, 일부 구간에서 문단 사이 연결이
                조금 끊기는 느낌이 있어 다듬으면 더 좋아질 것 같아요.
                <br />
                <br />
                내용상 큰 오류나 어색한 부분은 없어서 전반적으로 신뢰감 있게
                들립니다.
              </p>

              <img
                src="./img/contentFeedbackGraph.png"
                className="min-w-[280px] h-auto object-contain mx-auto"
                alt="내용 피드백 그래프"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
