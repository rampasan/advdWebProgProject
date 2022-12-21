<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:100|unique:projects,title,'.$this->id,
            'student_id' => 'required|string|unique:projects,student_id,'.$this->id,
            'supervisor_id' => 'required',
            'examiner1_id' => 'required',
            'examiner2_id' => 'required',
        ];
    }
}
