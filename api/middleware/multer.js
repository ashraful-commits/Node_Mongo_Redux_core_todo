import multer, { diskStorage } from 'multer';

const storage = diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
  destination: (req, file, cb) => {
    switch (file.fieldname) {
      case 'photo':
        cb(null, 'api/public/images');
        break;
      case 'category_photo':
        cb(null, 'api/public/categories');
        break;
      case 'brand_photo':
        cb(null, 'api/public/brands');
        break;
      case 'product_photo':
        cb(null, 'api/public/products');
        break;
      case 'gallery_photo':
        cb(null, 'api/public/products');
    }
  },
});

// product Category middleware function
export const photoMulter = multer({ storage }).single('photo');
// product Category middleware function
export const categoryMulter = multer({ storage }).single(
  'category_photo'
);

// product Brand middleware function
export const brandMulter = multer({ storage }).single('brand_photo');

// product Brand middleware function
export const productMulter = multer({ storage }).fields([
  {
    name: 'product_photo',
    maxCount: 1,
  },
  {
    name: 'gallery_photo',
    maxCount: 10,
  },
]);
