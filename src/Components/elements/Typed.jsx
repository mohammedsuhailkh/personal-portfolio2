import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedText = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        'Frontend Developer',
        'CyberSecurity specialist',
        'UI-designer',
        'Web Developer',
        'Music Lover',
      ],
      typeSpeed: 50,
      backSpeed: 10,
      loop: true,
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return <span style={{ fontSize: 'larger', fontWeight: 'bolder'}} ref={typedRef} />;
};

export default TypedText;
