"use client";
import Lottie from "lottie-react";
import logoAnimated from "./../public/logoAnimated.json";

export default function loadingComp() {
  return (
    <Lottie
      animationData={logoAnimated}
      loop={true}
      className="w-[40px] mb-20"
    />
  );
}
