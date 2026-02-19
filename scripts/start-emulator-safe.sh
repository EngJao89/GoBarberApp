#!/bin/bash
# Safe Android Emulator startup script that works around segmentation faults

AVD_NAME="${1:-Expo_AVD}"

echo "Starting Android emulator: $AVD_NAME"
echo "Note: If you get segmentation faults, try using 'npm run android' instead"

# Unset problematic preloads
unset LD_PRELOAD

# Try multiple approaches
echo "Attempt 1: Software rendering with minimal flags..."
$ANDROID_HOME/emulator/emulator -avd "$AVD_NAME" \
  -gpu swiftshader_indirect \
  -no-snapshot \
  -no-audio \
  -no-boot-anim \
  -no-window \
  2>&1 &

EMULATOR_PID=$!
sleep 2

if ! kill -0 $EMULATOR_PID 2>/dev/null; then
  echo "Attempt 1 failed. Try using Expo's built-in emulator:"
  echo "  npm run android"
  echo ""
  echo "Or use a physical device with USB debugging enabled."
  exit 1
fi

echo "Emulator started with PID: $EMULATOR_PID"
echo "Wait for it to fully boot, then run: npm run android"

