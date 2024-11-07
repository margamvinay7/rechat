"use client";

import { X, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VideoCall({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-semibold">Video Call with Alice Johnson</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="aspect-video bg-gray-900 relative">
          <video className="w-full h-full object-cover" />
          <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden">
            <video className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="p-4 flex justify-center space-x-4">
          <Button variant="outline" size="icon">
            <Mic className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="destructive" onClick={onClose}>
            End Call
          </Button>
        </div>
      </div>
    </div>
  );
}
