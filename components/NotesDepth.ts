import React from 'react';

// Page-level depth for art-directed Notes: writes three CSS variables on the page
// root that the grimoire art reads for parallax.
//   --nd-scroll  window.scrollY in px (layers drift at different rates)
//   --nd-px/py   pointer position relative to the viewport centre, −1 … 1,
//                eased toward the pointer so layers settle instead of snapping
// Pointer depth only runs for fine pointers; nothing runs under reduced motion.
export const useNotesDepth = (rootRef: React.RefObject<HTMLElement | null>, enabled: boolean) => {
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const finePointer = window.matchMedia?.('(pointer: fine)').matches ?? false;

    let target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const paint = () => {
      frame = 0;
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      root.style.setProperty('--nd-px', current.x.toFixed(3));
      root.style.setProperty('--nd-py', current.y.toFixed(3));
      root.style.setProperty('--nd-scroll', String(Math.round(window.scrollY)));
      if (Math.abs(target.x - current.x) > 0.002 || Math.abs(target.y - current.y) > 0.002) {
        frame = window.requestAnimationFrame(paint);
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const onPointer = (event: PointerEvent) => {
      target = {
        x: Math.max(-1, Math.min(1, (event.clientX / window.innerWidth) * 2 - 1)),
        y: Math.max(-1, Math.min(1, (event.clientY / window.innerHeight) * 2 - 1)),
      };
      schedule();
    };

    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    if (finePointer) window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('pointermove', onPointer);
      if (frame) window.cancelAnimationFrame(frame);
      ['--nd-px', '--nd-py', '--nd-scroll'].forEach((name) => root.style.removeProperty(name));
    };
  }, [rootRef, enabled]);
};
