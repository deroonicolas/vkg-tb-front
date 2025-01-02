<?php
$password = "DeeAVkgTb$!!@"; // Mot de passe en clair fourni par l'utilisateur

// Générer un hachage sécurisé du mot de passe
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

echo "Mot de passe haché : " . $hashedPassword;
