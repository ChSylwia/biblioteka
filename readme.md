# 📚 Library App – Recruitment Task

A simple full stack project fetching book data from a MySQL database.  
Frontend built with React.js, backend with Symfony PHP.

---

## 🛠️ Technologies

- **Frontend:** React, JavaScript, Tailwind CSS  
- **Backend:** Symfony (PHP), Doctrine ORM  
- **Database:** MySQL

---

## 🔧 How to run
## for backend

1
composer install

2 use biblioteka.sql and create database
in .env configure DATABASE_URL="mysql://root:@127.0.0.1:3306/biblioteka"

3
php bin/console doctrine:migrations:migrate --no-interaction

4
php bin/console cache:clear
php bin/console assets:install public

5
symfony server:start --no-tls -d

## for front

6
cd frontend
npm install

6.1
npm run dev
