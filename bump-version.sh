#!/bin/bash
# מוסיף חותם גרסה ?v=<commit> לכל קובצי ה-JS/CSS המקומיים ב-index.html,
# כדי שדפדפנים לא יגישו גרסה ישנה מהמטמון. להריץ לפני כל push.
cd "$(dirname "$0")"
V=$(git rev-parse --short HEAD 2>/dev/null || date +%s)
perl -pi -e 's/(src|href)="((?!http)[^"]+?\.(js|css))(\?v=[^"]*)?"/$1="$2?v='"$V"'"/g' index.html
echo "version stamp: $V"
