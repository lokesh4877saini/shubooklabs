# install
 - bundle install 
# Restart server
 - bundle exec jekyll serve
# bundle clean
 - bundle exec jekyll clean
# Clear Jekyll cache
rm -rf .jekyll-cache || rmdir /s /q .jekyll-cache
# 1. See if bundler/ruby processes are running
 - ps aux | grep bundle
 - ps aux | grep ruby

 # 1. Remove Jekyll build output
Remove-Item -Recurse -Force _site

# 2. Remove Jekyll cache
Remove-Item -Recurse -Force .jekyll-cache

# 3. Remove Ruby bundle lock file
Remove-Item -Force Gemfile.lock

# 4. Remove Node modules (Tailwind + npm packages)
Remove-Item -Recurse -Force node_modules

# 5. Remove npm lock file
Remove-Item -Force package-lock.json

# impg
 - Build the production site

 ```
 JEKYLL_ENV=production bundle exec jekyll build
 ```
# ADD this for DESKTOP in GEMFILE
```
gem 'tzinfo', '>= 1', '< 3'
gem "tzinfo-data"
```