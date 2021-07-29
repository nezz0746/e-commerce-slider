import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';
import { ClothingArticleProps } from '.';
import './App.css';
import images from './images';

function App({ articleName, articlePrice, articleSizeOptions }: ClothingArticleProps): JSX.Element {
  const imageWidth = 600;
  const cardPadding = 20;
  const imageMarginRight = 2 * cardPadding;
  const imageDivWidth = imageWidth - cardPadding * 2;
  const [sizeSelected, setSizeSelected] = useState<string | null>(null);
  const [indexOfPhotoTransition, setIndexOfPhotoTransition] = useState<number[]>([
    /**
     * Index of animation DESTINATION
     */
    0,
    /**
     * Index of animation ORIGIN
     */
    0,
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
    <div className="border-4 p-5 bg-gray-100 text-center h-screen">
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
          <div className="grid grid-cols-6">
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
        {/* <div className="flex-grow text-left" style={{ padding: cardPadding, marginRight: 50 }}>
          <p className="text-3xl font-roboto font-black">{articleName.toUpperCase()}</p>
          <p className="text-xl font-roboto font-black">€ {articlePrice.toFixed(2)}</p>
          <button
            type="button"
            className={classNames({
              'inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-m focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 my-10': true,
              'text-white bg-black': sizeSelected,
              'text-white bg-gray-500': !sizeSelected,
            })}
          >
            ADD TO CART
          </button>
          <div className="flex flex-row">
            {articleSizeOptions.map(({ option, available }) => {
              return (
                <p
                  key={articleName + option + 'selector'}
                  onClick={() => {
                    if (available) {
                      setSizeSelected(option);
                    }
                  }}
                  className={classNames({
                    'text-xl mr-4 font-roboto font-black cursor-pointer': true,
                    'text-gray-400 line-through cursor-not-allowed': !available,
                    'text-blue-400': sizeSelected === option,
                  })}
                >
                  {option}
                </p>
              );
            })}
          </div>
          <ArticleTabs />
        </div> */}
      </div>
    </div>
  );
}

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/

function ArticleTabs(): JSX.Element {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabs = ['Decription', "Guide d'entretien", 'Taille et Coupe', 'Retours'];

  return (
    <div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tabName, index) => (
              <a
                key={tabName}
                onClick={() => {
                  setActiveTabIndex(index);
                }}
                className={classNames(
                  index === activeTabIndex
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap cursor-pointer py-4 px-1 border-b-2 font-medium text-sm',
                )}
              >
                {tabName}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default App;
