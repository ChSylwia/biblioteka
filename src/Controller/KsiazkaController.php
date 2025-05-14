<?php

namespace App\Controller;

use App\Entity\Ksiazki;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class KsiazkaController extends AbstractController
{
    #[Route('/api/ksiazki', name: 'api_ksiazki', methods: ['GET'])]
    public function lista(Request $request, EntityManagerInterface $em): Response
    {
        $tytul = $request->query->get('tytul');

        if ($tytul) {
            // wyszukiwanie częściowe, case-insensitive
            $qb = $em->getRepository(Ksiazki::class)
                ->createQueryBuilder('k')
                ->where('LOWER(k.tytul) LIKE :tytul')
                ->setParameter('tytul', '%' . strtolower($tytul) . '%');

            $ksiazki = $qb->getQuery()->getResult();
        } else {
            $ksiazki = $em->getRepository(Ksiazki::class)->findAll();
        }
        $data = array_map(function (Ksiazki $k) {
            return [
                'id' => $k->getId(),
                'tytul' => $k->getTytul(),
                'autor' => $k->getAutor(),
                'rok_wydania' => $k->getRokWydania(),
                'opis' => $k->getOpis(),
            ];
        }, $ksiazki);

        return $this->json($data);
    }

    #[Route('/api/ksiazki/{id}', name: 'api_usun_ksiazke', methods: ['DELETE'])]
    public function usun(int $id, EntityManagerInterface $em): Response
    {
        $ksiazka = $em->getRepository(Ksiazki::class)->find($id);

        if (!$ksiazka) {
            return $this->json(['message' => 'Książka nie znaleziona'], 404);
        }

        $em->remove($ksiazka);
        $em->flush();

        return $this->json(['message' => 'Książka usunięta']);
    }

    #[Route('/api/ksiazki/{id}', name: 'api_get_ksiazka', methods: ['GET'])]
    public function getOne(int $id, EntityManagerInterface $em): Response
    {
        $k = $em->getRepository(Ksiazki::class)->find($id);
        if (!$k) {
            return $this->json(['message' => 'Książka nie znaleziona'], 404);
        }

        return $this->json([
            'id' => $k->getId(),
            'tytul' => $k->getTytul(),
            'autor' => $k->getAutor(),
            'rok_wydania' => $k->getRokWydania(),
            'opis' => $k->getOpis(),
        ]);
    }

    #[Route('/api/ksiazki/{id}', name: 'api_edycja_ksiazki', methods: ['POST'])]
    public function edytuj(int $id, Request $request, EntityManagerInterface $em): Response
    {
        $ksiazka = $em->getRepository(Ksiazki::class)->find($id);
        if (!$ksiazka) {
            return $this->json(['message' => 'Książka nie znaleziona'], 404);
        }

        $data = json_decode($request->getContent(), true);
        if (!$data) {
            return $this->json(['message' => 'Niepoprawne dane JSON'], 400);
        }

        $errors = [];

        if (isset($data['tytul']) && empty($data['tytul'])) {
            $errors[] = 'Tytuł nie może być pusty.';
        }
        if (isset($data['autor']) && empty($data['autor'])) {
            $errors[] = 'Autor nie może być pusty.';
        }
        if (isset($data['rok_wydania']) && !is_numeric($data['rok_wydania'])) {
            $errors[] = 'Rok wydania musi być liczbą.';
        }
        if (!isset($data['opis'])) {
            $errors[] = 'Opis jest wymagany.';
        }
        if (!empty($errors)) {
            return $this->json(['errors' => $errors], 400);
        }

        if (isset($data['tytul'])) {
            $ksiazka->setTytul($data['tytul']);
        }
        if (isset($data['autor'])) {
            $ksiazka->setAutor($data['autor']);
        }
        if (isset($data['rok_wydania'])) {
            $ksiazka->setRokWydania((int) $data['rok_wydania']);
        }
        if (isset($data['opis'])) {
            $ksiazka->setOpis($data['opis']);
        }

        $em->flush();

        return $this->json(['message' => 'Książka zaktualizowana']);
    }
    #[Route('/api/ksiazki', name: 'api_ksiazki_dodaj', methods: ['POST'])]
    public function dodaj(Request $request, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);
        if (!$data) {
            return $this->json(['message' => 'Niepoprawne dane JSON'], 400);
        }

        $errors = [];

        if (empty($data['tytul'])) {
            $errors[] = 'Tytuł jest wymagany.';
        }
        if (empty($data['autor'])) {
            $errors[] = 'Autor jest wymagany.';
        }
        if (empty($data['rok_wydania']) || !is_numeric($data['rok_wydania'])) {
            $errors[] = 'Rok wydania musi być liczbą.';
        }
        if (empty($data['opis'])) {
            $errors[] = 'Opis jest wymagany.';
        }
        if (!empty($errors)) {
            return $this->json(['errors' => $errors], 400);
        }
        $ksiazka = new Ksiazki();
        $ksiazka->setTytul($data['tytul'] ?? '');
        $ksiazka->setAutor($data['autor'] ?? '');
        $ksiazka->setRokWydania((int) ($data['rok_wydania'] ?? 0));
        $ksiazka->setOpis($data['opis'] ?? '');

        $em->persist($ksiazka);
        $em->flush();

        return $this->json([
            'id' => $ksiazka->getId(),
            'tytul' => $ksiazka->getTytul(),
            'autor' => $ksiazka->getAutor(),
            'rok_wydania' => $ksiazka->getRokWydania(),
            'opis' => $ksiazka->getOpis(),
        ], 201);
    }


}
