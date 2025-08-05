$cmakeFile = "android/app/build/generated/autolinking/src/main/jni/Android-autolinking.cmake"
if (Test-Path $cmakeFile) {
    (Get-Content $cmakeFile) | ForEach-Object {
        if ($_ -match "react-native-gesture-handler/android/build/generated/source/codegen/jni/") {
            "# $_"
        } elseif ($_ -match "react-native-reanimated/android/build/generated/source/codegen/jni/") {
            "# $_"
        } else {
            $_
        }
    } | Set-Content $cmakeFile
    Write-Host "Patched $cmakeFile"
} else {
    Write-Host "CMake file not found, skipping patch."
} 