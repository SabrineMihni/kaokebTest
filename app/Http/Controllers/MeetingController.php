<?php

namespace App\Http\Controllers;

use App\Http\Resources\MeetingResource;
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
        return response()->json(MeetingResource::collection($meetings));
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
            'began_at' => date_format(new \DateTime($request->get('began_at')), 'Y-m-d H:i:s'),
            'finished_at' => date_format(new \DateTime($request->get('finished_at')), 'Y-m-d H:i:s')
        ]);
        $meeting->save();
        $members = $request->get('members');
        if($members) {
            $membersId = array_column($members, 'id');
            $meeting->members()->sync(array_values($membersId));
        }
        return response()->json(new MeetingResource($meeting), 201);
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
        $meeting->place = $request->get('place');
        $meeting->subject = $request->get('subject');
        $meeting->synthesis = $request->get('synthesis');
        $meeting->began_at = $request->get('began_at');
        $meeting->finished_at = $request->get('finished_at');
        $meeting->save();

        $members = $request->get('members');
        if($members) {
            $membersId = array_column($members, 'id');
            $meeting->members()->sync(array_values($membersId));
        }

        return response()->json(new MeetingResource($meeting), 200);
    }

    /**
     * @param Meeting $meeting
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Meeting $meeting)
    {
        $meeting->members()->detach();
        $meeting->delete();

        return response()->json('Successfully Deleted', 204);
    }
}
