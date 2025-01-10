--INIT CATEGORIES
INSERT INTO category (id, name) VALUES
                                           (1, 'Smartphones'),
                                           (2, 'Tablets'),
                                           (3, 'Smartwatches'),
                                           (4, 'Gaming Consoles'),
                                           (5, 'Cameras & Photography'),
                                           (6, 'Earphones'),
                                           (7, 'Keyboards'),
                                           (8, 'Mouses'),
                                           (9, 'Speakers'),
                                           (10, 'Laptops')
ON CONFLICT (id) DO NOTHING;

--INIT PRODUCTS

-- Smartphones (category_id = 1)
INSERT INTO product (id, brand, description, inventory, name, price, category_id, sell_count, average_rating)
VALUES
(1, 'Apple', 'iPhone 14 Pro Max, 256GB', 100, 'iPhone 14 Pro Max', 1199.99, 1, 500, 4.8),
(2, 'Samsung', 'Galaxy S23 Ultra, 512GB', 200, 'Galaxy S23 Ultra', 999.99, 1, 450, 4.7),
(3, 'Google', 'Pixel 8 Pro, 128GB', 150, 'Pixel 8 Pro', 899.99, 1, 300, 4.6),
(4, 'OnePlus', 'OnePlus 11, 256GB', 120, 'OnePlus 11', 799.99, 1, 250, 4.5),
(5, 'Xiaomi', 'Xiaomi 13 Pro, 256GB', 90, 'Xiaomi 13 Pro', 699.99, 1, 220, 4.4),
(6, 'Sony', 'Xperia 1 V, 256GB', 70, 'Sony Xperia 1 V', 999.99, 1, 320, 3.2),
(7, 'Huawei', 'P60 Pro, 256GB', 80, 'Huawei P60 Pro', 849.99, 1, 210, 4.5),
(8, 'Motorola', 'Edge 40 Pro, 256GB', 60, 'Motorola Edge 40 Pro', 699.99, 1, 190, 4.4),
(9, 'Asus', 'ROG Phone 7 Ultimate, 512GB', 50, 'Asus ROG Phone 7', 1299.99, 1, 170, 4.7),
(10, 'Realme', 'Realme GT3, 256GB', 100, 'Realme GT3', 599.99, 1, 200, 4.3)
ON CONFLICT (id) DO NOTHING;


-- Tablets (category_id = 2)
INSERT INTO product (id, brand, description, inventory, name, price, category_id, sell_count, average_rating)
VALUES
(11, 'Apple', 'iPad Pro 12.9-inch, 256GB', 120, 'iPad Pro 12.9', 1099.99, 2, 400, 4.8),
(12, 'Samsung', 'Galaxy Tab S9 Ultra, 512GB', 140, 'Galaxy Tab S9 Ultra', 899.99, 2, 350, 4.7),
(13, 'Microsoft', 'Surface Pro 9, 256GB', 90, 'Surface Pro 9', 999.99, 2, 300, 4.6),
(14, 'Lenovo', 'Tab P12 Pro, 256GB', 100, 'Lenovo Tab P12 Pro', 599.99, 2, 280, 4.4),
(15, 'Xiaomi', 'Pad 6 Pro, 256GB', 110, 'Xiaomi Pad 6 Pro', 499.99, 2, 270, 4.3),
(16, 'Huawei', 'MatePad Pro 12.6, 512GB', 80, 'Huawei MatePad Pro', 699.99, 2, 260, 4.5),
(17, 'Amazon', 'Fire HD 10, 64GB', 200, 'Amazon Fire HD 10', 149.99, 2, 450, 4.2),
(18, 'Realme', 'Pad X, 128GB', 130, 'Realme Pad X', 249.99, 2, 240, 4.3),
(19, 'Asus', 'ROG Flow Z13, 512GB', 50, 'Asus ROG Flow Z13', 1299.99, 2, 190, 4.7),
(20, 'Honor', 'Pad V8 Pro, 256GB', 90, 'Honor Pad V8 Pro', 549.99, 2, 250, 4.5)
ON CONFLICT (id) DO NOTHING;

-- Smartwatches (category_id = 3)
INSERT INTO product (id, brand, description, inventory, name, price, category_id, sell_count, average_rating)
VALUES
(21, 'Apple', 'Apple Watch Series 9, 45mm', 150, 'Apple Watch Series 9', 399.99, 3, 500, 4.9),
(22, 'Samsung', 'Galaxy Watch 6 Classic, 47mm', 130, 'Galaxy Watch 6 Classic', 349.99, 3, 400, 4.7),
(23, 'Garmin', 'Fenix 7X Sapphire Solar', 80, 'Garmin Fenix 7X', 899.99, 3, 300, 4.8),
(24, 'Fitbit', 'Versa 4, 40mm', 200, 'Fitbit Versa 4', 199.99, 3, 450, 4.4),
(25, 'Huawei', 'Watch GT 4, 46mm', 120, 'Huawei Watch GT 4', 249.99, 3, 320, 4.5),
(26, 'Amazfit', 'GTR 4, 46mm', 100, 'Amazfit GTR 4', 199.99, 3, 290, 4.3),
(27, 'Google', 'Pixel Watch, 41mm', 90, 'Google Pixel Watch', 349.99, 3, 250, 4.6),
(28, 'Xiaomi', 'Watch S1 Pro, 46mm', 110, 'Xiaomi Watch S1 Pro', 299.99, 3, 240, 4.4),
(29, 'Honor', 'Watch GS 3, 46mm', 80, 'Honor Watch GS 3', 229.99, 3, 210, 4.3),
(30, 'Realme', 'Watch 3 Pro, 44mm', 140, 'Realme Watch 3 Pro', 129.99, 3, 300, 4.2)
ON CONFLICT (id) DO NOTHING;


-- Gaming Consoles (category_id = 4)
INSERT INTO product(id, brand, description, inventory, name, price, category_id, sell_count, average_rating)
VALUES
(31, 'Sony', 'PlayStation 5, 1TB', 80, 'PlayStation 5', 499.99, 4, 1000, 4.9),
(32, 'Microsoft', 'Xbox Series X, 1TB', 100, 'Xbox Series X', 499.99, 4, 900, 4.8),
(33, 'Nintendo', 'Switch OLED, 64GB', 150, 'Nintendo Switch OLED', 349.99, 4, 850, 4.7),
(34, 'Valve', 'Steam Deck, 512GB', 70, 'Steam Deck', 649.99, 4, 400, 4.6),
(35, 'Sony', 'PlayStation 5 Digital Edition', 60, 'PS5 Digital Edition', 399.99, 4, 600, 4.7),
(36, 'Microsoft', 'Xbox Series S, 512GB', 90, 'Xbox Series S', 299.99, 4, 700, 4.6),
(37, 'Logitech', 'G Cloud Gaming Handheld', 50, 'Logitech G Cloud', 349.99, 4, 150, 4.4),
(38, 'Razer', 'Edge 5G Gaming Handheld', 60, 'Razer Edge 5G', 499.99, 4, 130, 4.5),
(39, 'Asus', 'ROG Ally Gaming Handheld', 40, 'Asus ROG Ally', 699.99, 4, 200, 4.5),
(40, 'Nintendo', 'Switch Lite, 32GB', 120, 'Nintendo Switch Lite', 199.99, 4, 650, 4.6)
ON CONFLICT (id) DO NOTHING;


-- Cameras & Photography (category_id = 5)
INSERT INTO product (id, brand, description, inventory, name, price, category_id, sell_count, average_rating)
VALUES
(41, 'Canon', 'EOS R5 Mirrorless Camera, 45MP', 50, 'Canon EOS R5', 3899.99, 5, 300, 4.9),
(42, 'Nikon', 'Z9 Mirrorless Camera, 45.7MP', 40, 'Nikon Z9', 5499.99, 5, 200, 4.8),
(43, 'Sony', 'Alpha 7 IV, 33MP', 70, 'Sony Alpha 7 IV', 2499.99, 5, 400, 4.7),
(44, 'Fujifilm', 'X-T5 Mirrorless Camera, 40.2MP', 80, 'Fujifilm X-T5', 1799.99, 5, 300, 4.7),
(45, 'Panasonic', 'Lumix GH6, 25.2MP', 60, 'Panasonic Lumix GH6', 2199.99, 5, 250, 4.6),
(46, 'GoPro', 'Hero 12 Black, 5.3K Video', 120, 'GoPro Hero 12 Black', 399.99, 5, 800, 4.8),
(47, 'DJI', 'Pocket 3 Gimbal Camera, 4K', 90, 'DJI Pocket 3', 499.99, 5, 600, 4.7),
(48, 'Olympus', 'OM-D E-M1 Mark III, 20.4MP', 50, 'Olympus OM-D E-M1', 1499.99, 5, 150, 4.5),
(49, 'Insta360', 'ONE RS 1-Inch Edition, 6K', 70, 'Insta360 ONE RS', 599.99, 5, 400, 4.6),
(50, 'Leica', 'Q3 Compact Camera, 60MP', 30, 'Leica Q3', 5999.99, 5, 100, 4.8)
ON CONFLICT (id) DO NOTHING;


-- Earphones (category_id = 6)
INSERT INTO product (id, brand, description, inventory, name, price, category_id, sell_count, average_rating)
VALUES
(51, 'Apple', 'AirPods Pro (2nd Gen)', 200, 'AirPods Pro 2', 249.99, 6, 1000, 4.8),
(52, 'Sony', 'WF-1000XM5 Noise-Canceling Earbuds', 150, 'Sony WF-1000XM5', 299.99, 6, 800, 4.9),
(53, 'Samsung', 'Galaxy Buds2 Pro', 180, 'Samsung Galaxy Buds2 Pro', 199.99, 6, 700, 4.7),
(54, 'Jabra', 'Elite 7 Pro Earbuds', 170, 'Jabra Elite 7 Pro', 199.99, 6, 600, 4.6),
(55, 'Bose', 'QuietComfort Earbuds II', 140, 'Bose QC Earbuds II', 279.99, 6, 500, 4.8),
(56, 'Sennheiser', 'Momentum True Wireless 3', 130, 'Sennheiser Momentum 3', 249.99, 6, 450, 4.7),
(57, 'Beats', 'Fit Pro Wireless Earbuds', 160, 'Beats Fit Pro', 199.99, 6, 400, 4.5),
(58, 'Anker', 'Soundcore Liberty 4 NC', 220, 'Soundcore Liberty 4', 149.99, 6, 350, 4.4),
(59, 'Google', 'Pixel Buds Pro', 190, 'Google Pixel Buds Pro', 199.99, 6, 500, 4.6),
(60, 'Nothing', 'Ear (2) Wireless Earbuds', 150, 'Nothing Ear (2)', 149.99, 6, 300, 4.5)
ON CONFLICT (id) DO NOTHING;


-- Keyboards (category_id = 7)
INSERT INTO product(id, brand, description, inventory, name, price, category_id, sell_count, average_rating)
VALUES
(61, 'Logitech', 'MX Keys Advanced Wireless Keyboard', 120, 'Logitech MX Keys', 119.99, 7, 400, 4.9),
(62, 'Corsair', 'K95 RGB Platinum XT Gaming Keyboard', 90, 'Corsair K95 RGB', 199.99, 7, 300, 4.8),
(63, 'Razer', 'BlackWidow V4 Pro Mechanical Keyboard', 100, 'Razer BlackWidow V4', 229.99, 7, 250, 4.7),
(64, 'Keychron', 'K3 Ultra-Slim Wireless Keyboard', 110, 'Keychron K3', 99.99, 7, 280, 4.6),
(65, 'SteelSeries', 'Apex Pro TKL Wireless', 80, 'SteelSeries Apex Pro', 249.99, 7, 240, 4.8),
(66, 'HyperX', 'Alloy Origins Core Gaming Keyboard', 140, 'HyperX Alloy Origins', 89.99, 7, 500, 4.7),
(67, 'Asus', 'ROG Strix Scope RX Keyboard', 60, 'ROG Strix Scope RX', 149.99, 7, 200, 4.5),
(68, 'Logitech', 'G Pro Mechanical Keyboard', 130, 'Logitech G Pro', 129.99, 7, 350, 4.6),
(69, 'Das Keyboard', 'Model S Professional', 70, 'Das Keyboard Model S', 169.99, 7, 180, 4.4),
(70, 'Apple', 'Magic Keyboard with Touch ID', 150, 'Apple Magic Keyboard', 149.99, 7, 500, 4.8)
ON CONFLICT (id) DO NOTHING;


-- Mouses (category_id = 8)
INSERT INTO product (id, brand, description, inventory, name, price, category_id, sell_count, average_rating)
VALUES
(71, 'Logitech', 'MX Master 3S Wireless Mouse', 200, 'Logitech MX Master 3S', 99.99, 8, 600, 4.9),
(72, 'Razer', 'Viper Ultimate Wireless Gaming Mouse', 180, 'Razer Viper Ultimate', 149.99, 8, 500, 4.8),
(73, 'SteelSeries', 'Aerox 5 Wireless Mouse', 120, 'SteelSeries Aerox 5', 139.99, 8, 300, 4.7),
(74, 'Corsair', 'Dark Core RGB Pro SE', 110, 'Corsair Dark Core SE', 99.99, 8, 200, 4.6),
(75, 'Apple', 'Magic Mouse 2', 150, 'Apple Magic Mouse 2', 79.99, 8, 400, 4.5),
(76, 'HyperX', 'Pulsefire Haste Gaming Mouse', 100, 'HyperX Pulsefire Haste', 49.99, 8, 450, 4.6),
(77, 'Asus', 'ROG Gladius III Wireless', 80, 'ROG Gladius III', 129.99, 8, 150, 4.5),
(78, 'Microsoft', 'Surface Arc Mouse', 130, 'Surface Arc Mouse', 79.99, 8, 350, 4.4),
(79, 'Logitech', 'G502 X Plus Wireless Mouse', 140, 'Logitech G502 X Plus', 149.99, 8, 250, 4.8),
(80, 'Razer', 'Basilisk V3 Pro', 90, 'Razer Basilisk V3', 169.99, 8, 180, 4.7)
ON CONFLICT (id) DO NOTHING;


-- Speakers (category_id = 9)
INSERT INTO product (id, brand, description, inventory, name, price, category_id, sell_count, average_rating)
VALUES
(81, 'JBL', 'Charge 5 Portable Bluetooth Speaker', 200, 'JBL Charge 5', 179.99, 9, 1000, 4.8),
(82, 'Bose', 'SoundLink Revolve+ II', 150, 'Bose SoundLink Revolve+', 329.99, 9, 800, 4.9),
(83, 'Sony', 'SRS-XG300 X-Series Wireless Speaker', 100, 'Sony SRS-XG300', 249.99, 9, 600, 4.7),
(84, 'Ultimate Ears', 'Boom 3 Portable Speaker', 180, 'Ultimate Ears Boom 3', 149.99, 9, 700, 4.6),
(85, 'Sonos', 'Move Smart Speaker', 90, 'Sonos Move', 399.99, 9, 500, 4.8),
(86, 'Harman Kardon', 'Aura Studio 3 Bluetooth Speaker', 110, 'Harman Kardon Aura 3', 299.99, 9, 400, 4.7),
(87, 'Bang & Olufsen', 'Beosound A1 2nd Gen', 80, 'Beosound A1', 279.99, 9, 350, 4.8),
(88, 'Marshall', 'Emberton II Portable Speaker', 120, 'Marshall Emberton II', 179.99, 9, 300, 4.6),
(89, 'Anker', 'Soundcore Motion+, 30W Speaker', 200, 'Soundcore Motion+', 99.99, 9, 900, 4.5),
(90, 'Google', 'Nest Audio Smart Speaker', 150, 'Google Nest Audio', 99.99, 9, 800, 4.7)
ON CONFLICT (id) DO NOTHING;


-- Laptops (category_id = 10)
INSERT INTO product (id, brand, description, inventory, name, price, category_id, sell_count, average_rating)
VALUES
(91, 'Apple', 'MacBook Pro 14-inch, M2 Pro, 512GB', 80, 'MacBook Pro 14', 1999.99, 10, 400, 4.9),
(92, 'Dell', 'XPS 13 Plus, Intel i7, 512GB', 90, 'Dell XPS 13 Plus', 1499.99, 10, 350, 4.8),
(93, 'HP', 'Spectre x360 14, Intel i7, 1TB', 100, 'HP Spectre x360', 1599.99, 10, 300, 4.7),
(94, 'Asus', 'ROG Zephyrus G14, AMD Ryzen 9, 1TB', 70, 'Asus ROG Zephyrus G14', 1799.99, 10, 280, 4.8),
(95, 'Lenovo', 'ThinkPad X1 Carbon, Intel i7, 1TB', 90, 'ThinkPad X1 Carbon', 1699.99, 10, 250, 4.7),
(96, 'Microsoft', 'Surface Laptop Studio, Intel i7, 512GB', 60, 'Surface Laptop Studio', 1599.99, 10, 200, 4.6),
(97, 'Razer', 'Blade 16, Intel i9, RTX 4090', 50, 'Razer Blade 16', 3499.99, 10, 150, 4.9),
(98, 'Acer', 'Swift X 14, Intel i7, RTX 3050', 120, 'Acer Swift X 14', 1299.99, 10, 300, 4.5),
(99, 'LG', 'Gram 17, Intel i7, 1TB', 110, 'LG Gram 17', 1899.99, 10, 240, 4.7),
(100, 'Samsung', 'Galaxy Book3 Ultra, Intel i7, 1TB', 80, 'Galaxy Book3 Ultra', 1999.99, 10, 220, 4.6)
ON CONFLICT (id) DO NOTHING;

