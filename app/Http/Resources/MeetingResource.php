<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MeetingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'place' => $this->place,
            'subject' => $this->subject,
            'synthesis' => $this->synthesis,
            'began_at' => $this->began_at,
            'finished_at' => $this->finished_at,
            'members' => $this->members

        ];
    }
}
