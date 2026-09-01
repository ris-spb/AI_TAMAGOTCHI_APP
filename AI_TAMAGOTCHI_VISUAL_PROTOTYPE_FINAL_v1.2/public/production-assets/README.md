# Production visual assets mount point

This directory intentionally contains **no recreated/proxy visual binaries**.

When the exact approved Development Package binaries are byte-accessible, copy the package subtree
`08_PRODUCTION_EXPORTS/` here preserving paths, so browser URLs resolve as:

`/production-assets/08_PRODUCTION_EXPORTS/...`

Current Stage-4 code references only manifest-confirmed approved paths. Missing binaries must degrade to
functional DOM UI; they must never be replaced with invented mascot/Pulkovo art or Stage-16 proxy GLB files.
