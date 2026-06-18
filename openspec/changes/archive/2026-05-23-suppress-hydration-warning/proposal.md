# Fix: React Hydration Mismatch from Browser Extension

## Problem

Browser console shows React hydration mismatch warning:

```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
```

Dev server logs reveal the specific diff:

```
<html
  lang="zh-CN"
  className="h-full antialiased"
- data-yd-content-ready="true"
>
```

The `data-yd-content-ready="true"` attribute is injected by a browser extension ("yd" = YouDao dictionary/translation extension) before React hydration completes. The server-rendered HTML does not contain this attribute, causing a mismatch.

## Root Cause

Browser extensions that modify the DOM before React hydration can cause SSR/client attribute mismatches. React 19 / Next.js 16 strictly validates DOM consistency during hydration.

## Fix Goal

Suppress the hydration warning on the `<html>` element since the mismatch is caused by external browser extensions, not application code.

## Scope

- Single file: `src/app/layout.tsx`
- Add `suppressHydrationWarning` prop to `<html>` element

## Non-goals

- No changes to application logic
- No new dependencies
- No architectural changes
