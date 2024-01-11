-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trademarks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `trademark_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `components` VARCHAR(191) NULL,
    `images` VARCHAR(191) NOT NULL,
    `size` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `price` DECIMAL(6, 2) NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 1,
    `extra_props` JSON NOT NULL,
    `sale` BOOLEAN NOT NULL DEFAULT false,
    `sale_price` DECIMAL(6, 2) NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_trademark_id_fkey` FOREIGN KEY (`trademark_id`) REFERENCES `trademarks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
