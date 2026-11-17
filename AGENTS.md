<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Prices, contact details, portfolio links and revision-round counts live in `src/lib/site-data.ts` and are covered by `src/test/site-data.test.ts`; components read from there so one edit updates the whole site.
- All visible copy lives in per-language dictionaries in `src/lib/i18n.tsx` (one typed `Dict` shape); components read text via `useI18n()` so a missing translation fails typecheck.
- Vite `optimizeDeps.include` pre-bundles UI deps so a mid-session re-optimize never leaves the preview with two React copies.
- The landing page is one scrolling page (`src/routes/index.tsx`) composed of section components in `src/components/site/`; nav uses in-page anchors as the brief specifies.
- The contact form opens the visitor's mail app via a prefilled `mailto:` link (no backend yet).
