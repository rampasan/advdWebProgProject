<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Student;
use App\Models\User;

class Project extends Model
{
    use HasFactory;
    protected $table = 'projects';
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

    protected $with =['projectStudent', 'projectSupervisor', 'projectExaminer1', 'projectExaminer2'];
    public function projectStudent()
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }

    public function projectSupervisor()
    {
        return $this->belongsTo(User::class, 'supervisor_id', 'id');
    }

    public function projectExaminer1()
    {
        return $this->belongsTo(User::class, 'examiner1_id', 'id');
    }

    public function projectExaminer2()
    {
        return $this->belongsTo(User::class, 'examiner2_id', 'id');
    }
}
