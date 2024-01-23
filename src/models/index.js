const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");
const ProductCart = require("./ProductCart");
const Purchase = require("./Purchase");
const User = require("./User");


Category.hasMany(Product);
Product.belongsTo(Category);

Image.hasMany(Product);
Product.belongsTo(Image);


ProductCart.hasMany(User);
User.belongsTo(ProductCart);

ProductCart.hasMany(Product);
Product.belongsTo(ProductCart);


Purchase.hasMany(User);
User.belongsTo(Purchase);

Purchase.hasMany(Product);
Product.belongsTo(Purchase);