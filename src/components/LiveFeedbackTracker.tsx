import React, { useEffect, useRef } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Hands } from "@mediapipe/hands";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";

export default function LiveFeedbackTracker() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // ⭐ 녹화 관련
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (!videoRef.current) return;

    let faceData: any = null;
    let handData: any = null;
    let poseData: any = null;
    let lastLogTime = 0;

    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true, // 👉 나중에 음성 분석/업로드 대비
        });

        videoRef.current!.srcObject = stream;

        // ⭐ 녹화 시작
        startRecording(stream);

        startMediapipe();
      } catch (err) {
        console.error("❌ Camera permission denied!", err);
      }
    }

    function startRecording(stream: MediaStream) {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;

      console.log("🎥 Recording started");
    }

    // ⭐ 외부에서 호출할 수 있도록 window에 등록 (임시)
    (window as any).stopRecording = () => {
      mediaRecorderRef.current?.stop();

      mediaRecorderRef.current!.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `live-feedback-${Date.now()}.webm`;
        a.click();

        URL.revokeObjectURL(url);
        recordedChunksRef.current = [];

        console.log("💾 Recording saved");
      };
    };

    function startMediapipe() {
      // ⚠️ 기존 Mediapipe 코드 그대로
      // (생략 – 네 코드 그대로 유지)
    }

    initCamera();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={{ width: 0, height: 0, opacity: 0, position: "absolute" }}
    />
  );
}
