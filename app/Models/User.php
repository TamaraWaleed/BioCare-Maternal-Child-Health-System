<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    //Attributes that are mass assignable
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    //Attributes that should be hidden for serialization
    protected $hidden = [
        'password',
    ];

    //Get the attributes that should be cast
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function doctorProfile()
    {
        return $this->hasOne(DoctorProfile::class);
    }

    public function nurseProfile()
    {
        return $this->hasOne(NurseProfile::class);
    }

    public function motherProfile()
    {
        return $this->hasOne(MotherProfile::class);
    }

    public function children()
    {
        return $this->hasMany(Child::class, 'mother_user_id');
    }

    public function getRememberTokenName()
    {
        return '';
    }
}
