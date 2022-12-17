<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->string('student_id')->unique();
            $table->foreign('student_id')->references('student_id')->on('students');
            $table->foreignId('supervisor_id')->references('id')->on('users');
            $table->foreignId('examiner1_id')->references('id')->on('users');
            $table->foreignId('examiner2_id')->references('id')->on('users');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('duration')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
