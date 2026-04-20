<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Child extends Model
{
    use HasFactory;

    protected $fillable = [
        'mother_user_id', 'name', 'sex', 'birth_date', 'birth_weight'
    ];

    public function mother()
    {
        return $this->belongsTo(User::class, 'mother_user_id');
    }

    public function vaccinations()
    {
        return $this->hasMany(Vaccination::class);
    }

    public function measurements()
    {
        return $this->hasMany(ChildMeasurement::class);
    }
}
