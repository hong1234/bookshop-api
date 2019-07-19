<?php
// api/src/Entity/Post.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * A review of a book.
 *
 * @ORM\Entity
 * @ApiResource
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "title": "partial", "searchkeys": "partial", "body": "partial"})
 */
class Post
{
    /**
     * @var int The id of this review.
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string The title of the post.
     *
     * @ORM\Column
     * @Assert\NotBlank
     */
    public $title;

    /**
     * @var string The keys of the post.
     *
     * @ORM\Column
     * @Assert\NotBlank
     */
    public $searchkeys;

    /**
     * @var string the body of the post.
     *
     * @ORM\Column(type="text")
     * @Assert\NotBlank
     */
    public $body;

    /**
     * @var decimal The price of the post.
     *
     * @ORM\Column(type="decimal", precision=8, scale=2)
     * @Assert\NotBlank
     */
    public $price;

    /**
     * @var string The title of the post.
     *
     * @ORM\Column
     * @Assert\NotBlank
     */
    public $image;

    public function getId(): ?int
    {
        return $this->id;
    }
}
