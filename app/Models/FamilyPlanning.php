<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamilyPlanning extends Model
{
    use HasFactory;

    protected $table = 'family_planning';

    protected $fillable = [
        'mother_user_id',
        'q1',
        'q2',
        'family_planning_method',
        'q3',
        'q4',
        'q5',
    ];

    public function mother()
    {
        return $this->belongsTo(User::class, 'mother_user_id');
    }
}
