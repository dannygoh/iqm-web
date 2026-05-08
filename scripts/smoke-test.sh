#!/usr/bin/env bash
# Smoke test — verifies all public routes return HTTP 200.
# Usage:
#   bash scripts/smoke-test.sh https://www2.iqm.org.my   # staging
#   bash scripts/smoke-test.sh https://www.iqm.org.my    # production
set -euo pipefail

BASE="${1:-https://www2.iqm.org.my}"
PASS=0
FAIL=0
ERRORS=()

check() {
    local path="$1"
    local url="${BASE}${path}"
    local status
    status=$(curl -o /dev/null -s -w "%{http_code}" --max-time 15 -L "$url")
    if [[ "$status" == "200" ]]; then
        echo "  ✓  $path  ($status)"
        (( PASS++ ))
    else
        echo "  ✗  $path  ($status)  ← FAIL"
        (( FAIL++ ))
        ERRORS+=("$path → $status")
    fi
}

echo ""
echo "=== IQM Web Smoke Test ==="
echo "    Target: $BASE"
echo "    $(date)"
echo ""

echo "── Static pages ──────────────────────────────────────────────────────"
check "/"
check "/about"
check "/iqm-aims-and-objectives"
check "/board-management-year-20152017"
check "/rules-constitution-iqm"
check "/types-membership"
check "/iqm-members-benefit"
check "/corporate-membership"
check "/non-corporate-members"
check "/entrance-fee-and-annual-subscriptions"
check "/download-application-forms"
check "/registration-schemes"
check "/mrca-quality-system-auditors-registration-scheme"
check "/mrca-quality-system-consultants-registration-scheme"
check "/contact"

echo ""
echo "── Dynamic pages ─────────────────────────────────────────────────────"
check "/events"
check "/gallery"
check "/gallery/agm-36"
check "/gallery/activities-2017"
check "/members-directory"
check "/mrca-auditors-directory"
check "/mrca-consultants-directory"

echo ""
echo "── Admin & API ───────────────────────────────────────────────────────"
check "/admin"
check "/api/health"

echo ""
echo "── Static asset redirects (Drupal URL preservation) ─────────────────"
# Should redirect 301 to /files/...
OLD_STATUS=$(curl -o /dev/null -s -w "%{http_code}" --max-time 10 \
    "${BASE}/sites/default/files/assets/docs/IQM-Members-Benefits.pdf")
if [[ "$OLD_STATUS" == "301" || "$OLD_STATUS" == "302" || "$OLD_STATUS" == "200" ]]; then
    echo "  ✓  /sites/default/files/... → $OLD_STATUS (redirect working)"
    (( PASS++ ))
else
    echo "  ✗  Drupal URL rewrite → $OLD_STATUS  ← FAIL"
    (( FAIL++ ))
    ERRORS+=("Drupal URL rewrite → $OLD_STATUS")
fi

echo ""
echo "── Downloaded files ──────────────────────────────────────────────────"
check "/files/IQM-Members-Benefits.pdf"
check "/images/iqm_logo.png"

echo ""
echo "═══════════════════════════════════════════════════════════════════════"
echo "  Results: ${PASS} passed, ${FAIL} failed"

if [[ ${FAIL} -gt 0 ]]; then
    echo ""
    echo "  Failures:"
    for e in "${ERRORS[@]}"; do
        echo "    - $e"
    done
    echo ""
    exit 1
else
    echo ""
    echo "  All checks passed. ✓"
    echo ""
fi
