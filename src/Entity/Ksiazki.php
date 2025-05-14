<?php

namespace App\Entity;

use App\Repository\KsiazkiRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: KsiazkiRepository::class)]
class Ksiazki
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $tytul = null;

    #[ORM\Column(length: 255)]
    private ?string $autor = null;

    #[ORM\Column]
    private ?int $rok_wydania = null;

    #[ORM\Column(length: 255)]
    private ?string $opis = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTytul(): ?string
    {
        return $this->tytul;
    }

    public function setTytul(string $tytul): static
    {
        $this->tytul = $tytul;

        return $this;
    }

    public function getAutor(): ?string
    {
        return $this->autor;
    }

    public function setAutor(string $autor): static
    {
        $this->autor = $autor;

        return $this;
    }

    public function getRokWydania(): ?int
    {
        return $this->rok_wydania;
    }

    public function setRokWydania(int $rok_wydania): static
    {
        $this->rok_wydania = $rok_wydania;

        return $this;
    }

    public function getOpis(): ?string
    {
        return $this->opis;
    }

    public function setOpis(string $opis): static
    {
        $this->opis = $opis;

        return $this;
    }
}
