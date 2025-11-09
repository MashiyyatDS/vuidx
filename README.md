# vuidx

Lightweight Vue 3 UI primitives and composables for building markdown-style forms and modals made with Tailwindcss and Nuxt UI 4.

## Quick start

```sh
pnpm install
pnpm dev      # start dev server
pnpm build    # production build
pnpm test:unit
```

## Components

-   [`MdForm`](src/components/MdForm.vue) — form wrapper with validation and submission helpers.  
    File: [src/components/MdForm.vue](src/components/MdForm.vue)

-   [`MdInput`](src/components/MdInput.vue) — input component with validation, labels and hint support.  
    File: [src/components/MdInput.vue](src/components/MdInput.vue)

-   [`MdModal`](src/components/MdModal.vue) — accessible modal dialog with open/close and focus management.  
    File: [src/components/MdModal.vue](src/components/MdModal.vue)

These components are located in [src/components](src/components).

## Composables

-   [`useMdForm`](src/composables/useMdForm.ts) — form state, validation orchestration and submission helpers.  
    File: [src/composables/useMdForm.ts](src/composables/useMdForm.ts)

-   [`useMdField`](src/composables/useMdField.ts) — per-field state, validators and dirty/touched tracking.  
    File: [src/composables/useMdField.ts](src/composables/useMdField.ts)

-   [`useMdModal`](src/composables/useMdModal.ts) — modal visibility, focus trap and lifecycle helpers.  
    File: [src/composables/useMdModal.ts](src/composables/useMdModal.ts)

-   [`useMdInput`](src/composables/useMdInput.ts) — input-specific helpers (masking, formatting, composition events).  
    File: [src/composables/useMdInput.ts](src/composables/useMdInput.ts)

Composables live in [src/composables](src/composables).
