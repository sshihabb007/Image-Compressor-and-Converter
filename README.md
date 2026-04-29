# Image Compressor and Converter

A powerful, lightning-fast, and entirely client-side image compression and format conversion tool built with privacy and performance in mind.

## 🌟 Features
- **100% Local & Private:** Everything happens directly in your browser. No images are ever uploaded to an external server.
- **Drag & Drop Interface:** A sleek, modern user interface built using Tailwind CSS for a premium look and feel.
- **Format Conversion:** Seamlessly convert between `JPEG`, `PNG`, and `WebP` formats.
- **Real-time Quality Adjustment:** Use the interactive range slider to adjust compression quality (0-100%) and instantly see the estimated output file size.
- **Smart Resizing:** Optional feature to automatically scale down massive 8K images (capping at a maximum of 2000px) to prevent browser freezing or lagging.
- **Transparency Handling:** Intelligently adds a solid white background when converting transparent PNGs to JPEGs to prevent ugly black artifacts.
- **EXIF Data Stripping:** Automatically removes metadata (like GPS location, date taken, and camera models) during the conversion process for enhanced privacy.
- **WebP Support Checking:** Automatically validates if the current browser supports WebP encoding and gracefully disables the option if it doesn't.

## ⚙️ How It Works (The Mechanism)
This application leverages modern HTML5 APIs to perform image manipulation entirely in memory without a backend:

1. **File Ingestion:** When a user uploads an image, the `FileReader` API reads the file directly into the browser's memory and generates a temporary data URL to show a preview.
2. **The Canvas Engine:** An invisible `<canvas>` element is dynamically created. The uploaded image is then "painted" onto this canvas using the 2D Context API (`ctx.drawImage`). This step naturally strips out all embedded EXIF metadata.
3. **Format & Compression:** The core conversion happens via the native `canvas.toBlob()` method. This function takes the raw pixels from the canvas and encodes them into the new selected format (MIME type) and applies the chosen compression ratio (a float from 0.0 to 1.0).
4. **Memory Optimization:** Rather than handling massive Base64 strings, the application uses temporary `Blob` objects and exposes them for download using `URL.createObjectURL()`. It strictly revokes old URLs to prevent memory leaks during continuous use.

## 👨‍💻 Author Details
Designed and Developed by **Mehedi Shihab**  
GitHub: [@sshihabb007](https://github.com/sshihabb007)
