import { Box, Circle, Flex, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
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
import { IProductVariantNodePDP } from '@typeDefs/shopifyData/pdp';
import MagnifierIcon from '@components/atoms/icons-logos/MagnifierIcon';

export interface IPDPImageCarousel {
  images: IProductVariantNodePDP[];
}

const PDPImageCarousel = ({ images }: IPDPImageCarousel) => {
  const { width: imageWidth, height: imageHeight } = images[0].node.image;
  const fallBackUrl =
    'https://bikeclub.com/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F75508%2F1666988827-bc_hero_4_new_4d241b90-eb3f-43bb-bc03-7be6abb854df.webp&w=3840&q=75';

  const imageSet = new Set();
  const uniqueImages = images.filter((el) => {
    const duplicate = imageSet.has(el.node.image.url);
    imageSet.add(el.node.image.url);
    return !duplicate;
  });

  const imageSlides = uniqueImages.map((item, index) => {
    const { altText, url } = item.node.image;
    const { id, title } = item.node;
    const idFormatted = id.replace('gid://shopify/ProductVariant/', '');
    return (
      <Slide key={idFormatted} index={index}>
        <Image
          src={url || ''}
          alt={altText || `image of ${title}`}
          objectFit="contain"
          layout="fill"
        />
      </Slide>
    );
  });

  const trackingDots = uniqueImages.map((item, index) => (
    <Dot key={`dot-${index}`} slide={index}>
      <Circle
        size={{ base: '8px', lg: '16px' }}
        bg="bcDeepPurple.100"
        mr={{ base: '0.5rem', lg: '1rem' }}
        sx={{
          '.carousel__dot--selected &': {
            backgroundColor: 'bcDeepPurple.700',
          },
        }}
      ></Circle>
    </Dot>
  ));

  const imageThumbnails = uniqueImages.map((item, index) => {
    const { url, altText } = item.node.image;
    const { id, title } = item.node;
    const idFormatted = id.replace('gid://shopify/ProductVariant/', '');
    return (
      <Dot key={`thumb-${idFormatted}`} slide={index}>
        <Box
          borderWidth="1px"
          borderColor="#D9D9D9"
          mb={{ base: 0, md: 2 }}
          w={{ base: '6rem', lg: '12rem' }}
          h={{ base: '4rem', lg: '9rem' }}
          sx={{
            '.carousel__dot--selected &': {
              borderColor: 'brandSecondary.500',
            },
          }}
          mr={{ base: '16px', lg: '28px' }}
          borderRadius="4%"
          overflow="hidden"
          pos="relative"
        >
          <Image
            objectFit="contain"
            layout="fill"
            src={url || fallBackUrl}
            alt={altText || `thumbnail of ${title}`}
          />
        </Box>
      </Dot>
    );
  });

  return (
    <>
      <CarouselProvider
        naturalSlideWidth={imageWidth || 1024}
        naturalSlideHeight={imageHeight || 768}
        totalSlides={uniqueImages.length}
        infinite={true}
      >
        {/* Product image container  */}
        <Box
          border="2px"
          borderColor="gray.100"
          borderRadius="12px"
          pos="relative"
          overflow="hidden"
        >
          <IconButton
            aria-label="Zoom-button"
            backgroundColor="transparent"
            icon={<MagnifierIcon />}
            pos="absolute"
            left="3px"
            zIndex={1}
            w={{ base: '0.7rem', lg: '1.18rem' }}
          />
          {/* Back button  */}
          <Box pos="absolute" left="3px" bottom="50%" zIndex={1}>
            <ButtonBack>
              <ChevronLeftIcon
                color="bcDeepPurple.700"
                boxSize={10}
                bg="#ffffff82"
                borderRadius="50%"
                _hover={{
                  color: 'bcPeriwinkle',
                }}
              />
            </ButtonBack>
          </Box>

          <Slider>{imageSlides}</Slider>
          <Box pos="absolute" right="3px" bottom="50%" zIndex={1}>
            <ButtonNext>
              <ChevronRightIcon
                bg="#ffffff82"
                borderRadius="50%"
                color="bcDeepPurple.700"
                boxSize={10}
                _hover={{
                  color: 'bcPeriwinkle',
                }}
              />
            </ButtonNext>
          </Box>
        </Box>

        {/* Indicator dots */}
        <Flex
          py={{ base: '1rem', lg: '2rem' }}
          justifyContent="center"
          alignContent="center"
          mb={{ base: '4px', lg: '35px' }}
        >
          {trackingDots}
        </Flex>

        {/* Thumbnails */}
        <Flex overflowX="scroll" mx={{ base: 4, md: 0 }}>
          {imageThumbnails}
        </Flex>
      </CarouselProvider>
    </>
  );
};

export default PDPImageCarousel;
