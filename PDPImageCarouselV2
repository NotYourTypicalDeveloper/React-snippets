import { Box, Circle, Flex, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Image from 'next/image';
import { IBasicImage } from '@typeDefs/shopifyData/collection';
import MagnifierIcon from '@components/atoms/icons-logos/MagnifierIcon';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useState } from 'react';

export interface IPDPImageCarousel {
  productName: string;
  activeImage: IBasicImage | null;
  lifestyleImages: IBasicImage[] | null;
}

interface IZoomControls {
  zoomIn: () => void;
  resetTransform: () => void;
  imageKey: string;
}
const PDPImageCarousel = ({
  productName,
  activeImage,
  lifestyleImages,
}: IPDPImageCarousel) => {
  const [isZoomActive, setZoomActive] = useState<boolean>(false);

  const imageWidth = activeImage?.width || 1024;
  const imageHeight = activeImage?.height || 768;

  let allImages = [activeImage];
  if (lifestyleImages) allImages = [activeImage, ...lifestyleImages];

  // magnifier & close button
  const ZoomControls = ({
    zoomIn,
    resetTransform,
    imageKey,
  }: IZoomControls) => (
    <>
      <IconButton
        aria-label="Zoom-button"
        bg="whiteAlpha.800"
        icon={<MagnifierIcon boxSize={7} />}
        pos="absolute"
        top={2}
        left={1}
        zIndex={1}
        onClick={() => {
          setZoomActive(true);
          zoomIn();
        }}
      />
      <IconButton
        aria-label="close-button"
        data-key={`closeBtn-${imageKey}`}
        bg="whiteAlpha.800"
        icon={<CloseIcon boxSize={4} />}
        pos="absolute"
        right={2}
        top={2}
        zIndex={1}
        onClick={() => {
          setZoomActive(false);
          resetTransform();
        }}
      />
    </>
  );

  // Carousel images
  const imageSlides = allImages.map((image, index) => {
    const imgAltText = image?.altText;
    const imgURL = image?.url;
    const imageKey = `${productName}${index + 1}`;
    if (imgURL) {
      return (
        <Slide key={imageKey} index={index}>
          <TransformWrapper maxScale={2} wheel={{ disabled: true }}>
            {(utils) => (
              <>
                <ZoomControls {...utils} imageKey={imageKey} />
                <TransformComponent
                  wrapperStyle={{ width: '100%', height: '100%' }}
                  contentStyle={{ width: '100%', height: '100%' }}
                >
                  <Image
                    src={imgURL}
                    alt={imgAltText || `image of ${productName}`}
                    objectFit="contain"
                    layout="fill"
                    width={1024}
                    height={768}
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </Slide>
      );
    } else {
      return (
        <Slide key={`${imageKey}-notfound`} index={index}>
          <Box pos="absolute" top="50%" left="50%" margin="-50px 0 0 -50px">
            No image available
          </Box>
        </Slide>
      );
    }
  });

  const trackingDots = allImages.map((item, index) => (
    <Dot key={`dot-${index}`} slide={index}>
      <Circle
        size={{ base: '2', lg: '4' }}
        bg="bcDeepPurple.100"
        mr={{ base: '2', lg: '4' }}
        sx={{
          '.carousel__dot--selected &': {
            backgroundColor: 'bcDeepPurple.700',
          },
        }}
      ></Circle>
    </Dot>
  ));

  // miniature thumbnails
  const imageThumbnails = allImages.map((image, index) => {
    const imgAltText = image?.altText;
    const imgURL = image?.url;
    const imageKey = `${productName}${index + 1}`;
    if (imgURL) {
      return (
        <Dot
          key={`thumb-${imageKey}`}
          slide={index}
          onClick={() => resetSlide(imageKey)}
        >
          <Box
            borderWidth="1px"
            borderColor="#D9D9D9"
            mb={{ base: 0, md: 2 }}
            w={{ base: '24', lg: '48' }}
            h={{ base: '16', lg: '36' }}
            sx={{
              '.carousel__dot--selected &': {
                borderColor: 'brandSecondary.500',
              },
            }}
            mr={{ base: '4', lg: '7' }}
            borderRadius="4%"
            overflow="hidden"
            pos="relative"
          >
            <Image
              objectFit="contain"
              layout="fill"
              src={imgURL}
              alt={imgAltText || `thumbnail of ${productName}`}
            />
          </Box>
        </Dot>
      );
    } else {
      return <Box key={`thumb-${imageKey}-notfound`}> No image available </Box>;
    }
  });

  // Reset the current image to its initial unzoomed state on slide change
  function resetSlide(imageKey: string) {
    const closeBtn: HTMLButtonElement | null = document.querySelector(
      `[data-key="closeBtn-${imageKey}"]`
    );
    if (closeBtn) {
      closeBtn.click();
    }
  }

  return (
    <Box pt={{ base: 4, lg: 2 }} pb={{ base: 2, lg: 10 }}>
      <CarouselProvider
        naturalSlideWidth={imageWidth || 1024}
        naturalSlideHeight={imageHeight || 768}
        totalSlides={allImages.length}
        infinite={true}
        dragEnabled={false}
      >
        {/* Product image container */}
        <Box
          borderWidth={{ base: 1, lg: 2 }}
          borderColor="gray.100"
          borderRadius="xl"
          pos="relative"
          overflow="hidden"
        >
          {/* Back button - show only if zoom is not activated */}
          {!isZoomActive && (
            <Box
              pos="absolute"
              left={1}
              bottom="50%"
              transform="translate(0, 50%)"
              zIndex={1}
            >
              <ButtonBack>
                <ChevronLeftIcon
                  color="bcDeepPurple.700"
                  boxSize={10}
                  bg="whiteAlpha.800"
                  borderRadius="50%"
                  _hover={{
                    color: 'bcPeriwinkle',
                  }}
                />
              </ButtonBack>
            </Box>
          )}

          <Slider>{imageSlides}</Slider>

          {!isZoomActive && (
            <Box
              pos="absolute"
              right={1}
              bottom="50%"
              transform="translate(0, 50%)"
              zIndex={1}
            >
              <ButtonNext>
                <ChevronRightIcon
                  bg="whiteAlpha.800"
                  borderRadius="50%"
                  color="bcDeepPurple.700"
                  boxSize={10}
                  _hover={{
                    color: 'bcPeriwinkle',
                  }}
                />
              </ButtonNext>
            </Box>
          )}
        </Box>

        {/* Indicator dots */}
        <Flex
          py={{ base: '4', lg: '8' }}
          justifyContent="center"
          alignContent="center"
          mb={{ base: '1', lg: '9' }}
        >
          {trackingDots}
        </Flex>

        {/* Thumbnails */}
        <Flex overflowX="auto">{imageThumbnails}</Flex>
      </CarouselProvider>
    </Box>
  );
};

export default PDPImageCarousel;
