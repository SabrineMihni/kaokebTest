<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $members = Member::all();
        return response()->json($members, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $member = new Member([
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'email' => $request->get('email'),
            'phone' => $request->get('phone'),
            'position' => $request->get('position')
        ]);

        $member->save();

        return response()->json('Successfully added', 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Member $member
     * @return \Illuminate\Http\Response
     */
    public function show(Member $member)
    {
        return response()->json($member, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Member $member
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Member $member)
    {
        $member->first_name = $request->get('first_name');
        $member->last_name = $request->get('last_name');
        $member->phone = $request->get('phone');
        $member->email = $request->get('email');
        $member->position = $request->get('position');
        $member->save();

        return response()->json('Successfully Updated', 200);
    }

    /**
     * @param Member $member
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Member $member)
    {
        $member->delete();

        return response()->json('Successfully Deleted', 204);
    }
}
