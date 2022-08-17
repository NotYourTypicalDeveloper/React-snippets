import { NextRouter } from 'next/router';

export const makeRelativeUrl = (url: string) => {
  return url
    .replace('https://the-bike-club-uk.myshopify.com', '')
    .replace('https://bikeclub.com', '');
};

export const returnUrl = (router: NextRouter): string => {
  const baseUrl = 'https://bikeclub.com';
  const nextRouter = router;
  const canonicalUrl = (
    baseUrl + (nextRouter.asPath === '/' ? '' : router.asPath)
  ).split('?')[0];

  return canonicalUrl;
};

// Converts a date from ISO 8601 to a DD/MM/YYYY format
export const convertDateFormat = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.getDay();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
};

// add metric to inner leg measurements
export const addMetric = (str: string, metric: string) => {
  let arr = str.split('-');
  arr = arr.map((elem) => `${elem} ${metric}`);
  const finalString = arr.join(' - ');

  return finalString;
};
