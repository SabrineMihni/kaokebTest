<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $meetings = Meeting::all();
        return response()->json($meetings);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $meeting = new Meeting([
            'place' => $request->get('place'),
            'subject' => $request->get('subject'),
            'synthesis' => $request->get('subject'),
            'began_at' => $request->get('began_at'),
            'finished_at' => $request->get('finished_at')
        ]);
        $meeting->save();
        return response()->json('Successfully added', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Meeting  $meeting
     * @return \Illuminate\Http\Response
     */
    public function show(Meeting $meeting)
    {
        return response()->json($meeting, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Meeting  $meeting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Meeting $meeting)
    {
        $meeting->place = $request->get('name');
        $meeting->subject = $request->get('subject');
        $meeting->synthesis = $request->get('synthesis');
        $meeting->began_at = $request->get('began_at');
        $meeting->finished_at = $request->get('finished_at');
        $meeting->save();

        return response()->json('Successfully Updated', 200);
    }

    /**
     * @param Meeting $meeting
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Meeting $meeting)
    {
        $meeting->delete();

        return response()->json('Successfully Deleted', 204);
    }
}
