const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");
const ProductCart = require("./ProductCart");
const Purchase = require("./Purchase");
const User = require("./User");


Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Image);
Image.belongsTo(Product);


ProductCart.belongsTo(User);
User.hasMany(ProductCart);

ProductCart.belongsTo(Product);
Product.hasMany(ProductCart);


Purchase.belongsTo(User);
User.hasMany(Purchase);

Purchase.belongsTo(Product);
Product.hasMany(Purchase);