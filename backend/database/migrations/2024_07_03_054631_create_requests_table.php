<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->date('created_on');
            $table->string('location');
            $table->string('service');
            $table->enum('status', ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'REJECTED', 'CANCELLED']);
            $table->enum('priority', ['HIGH', 'MEDIUM', 'LOW']);
            $table->string('department');
            $table->string('requested_by');
            $table->string('assigned_to')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
