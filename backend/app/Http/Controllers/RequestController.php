<?php

namespace App\Http\Controllers;

use App\Models\Request;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

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

    public function update(HttpRequest $request, $id)
    {
        $requestItem = Request::findOrFail($id); // Fetch the Request model instance

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

    public function getStatusCounts()
    {
        // Get counts for existing statuses directly from the database
        $counts = Request::select(DB::raw('status, count(*) as count'))
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status')
            ->toArray();
    
        // Ensure all status keys are present, even if their count is zero
        $allStatuses = ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'REJECTED', 'CANCELLED'];
        $statusCounts = array_merge(array_fill_keys($allStatuses, 0), $counts);
    
        return response()->json($statusCounts);
    }
    
}
