#!/bin/bash
find src -type f -name "*.tsx" -exec sed -i -e 's/bg-\[#040810\]/bg-cream dark:bg-\[#040810\]/g' {} +
find src -type f -name "*.tsx" -exec sed -i -e 's/text-white/text-ink dark:text-white/g' {} +
find src -type f -name "*.tsx" -exec sed -i -e 's/bg-white/bg-ink dark:bg-white/g' {} +
find src -type f -name "*.tsx" -exec sed -i -e 's/border-white/border-ink dark:border-white/g' {} +
