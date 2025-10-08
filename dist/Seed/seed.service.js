"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const User_entity_1 = require("../User/User.entity");
const Category_entity_1 = require("../Category/Category.entity");
const Product_entity_1 = require("../Product/Product.entity");
const Order_entity_1 = require("../Order/Order.entity");
const OrderProductMapper_entity_1 = require("../Mapper/Order Product Mapper/OrderProductMapper.entity");
const ReviewRating_entity_1 = require("../Review And Rating/ReviewRating.entity");
const Banner_entity_1 = require("../Banner/Banner.entity");
const wishlist_entity_1 = require("../wishlist/wishlist.entity");
const Offer_entity_1 = require("../Offer/Offer.entity");
const Payment_entity_1 = require("../Payment/Payment.entity");
const Cart_entity_1 = require("../Cart/Cart.entity");
const root_user_entity_1 = require("../Root-User/root-user.entity");
let SeedService = class SeedService {
    constructor(userRepo, categoryRepo, productRepo, orderRepo, orderProductMapperRepo, reviewRatingRepo, bannerRepo, wishlistRepo, offerRepo, paymentRepo, cartRepo, rootUserRepo) {
        this.userRepo = userRepo;
        this.categoryRepo = categoryRepo;
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
        this.orderProductMapperRepo = orderProductMapperRepo;
        this.reviewRatingRepo = reviewRatingRepo;
        this.bannerRepo = bannerRepo;
        this.wishlistRepo = wishlistRepo;
        this.offerRepo = offerRepo;
        this.paymentRepo = paymentRepo;
        this.cartRepo = cartRepo;
        this.rootUserRepo = rootUserRepo;
    }
    async runSeed() {
        console.log('🌱 Starting seeding...');
        await this.seedRootUsers();
        await this.seedUsers();
        await this.seedCategories();
        await this.seedProducts();
        await this.seedCarts();
        await this.seedOrders();
        await this.seedReviews();
        await this.seedBanners();
        await this.seedWishList();
        await this.seedOffer();
        await this.seedPayments();
        console.log('✅ Seeding complete!');
        return { message: 'Seeding complete!' };
    }
    async seedUsers() {
        const count = await this.userRepo.count();
        if (count > 2) {
            console.log('👤 Users already exist, skipping...');
            return;
        }
        const password = await bcrypt.hash('1234', 10);
        const users = this.userRepo.create([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                address: 'Dhaka, Bangladesh',
                phone: '01700000000',
                password,
                registration_date: new Date(),
                role: 'admin',
                Image: 'https://via.placeholder.com/150',
                isActive: true,
            },
            {
                name: 'Test User',
                email: 'user@example.com',
                address: 'Chittagong, Bangladesh',
                phone: '01800000000',
                password,
                registration_date: new Date(),
                role: 'user',
                Image: 'https://via.placeholder.com/150',
                isActive: true,
            },
            {
                name: 'Demo User',
                email: 'demo@example.com',
                address: 'Sylhet, Bangladesh',
                phone: '01900000000',
                password,
                registration_date: new Date(),
                role: 'user',
                Image: 'https://via.placeholder.com/150',
                isActive: true,
            },
        ]);
        await this.userRepo.save(users);
        console.log('👤 Users seeded');
    }
    async seedCategories() {
        const count = await this.categoryRepo.count();
        if (count > 2) {
            console.log('📂 Categories already exist, skipping...');
            return;
        }
        const categories = this.categoryRepo.create([
            { name: 'Electronics' },
            { name: 'Clothing' },
            { name: 'Books' },
        ]);
        await this.categoryRepo.save(categories);
        console.log('📂 Categories seeded');
    }
    async seedProducts() {
        const count = await this.productRepo.count();
        if (count > 2) {
            console.log('📦 Products already exist, skipping...');
            return;
        }
        const electronics = await this.categoryRepo.findOne({
            where: { name: 'Electronics' },
        });
        const clothing = await this.categoryRepo.findOne({
            where: { name: 'Clothing' },
        });
        const books = await this.categoryRepo.findOne({ where: { name: 'Books' } });
        const products = this.productRepo.create([
            {
                name: 'iPhone 15',
                desc: 'Latest Apple iPhone with A17 Bionic chip',
                price: 1200,
                quantity: 50,
                image: 'https://via.placeholder.com/300x300.png?text=iPhone+15',
                isActive: true,
                date: new Date(),
                json_attribute: {
                    attributes: {
                        color: { red: 20, black: 30 },
                        storage: { '128GB': 25, '256GB': 25 },
                    },
                },
                category: electronics,
            },
            {
                name: 'Samsung Galaxy S23',
                desc: 'Latest Samsung flagship smartphone',
                price: 1000,
                quantity: 60,
                image: 'https://via.placeholder.com/300x300.png?text=Galaxy+S23',
                isActive: true,
                date: new Date(),
                json_attribute: {
                    attributes: {
                        color: { white: 30, black: 30 },
                        storage: { '128GB': 40, '512GB': 20 },
                    },
                },
                category: electronics,
            },
            {
                name: 'T-Shirt',
                desc: 'Comfortable cotton t-shirt',
                price: 20,
                quantity: 200,
                image: 'https://via.placeholder.com/300x300.png?text=T-Shirt',
                isActive: true,
                date: new Date(),
                json_attribute: {
                    attributes: {
                        size: { small: 50, medium: 80, large: 70 },
                        color: { blue: 100, green: 100 },
                        material: { cotton: 150, polyester: 50 },
                    },
                },
                category: clothing,
            },
            {
                name: 'Jeans',
                desc: 'Stylish denim jeans',
                price: 45,
                quantity: 150,
                image: 'https://via.placeholder.com/300x300.png?text=Jeans',
                isActive: true,
                date: new Date(),
                json_attribute: {
                    attributes: {
                        size: { small: 30, medium: 70, large: 50 },
                        color: { blue: 100, black: 50 },
                        material: { denim: 150 },
                    },
                },
                category: clothing,
            },
            {
                name: 'MacBook Pro',
                desc: 'Apple MacBook Pro 14-inch M2 Pro chip',
                price: 2200,
                quantity: 40,
                image: 'https://via.placeholder.com/300x300.png?text=MacBook+Pro',
                isActive: true,
                date: new Date(),
                json_attribute: {
                    attributes: {
                        color: { silver: 20, space_gray: 20 },
                        storage: { '512GB': 20, '1TB': 20 },
                    },
                },
                category: electronics,
            },
            {
                name: 'Dell XPS 13',
                desc: 'Premium ultrabook with Intel i7',
                price: 1800,
                quantity: 30,
                image: 'https://via.placeholder.com/300x300.png?text=Dell+XPS+13',
                isActive: true,
                date: new Date(),
                json_attribute: {
                    attributes: {
                        color: { white: 15, black: 15 },
                        storage: { '512GB': 10, '1TB': 20 },
                    },
                },
                category: electronics,
            },
            {
                name: 'Harry Potter Box Set',
                desc: 'All 7 Harry Potter books',
                price: 120,
                quantity: 100,
                image: 'https://via.placeholder.com/300x300.png?text=Harry+Potter',
                isActive: true,
                date: new Date(),
                json_attribute: {
                    attributes: {
                        format: { hardcover: 50, paperback: 50 },
                        language: { english: 70, bangla: 30 },
                    },
                },
                category: books,
            },
            {
                name: 'Lord of the Rings Trilogy',
                desc: 'J.R.R. Tolkien classic fantasy series',
                price: 90,
                quantity: 80,
                image: 'https://via.placeholder.com/300x300.png?text=LOTR',
                isActive: true,
                date: new Date(),
                json_attribute: {
                    attributes: {
                        format: { hardcover: 40, paperback: 40 },
                        language: { english: 60, bangla: 20 },
                    },
                },
                category: books,
            },
            {
                name: 'Nike Sneakers',
                desc: 'Running shoes with breathable mesh',
                price: 150,
                quantity: 120,
                image: 'https://via.placeholder.com/300x300.png?text=Nike+Sneakers',
                isActive: true,
                date: new Date(),
                json_attribute: {
                    attributes: {
                        size: { '40': 30, '41': 40, '42': 50 },
                        color: { red: 60, black: 60 },
                    },
                },
                category: clothing,
            },
            {
                name: 'Adidas Hoodie',
                desc: 'Warm fleece hoodie',
                price: 60,
                quantity: 100,
                image: 'https://via.placeholder.com/300x300.png?text=Adidas+Hoodie',
                isActive: true,
                date: new Date(),
                json_attribute: {
                    attributes: {
                        size: { small: 30, medium: 40, large: 30 },
                        color: { gray: 50, black: 50 },
                    },
                },
                category: clothing,
            },
            {
                name: 'Gaming Chair',
                desc: 'Ergonomic chair for gamers',
                price: 300,
                quantity: 70,
                image: 'https://via.placeholder.com/300x300.png?text=Gaming+Chair',
                isActive: true,
                date: new Date(),
                json_attribute: {
                    attributes: {
                        color: { red: 30, black: 40 },
                        material: { leather: 40, fabric: 30 },
                    },
                },
                category: electronics,
            },
            {
                name: 'Bluetooth Headphones',
                desc: 'Noise-cancelling over-ear headphones',
                price: 200,
                quantity: 90,
                image: 'https://via.placeholder.com/300x300.png?text=Headphones',
                isActive: true,
                date: new Date(),
                json_attribute: {
                    attributes: {
                        color: { black: 50, white: 40 },
                        battery: { '20h': 45, '30h': 45 },
                    },
                },
                category: electronics,
            },
        ]);
        await this.productRepo.save(products);
        console.log('📦 Products seeded');
    }
    async seedOrders() {
        const count = await this.orderRepo.count();
        if (count > 2) {
            console.log('🛒 Orders already exist, skipping...');
            return;
        }
        const users = await this.userRepo.find();
        const products = await this.productRepo.find();
        if (!users.length || !products.length) {
            console.log('⚠️ Cannot seed orders: users or products missing.');
            return;
        }
        const orders = [];
        for (let i = 0; i < 5; i++) {
            const user = users[i % users.length];
            const hasInactiveOrder = await this.orderRepo.findOne({
                where: { user: { Id: user.Id }, isActive: false },
            });
            if (hasInactiveOrder)
                continue;
            let totalOriginalPrice = 0;
            let totalDiscountedPrice = 0;
            const orderProductMappers = [];
            const selectedProducts = products
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            for (const prod of selectedProducts) {
                const price = parseFloat(prod.price);
                totalOriginalPrice += price;
                totalDiscountedPrice += prod.discount
                    ? price - (price * (prod.discount.discountPercentage || 0)) / 100
                    : price;
                if (prod.quantity > 0)
                    prod.quantity -= 1;
                const jsonAttr = JSON.parse(JSON.stringify(prod.json_attribute));
                for (const key of Object.keys(jsonAttr.attributes)) {
                    for (const subKey of Object.keys(jsonAttr.attributes[key])) {
                        if (jsonAttr.attributes[key][subKey] > 0) {
                            jsonAttr.attributes[key][subKey] -= 1;
                        }
                    }
                }
                prod.json_attribute = jsonAttr;
                await this.productRepo.save(prod);
                const mapper = this.orderProductMapperRepo.create({
                    product: prod,
                    json_attribute: jsonAttr,
                });
                orderProductMappers.push(mapper);
            }
            const order = this.orderRepo.create({
                user,
                date: new Date(),
                status: 'pending',
                totalAmount: totalDiscountedPrice,
                originalPrice: totalOriginalPrice,
                discountedPrice: totalDiscountedPrice,
                isActive: true,
                address: user.address,
                receiverPhone: user.phone,
                orderProductMappers,
            });
            orders.push(order);
        }
        await this.orderRepo.save(orders);
        console.log('🛒 5 Orders seeded');
    }
    async seedReviews() {
        const count = await this.reviewRatingRepo.count();
        if (count > 2) {
            console.log('⭐ Reviews already exist, skipping...');
            return;
        }
        const users = await this.userRepo.find();
        const products = await this.productRepo.find();
        if (users.length === 0 || products.length === 0) {
            console.log('⚠️ Users or Products not found. Cannot seed reviews.');
            return;
        }
        const reviews = this.reviewRatingRepo.create([
            {
                date: new Date(),
                review: 'Excellent product, highly recommend!',
                rating: 5,
                user: users[0],
                product: products[0],
            },
            {
                date: new Date(),
                review: 'Good quality but a bit expensive.',
                rating: 4,
                user: users[1],
                product: products[0],
            },
            {
                date: new Date(),
                review: 'Not satisfied with the product.',
                rating: 2,
                user: users[0],
                product: products[1],
            },
            {
                date: new Date(),
                review: 'Amazing! Works exactly as described.',
                rating: 5,
                user: users[1],
                product: products[2],
            },
            {
                date: new Date(),
                review: 'Average product, nothing special.',
                rating: 3,
                user: users[0],
                product: products[2],
            },
        ]);
        await this.reviewRatingRepo.save(reviews);
        console.log('⭐ Reviews seeded');
    }
    async seedBanners() {
        const count = await this.bannerRepo.count();
        if (count > 0) {
            console.log('🏷️ Banners already exist, skipping...');
            return;
        }
        const banners = this.bannerRepo.create([
            {
                FileName: 'banner1.jpg',
                path: 'https://via.placeholder.com/800x200?text=Banner+1',
                EventLink: 'https://example.com/event1',
            },
            {
                FileName: 'banner2.jpg',
                path: 'https://via.placeholder.com/800x200?text=Banner+2',
                EventLink: 'https://example.com/event2',
            },
            {
                FileName: 'banner3.jpg',
                path: 'https://via.placeholder.com/800x200?text=Banner+3',
                EventLink: 'https://example.com/event3',
            },
            {
                FileName: 'banner4.jpg',
                path: 'https://via.placeholder.com/800x200?text=Banner+4',
                EventLink: 'https://example.com/event4',
            },
            {
                FileName: 'banner5.jpg',
                path: 'https://via.placeholder.com/800x200?text=Banner+5',
                EventLink: 'https://example.com/event5',
            },
        ]);
        await this.bannerRepo.save(banners);
        console.log('🏷️ 5 Banners seeded successfully!');
    }
    async seedWishList() {
        console.log('🌱 Seeding wishlist...');
        const count = await this.wishlistRepo.count();
        if (count > 0) {
            console.log('Wishlist already seeded, skipping...');
            return;
        }
        const users = await this.userRepo.find({ take: 2 });
        const products = await this.productRepo.find({ take: 5 });
        if (!users.length || !products.length) {
            console.log('No users or products found for wishlist seed');
            return;
        }
        const wishlistEntries = this.wishlistRepo.create([
            {
                date: new Date(),
                user: users[0],
                product: products[0],
            },
            {
                date: new Date(),
                user: users[0],
                product: products[1],
            },
            {
                date: new Date(),
                user: users[1],
                product: products[2],
            },
            {
                date: new Date(),
                user: users[1],
                product: products[3],
            },
            {
                date: new Date(),
                user: users[1],
                product: products[4],
            },
        ]);
        await this.wishlistRepo.save(wishlistEntries);
        console.log('✅ Wishlist seeded');
    }
    async seedOffer() {
        console.log('🌱 Seeding offers...');
        const count = await this.offerRepo.count();
        if (count > 0) {
            console.log('Offers already seeded, skipping...');
            return;
        }
        const offers = this.offerRepo.create([
            {
                name: 'Summer Sale',
                description: 'Get 20% off on all electronics.',
                isActive: true,
                image: 'https://via.placeholder.com/300x150.png?text=Summer+Sale',
                Details: { discount: 20, category: 'Electronics' },
            },
            {
                name: 'Winter Clothing Offer',
                description: 'Buy 1 get 1 free on selected winter clothing.',
                isActive: true,
                image: 'https://via.placeholder.com/300x150.png?text=Winter+Clothing',
                Details: { discount: 50, category: 'Clothing' },
            },
            {
                name: 'Book Bonanza',
                description: 'Flat 30% off on all books.',
                isActive: true,
                image: 'https://via.placeholder.com/300x150.png?text=Book+Bonanza',
                Details: { discount: 30, category: 'Books' },
            },
            {
                name: 'Gaming Fest',
                description: 'Up to 25% off on gaming accessories.',
                isActive: true,
                image: 'https://via.placeholder.com/300x150.png?text=Gaming+Fest',
                Details: { discount: 25, category: 'Electronics' },
            },
            {
                name: 'Sneaker Mania',
                description: 'Exclusive 15% off on all sneakers.',
                isActive: true,
                image: 'https://via.placeholder.com/300x150.png?text=Sneaker+Mania',
                Details: { discount: 15, category: 'Clothing' },
            },
        ]);
        await this.offerRepo.save(offers);
        console.log('✅ Offers seeded');
    }
    async seedPayments() {
        const count = await this.paymentRepo.count();
        if (count > 1) {
            console.log('💰 Payments already exist, skipping...');
            return;
        }
        const users = await this.userRepo.find({ take: 3 });
        const orders = await this.orderRepo.find({ take: 3 });
        if (users.length === 0 || orders.length === 0) {
            console.log('💰 Cannot seed payments: no users or orders found.');
            return;
        }
        const payments = this.paymentRepo.create([
            {
                Pay_amount: orders[0].totalAmount,
                status: 'Paid',
                image: 'https://via.placeholder.com/150',
                date: new Date(),
                user: users[0],
                userId: users[0].Id,
                order: orders[0],
                orderId: orders[0].Id,
            },
            {
                Pay_amount: orders[1].totalAmount,
                status: 'Pending',
                image: 'https://via.placeholder.com/150',
                date: new Date(),
                user: users[1],
                userId: users[1].Id,
                order: orders[1],
                orderId: orders[1].Id,
            },
            {
                Pay_amount: orders[2].totalAmount,
                status: 'Failed',
                image: 'https://via.placeholder.com/150',
                date: new Date(),
                user: users[2],
                userId: users[2].Id,
                order: orders[2],
                orderId: orders[2].Id,
            },
        ]);
        await this.paymentRepo.save(payments);
        console.log('💰 Payments seeded');
    }
    async seedCarts() {
        const count = await this.cartRepo.count();
        if (count > 0) {
            console.log('🛒 Carts already exist, skipping...');
            return;
        }
        const users = await this.userRepo.find({ take: 3 });
        const products = await this.productRepo.find({ take: 5 });
        if (users.length === 0 || products.length === 0) {
            console.log('🛒 Cannot seed carts: no users or products found.');
            return;
        }
        const carts = this.cartRepo.create([
            {
                session_id: 101,
                date: new Date(),
                user: users[0],
                products: [
                    { product: products[0], quantity: 2 },
                    { product: products[1], quantity: 1 },
                ],
            },
            {
                session_id: 102,
                date: new Date(),
                user: users[1],
                products: [
                    { product: products[2], quantity: 3 },
                    { product: products[3], quantity: 1 },
                ],
            },
            {
                session_id: 103,
                date: new Date(),
                user: users[2],
                products: [
                    { product: products[1], quantity: 1 },
                    { product: products[4], quantity: 2 },
                ],
            },
        ]);
        await this.cartRepo.save(carts);
        console.log('🛒 Carts seeded');
    }
    async seedRootUsers() {
        const count = await this.rootUserRepo.count();
        if (count > 0) {
            console.log('👑 Root users already exist, skipping...');
            return;
        }
        const password = await bcrypt.hash('1234', 10);
        const rootUsers = this.rootUserRepo.create([
            {
                name: 'Fahad Khan',
                email: 'fahad@example.com',
                address: 'Dhaka, Bangladesh',
                phone: '01711111111',
                password,
                registration_date: new Date(),
                role: 'superadmin',
                Image: 'https://via.placeholder.com/150?text=Fahad+Khan',
                isActive: true,
                netBalance: 0,
            },
            {
                name: 'Golam Rabbani Rafi',
                email: 'rafi@example.com',
                address: 'Dhaka, Bangladesh',
                phone: '01722222222',
                password,
                registration_date: new Date(),
                role: 'admin',
                Image: 'https://via.placeholder.com/150?text=Golam+Rafi',
                isActive: true,
                netBalance: 0,
            },
            {
                name: 'Sojib1',
                email: 'sojib1@example.com',
                address: 'Chittagong, Bangladesh',
                phone: '01733333333',
                password,
                registration_date: new Date(),
                role: 'admin',
                Image: 'https://via.placeholder.com/150?text=Sojib1',
                isActive: true,
                netBalance: 0,
            },
            {
                name: 'Sojib2',
                email: 'sojib2@example.com',
                address: 'Sylhet, Bangladesh',
                phone: '01744444444',
                password,
                registration_date: new Date(),
                role: 'manager',
                Image: 'https://via.placeholder.com/150?text=Sojib2',
                isActive: true,
                netBalance: 0,
            },
            {
                name: 'Mobin',
                email: 'mobin@example.com',
                address: 'Khulna, Bangladesh',
                phone: '01755555555',
                password,
                registration_date: new Date(),
                role: 'manager',
                Image: 'https://via.placeholder.com/150?text=Mobin',
                isActive: true,
                netBalance: 0,
            },
        ]);
        await this.rootUserRepo.save(rootUsers);
        console.log('👑 Root users seeded successfully!');
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(Category_entity_1.CategoryEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(Product_entity_1.ProductEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(Order_entity_1.OrderEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(OrderProductMapper_entity_1.OrderProductMapperEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(ReviewRating_entity_1.ReviewRatingEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(Banner_entity_1.BannerEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(wishlist_entity_1.WishListEntity)),
    __param(8, (0, typeorm_1.InjectRepository)(Offer_entity_1.OfferEntity)),
    __param(9, (0, typeorm_1.InjectRepository)(Payment_entity_1.PaymentEntity)),
    __param(10, (0, typeorm_1.InjectRepository)(Cart_entity_1.CartEntity)),
    __param(11, (0, typeorm_1.InjectRepository)(root_user_entity_1.RootUserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map