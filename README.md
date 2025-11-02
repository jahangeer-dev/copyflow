# Fast Copy CLI

A high-performance command-line tool for copying large files efficiently. Designed especially for copying large files (like videos) to USB drives and external storage.

## Features

- 🚀 **Efficient streaming**: Uses Node.js streams to copy files without loading them entirely into memory
- 📊 **Progress tracking**: Real-time progress bar showing copy status
- 🔍 **Integrity verification**: Optional MD5 hash verification to ensure file integrity
- 🔄 **Automatic retry**: Configurable retry mechanism for failed transfers
- ⚡ **Speed monitoring**: Shows transfer speed and estimated time
- 💾 **Memory efficient**: Works with files of any size without memory issues

## Installation

### Install globally
```bash
npm run install-global
```

### Or use directly with npx
```bash
npx fast-copy-cli <source> <destination>
```

## Usage

### Basic usage
```bash
fast-copy /path/to/source.mp4 /media/usb/destination.mp4
```

### With integrity verification
```bash
fast-copy --verify /large-file.zip /backup/large-file.zip
```

### With custom retry count
```bash
fast-copy --retries 5 /video.mkv /external/video.mkv
```

### Show help
```bash
fast-copy --help
```

## Options

- `--help, -h`: Show help message
- `--verify, -v`: Verify file integrity after copying using MD5 hash
- `--retries, -r <number>`: Set number of retry attempts (default: 3)

## Examples

Copy a 2GB video file to USB drive:
```bash
fast-copy /home/user/movie.mp4 /media/usb/movies/movie.mp4
```

Copy with verification (recommended for important files):
```bash
fast-copy --verify /important/document.pdf /backup/document.pdf
```

Copy with 10 retry attempts:
```bash
fast-copy --retries 10 /large/database.sql /external/backup.sql
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build the project
npm run build

# Install globally for testing
npm run install-global

# Uninstall global installation
npm run uninstall-global
```

## What Makes Fast Copy Unique?

### 🎯 **Specialized for Large Files**
Unlike standard `cp` or GUI file managers, Fast Copy is specifically optimized for large files (2GB+ videos, databases, backups) that often cause issues with traditional copying methods.

### 🔄 **Smart Retry System**
- Automatic retry with configurable attempts (1-10 retries)
- Intelligent error recovery for network drives and USB devices
- Handles temporary connection drops gracefully

### 📊 **Real-Time Visual Feedback**
- Beautiful progress bar with Unicode characters (█░)
- Live speed monitoring (MB/s)
- File size formatting (Bytes → KB → MB → GB)
- Percentage completion tracking

### 🛡️ **Built-in Integrity Verification**
- Optional MD5 hash verification to ensure file integrity
- Detects corruption during transfer
- Critical for important data transfers

### 💾 **Memory Efficient Streaming**
- Uses Node.js streams instead of loading files into memory
- Can copy files larger than available RAM
- Constant memory usage regardless of file size

### ⚡ **Performance Optimized**
- Chunked reading/writing for optimal I/O performance
- Async operations prevent UI blocking
- Cross-platform compatibility (Linux, macOS, Windows)

### 🎨 **User Experience Focus**
- Clean, emoji-enhanced CLI interface
- Detailed error messages with context
- Professional help system
- Easy global installation

## Comparison with Alternatives

| Feature | Fast Copy | Standard `cp` | GUI File Managers | `rsync` |
|---------|-----------|---------------|-------------------|---------|
| Progress Bar | ✅ Real-time | ❌ None | ✅ Basic | ✅ Basic |
| Speed Display | ✅ MB/s | ❌ None | ✅ Limited | ✅ Basic |
| Retry Logic | ✅ Configurable | ❌ None | ❌ Manual | ✅ Limited |
| Integrity Check | ✅ MD5 Hash | ❌ None | ❌ None | ✅ Checksum |
| Memory Usage | ✅ Constant | ✅ Constant | ❌ Variable | ✅ Constant |
| Large File Support | ✅ Optimized | ✅ Basic | ❌ Often fails | ✅ Good |
| CLI Interface | ✅ Modern | ✅ Basic | ❌ None | ✅ Complex |

## Why Not Just Use `cp` or `rsync`?

**Standard `cp` command:**
- No progress indication for large files
- No retry mechanism
- No integrity verification
- Limited error handling

**rsync:**
- Complex syntax and options
- Overkill for simple file copying
- No visual progress bar
- Primarily designed for synchronization

**GUI File Managers:**
- Often freeze with very large files
- Limited retry options
- No integrity verification
- Can't be automated or scripted

Fast Copy fills the gap by providing a simple, reliable, and visually appealing solution specifically for large file transfers.
