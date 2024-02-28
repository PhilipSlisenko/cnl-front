"use client";

import { cn } from "@/lib/utils";
import { Dataset, DatasetSampleMessage, Role } from "@/types/datasetsSamples";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  Loader2Icon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface MessageInEditor extends DatasetSampleMessage {
  messageId: string;
}

export function DataSampleEditorDialogContent({
  initialMessages,
  onClose,
}: {
  initialMessages: DatasetSampleMessage[];
  onClose: ({}: {
    status: "save" | "cancel";
    content: DatasetSampleMessage[];
  }) => any;
}) {
  const [messages, setMessages] = useState(initialMessages);

  return (
    <div>
      <DataSampleMessagesEditor
        initialMessages={messages}
        onChange={(newMessages: DatasetSampleMessage[]) =>
          setMessages(newMessages)
        }
      />
      <DataSammpleSaveControls
        onClose={({ status }) => {
          if (status === "save") {
            onClose({ status: "save", content: messages });
          }
          if (status === "cancel") {
            onClose({ status: "cancel", content: [] });
          }
        }}
      />
    </div>
  );
}

export function DataSampleEditorWithDatasetChoiceDialogContent({
  initialMessages,
  datasets,
  onClose,
}: {
  initialMessages: DatasetSampleMessage[];
  datasets: Dataset[];
  onClose: ({}: {
    status: "save" | "cancel";
    datasetId: string;
    content: DatasetSampleMessage[];
  }) => any;
}) {
  const [messages, setMessages] = useState(initialMessages);

  return (
    <div className="space-y-4">
      <DataSampleMessagesEditor
        initialMessages={messages}
        onChange={(newMessages: DatasetSampleMessage[]) =>
          setMessages(newMessages)
        }
      />
      <DataSammpleSaveToDatasetControls
        datasets={datasets || []}
        onClose={({ status, datasetId }) => {
          if (status === "save") {
            onClose({ status: "save", datasetId, content: messages });
          }
          if (status === "cancel") {
            onClose({ status: "cancel", datasetId, content: [] });
          }
        }}
      />
    </div>
  );
}

export function DataSampleMessagesEditor({
  initialMessages,
  onChange,
  allowEdit = true,
}: {
  initialMessages: DatasetSampleMessage[];
  onChange: Function;
  allowEdit?: boolean;
}) {
  const [formState, setFormState] = useState<MessageInEditor[]>(
    initialMessages.map((message) => ({ ...message, messageId: v4() }))
  );

  useEffect(() => {
    // update for outside
    onChange(formState);
  }, [formState]);

  const onContentChange = ({
    messageId,
    newContent,
  }: {
    messageId: string;
    newContent: string;
  }) => {
    setFormState((prevFormState) => {
      const newMessages = prevFormState.map((message) => {
        if (message.messageId === messageId) {
          return { ...message, content: newContent };
        }
        return message;
      });
      return newMessages;
    });
  };

  const onRoleChange = ({
    messageId,
    newRole,
  }: {
    messageId: string;
    newRole: Role;
  }) => {
    setFormState((prevFormState) => {
      const newMessages = prevFormState.map((message) => {
        if (message.messageId === messageId) {
          return { ...message, role: newRole };
        }
        return message;
      });
      return newMessages;
    });
  };

  const onAddMessage = ({ afterMessageId }: { afterMessageId: string }) => {
    // afterMessageId - id of a message after which to insert a blank new message
    setFormState((prevFormState) => {
      const newMessage: MessageInEditor = {
        role: "assistant",
        content: "",
        messageId: v4(),
      };
      if (afterMessageId === "") {
        // no messages exist. this is the first one
        return [newMessage];
      }
      let newMessages: MessageInEditor[] = [];
      for (let message of prevFormState) {
        newMessages.push(message);
        if (message.messageId === afterMessageId) {
          newMessages.push(newMessage);
        }
      }
      return newMessages;
    });
  };

  const onDeleteMessage = ({ messageId }: { messageId: string }) => {
    setFormState((prevFormState) => {
      return prevFormState.filter(
        (message) => !(message.messageId === messageId)
      );
    });
  };

  return (
    <>
      {formState.length !== 0 ? (
        formState.map((message, index) => {
          return (
            <div className="flex flex-col gap-2" key={message.messageId}>
              <div className="flex items-center justify-between gap-2">
                {/* <p className="text-sm">Role:</p> */}
                <Select
                  value={message.role}
                  onValueChange={(value) =>
                    onRoleChange({
                      messageId: message.messageId,
                      newRole: value as Role,
                    })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() =>
                    onDeleteMessage({ messageId: message.messageId })
                  }
                >
                  <TrashIcon className="size-4" />
                </Button>
              </div>
              <div>
                {/* <p className="text-sm">Content:</p> */}
                <Textarea
                  rows={3}
                  value={message.content}
                  onChange={(e) =>
                    onContentChange({
                      messageId: message.messageId,
                      newContent: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <Button
                    variant="ghost"
                    className="bg-background"
                    onClick={() => {
                      onAddMessage({ afterMessageId: message.messageId });
                    }}
                  >
                    <PlusIcon className="mr-2 size-5" />
                    Add message
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <Button
              variant="ghost"
              className="bg-background"
              onClick={() => {
                onAddMessage({ afterMessageId: "" });
              }}
            >
              <PlusIcon className="mr-2 size-5" />
              Add message
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export function DataSammpleSaveControls({
  onClose,
}: {
  onClose: ({ status }: { status: "save" | "cancel" }) => any;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="mt-4 flex justify-center gap-2">
      <Button variant="secondary" onClick={() => onClose({ status: "cancel" })}>
        Cancel
      </Button>
      {!loading ? (
        <Button
          onClick={() => {
            onClose({ status: "save" });
            setLoading(true);
          }}
        >
          Save
        </Button>
      ) : (
        <Button disabled>
          <Loader2Icon className="size-5 mr-2 animate-spin" />
          Save
        </Button>
      )}
    </div>
  );
}

export function DataSammpleSaveToDatasetControls({
  datasets,
  onClose,
}: {
  datasets: Dataset[];
  onClose: ({}: { status: "save" | "cancel"; datasetId: string }) => any;
}) {
  // DatasetPicker
  const [datasetId, setDatasetId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div>
        <Label className="mr-2">Save to dataset:</Label>
        <DatasetPickerCombobox
          datasets={datasets}
          onChange={({ datasetId }) => {
            setDatasetId(datasetId);
          }}
        />
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <Button
          variant="secondary"
          onClick={() => onClose({ status: "cancel", datasetId: "" })}
        >
          Cancel
        </Button>

        {!loading ? (
          <Button
            onClick={() => {
              onClose({ status: "save", datasetId: datasetId as string });
              setLoading(true);
            }}
          >
            Save
          </Button>
        ) : (
          <Button disabled>
            <Loader2Icon className="size-5 mr-2 animate-spin" />
            Save
          </Button>
        )}
      </div>
    </div>
  );
}

export function DatasetPickerCombobox({
  datasets,
  onChange,
}: {
  datasets: Dataset[];
  onChange: ({ datasetId }: { datasetId: string }) => any;
}) {
  const [open, setOpen] = useState(false); // select open
  const [value, setValue] = useState<string | null>(null); // datasetId of selected dataset

  const displayItems = datasets.map((dataset) => ({
    value: dataset.dataset_id,
    label: dataset.dataset_name,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? displayItems.find((displayItem) => displayItem.value === value)
                ?.label
            : "Select dataset..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0 overflow-y-auto"
        style={{ maxHeight: "var(--radix-popover-content-available-height)" }}
      >
        <Command
          filter={(value, search) => {
            const label = displayItems.find((item) => item.value === value)
              ?.label as string;
            if (label.toLowerCase().includes(search.toLowerCase())) return 1;
            return 0;
          }}
        >
          <CommandInput placeholder="Search dataset..." />
          <CommandEmpty>No dataset found.</CommandEmpty>
          <CommandGroup
          // className="max-h-[600px] overflow-y-auto"
          >
            {displayItems.map((displayItem) => {
              const delimiters = /[\s-_]+/;
              const keywords = displayItem.label.split(delimiters);
              console.log(keywords);
              return (
                <CommandItem
                  key={displayItem.value}
                  value={displayItem.value}
                  onSelect={() => {
                    setValue(displayItem.value);
                    setOpen(false);
                    onChange({ datasetId: displayItem.value });
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === displayItem.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {displayItem.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
