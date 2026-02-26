import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedText = () => {
  const typedRef  = useRef(null);
  const typedInst = useRef(null);

  // Parent (HeroText) mounts this only after heroGameEnd.
  useEffect(() => {
    if (!typedRef.current) return undefined;

    const id = setTimeout(() => {
      typedInst.current = new Typed(typedRef.current, {
        strings: [
          'Unity Game Developer',
          'CyberSecurity Enthusiast',
          'UI Designer',
          'Web Developer',
        ],
        typeSpeed: 55,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
      });
    }, 600);

    return () => {
      clearTimeout(id);
      typedInst.current?.destroy();
    };
  }, []);

  return (
    <span
      ref={typedRef}
      style={{ fontSize: 'larger', fontWeight: 'bolder' }}
    />
  );
};

export default TypedText;
