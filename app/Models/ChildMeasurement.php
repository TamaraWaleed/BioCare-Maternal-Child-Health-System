<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChildMeasurement extends Model
{
    use HasFactory;

    protected $fillable = [
        'child_id', 'record_date', 'weight', 'height', 
        'head_circumference', 'notes'
    ];

    public function child()
    {
        return $this->belongsTo(Child::class);
    }
}
