<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AntenatalRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_id', 'weight', 'blood_pressure', 
        'urine_test', 'remarks',
        'oedema', 'urine_alb', 'urine_sug', 'fetal_heartbeat',
        'gestational_age_date', 'gestational_age_size', 
        'presentation', 'complaint_management', 
        'supplements'
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }
}
