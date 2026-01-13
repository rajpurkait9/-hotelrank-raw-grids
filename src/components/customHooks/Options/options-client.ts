export type ValueType = 'string' | 'number' | 'boolean' | 'array' | 'object';

export interface OptionValue {
  key: string;
  value: any;
  value_type: ValueType;
  timestamp: string;
}

export interface OptionsClient {
  getKey<T = any>(key: string): Promise<T | undefined>;
  getMultiKey<T = any>(keys: string[]): Promise<Record<string, T>>;
  getRaw(key: string): OptionValue | undefined;
  subscribe(key: string, cb: (value: OptionValue | undefined) => void): () => void;
  hydrate(data: OptionValue[]): void;
  clear(): void;
}

type Listener = (value: OptionValue | undefined) => void;

export class OptionsStore {
  private state = new Map<string, OptionValue>();
  private listeners = new Map<string, Set<Listener>>();

  get(key: string) {
    return this.state.get(key);
  }

  set(option: OptionValue) {
    this.state.set(option.key, option);
    this.notify(option.key);
  }

  setMany(options: OptionValue[]) {
    options.forEach(o => this.set(o));
  }

  subscribe(key: string, listener: Listener) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }

    this.listeners.get(key)!.add(listener);

    // immediate emit
    listener(this.state.get(key));

    return () => {
      this.listeners.get(key)?.delete(listener);
    };
  }

  private notify(key: string) {
    this.listeners.get(key)?.forEach(cb => cb(this.state.get(key)));
  }

  clear() {
    this.state.clear();
  }
}

export interface OptionsApi {
  fetchLatest(keys: string[]): Promise<OptionValue[]>;
}

export class HttpOptionsApi implements OptionsApi {
  constructor(private baseUrl: string) {}

  async fetchLatest(keys: string[]) {
    const params = new URLSearchParams();
    params.set('keys', keys.join(','));

    const res = await fetch(`${this.baseUrl}/options?${params}`);
    const json = (await res.json()) as { data: OptionValue[] };
    return json.data;
  }
}

export class OptionsClientImpl implements OptionsClient {
  private store = new OptionsStore();
  private inflight = new Map<string, Promise<void>>();

  constructor(private api: OptionsApi) {}

  getRaw(key: string) {
    return this.store.get(key);
  }

  async getKey<T = any>(key: string): Promise<T | undefined> {
    const cached = this.store.get(key);
    if (cached) return cached.value as T;

    await this.fetchMissing([key]);
    return this.store.get(key)?.value as T | undefined;
  }

  async getMultiKey<T = any>(keys: string[]) {
    const result: Record<string, T> = {};
    const missing: string[] = [];

    for (const key of keys) {
      const cached = this.store.get(key);
      if (cached) {
        result[key] = cached.value as T;
      } else {
        missing.push(key);
      }
    }

    if (missing.length) {
      await this.fetchMissing(missing);
      missing.forEach(k => {
        const v = this.store.get(k);
        if (v) result[k] = v.value as T;
      });
    }

    return result;
  }

  subscribe(key: string, cb: Listener) {
    return this.store.subscribe(key, cb);
  }

  hydrate(data: OptionValue[]) {
    this.store.setMany(data);
  }

  clear() {
    this.store.clear();
  }

  private async fetchMissing(keys: string[]) {
    const unique = keys.filter(k => !this.inflight.has(k));

    if (!unique.length) return;

    const promise = this.api.fetchLatest(unique).then(options => {
      this.store.setMany(options);
      unique.forEach(k => this.inflight.delete(k));
    });

    unique.forEach(k => this.inflight.set(k, promise));
    await promise;
  }
}
