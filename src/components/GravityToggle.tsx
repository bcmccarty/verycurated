
import { useState } from "react";
import { Switch } from "./ui/switch";
import { Rocket } from "lucide-react";

interface GravityToggleProps {
  onToggle: (enabled: boolean) => void;
  enabled: boolean;
}

export function GravityToggle({ onToggle, enabled }: GravityToggleProps) {
  const handleToggle = (checked: boolean) => {
    console.log('Gravity toggle clicked:', checked);
    onToggle(checked);
  };

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-full px-4 py-2 shadow-md">
      <Rocket className={`h-5 w-5 transition-colors ${enabled ? 'text-blue-600' : 'text-gray-400'}`} />
      <span className="text-sm font-medium">Zero G</span>
      <Switch
        checked={enabled}
        onCheckedChange={handleToggle}
      />
    </div>
  );
}
