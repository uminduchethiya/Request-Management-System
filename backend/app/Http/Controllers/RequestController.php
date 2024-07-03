<?php

namespace App\Http\Controllers;

use App\Models\Request;
use Illuminate\Routing\Controller;

class RequestController extends Controller
{
    public function index()
    {
        $requests = Request::all();
        return response()->json($requests);
    }
}
