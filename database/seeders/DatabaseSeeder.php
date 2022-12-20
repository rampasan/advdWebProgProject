<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use PhpParser\Node\Expr\Cast\Bool_;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         User::factory(30)->create([
             'password' => Hash::make('password'),
             'is_admin' => false,
             'is_approved' => true,
         ]);

//         User::factory()->create([
//             'name' => 'Muhammad Sufyian Bin Mohd Azmi, Ts.',
//             'email' => 'sufyian@uniten.edu.my',
//             'password' => Hash::make('password'),
//             'is_admin' => true,
//             'is_approved' => true,
//         ]);
    }
}
