<?php
/**
 * quick_tour - DefaultController.php
 *
 * Initial version by: hong
 * Initial version created on: 4/21/19
 */

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DefaultController extends AbstractController
{

    /**
     * @Route("/todo")
     */
    public function todo4Test()
    {
        return $this->render('default/index.html.twig', [
            //'name' => $name,
        ]);
    }

    /**
     * @Route("/todo2")
     */
    public function todoEncore()
    {
        return $this->render('default/todo.html.twig', [
            //'name' => $name,
        ]);
    }

    /**
     * @Route("/search")
     */
    public function todoSearch()
    {
        return $this->render('default/search.html.twig', [
            //'name' => $name,
        ]);
    }

}
