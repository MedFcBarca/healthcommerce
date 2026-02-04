<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiProperty;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['order:read']],
    denormalizationContext: ['groups' => ['order:write']]
)]
class OrderItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['order:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[ApiProperty(writableLink: true)] 
    #[Groups(['order:read', 'order:write'])]
    private ?Product $product = null;

    #[ORM\ManyToOne(inversedBy: 'items')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Order $orderRef = null;

    #[ORM\Column]
    #[Groups(['order:read', 'order:write'])]
    private int $price = 0;

    #[ORM\Column]
    #[Groups(['order:read', 'order:write'])]
    private int $qty = 1;

    public function getId(): ?int { return $this->id; }

    public function getProduct(): ?Product { return $this->product; }
    public function setProduct(?Product $product): static
    {
        $this->product = $product;
        return $this;
    }

    public function getOrderRef(): ?Order { return $this->orderRef; }
    public function setOrderRef(?Order $order): static
    {
        $this->orderRef = $order;
        return $this;
    }

    public function getPrice(): int { return $this->price; }
    public function setPrice(int $price): static
    {
        $this->price = $price;
        return $this;
    }

    public function getQty(): int { return $this->qty; }
    public function setQty(int $qty): static
    {
        $this->qty = $qty;
        return $this;
    }
}
