<?php

namespace App\Http\Controllers;

use App\Models\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Http\Response;

class RequestController extends Controller
{
    public function index()
    {
        $requests = Request::all();
        return response()->json($requests);
    }

    public function destroy($id)
    {
        $request = Request::findOrFail($id);
        $request->delete();

        return response()->json(['message' => 'Request deleted successfully']);
    }

    public function store(HttpRequest $request)
    {
        $validated = $request->validate([
            'created_on' => 'required|date',
            'location' => 'required|string|max:255',
            'service' => 'required|string|max:255',
            'status' => 'required|string|in:NEW,IN_PROGRESS,ON_HOLD,REJECTED,CANCELLED',
            'priority' => 'required|string|in:HIGH,MEDIUM,LOW',
            'department' => 'required|string|max:255',
            'requested_by' => 'required|string|max:255',
            'assigned_to' => 'nullable|string|max:255',
        ]);

        $newRequest = Request::create($validated);
        return response()->json($newRequest, Response::HTTP_CREATED);
    }

    public function update(HttpRequest $request, Request $requestItem)
    {
        $validated = $request->validate([
            'created_on' => 'required|date',
            'location' => 'required|string',
            'service' => 'required|string',
            'status' => 'required|in:NEW,IN_PROGRESS,ON_HOLD,REJECTED,CANCELLED',
            'priority' => 'required|in:HIGH,MEDIUM,LOW',
            'department' => 'required|string',
            'requested_by' => 'required|string',
            'assigned_to' => 'nullable|string',
        ]);

        $requestItem->update($validated);

        return response()->json($requestItem);
    }
}
