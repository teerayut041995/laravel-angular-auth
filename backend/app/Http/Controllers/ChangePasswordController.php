<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ChangePasswordRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use App\User;
use DB;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request) {
        return $this->getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : 
        $this->tokenNotFoundResponse();
        //return $request->all();
    }

    private function getPasswordResetTableRow($request){
        return DB::table('password_resets')
            ->where(['email' => $request->email , 'token' => $request->token]);
    }

    private function tokenNotFoundResponse(){
        return response()->json([
            'error' => 'Token or Email is incorrect'
        ] , Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function changePassword($request){
        $user = User::whereEmail($request->email)->first();
        $user->update([
            'password' => Hash::make($request->password)
            ]);
        $this->getPasswordResetTableRow($request)->delete();
        return response()->json([
                'data' => 'Password Successfully change.'
            ] , Response::HTTP_CREATED);
    }
}
