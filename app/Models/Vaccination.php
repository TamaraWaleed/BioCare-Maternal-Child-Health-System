<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccination extends Model
{
    use HasFactory;

    protected $fillable = [
        'child_id', 'vaccine_name', 'scheduled_date', 
        'administered_date', 'batch_number', 'administered_by_user_id'
    ];

    public function child()
    {
        return $this->belongsTo(Child::class);
    }

    public function administrator()
    {
        return $this->belongsTo(User::class, 'administered_by_user_id');
    }
}
