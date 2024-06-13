# Test technique Linkuma

## Prérequis

- [PHP](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node.js et npm](https://nodejs.org/)

## Installation

1. **Cloner le dépôt**

    ```sh
    git clone https://github.com/QuentD36/linkuma.git
    cd linkuma
    ```

2. **Générer la clé pour Laravel**

    ```sh
    php artisan key:generate
    ```

3. **Installer les dépendances npm**

    ```sh
    npm install
    ```

4. **Installer les dépendances composer**

    ```sh
    composer install
    ```

5. **Migrer la base de données**

    ```sh
    php artisan migrate
    ```

6. **Lancer l'installation de reverb**

    ```sh
    php artisan reverb:install
    ```

7. **Ajouter la clé API SpaceSerp dans le .env**

    ```sh
    SPACESERP_API_KEY=clé-api
    ```

## Démarrage

Pour démarrer l'application, suivez les étapes ci-dessous :

1. **Lancer reverb**

    ```sh
    php artisan reverb:start
    ```

2. **Lancer les deux queues**

    ```sh
    php artisan queue:work
    php artisan queue:work --queue=updateUrlQueue
    ```

3. **Lancer le serveur**
    ```sh
    php artisan serve
    npm run dev
    ```

