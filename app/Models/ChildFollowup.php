<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChildFollowup extends Model
{
    use HasFactory;

    protected $table = 'child_followup_referred';

    protected $fillable = [
        'child_id',
        'date',
        'illness_problem',
        'treatment',
        'notes',
        'doctor_user_id',
    ];

    public function child()
    {
        return $this->belongsTo(Child::class);
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_user_id');
    }
}
