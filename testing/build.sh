#!/bin/bash
# pyinstaller --onefile -w --name=testing app.py
cd kivy
buildozer init
buildozer -v android debug