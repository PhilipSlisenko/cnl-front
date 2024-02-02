import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";

export function GrayButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseClassName =
    "rounded-md border bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-2 text-sm font-semibold";
  return <button className={clsx(baseClassName, className)} {...props} />;
}

export default function FeedbackModal({
  onClose,
}: {
  onClose: ({}: { status: "success" | "cancel"; content: string }) => any;
}) {
  const [feedback, setFeedback] = useState<string>("");
  const onFeedbackSave = (feedback: string) => {
    setFeedback(feedback);
  };

  return (
    <div
      className="absolute bottom-0 end-0 start-0 top-0 z-10 flex flex-col justify-center overflow-y-auto bg-gray-50 bg-opacity-10 backdrop-blur-sm"
      onClick={() => onClose({ status: "cancel", content: "" })}
    >
      {" "}
      // backdrop
      <div
        className="shadow my-2 w-11/12 max-w-4xl shrink -translate-y-12 rounded-lg bg-white p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-0.5">
          <button
            onClick={() => onClose({ status: "cancel", content: "" })}
            className="float-right -m-1 rounded-md p-2 text-xl font-semibold hover:bg-slate-100"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-medium text-gray-900">Feedback</h2>
        </div>
        <div className="no-scrollbar  overflow-scroll px-0.5">
          <textarea
            placeholder="Share additional feedback"
            className="mt-3.5 w-full rounded-md focus:border-gray-700 focus:outline-none focus:ring-gray-200"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <div className="mt-1.5">
            <GrayButton
              onClick={() => onClose({ status: "success", content: feedback })}
            >
              Submit
            </GrayButton>
          </div>
        </div>
      </div>
    </div>
  );
}
