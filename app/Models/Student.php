<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;

class Student extends Model
{
    use HasFactory;
    protected $fillable = [
        'student_id',
        'name',
        'course',
    ];

    public function Student()
    {
        $this->hasOne('App\Models\Project', 'student_id', 'student_id');
    }
}
