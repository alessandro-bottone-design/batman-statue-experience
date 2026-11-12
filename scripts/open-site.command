#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
exec npm run preview -- --port 4173 --strictPort --open
