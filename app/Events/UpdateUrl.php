<?php

namespace App\Events;

use App\Models\Search;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UpdateUrl implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $search;

    public $broadcastQueue = 'notification';

    /**
     * Create a new event instance.
     */
    public function __construct(Search $search)
    {
        $this->search = $search;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('url'),
        ];
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return [
            'urls' => $this->search->urls,
        ];
    }
}
