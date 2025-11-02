# 🚀 NPM Release Guide for CopyFlow

## 📋 Pre-Release Checklist

### ✅ 1. Test Your Package Locally
```bash
# Build the project
npm run build

# Test the CLI locally
./dist/index.js --help
./dist/index.js /path/to/test-file.txt /tmp/test-copy.txt

# Test global installation locally
npm run install-global
fast-copy --help
```

### ✅ 2. Verify Package Contents
```bash
# See what files will be included in the npm package
npm pack --dry-run

# Create a test package (creates fast-copy-cli-1.0.0.tgz)
npm pack
```

### ✅ 3. Test Installation from Package
```bash
# Install from the .tgz file to test
npm install -g ./fast-copy-cli-1.0.0.tgz

# Test it works
fast-copy --help

# Uninstall test version
npm uninstall -g fast-copy-cli
```

## 🔧 Setup for NPM Publishing

### 1. Create NPM Account
```bash
# Go to https://www.npmjs.com and create account
# Or use CLI
npm adduser
```

### 2. Login to NPM
```bash
npm login
# Enter your username: jahangeer-dev (or whatever you choose)
# Enter your password: ****
# Enter your email: jahangeer.dev7@gmail.com
```

### 3. Check if Package Name is Available
```bash
npm view fast-copy-cli
# If it shows "npm ERR! 404 Not Found", the name is available!
# If it shows package info, you need to choose a different name
```

## 📦 Publishing Process

### Option 1: Direct Publish
```bash
# Build and publish in one go
npm run prepublishOnly  # This runs clean + build automatically
npm publish
```

### Option 2: Step by Step
```bash
# 1. Clean previous builds
npm run clean

# 2. Build the project
npm run build

# 3. Publish to npm
npm publish
```

## 🔄 Version Management

### Publishing Updates
```bash
# For bug fixes (1.0.0 → 1.0.1)
npm version patch
npm publish

# For new features (1.0.0 → 1.1.0)
npm version minor
npm publish

# For breaking changes (1.0.0 → 2.0.0)
npm version major
npm publish
```

## 🎯 Alternative Package Names (If fast-copy-cli is Taken)

If `fast-copy-cli` is already taken, here are some alternatives:
- `fast-file-copy`
- `large-file-copy`
- `stream-copy-cli`
- `efficient-copy`
- `copy-large-files`
- `jahangeer-fast-copy`

To change the name:
```bash
# Update package.json
"name": "your-new-name"

# Update bin command (optional)
"bin": {
  "fast-copy": "./dist/index.js"  # Keep this the same for consistency
}
```

## 📊 After Publishing

### 1. Verify Your Package
```bash
# Check it's published
npm view fast-copy-cli

# Install globally from npm
npm install -g fast-copy-cli

# Test it works
fast-copy --help
```

### 2. Update README Badge
Add this to your README.md:
```markdown
[![npm version](https://badge.fury.io/js/fast-copy-cli.svg)](https://badge.fury.io/js/fast-copy-cli)
[![npm downloads](https://img.shields.io/npm/dt/fast-copy-cli.svg)](https://www.npmjs.com/package/fast-copy-cli)
```

### 3. Share Your Package
- Create a GitHub repository: https://github.com/jahangeer-dev/fast-copy-cli
- Share on social media
- Add to your portfolio

## 🔍 Troubleshooting

### Common Issues:

**1. Package name already exists:**
```bash
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/fast-copy-cli - Package name too similar to existing packages
```
Solution: Choose a different name in package.json

**2. Not logged in:**
```bash
npm ERR! need auth This command requires you to be logged in.
```
Solution: Run `npm login`

**3. Permission denied:**
```bash
npm ERR! 403 Forbidden
```
Solution: Make sure you're logged in and the package name is unique

**4. Build errors:**
```bash
npm ERR! Exit status 1
```
Solution: Fix TypeScript errors, run `npm run build` to check

## 🎉 Success!

Once published, users can install your CLI globally with:
```bash
npm install -g fast-copy-cli
```

And use it anywhere:
```bash
fast-copy /large-file.mp4 /usb/backup.mp4 --verify
```

Your package will be available at: https://www.npmjs.com/package/fast-copy-cli

## 📈 Marketing Your Package

1. **GitHub**: Create repository with good README
2. **Social Media**: Share on Twitter, LinkedIn, Reddit
3. **Dev Communities**: Share on dev.to, hashnode
4. **Package Description**: Make sure it's SEO-friendly
5. **Keywords**: Use good keywords in package.json
