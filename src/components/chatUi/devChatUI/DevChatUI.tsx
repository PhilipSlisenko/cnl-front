import ChatUI from "@/components/chatUi/chatUi";
import { Button } from "@/components/ui/button";

// ChatUIAndDebugWindow
export default function DevChatUI() {
  return (
    <div className="h-full flex container justify-center gap-4">
      <div className="h-full flex flex-col w-[400px] border rounded-lg">
        <div className="p-4">
          <Button className="w-full">New Conversation</Button>
        </div>
        <div className="grow rounded-t-lg border-t overflow-hidden">
          <ChatUI history={[]}></ChatUI>
        </div>
      </div>
      <div className="w-[400px] border rounded-lg">Debug window</div>
    </div>
  );
}
