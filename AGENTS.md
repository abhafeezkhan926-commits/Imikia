# Project requirements

- This is a client-required Next.js App Router project. Keep Next.js as the application framework and build system. Do not migrate to Vite or another framework without resolving that change with the user first.
- Use the approved stack: React, JavaScript/TypeScript, Node.js, MongoDB and Cloudinary. Existing Tailwind CSS and standard HTML/CSS styling are part of the frontend stack.
- Ask the user before introducing another programming language or runtime.
- Do not use Python, including temporary helper/authoring scripts. Use JavaScript/TypeScript and existing project tools for development, maintenance and tests.
- Preserve existing authentication, APIs and database functionality unless a requested feature requires a scoped change.
- Never print credentials or copy secret environment files during ordinary source synchronisation.

# Git publishing requirements
- For every save/commit/push request, exclude all environment and credential files, including .env, .env.local, .env.example and other env examples; never add an exception for them.
- Never commit or push node_modules, incomplete dependency installs, .next/build output, caches, temporary files, test fixtures/screenshots, private keys, access tokens, credential files or local tool settings.
- Before each commit/push, inspect the staged file list and scan staged contents for secrets without printing secret values. Keep .gitignore protections in place and do not force-add excluded files.
- The project destination repository is https://github.com/abhafeezkhan926-commits/Imikia.git. Preserve remote history; do not force-push without explicit authorization.
