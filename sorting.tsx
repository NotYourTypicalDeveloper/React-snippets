// SORTING DROPDOWN functions
  const sortPrice_Low2High = (data: IProductNode[]) => {
    const data2 = [...data];
    return data2.sort((a, b) => {
      const numberA = +a.node.priceRange.maxVariantPrice.amount;
      const numberB = +b.node.priceRange.maxVariantPrice.amount;

      return numberA - numberB;
    });
  };

  console.log('sortPrice_Low2High => ', sortPrice_Low2High(currentProducts));

  const sortPrice_High2Low = (data: IProductNode[]) => {
    const data2 = [...data];
    return data2.sort((a, b) => {
      const numberA = +a.node.priceRange.maxVariantPrice.amount;
      const numberB = +b.node.priceRange.maxVariantPrice.amount;
      return numberB - numberA;
    });
  };

  console.log('sortPrice_High2Low => ', sortPrice_High2Low(currentProducts));

  // SORTING FUNCTIONS for inner leg & bike weight - can be used for any metafield
  const sort_Meta_Low2High = (data: IProductNode[], metaFieldKey: string) => {
    const data2 = [...data];
    return data2.sort((a, b) => {
      const metafieldA: IMetafieldsString = findMetafield(
        a.node.metafields,
        metaFieldKey
      );
      const metafieldB: IMetafieldsString = findMetafield(
        b.node.metafields,
        metaFieldKey
      );
      const numberA = +metafieldA?.value;
      const numberB = +metafieldB?.value;

      return numberA - numberB;
    });
  };

  console.log(
    'sort_Meta_Low2High => ',
    sort_Meta_Low2High(currentProducts, 'leg-min')
  );

  const sort_Meta_High2Low = (data: IProductNode[], metaFieldKey: string) => {
    const data2 = [...data];
    return data2.sort((a, b) => {
      const metafieldA = findMetafield(a.node.metafields, metaFieldKey);
      const metafieldB = findMetafield(b.node.metafields, metaFieldKey);
      const numberA = +metafieldA?.value;
      const numberB = +metafieldB?.value;
      return numberB - numberA;
    });
  };
  console.log(sort_Meta_High2Low(currentProducts, 'leg-min'));
