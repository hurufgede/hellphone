<?php

namespace Database\Seeders;

use App\Models\Phone;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PhoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Phone::query()->delete();

        $phones = [
            // ===== APPLE =====
            ['name' => 'iPhone 17 Pro Max 256GB', 'brand' => 'Apple', 'price' => 25999000, 'compare_price' => 27999000, 'condition' => 'new', 'ram' => '12GB', 'storage' => '256GB', 'color' => 'Cosmic Orange', 'stock' => 8, 'accent' => 'amber', 'is_featured' => true, 'description' => 'iPhone 17 Pro Max chip A19 Pro, kamera 48MP triple fusion, layar Super Retina XDR 6.9" ProMotion 120Hz, titanium grade 5, garansi resmi iBox 1 tahun. Unit baru segel, resmi IMEI terdaftar.'],
            ['name' => 'iPhone 17 128GB', 'brand' => 'Apple', 'price' => 18999000, 'compare_price' => null, 'condition' => 'new', 'ram' => '8GB', 'storage' => '128GB', 'color' => 'Sage', 'stock' => 12, 'accent' => 'emerald', 'is_featured' => true, 'description' => 'iPhone 17 dengan A19, layar 6.3" ProMotion 120Hz, kamera ganda 48MP, Apple Intelligence, garansi resmi iBox 1 tahun.'],
            ['name' => 'iPhone 16 Pro 128GB Second', 'brand' => 'Apple', 'price' => 15499000, 'compare_price' => 19999000, 'condition' => 'used', 'grade' => 'A', 'ram' => '8GB', 'storage' => '128GB', 'battery_health' => 94, 'color' => 'Desert Titanium', 'stock' => 3, 'accent' => 'violet', 'description' => 'iPhone 16 Pro second ex-inter garansi internasional. Kondisi mulus like new, no minus, layar tanpa shadow/burn-in, battery health 94%, kotak + kabel original.'],
            ['name' => 'iPhone 15 128GB Second', 'brand' => 'Apple', 'price' => 8999000, 'compare_price' => 11999000, 'condition' => 'used', 'grade' => 'B', 'ram' => '6GB', 'storage' => '128GB', 'battery_health' => 88, 'color' => 'Pink', 'stock' => 5, 'accent' => 'rose', 'description' => 'iPhone 15 second bergaransi toko 1 bulan. Lecet halus wajar pemakaian di frame, layar clear, semua fungsi normal, battery health 88%.'],
            ['name' => 'iPhone 13 128GB Second', 'brand' => 'Apple', 'price' => 6499000, 'compare_price' => null, 'condition' => 'used', 'grade' => 'B', 'ram' => '4GB', 'storage' => '128GB', 'battery_health' => 82, 'color' => 'Midnight', 'stock' => 7, 'accent' => 'sky', 'description' => 'iPhone 13 second siap pakai. Kondisi B (lecet pemakaian), battery health 82%, layar normal, Face ID normal, garansi toko 1 bulan.'],

            // ===== SAMSUNG =====
            ['name' => 'Galaxy S26 Ultra 12/512GB', 'brand' => 'Samsung', 'price' => 23999000, 'compare_price' => 25999000, 'condition' => 'new', 'ram' => '12GB', 'storage' => '512GB', 'color' => 'Titanium Black', 'stock' => 10, 'accent' => 'violet', 'is_featured' => true, 'description' => 'Galaxy S26 Ultra, Snapdragon 8 Elite Gen 2 for Galaxy, kamera 200MP, S Pen, layar Dynamic AMOLED 2X 6.9" 120Hz, garansi resmi Samsung Indonesia 1 tahun.'],
            ['name' => 'Galaxy S25 FE 8/256GB', 'brand' => 'Samsung', 'price' => 9999000, 'compare_price' => 11999000, 'condition' => 'new', 'ram' => '8GB', 'storage' => '256GB', 'color' => 'Navy', 'stock' => 15, 'accent' => 'sky', 'description' => 'Galaxy S25 FE, flagship rasa terjangkau, kamera 50MP OIS, layar AMOLED 6.7" 120Hz, IP68, garansi resmi 1 tahun + Samsung Care.'],
            ['name' => 'Galaxy Z Fold7 12/256GB', 'brand' => 'Samsung', 'price' => 27999000, 'compare_price' => 29999000, 'condition' => 'new', 'ram' => '12GB', 'storage' => '256GB', 'color' => 'Silver Shadow', 'stock' => 6, 'accent' => 'fuchsia', 'is_featured' => true, 'description' => 'Galaxy Z Fold7, foldable tipis 8.9mm saat tertutup, layar utama 8" Dynamic AMOLED, Snapdragon 8 Elite, kamera 200MP, garansi resmi 1 tahun.'],
            ['name' => 'Galaxy A56 8/128GB', 'brand' => 'Samsung', 'price' => 5499000, 'compare_price' => null, 'condition' => 'new', 'ram' => '8GB', 'storage' => '128GB', 'color' => 'Awesome Lightgray', 'stock' => 20, 'accent' => 'emerald', 'description' => 'Galaxy A56 5G, Exynos 1580, layar Super AMOLED 6.7" 120Hz, kamera 50MP OIS, IP67, baterai 5000mAh 45W, garansi resmi 1 tahun.'],
            ['name' => 'Galaxy S23 Ultra 12/256GB Second', 'brand' => 'Samsung', 'price' => 10999000, 'compare_price' => 13999000, 'condition' => 'used', 'grade' => 'A', 'ram' => '12GB', 'storage' => '256GB', 'battery_health' => 91, 'color' => 'Green', 'stock' => 4, 'accent' => 'lime', 'description' => 'Galaxy S23 Ultra second ex-resmi. Mulus, S Pen lengkap, kamera 200MP jernih, battery health 91%, bisa TT/COD area Jabodetabek, garansi toko 1 bulan.'],

            // ===== XIAOMI =====
            ['name' => 'Xiaomi 15T Pro 12/512GB', 'brand' => 'Xiaomi', 'price' => 10999000, 'compare_price' => 12999000, 'condition' => 'new', 'ram' => '12GB', 'storage' => '512GB', 'color' => 'Black', 'stock' => 14, 'accent' => 'amber', 'is_featured' => true, 'description' => 'Xiaomi 15T Pro, Dimensity 9400+, kamera Leica 50MP tele 5x optical, layar AMOLED 6.83" 144Hz, baterai 5500mAh 90W, garansi resmi TAM 1 tahun.'],
            ['name' => 'Redmi Note 14 Pro+ 8/256GB', 'brand' => 'Xiaomi', 'price' => 5499000, 'compare_price' => 6299000, 'condition' => 'new', 'ram' => '8GB', 'storage' => '256GB', 'color' => 'Lavender Purple', 'stock' => 25, 'accent' => 'fuchsia', 'description' => 'Redmi Note 14 Pro+ 5G, Snapdragon 7s Gen 3, kamera 200MP OIS, layar AMOLED 6.67" 1.5K 120Hz, baterai 6200mAh 90W, IP68, garansi resmi 1 tahun.'],
            ['name' => 'POCO X7 Pro 12/512GB', 'brand' => 'Xiaomi', 'price' => 5999000, 'compare_price' => null, 'condition' => 'new', 'ram' => '12GB', 'storage' => '512GB', 'color' => 'Yellow', 'stock' => 18, 'accent' => 'amber', 'description' => 'POCO X7 Pro, Dimensity 8400 Ultra, AMOLED 6.67" 1220p 120Hz, baterai 6000mAh 90W HyperCharge, performa kencang untuk gaming, garansi resmi 1 tahun.'],
            ['name' => 'Redmi 14C 8/256GB', 'brand' => 'Xiaomi', 'price' => 1899000, 'compare_price' => null, 'condition' => 'new', 'ram' => '8GB', 'storage' => '256GB', 'color' => 'Starry Blue', 'stock' => 30, 'accent' => 'sky', 'description' => 'Redmi 14C, layar 6.88" 120Hz, Helio G81 Ultra, kamera 50MP, baterai 5160mAh, cocok untuk kebutuhan harian & belajar online. Garansi resmi 1 tahun.'],
            ['name' => 'Xiaomi 14 12/256GB Second', 'brand' => 'Xiaomi', 'price' => 7499000, 'compare_price' => null, 'condition' => 'used', 'grade' => 'B', 'ram' => '12GB', 'storage' => '256GB', 'battery_health' => 89, 'color' => 'Black', 'stock' => 2, 'accent' => 'violet', 'description' => 'Xiaomi 14 second ex-China set. Kamera Leica 50MP, Snapdragon 8 Gen 3, battery health 89%, lecet halus frame, garansi toko 1 bulan.'],

            // ===== OPPO =====
            ['name' => 'OPPO Find X9 Pro 16/512GB', 'brand' => 'Oppo', 'price' => 16999000, 'compare_price' => 18999000, 'condition' => 'new', 'ram' => '16GB', 'storage' => '512GB', 'color' => 'Titanium', 'stock' => 7, 'accent' => 'rose', 'is_featured' => true, 'description' => 'OPPO Find X9 Pro, Dimensity 9500, kamera Hasselblad 200MP, layar AMOLED 6.78" 120Hz, baterai 7500mAh 80W + wireless, garansi resmi 1 tahun + OPPO VIP.'],
            ['name' => 'OPPO Reno14 Pro 12/512GB', 'brand' => 'Oppo', 'price' => 9999000, 'compare_price' => null, 'condition' => 'new', 'ram' => '12GB', 'storage' => '512GB', 'color' => 'Reef Black', 'stock' => 11, 'accent' => 'cyan', 'description' => 'OPPO Reno14 Pro 5G, kamera triple 50MP Hasselblad, layar AMOLED 6.83" 120Hz, desain flat premium, kamera tele 3.5x, garansi resmi 1 tahun.'],
            ['name' => 'OPPO A5 Pro 8/128GB', 'brand' => 'Oppo', 'price' => 2999000, 'compare_price' => null, 'condition' => 'new', 'ram' => '8GB', 'storage' => '128GB', 'color' => 'Silk Blue', 'stock' => 22, 'accent' => 'sky', 'description' => 'OPPO A5 Pro 5G, MIL-STD-810H tahan banting, baterai 5800mAh, IP68/IP69, garansi resmi 1 tahun. Cocok untuk aktivitas outdoor.'],

            // ===== VIVO =====
            ['name' => 'Vivo X300 Pro 16/512GB', 'brand' => 'Vivo', 'price' => 17499000, 'compare_price' => 19499000, 'condition' => 'new', 'ram' => '16GB', 'storage' => '512GB', 'color' => 'Phantom Black', 'stock' => 6, 'accent' => 'fuchsia', 'is_featured' => true, 'description' => 'Vivo X300 Pro, Dimensity 9500, kamera Zeiss 200MP tele, layar AMOLED 6.78" 120Hz, baterai 6510mAh 90W, ZEISS optics, garansi resmi 1 tahun.'],
            ['name' => 'Vivo V60 12/256GB', 'brand' => 'Vivo', 'price' => 6999000, 'compare_price' => 7499000, 'condition' => 'new', 'ram' => '12GB', 'storage' => '256GB', 'color' => 'Mist Gray', 'stock' => 13, 'accent' => 'emerald', 'description' => 'Vivo V60, desain quad-curved elegan, kamera 50MP Zeiss + OIS, Aura Light, baterai 6500mAh 90W FlashCharge, garansi resmi 1 tahun.'],
            ['name' => 'Vivo Y39 8/256GB', 'brand' => 'Vivo', 'price' => 3299000, 'compare_price' => null, 'condition' => 'new', 'ram' => '8GB', 'storage' => '256GB', 'color' => 'Pearl Pink', 'stock' => 17, 'accent' => 'rose', 'description' => 'Vivo Y39 5G, IP64, baterai 6500mAh, layar 120Hz, cocok untuk daily driver & gaming ringan. Garansi resmi 1 tahun.'],

            // ===== GOOGLE =====
            ['name' => 'Google Pixel 10 Pro XL 16/256GB', 'brand' => 'Google', 'price' => 19999000, 'compare_price' => null, 'condition' => 'new', 'ram' => '16GB', 'storage' => '256GB', 'color' => 'Moonstone', 'stock' => 4, 'accent' => 'lime', 'description' => 'Google Pixel 10 Pro XL, Tensor G5, kamera computational photography terbaik di kelasnya, Gemini AI, layar Super Actua 6.8", garansi distributor 1 tahun.'],
            ['name' => 'Google Pixel 9 12/128GB', 'brand' => 'Google', 'price' => 9499000, 'compare_price' => 10999000, 'condition' => 'new', 'ram' => '12GB', 'storage' => '128GB', 'color' => 'Porcelain', 'stock' => 9, 'accent' => 'amber', 'description' => 'Google Pixel 9, Tensor G4, kamera dual 50MP, layar OLED 6.3" 120Hz, Android murni + 7 tahun update, garansi distributor 1 tahun.'],

            // ===== ONEPLUS =====
            ['name' => 'OnePlus 15 12/256GB', 'brand' => 'OnePlus', 'price' => 13999000, 'compare_price' => null, 'condition' => 'new', 'ram' => '12GB', 'storage' => '256GB', 'color' => 'Absolute Black', 'stock' => 8, 'accent' => 'violet', 'description' => 'OnePlus 15, Snapdragon 8 Elite Gen 5, AMOLED 6.78" 165Hz, kamera 50MP triple, baterai 7300mAh 120W SUPERVOOC, garansi resmi 1 tahun.'],
            ['name' => 'OnePlus Nord CE5 8/128GB', 'brand' => 'OnePlus', 'price' => 4299000, 'compare_price' => null, 'condition' => 'new', 'ram' => '8GB', 'storage' => '128GB', 'color' => 'Marble Mist', 'stock' => 16, 'accent' => 'cyan', 'description' => 'OnePlus Nord CE5, MediaTek Dimensity 8350, AMOLED 6.77" 120Hz, baterai 7100mAh 80W, OxygenOS smooth, garansi resmi 1 tahun.'],

            // ===== NOTHING =====
            ['name' => 'Nothing Phone (3) 12/256GB', 'brand' => 'Nothing', 'price' => 10999000, 'compare_price' => null, 'condition' => 'new', 'ram' => '12GB', 'storage' => '256GB', 'color' => 'Black', 'stock' => 5, 'accent' => 'emerald', 'description' => 'Nothing Phone (3), Snapdragon 8s Gen 4, Glyph Matrix interface, kamera 50MP triple, desain transparan ikonik, garansi distributor 1 tahun.'],
            ['name' => 'Nothing Phone (2a) 8/128GB', 'brand' => 'Nothing', 'price' => 3999000, 'compare_price' => 4499000, 'condition' => 'new', 'ram' => '8GB', 'storage' => '128GB', 'color' => 'Milk', 'stock' => 12, 'accent' => 'sky', 'description' => 'Nothing Phone (2a), Dimensity 7200 Pro, Glyph Interface, AMOLED 6.7" 120Hz, desain transparan futuristik, garansi distributor 1 tahun.'],

            // ===== REALME =====
            ['name' => 'realme GT 7 Pro 12/256GB', 'brand' => 'Realme', 'price' => 9911000, 'compare_price' => 10999000, 'condition' => 'new', 'ram' => '12GB', 'storage' => '256GB', 'color' => 'Mars Orange', 'stock' => 10, 'accent' => 'amber', 'description' => 'realme GT 7 Pro, Snapdragon 8 Elite, kamera 50MP Sony IMX, layar AMOLED 6.78" 120Hz, IP69, baterai 6500mAh 120W, garansi resmi 1 tahun.'],
        ];

        foreach ($phones as $data) {
            $data['slug'] = Phone::generateSlug($data['name']);
            Phone::create($data);
        }
    }
}
