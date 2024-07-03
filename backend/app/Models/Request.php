<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_on', 'location', 'service', 'status', 'priority', 'department', 'requested_by', 'assigned_to'
    ];
}
