// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { SimpleGrid } from '@chakra-ui/react';
import CollectionCardMain from '@components/molecules/cards/CollectionCardMain';
import { ICollectionSingle } from '@typeDefs/shopifyData/collection';
import { makeRelativeUrl, addMetric } from '@helpers/tinyHelpers';

interface collectionGridProps {
  collectionData: ICollectionSingle;
}

const CollectionGrid = ({ collectionData }: collectionGridProps) => {
  const productsArr = collectionData.collection.products.edges;
  console.log('COLLECTION DATA => ', collectionData);

  // Get all available products
  const productsAvailable = productsArr.filter(
    (elem) => elem.node.availableForSale
  );

  // Display the cards
  const collectionCardsAvailable = productsAvailable.map((elem) => {
    const { title, onlineStoreUrl } = elem.node;
    const innerLeg = elem.node.metafield?.value;
    const innerLegFmt = innerLeg && addMetric(innerLeg, 'cm');
    const { url: imgUrl, altText } = elem.node.featuredImage;
    const relativeUrl = onlineStoreUrl && makeRelativeUrl(onlineStoreUrl);

    // Get the highest price of the product
    const variantsArr = elem.node.variants.edges;
    const pricesArr = [];

    variantsArr.forEach((elem) => {
      pricesArr.push(elem.node.priceV2.amount);
    });

    // Get the max price formatted with £ sign
    const maxPrice = `£${Math.max(...pricesArr)}`;

    return (
      <CollectionCardMain
        key={title}
        title={title}
        imageSrc={imgUrl}
        imageAlt={altText ? altText : 'product image'}
        maxPrice={maxPrice}
        innerLeg={innerLeg ? innerLegFmt : ''}
        onlineStoreUrl={relativeUrl ? relativeUrl : '#'}
      />
    );
  });

  return (
    <SimpleGrid
      columns={{ base: 1, lg: 3 }}
      spacingX={{ base: 8, lg: 14 }}
      spacingY={{ base: 14, lg: 0 }}
    >
      {collectionCardsAvailable}
    </SimpleGrid>
  );
};
export default CollectionGrid;
