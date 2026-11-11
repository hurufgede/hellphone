<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('phones', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('brand', 50)->index();
            $table->unsignedBigInteger('price');
            $table->unsignedBigInteger('compare_price')->nullable();
            $table->string('condition', 10)->default('new')->index(); // new | used
            $table->string('grade', 2)->nullable(); // A / B / C (khusus second)
            $table->string('ram', 20);
            $table->string('storage', 20);
            $table->unsignedTinyInteger('battery_health')->nullable(); // 1-100, khusus second
            $table->string('color', 50)->nullable();
            $table->unsignedSmallInteger('stock')->default(1);
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->string('accent', 20)->default('violet');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phones');
    }
};
