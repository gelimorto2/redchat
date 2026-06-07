#!/bin/sh

set -eu

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-3000}"
SITE_URL="http://127.0.0.1:${PORT}"
SERVER_CMD="node server.js"

ensure_storage() {
  mkdir -p "$ROOT_DIR/nas/Redchat/data" "$ROOT_DIR/nas/Redchat/uploads"
}

health_line() {
  if command -v curl >/dev/null 2>&1; then
    curl -fsS "$SITE_URL/health" 2>/dev/null || true
  fi
}

cleanup() {
  pkill -f "node .*${ROOT_DIR}/server\.js" 2>/dev/null || true
  pkill -f "node .*${ROOT_DIR}/server_upgraded\.js" 2>/dev/null || true
  pkill -f "nodemon .*${ROOT_DIR}" 2>/dev/null || true
}

dashboard() {
  ensure_storage
  clear >/dev/null 2>&1 || true
  cat <<EOF
========================================
 RedChat Dashboard
========================================
 Site:    ${SITE_URL}
 Root:    ${ROOT_DIR}
 NAS:     ${ROOT_DIR}/nas/Redchat
 Command: ${SERVER_CMD}
EOF

  if pgrep -f "node .*${ROOT_DIR}/server\.js" >/dev/null 2>&1; then
    pid="$(pgrep -fo "node .*${ROOT_DIR}/server\.js")"
    echo "Status:  running (pid ${pid})"
    ps -p "${pid}" -o pid=,pcpu=,pmem=,etime=,cmd= | sed 's/^/  /'
  else
    echo "Status:  stopped"
  fi

  echo
  echo "Health:"
  health_json="$(health_line)"
  if [ -n "${health_json}" ]; then
    echo "  ${health_json}"
  else
    echo "  unavailable"
  fi

  echo
  echo "NAS storage:"
  for path_name in "$ROOT_DIR/data" "$ROOT_DIR/public/uploads"; do
    if [ -L "$path_name" ]; then
      echo "  ${path_name} -> $(readlink "$path_name")"
    else
      echo "  ${path_name} (local directory)"
    fi
  done
  if [ -d "$ROOT_DIR/nas/Redchat/data" ] && [ -d "$ROOT_DIR/nas/Redchat/uploads" ]; then
    echo "  target directories: ready"
  else
    echo "  target directories: missing"
  fi
}

start_server() {
  ensure_storage
  cleanup
  cd "$ROOT_DIR"
  exec ${SERVER_CMD}
}

case "${1:-dashboard}" in
  start)
    start_server
    ;;
  stop)
    cleanup
    ;;
  restart)
    cleanup
    start_server
    ;;
  cleanup)
    cleanup
    ;;
  nas)
    ensure_storage
    ;;
  dashboard|status|info)
    dashboard
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|cleanup|nas|dashboard|status|info}"
    exit 1
    ;;
esac