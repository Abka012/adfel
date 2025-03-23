import React, { useState, useEffect } from 'react';

const CustomTypingEffect: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loopNum, setLoopNum] = useState<number>(0);
  const [typingSpeed, setTypingSpeed] = useState<number>(150);

  const words: string[] = ['Welcome to Advent Fellowship', 'Your Home Away From Home'];
  const currentWord: string = words[loopNum % words.length];

  useEffect(() => {
    const handleTyping = () => {
      setText((prevText) =>
        isDeleting
          ? currentWord.substring(0, prevText.length - 1)
          : currentWord.substring(0, prevText.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum((prevLoopNum) => prevLoopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, currentWord, typingSpeed]);

  return (
    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
      {text}
    </span>
  );
};

export default CustomTypingEffect;
