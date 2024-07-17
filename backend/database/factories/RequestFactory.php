<?php

namespace Database\Factories;

use App\Models\Request;
use Illuminate\Database\Eloquent\Factories\Factory;

class RequestFactory extends Factory
{
    protected $model = Request::class;

    public function definition()
    {
        return [
            'created_on' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'location' => $this->faker->city,
            'service' => $this->faker->word,
            'status' => $this->faker->randomElement(['NEW', 'IN_PROGRESS', 'ON_HOLD', 'REJECTED', 'CANCELLED']),
            'priority' => $this->faker->randomElement(['HIGH', 'MEDIUM', 'LOW']),
            'department' => $this->faker->company,
            'requested_by' => $this->faker->name,
            'assigned_to' => $this->faker->name,
        ];
    }
}
