<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeetingMemberTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meeting_member', function (Blueprint $table) {

            $table->integer('member_id')->unsigned()->nullable();
            $table->foreign('member_id')->references('id')
                ->on('members')->onDelete('cascade');

            $table->integer('meeting_id')->unsigned()->nullable();
            $table->foreign('meeting_id')->references('id')
                ->on('meetings')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meeting_member');
    }
}
