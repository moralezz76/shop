<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $fillable = [
        'title', 'ptype', 'description', 'price', 'attributes', 'imageUrl'
    ];

    protected $hidden = ['created_at', 'updated_at', 'user_id'];
}
