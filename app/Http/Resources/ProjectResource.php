<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'student_id' => $this->student_id,
            'supervisor_id' => $this->supervisor_id,
            'examiner1_id' => $this->examiner1_id,
            'examiner2_id' => $this->examiner2_id,
            'start_date' => $this->start_date ?? '',
            'end_date' => $this->end_date ?? '',
            'duration' => $this->duration ?? '',
            'status' => $this->status ?? '',
            'projectStudent' => [
                'student_id' => $this->projectStudent->student_id,
                'name' => $this->projectStudent->name,
                'course' => $this->projectStudent->course,
            ],
            'projectSupervisor' => [
                'id' => $this->projectSupervisor->id,
                'name' => $this->projectSupervisor->name,
            ],
            'projectExaminer1' => [
                'id' => $this->projectExaminer1->id,
                'name' => $this->projectExaminer1->name,
            ],
            'projectExaminer2' => [
                'id' => $this->projectExaminer2->id,
                'name' => $this->projectExaminer2->name,
            ],
        ];
    }
}
