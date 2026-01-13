## ✅ Usage (Clean DX)

```tsx
<OptionsProvider client={{ apiUrl: 'https://api.example.com' }}>
  <App />
</OptionsProvider>
```

```ts
const theme = useOption<string>('theme');

const { signup_enabled } = useOptions<boolean>(['signup_enabled']);
```

If you need imperative access:

```ts
const client = useOptionsClient(); // internal usage
await getOption(client, 'feature_x');
```
