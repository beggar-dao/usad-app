# Copilot Instructions for AI Agents

This codebase is a web application using TypeScript, React, and Tailwind CSS. It follows a modular structure with clear separation of concerns. Below are key guidelines for AI agents to be productive:

## Architecture Overview
- **Frontend Framework:** React (TypeScript), with custom components in `src/components/`.
- **Styling:** Tailwind CSS (`tailwind.config.js`, `tailwind.css`, and `src/global.scss`).
- **Routing & Pages:** Pages are organized under `src/pages/`, with subfolders for features (e.g., `home`, `mint`, `history`).
- **Assets:** Images and static files are in `src/assets/images/` and `public/`.
- **Configuration:** Environment variables and constants are in `src/config/env.ts` and `src/constants/index.ts`.
- **Services:** API/service logic is in `src/services/` (e.g., `gbpc.ts`).
- **Utilities:** Shared helpers in `src/utils/` (e.g., `format.ts`, `errorMessages.ts`).

## Developer Workflows
- **Install dependencies:** `pnpm install`
- **Start development server:** `pnpm dev`
- **Build for production:** `pnpm build`
- **No explicit test scripts found; add tests in `src/` if needed.**
- **Debugging:** Use browser dev tools; inspect React components and network requests.

## Project-Specific Conventions
- **Component Structure:** Each feature or section (e.g., Banner, FAQ) is a separate file in its page folder.
- **Naming:** Use lowercase for folders, PascalCase for components/files.
- **Assets:** Reference images from `src/assets/images/` or `public/` for static resources.
- **Global Styles:** Use `src/global.scss` for overrides and custom styles.
- **Environment:** Use `src/config/env.ts` for environment-specific values.

## Integration Points
- **External Libraries:**
  - React, TypeScript, Tailwind CSS
  - UmiJS (`@umijs/max`) is referenced in README, but not found in package.json—verify usage if integrating.
- **No backend code present; all logic is client-side.**

## Patterns & Examples
- **Page Example:** `src/pages/home/index.tsx` is the main entry for the home page, importing subcomponents.
- **Service Example:** `src/services/gbpc.ts` contains API/service logic.
- **Utility Example:** `src/utils/format.ts` for formatting helpers.

## Recommendations for AI Agents
- When adding new features, follow the existing folder/component structure.
- Place shared logic in `src/utils/` and service calls in `src/services/`.
- Update `src/config/env.ts` and `src/constants/index.ts` for new config or constants.
- Use Tailwind classes for styling; add custom styles in `src/global.scss` if needed.
- Reference assets from the appropriate directory.

---

For questions about unclear conventions or missing workflows, ask the user for clarification or examples.
