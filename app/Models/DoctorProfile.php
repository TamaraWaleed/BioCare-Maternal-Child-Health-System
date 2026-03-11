<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorProfile extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'specialty', 'phone', 'city', 'photo_path'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
