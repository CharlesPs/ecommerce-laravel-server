<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->integer('cart_id');
            $table->float('subtotal');
            $table->float('total');
            $table->string('pay_method');
            $table->timestamp('pay_date');
            $table->boolean('paid')->default(0);
            $table->boolean('delivering')->default(0);
            $table->boolean('delivered')->default(0);
            $table->boolean('cancel_requested')->default(0);
            $table->boolean('canceled')->default(0);
            $table->string('cancel_reason');
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
        Schema::dropIfExists('purchases');
    }
}
