import Head from 'next/head';
import { Box, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TextWidget } from '@/components/Text';

const letters = ['S', 'E', 'N', 'G', 'V', 'I', 'C', 'H', 'E', 'T'];

export default function HomePage() {
  const title = 'Welcome to Portfolio';
  const theme = useTheme();
  const router = useRouter();
  const [typedCount, setTypedCount] = useState(0);
  const [spreadOut, setSpreadOut] = useState(false);

  useEffect(() => {
    if (typedCount < letters.length) {
      const timer = setTimeout(() => {
        setTypedCount((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setSpreadOut(true);
        setTimeout(() => {
          router.push('/portfolio/homefeed');
        }, 800);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [typedCount]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <style>{`
          .letter {
            position: fixed;
            top: 50%;
            left: 50%;
            opacity: 0;
            transform: translate(-50%, -50%);
            transition:
              top 1s ease,
              left 1s ease,
              transform 1s ease,
              opacity 0.3s ease;
            user-select: none;
          }

          .letter.visible {
            opacity: 1;
          }

          /* During typing: offset letters with margin */
          ${letters
            .map(
              (_, idx) => `
            .typing-${idx} {
              transform: translate(calc(-50% + ${
                (idx - letters.length / 2) * 30
              }px), -50%);
            }
          `
            )
            .join('\n')}

          /* Spread out: fixed positions at top */
          ${letters
            .map(
              (_, idx) => `
            .spread-${idx} {
              top: 20px;
              left: ${25 + idx * 5}%;
              transform: translateX(-50%);
            }
          `
            )
            .join('\n')}

          /* Responsive for small screens */
          @media (max-width: 600px) {
            ${letters
              .map(
                (_, idx) => `
                .typing-${idx} {
                  transform: translate(calc(-50% + ${
                    (idx - letters.length / 2) * 18
                  }px), -50%);
                }
              `
              )
              .join('\n')}

            ${letters
              .map(
                (_, idx) => `
                .spread-${idx} {
                  top: 15px;
                  left: ${15 + idx * 7}%;
                  transform: translateX(-50%);
                }
              `
              )
              .join('\n')}

            .letter {
              font-size: 24px !important;
            }
          }
        `}</style>
      </Head>

      <Box
        sx={{
          background: theme.palette.background.default,
          height: '100vh',
          width: '100vw',
          position: 'relative',
          userSelect: 'none',
          overflow: 'hidden'
        }}
      >
        {letters.map((letter, idx) => (
          <TextWidget
            key={idx}
            className={`letter ${typedCount > idx ? 'visible' : ''} ${
              spreadOut ? `spread-${idx}` : `typing-${idx}`
            }`}
            sx={{
              color: theme.palette.text.primary,
              transitionDelay: `${idx * 0.001}s`,
              fontSize: 30
            }}
          >
            {letter}
          </TextWidget>
        ))}
      </Box>
    </>
  );
}
