import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
// import { Player } from '../../components';
import { Player } from '@livepeer/react';
import { STATUS } from '../../constants';

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
];

const product = {
  id: 1,
  name: 'Throwback Hip Bag',
  href: '#',
  color: 'Salmon',
  price: '$90.00',
  quantity: 1,
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
  imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
};

export default function UploadStatus({ open, close, videoProgress, assets, status, thumbnail }) {
  // const [open, setOpen] = useState(true)
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('https://livepeer.studio/api/asset', {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LIVEPEER_KEY}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.filter((item) => item.status.phase != STATUS.READY));
      });
  }, []);

  console.log(videos);

  console.log('assets', assets);
  console.log('videoProgress', videoProgress);
  console.log('status', status);
  console.log('thumbnail', thumbnail);
  console.log('path', thumbnail && URL.createObjectURL(thumbnail));

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Upload</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => close()}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {videoProgress && (
                            <div className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={thumbnail && URL.createObjectURL(thumbnail)}
                                  alt="thumbnail"
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{videoProgress?.name}</h3>
                                  </div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    {videoProgress.progress < 1 ? (
                                      <>
                                        <p className="mt-1 text-sm text-gray-500">{videoProgress.phase}</p>
                                        <p className="ml-4">{`${(videoProgress.progress * 100).toFixed(2)}%`}</p>
                                      </>
                                    ) : (
                                      <>
                                        <p className="mt-1 text-sm text-gray-500">Upload</p>
                                        <p className="ml-4">{status}</p>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  {/* <p className="text-gray-500">Qty {product.quantity}</p> */}
                                  {videoProgress.progress < 1 && (
                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {videos &&
                          videos.length &&
                          videos.map((video) => (
                            <li key={product.id} className="flex py-6">
                              {video.status.phase !== STATUS.FAILED && (
                                  <Player
                                    title="Waterfalls"
                                    playbackId={video.playbackId}
                                    showPipButton
                                    showTitle={false}
                                    aspectRatio="16to9"
                                    // poster={<PosterImage />}
                                    controls={{
                                      autohide: 3000,
                                    }}
                                    theme={{
                                      borderStyles: { containerBorderStyle: 'solid' },
                                      radii: { containerBorderRadius: '10px' },
                                    }}
                                  />
                              )}

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={product.href}>{video.name}</a>
                                    </h3>
                                  </div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p className="mt-1 text-sm text-gray-500">{video.status.phase}</p>
                                    {video.status.progress && <p className="ml-4">{video.status.progress}</p>}
                                    {video.status.phase === STATUS.FAILED && (
                                      <p className="mt-1 text-sm text-red-500">{video.status.errorMessage}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
