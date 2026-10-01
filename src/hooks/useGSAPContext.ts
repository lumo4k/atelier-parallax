"use client";
import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
export function useGSAPContext(
  scope: RefObject<HTMLElement | null>,
  setup: () => void,
) {
  useEffect(() => {
    const context = gsap.context(setup, scope);
    return () => context.revert();
  }, [scope, setup]);
}
