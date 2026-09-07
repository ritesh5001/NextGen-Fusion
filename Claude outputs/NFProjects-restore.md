# NFProjects — deleted 2026-09-07, here's how to get it back

It was an Expo / React Native app living as a nested git repo inside NextGen Fusion.
Everything was pushed, so the code is intact on GitHub.

## Restore

    git clone https://github.com/ritesh5001/NFProjects.git

Local HEAD at deletion was `1dce6bd` ("feat: add MoreScreen and various admin screens…"),
which matched origin exactly — nothing was unpushed.

## The one file not in git

`.env` was gitignored, so recreate it after cloning:

    EXPO_PUBLIC_API_BASE_URL=https://marimail-5v22.onrender.com

`.expo/` is regenerated on first run. The `.DS_Store` files were junk.

## Why it also had to come out of the parent repo

NextGen Fusion tracked it as a gitlink (mode 160000) with no `.gitmodules` entry —
a nested repo committed by accident. That pointer has been removed from the index,
so it will disappear from the repo on your next commit.
