#!/bin/bash
# Android Emulator startup script with fallback options

AVD_NAME="${1:-Expo_AVD}"

echo "Attempting to start Android emulator: $AVD_NAME"

# Try with software rendering first (most compatible)
echo "Trying software rendering..."
$ANDROID_HOME/emulator/emulator -avd "$AVD_NAME" \
  -gpu swiftshader_indirect \
  -no-snapshot-load \
  -no-snapshot-save \
  -no-audio \
  -no-boot-anim \
  2>&1 | tee /tmp/emulator.log &

EMULATOR_PID=$!
sleep 3

if ! kill -0 $EMULATOR_PID 2>/dev/null; then
  echo "Software rendering failed, trying host GPU..."
  $ANDROID_HOME/emulator/emulator -avd "$AVD_NAME" \
    -gpu host \
    -no-snapshot-load \
    -no-snapshot-save \
    -no-audio \
    -no-boot-anim \
    2>&1 | tee /tmp/emulator.log &
fi

echo "Emulator starting... Check /tmp/emulator.log for details"
