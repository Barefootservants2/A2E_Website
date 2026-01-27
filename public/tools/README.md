# Public Tools Directory

This directory contains downloadable ZIP files for the Armory page.

## Current Tools

| File | Tool | Version |
|------|------|---------|
| `etrade-oauth-debug.zip` | E*TRADE OAuth Debug | 1.0.0 |
| `sync-repos.zip` | Multi-Repo Sync | (coming soon) |
| `email-archive-processor.zip` | Email Archive Processor | (coming soon) |

## Creating ZIP Files

From the `09_PUBLIC_TOOLS` directory:

```powershell
# E*TRADE OAuth Debug
Compress-Archive -Path "etrade-oauth-debug\*" -DestinationPath "..\A2E_Website\public\tools\etrade-oauth-debug.zip" -Force
```

## Notes

- Always include README.md in the ZIP
- Include LICENSE file
- Include .env.example (never .env with real credentials)
- Test the ZIP by extracting and running `npm install && node <script>.js`
