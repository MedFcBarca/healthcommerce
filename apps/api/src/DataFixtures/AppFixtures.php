<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $categories = [];
        foreach (['Compléments', 'Beauté', 'Bien-être', 'Sport', 'Bébé'] as $name) {
            $cat = new Category();
            $cat->setName($name);
            $manager->persist($cat);
            $categories[] = $cat;
        }

        for ($i = 0; $i < 30; $i++) {
            $p = new Product();
            $p->setName(ucfirst($faker->words(3, true)));
            $p->setDescription($faker->paragraph());
            $p->setPrice($faker->numberBetween(499, 9999)); // centimes
            $p->setIsActive($faker->boolean(90));
            // ⚠️ si ton Product a bien la relation category, sinon on enlève cette ligne
            if (method_exists($p, 'setCategory')) {
                $p->setCategory($faker->randomElement($categories));
            }
            $manager->persist($p);
        }

        $manager->flush();
    }
}
