const { currentDate } = require('../helpers/dateUtil');
const { storeProducts, reviewProducts, filterProduct, getLatestRecords } = require('../helpers/mongo');
const { successMessage, errorMessage, errorStatusCode, secretKey, unauthorisedStatusCode, unauthorisedMessage, maxPageSize, reviewsSize } = require('../common/constant');
const { mapSearchProducts } = require('../mappers/commonMapper');

const { decodeToken } = require('../../jwt');

const createProduct = async (req, res) => {
  const authorization = req.headers.authorization;
  try {
    const decodedToken = decodeToken(authorization, secretKey);
    try {
      if (decodedToken.role === 'admin') {
        const reqBody = JSON.parse(Buffer.from(req.files.file.data));
        await storeProducts(reqBody);
        res.json(successMessage);
      }
    } catch (e) {
      res.statusCode = errorStatusCode;
      res.json(errorMessage);
    }
  } catch (e) {
    res.statusCode = unauthorisedStatusCode;
    res.json(unauthorisedMessage);
  }
};

const reviewProduct = async (req, res) => {
  const authorization = req.headers.authorization;
  try {
    const decodedToken = decodeToken(authorization, secretKey);
    try {
      if (decodedToken.role === 'client') {
        const reqBody = req.body;
        reqBody.createdAt = currentDate();
        await reviewProducts(reqBody);
        res.json(successMessage);
      }
    } catch (e) {
      res.statusCode = errorStatusCode;
      res.json(errorMessage);
    }
  } catch (e) {
    res.statusCode = unauthorisedStatusCode;
    res.json(unauthorisedMessage);
  }
};

const searchProduct = async (req, res) => {
  const authorization = req.headers.authorization;
  try {
    const decodedToken = decodeToken(authorization, secretKey);
    try {
      if (decodedToken.role === 'client') {
        const page = Number(req.query.page);
        const queryProductSearch = { brand: req.body.searchText };
        const response = await filterProduct(queryProductSearch, page, maxPageSize);
        const { products, totalCount }= response;
        const barcodes = [];
        products.forEach(item => barcodes.push(item.barcode));
        const queryReviewSearch = { barcode: barcodes };
        const reviewComments = await getLatestRecords(queryReviewSearch, reviewsSize);
        const output = mapSearchProducts(products, totalCount, reviewComments);
        res.json(output);
      }
    } catch (e) {
      res.statusCode = errorStatusCode;
      res.json(errorMessage);
    }
  } catch (e) {
    res.statusCode = unauthorisedStatusCode;
    res.json(unauthorisedMessage);
  }
};

module.exports = {
  createProduct,
  reviewProduct,
  searchProduct,
};
