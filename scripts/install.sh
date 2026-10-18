#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# install.sh — 把本 repo 的 AI agent 定義檔安裝到 Claude Code
#
#   ./scripts/install.sh --tool claude-code            # 安裝全部分類到 ~/.claude/agents/
#   ./scripts/install.sh --tool claude-code --scope project
#                                                      # 安裝到 <repo>/.claude/agents/（只對本專案生效）
#   ./scripts/install.sh --category engineering        # 只安裝某一個分類
#   ./scripts/install.sh --dry-run                     # 只列出會做什麼，不實際複製
#
# 分類 = repo 根目錄下任何含有 agent .md 檔（有 YAML frontmatter `name:`）的資料夾，
# 例如 engineering/。手動安裝也可以：cp engineering/*.md ~/.claude/agents/
# ---------------------------------------------------------------------------
set -euo pipefail

TOOL="claude-code"
SCOPE="user"
CATEGORY=""
DRY_RUN=0
DEST_OVERRIDE=""

usage() {
  sed -n '2,15p' "$0" | sed 's/^# \{0,1\}//'
  cat <<USAGE

Options:
  --tool <name>        Target tool. Only "claude-code" is supported. (default: claude-code)
  --scope user|project user    → \$CLAUDE_CONFIG_DIR/agents or ~/.claude/agents (all projects)
                       project → <repo>/.claude/agents (this repo only)      (default: user)
  --category <dir>     Install one category only, e.g. engineering
  --dest <dir>         Install to an explicit directory (overrides --scope)
  --dry-run            Show what would be copied without copying
  -h, --help           Show this help
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --tool)      TOOL="${2:-}"; shift 2 ;;
    --tool=*)    TOOL="${1#*=}"; shift ;;
    --scope)     SCOPE="${2:-}"; shift 2 ;;
    --scope=*)   SCOPE="${1#*=}"; shift ;;
    --category)  CATEGORY="${2:-}"; shift 2 ;;
    --category=*) CATEGORY="${1#*=}"; shift ;;
    --dest)      DEST_OVERRIDE="${2:-}"; shift 2 ;;
    --dest=*)    DEST_OVERRIDE="${1#*=}"; shift ;;
    --dry-run)   DRY_RUN=1; shift ;;
    -h|--help)   usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 2 ;;
  esac
done

if [[ "$TOOL" != "claude-code" ]]; then
  echo "Error: unsupported --tool '$TOOL'. Only 'claude-code' is supported." >&2
  exit 2
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ -n "$DEST_OVERRIDE" ]]; then
  DEST="$DEST_OVERRIDE"
else
  case "$SCOPE" in
    user)    DEST="${CLAUDE_CONFIG_DIR:-$HOME/.claude}/agents" ;;
    project) DEST="$REPO_ROOT/.claude/agents" ;;
    *) echo "Error: --scope must be 'user' or 'project' (got '$SCOPE')." >&2; exit 2 ;;
  esac
fi

# 找出分類資料夾：根目錄下、非隱藏、含有帶 frontmatter `name:` 的 .md 檔。
is_agent_file() {
  # 第一行是 '---' 且 frontmatter 內有 name: 欄位
  [[ "$(head -n1 "$1")" == "---" ]] || return 1
  sed -n '2,/^---$/p' "$1" | grep -q '^name:' || return 1
  return 0
}

declare -a CATEGORIES=()
if [[ -n "$CATEGORY" ]]; then
  [[ -d "$REPO_ROOT/$CATEGORY" ]] || { echo "Error: category directory '$CATEGORY' not found in $REPO_ROOT" >&2; exit 2; }
  CATEGORIES=("$CATEGORY")
else
  for dir in "$REPO_ROOT"/*/; do
    name="$(basename "$dir")"
    case "$name" in
      node_modules|dist|src|scripts|google-apps-script|.*) continue ;;
    esac
    for f in "$dir"*.md; do
      [[ -f "$f" ]] || continue
      if is_agent_file "$f"; then CATEGORIES+=("$name"); break; fi
    done
  done
fi

if [[ ${#CATEGORIES[@]} -eq 0 ]]; then
  echo "No agent categories found in $REPO_ROOT." >&2
  exit 1
fi

echo "Tool:        $TOOL"
echo "Destination: $DEST"
echo "Categories:  ${CATEGORIES[*]}"
[[ $DRY_RUN -eq 1 ]] && echo "(dry run — nothing will be written)"
echo

[[ $DRY_RUN -eq 1 ]] || mkdir -p "$DEST"

count=0
for cat_name in "${CATEGORIES[@]}"; do
  for f in "$REPO_ROOT/$cat_name"/*.md; do
    [[ -f "$f" ]] || continue
    if ! is_agent_file "$f"; then
      echo "  skip  $cat_name/$(basename "$f")  (no frontmatter name:)"
      continue
    fi
    target="$DEST/$(basename "$f")"
    if [[ -e "$target" ]]; then action="update"; else action="add"; fi
    echo "  $action  $cat_name/$(basename "$f")  ->  $target"
    [[ $DRY_RUN -eq 1 ]] || cp "$f" "$target"
    count=$((count + 1))
  done
done

echo
if [[ $DRY_RUN -eq 1 ]]; then
  echo "Would install $count agent(s)."
else
  echo "Installed $count agent(s) to $DEST"
  echo "Restart Claude Code (or run /agents) and say e.g.:"
  echo '  "activate frontend-developer mode and help me tweak the repair form"'
fi
