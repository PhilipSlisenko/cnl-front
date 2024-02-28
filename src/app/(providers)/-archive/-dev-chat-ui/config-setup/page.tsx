"use client";
import { EngineConnectionConfig } from "@/components/app/dev-chat-ui/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const ENGINE_CONNECTION_CONFIG_LOCAL_STORAGE_KEY =
  "dev-chat-ui-engine-connection-config";

function getEmptyEngineConnectionConfigObject(): EngineConnectionConfig {
  return {
    engineUrl: "",
  };
}

function getEngineConnectionConfigFromLocalStorage(): EngineConnectionConfig | null {
  const configStr = localStorage.getItem(
    ENGINE_CONNECTION_CONFIG_LOCAL_STORAGE_KEY
  );
  if (configStr) {
    try {
      const configObj = JSON.parse(configStr);
      return configObj;
    } catch (e) {
      console.error("Parsing error:", e);
      return null;
    }
  } else {
    return null;
  }
}

function saveEngineConnectionConfigToLocalStorage(
  config: EngineConnectionConfig
) {
  localStorage.setItem(
    ENGINE_CONNECTION_CONFIG_LOCAL_STORAGE_KEY,
    JSON.stringify(config)
  );
}

function checkEngineConfigIsFine(config: EngineConnectionConfig) {
  // request to health check
  return false;
}

function ConfigFillerOrChatShower() {
  type State = "pre" | "config-missing" | "chatting";
  const [state, setState] = useState<State>("pre");
  const [engineConnectionConfig, setEngineConnectionConfig] =
    useState<EngineConnectionConfig>({} as EngineConnectionConfig);

  useEffect(() => {
    let config = getEngineConnectionConfigFromLocalStorage();
    if (config === null) {
      config = getEmptyEngineConnectionConfigObject();
      setEngineConnectionConfig(config);
      setState("config-missing");
      return;
    }
    if (checkEngineConfigIsFine(config)) {
      setState("chatting");
      return;
    }
  }, []);

  if (state === "config-missing") {
    return (
      <EngineConnectionConfigForm
        initialConfig={engineConnectionConfig}
        onSubmit={(config) => {
          if (checkEngineConfigIsFine(config)) {
            setEngineConnectionConfig(config);
            setState("chatting");
          } else {
            setEngineConnectionConfig(getEmptyEngineConnectionConfigObject());
            setState("config-missing");
          }
        }}
      />
    );
  }

  if (state === "chatting") {
    return <div>Chat UI</div>;
  }
}

function EngineConnectionConfigForm({
  initialConfig,
  onSubmit,
}: {
  initialConfig: EngineConnectionConfig;
  onSubmit: (config: EngineConnectionConfig) => void;
}) {
  const [formState, setFormState] =
    useState<EngineConnectionConfig>(initialConfig);
  useEffect(() => {
    setFormState(initialConfig);
  }, [initialConfig]);
  return (
    <Card className="max-w-[350px] w-full">
      <CardHeader>
        <CardTitle>Connect to CNL Engine</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Input
            placeholder="Engine URL"
            value={formState.engineUrl}
            onChange={(e) =>
              setFormState((prevFormState) => ({
                ...prevFormState,
                engineUrl: e.target.value,
              }))
            }
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          className="w-full"
          onClick={() => onSubmit(formState)}
        >
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Page() {
  return <ConfigFillerOrChatShower />;
}
