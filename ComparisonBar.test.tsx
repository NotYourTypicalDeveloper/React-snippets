import { render, screen, waitFor } from '@lib/testing/test-utils';

import ComparisonBar from '@components/molecules/collections/ComparisonBar';
import { products } from '@mockData/shared/products__mocks';

// ===== with 1 bike selected ====
describe('ComparisonBar with 1 bike', () => {
  beforeEach(() => {
    const OneProduct = products.slice(0, 1);
    render(
      <ComparisonBar
        productArray={OneProduct}
        handleCompareClear={jest.fn()}
        handleCompareRemove={jest.fn()}
        toggleCompareMode={jest.fn()}
      />
    );
  });
  it('should disable compare button and show warning text', () => {
    const compareBtn = screen.getByRole('button', {
      name: /Compare/i,
    });

    const warningTxt = screen.getByText('Select at least 2 bikes to compare');
    expect(compareBtn).toBeDisabled();
    expect(warningTxt).toBeVisible();
  });

  it('should show 1 remove button', () => {
    const removeBtn = screen.getByRole('button', {
      name: /remove product/i,
    });
    expect(removeBtn).toBeVisible();
  });

  it('should show the correct image and src', async () => {
    const OneProduct = products.slice(0, 1);
    const { altText, url: imgUrl } = OneProduct[0].node.featuredImage;
    const { title } = OneProduct[0].node;

    const imgSrc = imgUrl && encodeURIComponent(imgUrl);

    const productImg = altText
      ? screen.getByAltText(altText)
      : screen.getByAltText(`Photo of ${title}`);

    expect(productImg).toBeInTheDocument();

    await waitFor(() => {
      const expectedUrl = imgSrc && expect.stringContaining(imgSrc);
      expect(productImg).toHaveAttribute('src', expectedUrl);
    });
  });
});

// ===== with 2 bikes selected ====
describe('ComparisonBar with 2 bikes', () => {
  beforeEach(() => {
    const TwoProducts = products.slice(0, 2);
    render(
      <ComparisonBar
        productArray={TwoProducts}
        handleCompareClear={jest.fn()}
        handleCompareRemove={jest.fn()}
        toggleCompareMode={jest.fn()}
      />
    );
  });

  it('should enable the compare button', () => {
    const compareBtn = screen.getByRole('button', {
      name: /Compare/i,
    });
    expect(compareBtn).toBeEnabled();
  });

  it('should display the correct number of images', () => {
    const allImages = screen.getAllByTestId('image');
    expect(allImages).toHaveLength(2);
    expect(allImages[0]).toBeInTheDocument();
    expect(allImages[1]).toBeInTheDocument();
  });
});
