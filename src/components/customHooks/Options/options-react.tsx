import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { OptionsClient } from './options-client'; // adjust import
import { HttpOptionsApi, OptionsClientImpl } from './options-client';

/* ============================================================
   Context
   ============================================================ */

const OptionsClientContext = createContext<OptionsClient | null>(null);

function useOptionsClient(): OptionsClient {
  const client = useContext(OptionsClientContext);
  if (!client) {
    throw new Error('OptionsProvider is missing. Wrap your app with <OptionsProvider />');
  }
  return client;
}

/* ============================================================
   Provider
   ============================================================ */

export function OptionsProvider({
  client: { apiUrl },
  children,
}: {
  // apiUrl: string;
  client: { apiUrl: string };
  children: ReactNode;
}) {
  // single client instance per app
  const clientRef = useRef<OptionsClient>(new OptionsClientImpl(new HttpOptionsApi(apiUrl)));

  if (!clientRef.current) {
    clientRef.current = new OptionsClientImpl(new HttpOptionsApi(apiUrl));
  }

  return (
    <OptionsClientContext.Provider value={clientRef.current}>
      {children}
    </OptionsClientContext.Provider>
  );
}

/* ============================================================
   Hooks
   ============================================================ */

/**
 * useOption – reactive single key
 */
export function useOption<T = any>(key: string): T | undefined {
  const client = useOptionsClient();

  const [value, setValue] = useState<T | undefined>(client.getRaw(key)?.value);

  useEffect(() => {
    let mounted = true;

    // lazy fetch
    client.getKey<T>(key).then((v) => {
      if (mounted) setValue(v);
    });

    // subscribe to updates
    const unsub = client.subscribe(key, (opt) => {
      setValue(opt?.value);
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, [key, client]);

  return value;
}

/**
 * useOptions – reactive multiple keys
 */
export function useOptions<T = any>(keys: string[]): Record<string, T> {
  const client = useOptionsClient();
  const [state, setState] = useState<Record<string, T>>({});

  useEffect(() => {
    let mounted = true;

    // fetch missing keys
    client.getMultiKey<T>(keys).then((values) => {
      if (mounted) setState(values);
    });

    // subscribe per key
    const unsubs = keys.map((key) =>
      client.subscribe(key, (opt) => {
        setState((prev) => ({
          ...prev,
          [key]: opt?.value,
        }));
      }),
    );

    return () => {
      mounted = false;
      unsubs.forEach((u) => u());
    };
  }, [keys.join('|'), client]);

  return state;
}

/* ============================================================
   Imperative helpers (optional, but clean)
   ============================================================ */

/**
 * getOption – outside React
 */
export async function getOption<T = any>(
  client: OptionsClient,
  key: string,
): Promise<T | undefined> {
  return client.getKey<T>(key);
}

/**
 * prefetchOptions – warm cache
 */
export async function prefetchOptions(client: OptionsClient, keys: string[]) {
  await client.getMultiKey(keys);
}
