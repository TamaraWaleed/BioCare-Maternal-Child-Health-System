<?php

namespace App\Traits;

use App\Models\User;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

trait CanNotifyUsers
{
    /**
     * Dispatch a notification message to all users with a specific role.
     *
     * @param string $role
     * @param string $content
     * @param string|null $url
     * @return void
     */
    public function notifyRole(string $role, string $content, string $url = null)
    {
        $users = User::where('role', $role)->where('IsActive', true)->get();
        $this->sendMessagesTo($users, $content, $url);
    }

    /**
     * Dispatch a notification message to a specific user.
     *
     * @param int|User $userOrId
     * @param string $content
     * @param string|null $url
     * @return void
     */
    public function notifyUser($userOrId, string $content, string $url = null)
    {
        if (is_numeric($userOrId)) {
            $user = User::where('id', $userOrId)->where('IsActive', true)->first();
        } else {
            $user = $userOrId;
        }

        if ($user && $user->IsActive) {
            $this->sendMessagesTo(collect([$user]), $content, $url);
        }
    }

    /**
     * Alias for notifyRole('nurse', ...) for backward compatibility.
     *
     * @param string $content
     * @param string|null $url
     * @return void
     */
    public function notifyNurses(string $content, string $url = null)
    {
        $this->notifyRole('nurse', $content, $url);
    }

    /**
     * Internal helper to create message records.
     *
     * @param \Illuminate\Support\Collection $users
     * @param string $content
     * @param string|null $url
     * @return void
     */
    protected function sendMessagesTo($users, string $content, string $url = null)
    {
        $senderId = Auth::check() ? Auth::id() : 1;

        foreach ($users as $user) {
            Message::create([
                'sender_id' => $senderId,
                'receiver_id' => $user->id,
                'content' => $content,
                'url' => $url
            ]);
        }
    }
}
