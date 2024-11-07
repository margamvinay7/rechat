"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function NotificationPopover() {
  const notifications = [
    { id: 1, content: "'Alice sent you a message'", time: "'5 min ago'" },
    { id: 2, content: "'Bob started a video call'", time: "'1 hour ago'" },
    { id: 3, content: "'Charlie shared a file'", time: "'2 hours ago'" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h3 className="font-semibold">Notifications</h3>
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <div>
                <p className="text-sm">{notification.content}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
