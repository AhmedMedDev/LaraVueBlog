<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Models\Post;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //factory(User::class, 3)->create();
        factory(Post::class, 15)->create();
    }
}
