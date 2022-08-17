// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { SimpleGrid } from '@chakra-ui/react';
import CollectionCardMain from '@components/molecules/cards/CollectionCardMain';
import { ICollectionSingle } from '@typeDefs/shopifyData/collection';
import { addMetric } from '@helpers/tinyHelpers';

interface collectionGridProps {
  collectionData: ICollectionSingle;
}

const CollectionGrid = ({ collectionData }: collectionGridProps) => {
  const productsArr = collectionData.collection.products.edges;

  // Get all available products
  const productsAvailable = productsArr.filter(
    (elem) => elem.node.availableForSale
  );

  // Display the cards
  const collectionCardsAvailable = productsAvailable.map((elem) => {
    const { title, onlineStoreUrl } = elem.node;
    const innerLegMeasurement = elem.node.metafield?.value;
    const innerLegFmt =
      innerLegMeasurement && addMetric(innerLegMeasurement, 'cm');
    const { url, altText } = elem.node.featuredImage;

    // Get the highest price of the product
    const variantsArr = elem.node.variants.edges;
    console.log('VARIANTS ARRAY FOR ', title, variantsArr);

    const pricesArr = [];

    variantsArr.forEach((elem) => {
      pricesArr.push(elem.node.priceV2.amount);
    });

    // Get the max price formatted with £ sign
    const maxPrice = `£${Math.max(...pricesArr)}`;

    return (
      innerLegMeasurement && (
        <CollectionCardMain
          key={title}
          title={title}
          imageSrc={url}
          imageAlt={altText}
          maxPrice={maxPrice}
          innerLeg={innerLegFmt}
          onlineStoreUrl={onlineStoreUrl}
        />
      )
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
