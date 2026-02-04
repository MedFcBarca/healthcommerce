<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;

final class OrderProcessor implements ProcessorInterface
{
    public function __construct(private EntityManagerInterface $em) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if (!$data instanceof Order) {
            return $data;
        }

        $sum = 0;
        foreach ($data->getItems() as $item) {
            $item->setOrderRef($data);
            $sum += $item->getQty() * $item->getPrice();
        }

        $data->setTotal($sum);

        $this->em->persist($data);
        $this->em->flush();

        return $data;
    }
}
