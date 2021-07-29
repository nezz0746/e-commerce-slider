import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import images from './images';

function App(): JSX.Element {
  const { width } = useWindowSize();
  const imageWidth = width > 900 ? 600 : width;
  const cardPadding = 20;
  const imageMarginRight = 2 * cardPadding;
  const imageDivWidth = imageWidth - cardPadding * 2;
  const [indexOfPhotoTransition, setIndexOfPhotoTransition] = useState<number[]>([
    /**
     * Index of animation DESTINATION
     */
    0, /**
     * Index of animation ORIGIN
     */ 0,
  ]);
  const props = useSpring({
    from: {
      translateX: -imageWidth * indexOfPhotoTransition[1],
    },
    to: {
      translateX: -imageWidth * indexOfPhotoTransition[0],
    },
  });
  const carousel = useRef<HTMLDivElement>(null);

  const scrollToImage = useCallback(
    (direction: 'next' | 'previous') => {
      if (direction === 'next') {
        setIndexOfPhotoTransition([indexOfPhotoTransition[0] + 1, indexOfPhotoTransition[0]]);
      } else {
        setIndexOfPhotoTransition([indexOfPhotoTransition[0] - 1, indexOfPhotoTransition[0]]);
      }
    },
    [indexOfPhotoTransition, setIndexOfPhotoTransition],
  );

  return (
    <div className="sm:p-5 bg-gray-100 flex flex-col justify-center items-center text-center h-screen">
      <div className="bg-white shadow-xl rounded-lg inline-flex">
        <div className=" overflow-x-hidden" style={{ width: imageWidth, padding: cardPadding }}>
          <div className="absolute flex flex-row" style={{ width: imageDivWidth, zIndex: 2, height: imageDivWidth }}>
            <div
              className={classNames({
                'h-full w-1/2': true,
                'cursor-pointer': indexOfPhotoTransition[0] !== 0,
              })}
              onClick={() => {
                if (indexOfPhotoTransition[0] !== 0) {
                  scrollToImage('previous');
                }
              }}
            />
            <div
              className={classNames({
                'h-full w-1/2': true,
                'cursor-pointer': indexOfPhotoTransition[0] !== images.length - 1,
              })}
              onClick={() => {
                if (indexOfPhotoTransition[0] !== images.length - 1) {
                  scrollToImage('next');
                }
              }}
            />
          </div>
          <animated.div style={{ ...props }} ref={carousel} className="inline-flex">
            {images.map((url, index) => (
              <div
                key={index + url}
                className="overflow-visible"
                style={{
                  height: imageDivWidth,
                  width: imageDivWidth,
                  marginRight: imageMarginRight,
                }}
              >
                <img src={url} key={index + url} alt="hoodie" className="shadow-md object-fill rounded-lg" />
              </div>
            ))}
          </animated.div>
          <div className="grid grid-cols-3 sm:grid-cols-6">
            {images.map((url, index) => (
              <img
                src={url}
                key={index}
                alt="blue-hoodie"
                className={classNames({
                  'cursor-pointer': true,
                  'opacity-50': index !== indexOfPhotoTransition[0],
                })}
                onClick={() => {
                  setIndexOfPhotoTransition([index, indexOfPhotoTransition[0]]);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
