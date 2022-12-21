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
            'start_date' => $this->start_date->format('Y-m-d'),
            'end_date' => $this->end_date->format('Y-m-d'),
            'duration' => $this->duration,
            'status' => $this->status,
        ];
    }
}
