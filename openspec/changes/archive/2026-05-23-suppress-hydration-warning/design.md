# Fix Design

## Approach

Add React's `suppressHydrationWarning` attribute to the `<html>` element in `src/app/layout.tsx`.

This is the idiomatic React solution for hydration mismatches caused by external factors (browser extensions, injected scripts) that the application cannot control.

## Implementation

```tsx
<html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
```

## Rationale

- The mismatch is not caused by application code
- The extension's DOM modification is benign (adds a data attribute)
- `suppressHydrationWarning` is the documented React pattern for this scenario
- Narrow scope: only suppresses on `<html>`, other elements still validated
