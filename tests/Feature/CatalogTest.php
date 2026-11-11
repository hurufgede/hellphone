<?php

namespace Tests\Feature;

use App\Models\Phone;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CatalogTest extends TestCase
{
    use RefreshDatabase;

    private function makePhone(array $overrides = []): Phone
    {
        return Phone::create(array_merge([
            'name' => 'Pixel Test 10',
            'brand' => 'Google',
            'price' => 10_000_000,
            'condition' => 'new',
            'ram' => '12GB',
            'storage' => '128GB',
            'stock' => 5,
            'accent' => 'violet',
            'is_featured' => false,
            'is_active' => true,
        ], $overrides));
    }

    public function test_guests_can_browse_the_catalog_without_logging_in(): void
    {
        $this->makePhone();

        $response = $this->get('/');

        $response->assertOk()->assertInertia(
            fn (Assert $page) => $page->component('catalog/home')->has('phones.data', 1)
        );
    }

    public function test_guests_can_see_a_phone_detail_page(): void
    {
        $phone = $this->makePhone();

        $response = $this->get("/phone/{$phone->slug}");

        $response->assertOk()->assertInertia(
            fn (Assert $page) => $page->component('catalog/phone')
                ->where('phone.name', 'Pixel Test 10')
        );
    }

    public function test_inactive_phones_are_hidden_from_guests(): void
    {
        $phone = $this->makePhone(['is_active' => false]);

        $response = $this->get("/phone/{$phone->slug}");

        $response->assertNotFound();
    }

    public function test_guests_can_search_the_catalog(): void
    {
        $this->makePhone();
        $this->makePhone(['name' => 'Galaxy Test S99', 'brand' => 'Samsung']);

        $response = $this->get('/?q=Galaxy');

        $response->assertOk()->assertInertia(
            fn (Assert $page) => $page->component('catalog/home')
                ->has('phones.data', 1)
                ->where('phones.data.0.brand', 'Samsung')
        );
    }

    public function test_registration_is_not_available_publicly(): void
    {
        $response = $this->post('/register', [
            'name' => 'Intruder',
            'email' => 'intruder@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertNotFound();
        $this->assertGuest();
    }
}
