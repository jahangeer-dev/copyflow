#!/usr/bin/env node
import fs from "fs";
import path from "path";
import crypto from 'crypto';
import { parseArgs } from 'node:util';
function copyLargeFile(sourcePath, destinationPath) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(sourcePath)) {
            reject(new Error(`Source file does not exist: ${sourcePath}`));
            return;
        }
        const destDir = path.dirname(destinationPath);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        const stats = fs.statSync(sourcePath);
        const totalSize = stats.size;
        let copiedSize = 0;
        const readStream = fs.createReadStream(sourcePath);
        const writeStream = fs.createWriteStream(destinationPath);
        readStream.on('data', (chunk) => {
            copiedSize += chunk.length;
            const percentage = (copiedSize / totalSize) * 100;
            const progress = Math.floor(percentage / 2); // 50 chars bar
            const bar = '█'.repeat(progress) + '░'.repeat(50 - progress);
            process.stdout.write(`\r[${bar}] ${percentage.toFixed(2)}% | ${formatBytes(copiedSize)} / ${formatBytes(totalSize)}`);
        });
        readStream.on('error', (err) => {
            console.error('\nError reading source file:', err);
            reject(err);
        });
        writeStream.on('error', (err) => {
            console.error('\nError writing to destination:', err);
            reject(err);
        });
        writeStream.on('finish', () => {
            console.log('\n✓ File copied successfully!');
            resolve();
        });
        readStream.pipe(writeStream);
    });
}
function formatBytes(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
async function copyWithRetry(source, dest, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            await copyLargeFile(source, dest);
            return;
        }
        catch (error) {
            console.log(`\nAttempt ${i + 1} failed. Retrying...`);
            if (i === maxRetries - 1)
                throw error;
            await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2s
        }
    }
}
function getFileHash(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('md5');
        const stream = fs.createReadStream(filePath);
        stream.on('data', (chunk) => hash.update(chunk));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', reject);
    });
}
// After copy
function showHelp() {
    console.log(`
CopyFlow - Seamless large file copying with smart retry and progress tracking

Usage:
  copyflow <source> <destination>
  copyflow --help

Options:
  --help, -h       Show this help message
  --verify, -v     Verify file integrity after copying (MD5 hash)
  --retries, -r    Number of retry attempts (default: 3)

Examples:
  copyflow /path/to/source.mp4 /media/usb/destination.mp4
  copyflow --verify /large-file.zip /backup/large-file.zip
  copyflow --retries 5 /video.mkv /external/video.mkv
`);
}
async function main() {
    try {
        const { values, positionals } = parseArgs({
            args: process.argv.slice(2),
            options: {
                help: { type: 'boolean', short: 'h' },
                verify: { type: 'boolean', short: 'v' },
                retries: { type: 'string', short: 'r' }
            },
            allowPositionals: true
        });
        if (values.help) {
            showHelp();
            process.exit(0);
        }
        if (positionals.length < 2) {
            console.error('❌ Error: Please provide source and destination paths');
            showHelp();
            process.exit(1);
        }
        const sourceFile = positionals[0];
        const destinationFile = positionals[1];
        const shouldVerify = values.verify || false;
        const maxRetries = parseInt(values.retries || '3');
        // Validate source file exists
        if (!fs.existsSync(sourceFile)) {
            console.error(`❌ Error: Source file does not exist: ${sourceFile}`);
            process.exit(1);
        }
        // Get file info
        const stats = fs.statSync(sourceFile);
        console.log(`📁 Source: ${sourceFile}`);
        console.log(`📁 Destination: ${destinationFile}`);
        console.log(`📊 File size: ${formatBytes(stats.size)}`);
        console.log(`🔄 Max retries: ${maxRetries}`);
        if (shouldVerify)
            console.log('🔍 Integrity verification: enabled');
        console.log('');
        console.log('🚀 Starting file copy...');
        const startTime = Date.now();
        await copyWithRetry(sourceFile, destinationFile, maxRetries);
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        const speed = stats.size / duration / 1024 / 1024; // MB/s
        console.log(`⏱️  Copy completed in ${duration.toFixed(2)}s (${speed.toFixed(2)} MB/s)`);
        if (shouldVerify) {
            console.log('🔍 Verifying file integrity...');
            const sourceHash = await getFileHash(sourceFile);
            const destHash = await getFileHash(destinationFile);
            if (sourceHash === destHash) {
                console.log('✅ File integrity verified!');
            }
            else {
                console.log('❌ File corruption detected!');
                process.exit(1);
            }
        }
        console.log('🎉 Operation completed successfully!');
    }
    catch (error) {
        console.error('❌ Copy failed:', error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map