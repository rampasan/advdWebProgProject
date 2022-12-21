<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'student_id',
        'supervisor_id',
        'examiner1_id',
        'examiner2_id',
        'start_date',
        'end_date',
        'duration',
        'status',
    ];
}
