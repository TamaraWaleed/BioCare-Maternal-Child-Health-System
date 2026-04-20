<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MotherProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'birth_date', 'blood_group', 'rh_factor',
        'husband_name', 'phone', 'city', 'husband_id_number',
        'maternity_center', 'country', 'health_center_phone', 'photo_path'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
