<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'mother_user_id', 'doctor_user_id', 'appointment_date', 
        'status', 'notes'
    ];

    public function mother()
    {
        return $this->belongsTo(User::class, 'mother_user_id');
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_user_id');
    }

    public function antenatalRecord()
    {
        return $this->hasOne(AntenatalRecord::class);
    }
}
