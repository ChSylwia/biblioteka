-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 14, 2025 at 01:00 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `biblioteka`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20250513082509', '2025-05-13 10:25:54', 15);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ksiazki`
--

CREATE TABLE `ksiazki` (
  `id` int(11) NOT NULL,
  `tytul` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `rok_wydania` int(11) NOT NULL,
  `opis` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ksiazki`
--

INSERT INTO `ksiazki` (`id`, `tytul`, `autor`, `rok_wydania`, `opis`) VALUES
(1, 'Lalka', 'Bolesława Prusa', 1890, 'Powieść realistyczna o konflikcie ideałów i pragmatyzmu w XIX-wiecznej Warszawie.'),
(2, 'Pan Tadeusz', 'Adam Mickiewicz', 1834, 'Epopeja narodowa opisująca polskie obyczaje szlacheckie na Litwie.'),
(3, 'Zbrodnia i kara', 'Fiodor Dostojewski', 1866, 'Psychologiczny dramat o moralnych dylematach skazanego za morderstwo studenta.'),
(4, 'Harry Potter i Kamień Filozoficzny', 'J.K. Rowling', 1997, 'Fantastyczna opowieść o chłopcu-czarodzieju i jego pierwszym roku w Szkole Magii.'),
(5, 'Władca Pierścieni: Drużyna Pierścienia', 'J.R.R. Tolkien', 1954, 'Początek epickiej podróży, której celem jest zniszczenie potężnego pierścienia.'),
(7, 'Potop', 'Henryk Sienkiewicz', 1886, 'Druga część Trylogii, opowiadająca o wydarzeniach powstania Chmielnickiego.'),
(8, 'Quo Vadis', 'Henryk Sienkiewicz', 1896, 'Historyczna powieść osadzona w starożytnym Rzymie za czasów Nerona.'),
(9, 'Mistrz i Małgorzata', 'Michaił Bułhakow', 1966, 'Fantastyczno-satyrystyczna opowieść o Poncjuszu Piłacie i sowietach.'),
(10, 'Ostatnie życzenie', 'Andrzej Sapkowski', 1993, 'Zbiór opowiadań wprowadzających postać Wiedźmina Geralta.'),
(11, 'Sto lat samotności', 'Gabriel García Márquez', 1967, 'Magiczny realizm w historii rodu Buendía w miasteczku Macondo.'),
(13, 'Duma i uprzedzenie', 'Jane Austen', 1813, 'Klasyczna powieść o miłości i obyczajach angielskiej prowincji.'),
(14, 'Wielki Gatsby', 'F. Scott Fitzgerald', 1925, 'Obraz amerykańskiego społeczeństwa lat 20. XX wieku.'),
(15, 'Zemsta', 'Aleksander Fredro', 1834, 'Komedia szlachecka, pełna dowcipu i zwrotów akcji.'),
(16, 'Folwark zwierzęcy', 'George Orwell', 1945, 'Allegoryczna satyra na rewolucje i władzę.');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indeksy dla tabeli `ksiazki`
--
ALTER TABLE `ksiazki`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ksiazki`
--
ALTER TABLE `ksiazki`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
