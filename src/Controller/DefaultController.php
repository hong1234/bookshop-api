<?php
/**
 * quick_tour - DefaultController.php
 *
 * Initial version by: hong
 * Initial version created on: 4/21/19
 */

namespace App\Controller;

use App\Entity\Post;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DefaultController extends AbstractController
{
    /**
     * @Route("/shop")
     */
    public function shopSearch()
    {
        return $this->render('default/shop.html.twig', [
            //'name' => $name,
        ]);
    }

    /**
     * @Route("/admin")
     */
    public function shopAdmin()
    {
        return $this->render('default/admin.html.twig', [
            //'name' => $name,
        ]);
    }

    /**
     * @Route("/admin/list1")
     */
    public function todoEncore()
    {
        return $this->render('default/todo.html.twig', [
            //'name' => $name,
        ]);
    }

    /**
    * @Route("/admin/add1")
    */
    public function addProduct()
    {
        return $this->render('default/add.html.twig', [
            //'name' => $name,
        ]);
    }

    /**
    * @Route("/products/create", methods="POST")
    */
    public function createProducts(Request $request)
    {
        
        if($_FILES['avatar'])
        {
            $avatar_name = $_FILES["avatar"]["name"];
            $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
            $error = $_FILES["avatar"]["error"];

            if($error > 0){
                $response = array(
                    "status" => "error",
                    "error" => true,
                    "message" => "Error uploading the file!"
                );
            }else
            {
                $entityManager = $this->getDoctrine()->getManager();

                $post = new Post();
                $post->setTitle($request->get('title'));
                $post->setSearchkeys($request->get('searchkeys'));
                $post->setBody($request->get('body'));
                $post->setPrice($request->get('price'));
                $post->setImage($avatar_name);

                // tell Doctrine you want to (eventually) save the Product (no queries yet)
                $entityManager->persist($post);

                // actually executes the queries (i.e. the INSERT query)
                $entityManager->flush();

                $response = array(
                  "status" => "success",
                  //"error" => false,
                  //"message" => "File uploaded successfully",
                  "title" => $request->get('title'),
                  "searchkeys" => $request->get('searchkeys'),
                  "body" => $request->get('body'),
                  "price" => $request->get('price'),
                  "image" => $avatar_name
                );

                $uploads_dir = 'image/';
                move_uploaded_file($avatar_tmp_name, "$uploads_dir/$avatar_name");

                // $random_name = rand(1000,1000000)."-".$avatar_name;
                // $upload_name = $upload_dir.strtolower($random_name);
                // $upload_name = preg_replace('/\s+/', '-', $upload_name);
                //
                // if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
                //     $response = array(
                //         "status" => "success",
                //         "error" => false,
                //         "message" => "File uploaded successfully",
                //         "url" => $server_url."/".$upload_name
                //       );
                // }else
                // {
                //     $response = array(
                //         "status" => "error",
                //         "error" => true,
                //         "message" => "Error uploading the file!"
                //     );
                // }
            }

        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "No file was sent!"
            );
        }

        //echo json_encode($response);
        return new JsonResponse($response);
    }

}
