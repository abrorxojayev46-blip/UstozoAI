@echo off
cd /d C:\Users\OWNER\MyGymApp
git config user.email "abrorxojayev46@gmail.com"
git config user.name "abrorxojayev46"
git add .
git commit -m "Ustoz AI - Uzbek AI tutor app"
git remote add origin https://github.com/abrorxojayev46/UstozoAI.git
git branch -M main
git push -u origin main
pause
