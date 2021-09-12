<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    //

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'token', 'hashed_password', 'ip'
    ];

    public function user()
    {
        return $this->belongsTo(user::class, 'user_id');
    }
}
