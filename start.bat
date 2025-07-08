@echo off
poetry run uvicorn iris_app.main:app --reload --app-dir src