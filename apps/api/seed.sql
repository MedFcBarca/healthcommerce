-- Categories
INSERT INTO category (id, name) VALUES
(1, 'Compléments'),
(2, 'Beauté'),
(3, 'Bien-être'),
(4, 'Sport'),
(5, 'Bébé');

-- Products (price = centimes)
INSERT INTO product (id, name, description, price, is_active, category_id) VALUES
(1, 'Vitamine C 1000mg', 'Soutien immunitaire, 60 comprimés.', 1299, 1, 1),
(2, 'Magnésium Bisglycinate', 'Confort nerveux & sommeil, haute absorption.', 1899, 1, 1),
(3, 'Oméga-3 EPA/DHA', 'Huile de poisson purifiée, 90 gélules.', 2199, 1, 1),
(4, 'Probiotiques 10 souches', 'Flore intestinale, 30 gélules.', 1699, 1, 1),
(5, 'Zinc + Sélénium', 'Peau & immunité, 90 comprimés.', 1499, 1, 1),
(6, 'Collagène marin', 'Peau & articulations, poudre 300g.', 2499, 1, 1),

(7, 'Sérum Vitamine C', 'Éclat et uniformité du teint, 30ml.', 1999, 1, 2),
(8, 'Crème hydratante céramides', 'Hydratation longue durée, 50ml.', 1599, 1, 2),
(9, 'Nettoyant doux visage', 'Gel nettoyant peaux sensibles, 200ml.', 1199, 1, 2),
(10, 'Crème mains réparatrice', 'Sèche et abîmée, 75ml.', 799, 1, 2),
(11, 'Shampoing fortifiant', 'Cheveux fragiles, 250ml.', 1099, 1, 2),
(12, 'Baume à lèvres', 'Nutrition intense, 4,8g.', 399, 1, 2),

(13, 'Infusion sommeil', 'Tilleul, camomille, verveine, 20 sachets.', 599, 1, 3),
(14, 'Huile essentielle lavande', 'Relaxation & diffusion, 10ml.', 699, 1, 3),
(15, 'Spray sommeil', 'Brume d’oreiller, 50ml.', 899, 1, 3),
(16, 'Bouillotte sèche', 'Graines naturelles, chaleur apaisante.', 1599, 1, 3),
(17, 'Roll-on anti-stress', 'Huiles essentielles, format nomade.', 749, 1, 3),
(18, 'Tisane digestion', 'Fenouil & menthe, 20 sachets.', 549, 1, 3),

(19, 'Whey protéine', 'Protéine lactée, vanille, 1kg.', 3299, 1, 4),
(20, 'Barres protéinées', 'Pack x12, chocolat-noisette.', 2499, 1, 4),
(21, 'Créatine monohydrate', 'Performance & force, 300g.', 1799, 1, 4),
(22, 'BCAA 2:1:1', 'Récupération, 200g.', 1999, 1, 4),
(23, 'Gourde inox', '500ml, isotherme.', 1499, 1, 4),
(24, 'Électrolytes', 'Hydratation sportive, citron, 20 doses.', 1299, 1, 4),

(25, 'Liniment bébé', 'Nettoyage doux, 400ml.', 899, 1, 5),
(26, 'Crème change', 'Protection & apaisement, 75ml.', 699, 1, 5),
(27, 'Gel lavant bébé', 'Sans savon, 500ml.', 999, 1, 5),
(28, 'Coton bio bébé', 'Carrés ultra doux x180.', 499, 1, 5),
(29, 'Sérum physiologique', 'Unidoses x30.', 399, 1, 5),
(30, 'Thermomètre digital', 'Embout souple, lecture rapide.', 1299, 1, 5);
