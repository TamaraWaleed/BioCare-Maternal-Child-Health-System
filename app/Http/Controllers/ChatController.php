<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        // Get all users except current user
        // We might want to filter this based on role? e.g. Mother sees Doctors, Doctors see Mothers/Admins
        // For now, list everyone
        $users = User::where('id', '!=', Auth::id())->get();
        return Inertia::render('Chat/Index', [
            'users' => $users
        ]);
    }

    public function show(User $user)
    {
        // Mark messages as read
        Message::where('sender_id', $user->id)
            ->where('receiver_id', Auth::id())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        // Fetch conversation
        $messages = Message::where(function ($query) use ($user) {
            $query->where('sender_id', Auth::id())
                  ->where('receiver_id', $user->id);
        })->orWhere(function ($query) use ($user) {
            $query->where('sender_id', $user->id)
                  ->where('receiver_id', Auth::id());
        })
        ->orderBy('created_at', 'asc')
        ->get();

        return Inertia::render('Chat/Show', [
            'friend' => $user,
            'messages' => $messages
        ]);
    }

    public function unreadCount()
    {
        $count = Message::where('receiver_id', Auth::id())
            ->whereNull('read_at')
            ->count();

        return response()->json(['count' => $count]);
    }

    public function recentNotifications()
    {
        $notifications = Message::with('sender')
            ->where('receiver_id', Auth::id())
            ->whereNull('read_at')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($message) {
                return [
                    'id' => $message->id,
                    'sender_name' => $message->sender ? $message->sender->name : 'System',
                    'sender_id' => $message->sender_id,
                    'content' => str($message->content)->limit(40),
                    'url' => $message->url,
                    'created_at' => $message->created_at->diffForHumans(),
                ];
            });

        return response()->json(['notifications' => $notifications]);
    }

    public function markAsRead(Message $message)
    {
        if ($message->receiver_id === Auth::id()) {
            $message->update(['read_at' => now()]);
        }

        return response()->json(['success' => true]);
    }

    public function store(Request $request, User $user)
    {
        $request->validate([
            'content' => 'required|string'
        ]);

        Message::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $user->id,
            'content' => $request->input('content')
        ]);

        return back();
    }
}
