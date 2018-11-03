<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        for($i = 0; $i <= 15; $i++){

            DB::table('members')->insert([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'email' => $faker->email,
                'phone' => $faker->phoneNumber,
                'position' => $faker->jobTitle,
            ]);
        }

    }
}
