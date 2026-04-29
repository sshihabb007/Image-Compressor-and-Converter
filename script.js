// Check WebP Support before allowing it as an option
const sshihabb007_checkWebPSupport = () => {
    const Mehedi_canvas = document.createElement('canvas');
    if (!!(Mehedi_canvas.getContext && Mehedi_canvas.getContext('2d'))) {
        return Mehedi_canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
};

document.addEventListener('DOMContentLoaded', () => {
    // Phase 1 Element Selections using specified names
    const Mehedi_dropZone = document.getElementById('Mehedi_dropZoneId');
    const sshihabb007_fileInput = document.getElementById('sshihabb007_fileInputId');
    const Shihab_settingsPanel = document.getElementById('Shihab_settingsPanelId');
    const Mehedi_formatSelect = document.getElementById('Mehedi_formatSelectId');
    const sshihabb007_qualitySlider = document.getElementById('sshihabb007_qualitySliderId');
    const Shihab_qualityValue = document.getElementById('Shihab_qualityValueId');
    const Mehedi_resizeCheckbox = document.getElementById('Mehedi_resizeCheckboxId');
    const sshihabb007_previewArea = document.getElementById('sshihabb007_previewAreaId');
    const Shihab_originalImg = document.getElementById('Shihab_originalImgId');
    const Mehedi_convertedImg = document.getElementById('Mehedi_convertedImgId');
    const Mehedi_originalSize = document.getElementById('Mehedi_originalSizeId');
    const sshihabb007_originalDimensions = document.getElementById('sshihabb007_originalDimensionsId');
    const Shihab_convertedSize = document.getElementById('Shihab_convertedSizeId');
    const sshihabb007_convertedDimensions = document.getElementById('sshihabb007_convertedDimensionsId');
    const Mehedi_downloadBtn = document.getElementById('Mehedi_downloadBtnId');
    const sshihabb007_webpOption = document.getElementById('sshihabb007_webpOptionId');

    // Global state variables
    let Shihab_currentFile = null;
    let Mehedi_currentBlobUrl = null;
    let sshihabb007_currentBlob = null;

    // Verify WebP Support on Load
    if (!sshihabb007_checkWebPSupport()) {
        sshihabb007_webpOption.disabled = true;
        sshihabb007_webpOption.textContent = 'WebP (Not Supported)';
    }

    // Helper to format bytes cleanly
    const Shihab_formatBytes = (Mehedi_bytes) => {
        if (Mehedi_bytes === 0) return '0 Bytes';
        const sshihabb007_k = 1024;
        const Shihab_sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const Mehedi_i = Math.floor(Math.log(Mehedi_bytes) / Math.log(sshihabb007_k));
        return parseFloat((Mehedi_bytes / Math.pow(sshihabb007_k, Mehedi_i)).toFixed(2)) + ' ' + Shihab_sizes[Mehedi_i];
    };

    // Core Processing Engine
    const Mehedi_processImage = () => {
        if (!Shihab_currentFile) return;

        const sshihabb007_format = Mehedi_formatSelect.value;
        const Shihab_quality = parseInt(sshihabb007_qualitySlider.value, 10) / 100;
        const Mehedi_doResize = Mehedi_resizeCheckbox.checked;

        const sshihabb007_reader = new FileReader();
        sshihabb007_reader.readAsDataURL(Shihab_currentFile);
        
        sshihabb007_reader.onload = (Shihab_event) => {
            const Mehedi_img = new Image();
            Mehedi_img.src = Shihab_event.target.result;
            
            Mehedi_img.onload = () => {
                const sshihabb007_canvas = document.createElement('canvas');
                const Shihab_ctx = sshihabb007_canvas.getContext('2d');
                
                let Mehedi_targetWidth = Mehedi_img.width;
                let sshihabb007_targetHeight = Mehedi_img.height;

                // Phase 5 Technical Challenge: Resizing Logic
                if (Mehedi_doResize) {
                    const Shihab_maxSize = 2000;
                    if (Mehedi_targetWidth > Shihab_maxSize || sshihabb007_targetHeight > Shihab_maxSize) {
                        if (Mehedi_targetWidth > sshihabb007_targetHeight) {
                            sshihabb007_targetHeight = (sshihabb007_targetHeight / Mehedi_targetWidth) * Shihab_maxSize;
                            Mehedi_targetWidth = Shihab_maxSize;
                        } else {
                            Mehedi_targetWidth = (Mehedi_targetWidth / sshihabb007_targetHeight) * Shihab_maxSize;
                            sshihabb007_targetHeight = Shihab_maxSize;
                        }
                    }
                }

                sshihabb007_canvas.width = Mehedi_targetWidth;
                sshihabb007_canvas.height = sshihabb007_targetHeight;

                // Phase 4 Transparency Handling for JPEG
                if (sshihabb007_format === 'jpeg') {
                    Shihab_ctx.fillStyle = "#FFFFFF"; 
                    Shihab_ctx.fillRect(0, 0, sshihabb007_canvas.width, sshihabb007_canvas.height);
                }

                // Phase 2 Canvas Transformation
                Shihab_ctx.drawImage(Mehedi_img, 0, 0, Mehedi_targetWidth, sshihabb007_targetHeight);

                // Update Dimension displays
                sshihabb007_originalDimensions.textContent = `${Mehedi_img.width} x ${Mehedi_img.height}`;
                sshihabb007_convertedDimensions.textContent = `${Math.round(Mehedi_targetWidth)} x ${Math.round(sshihabb007_targetHeight)}`;

                // Generate Output Blob
                sshihabb007_canvas.toBlob((Mehedi_blob) => {
                    // Revoke previous URL to free memory
                    if (Mehedi_currentBlobUrl) {
                        URL.revokeObjectURL(Mehedi_currentBlobUrl);
                    }
                    
                    Mehedi_currentBlobUrl = URL.createObjectURL(Mehedi_blob);
                    sshihabb007_currentBlob = Mehedi_blob;
                    
                    Mehedi_convertedImg.src = Mehedi_currentBlobUrl;
                    Shihab_convertedSize.textContent = Shihab_formatBytes(Mehedi_blob.size);
                    
                    // Reveal UI components
                    sshihabb007_previewArea.classList.remove('hidden');
                    Shihab_settingsPanel.classList.remove('opacity-50', 'pointer-events-none');
                }, `image/${sshihabb007_format}`, Shihab_quality);
            };
        };
    };

    // Input Events
    sshihabb007_fileInput.addEventListener('change', (Mehedi_e) => {
        if (Mehedi_e.target.files && Mehedi_e.target.files[0]) {
            Shihab_currentFile = Mehedi_e.target.files[0];
            
            // Phase 2 display Original URL
            Shihab_originalImg.src = URL.createObjectURL(Shihab_currentFile);
            Mehedi_originalSize.textContent = Shihab_formatBytes(Shihab_currentFile.size);

            Mehedi_processImage();
        }
    });

    // Drag and Drop Effects
    Mehedi_dropZone.addEventListener('dragover', (sshihabb007_e) => {
        sshihabb007_e.preventDefault();
        Mehedi_dropZone.classList.add('border-blue-500', 'bg-gray-700');
    });

    Mehedi_dropZone.addEventListener('dragleave', (Shihab_e) => {
        Shihab_e.preventDefault();
        Mehedi_dropZone.classList.remove('border-blue-500', 'bg-gray-700');
    });

    Mehedi_dropZone.addEventListener('drop', (Mehedi_e) => {
        Mehedi_e.preventDefault();
        Mehedi_dropZone.classList.remove('border-blue-500', 'bg-gray-700');
        
        if (Mehedi_e.dataTransfer.files && Mehedi_e.dataTransfer.files[0]) {
            const sshihabb007_file = Mehedi_e.dataTransfer.files[0];
            if (sshihabb007_file.type.startsWith('image/')) {
                sshihabb007_fileInput.files = Mehedi_e.dataTransfer.files;
                sshihabb007_fileInput.dispatchEvent(new Event('change'));
            }
        }
    });

    // Settings real-time update listeners
    sshihabb007_qualitySlider.addEventListener('input', (Shihab_e) => {
        Shihab_qualityValue.textContent = `${Shihab_e.target.value}%`;
        Mehedi_processImage();
    });

    Mehedi_formatSelect.addEventListener('change', () => {
        Mehedi_processImage();
    });

    Mehedi_resizeCheckbox.addEventListener('change', () => {
        Mehedi_processImage();
    });

    // Phase 4 Download Trigger
    Mehedi_downloadBtn.addEventListener('click', () => {
        if (Mehedi_currentBlobUrl && Shihab_currentFile) {
            const sshihabb007_a = document.createElement('a');
            sshihabb007_a.href = Mehedi_currentBlobUrl;
            
            const Shihab_originalName = Shihab_currentFile.name.split('.')[0];
            const Mehedi_ext = Mehedi_formatSelect.value === 'jpeg' ? 'jpg' : Mehedi_formatSelect.value;
            sshihabb007_a.download = `${Shihab_originalName}_converted.${Mehedi_ext}`;
            
            document.body.appendChild(sshihabb007_a);
            sshihabb007_a.click();
            document.body.removeChild(sshihabb007_a);
        }
    });
});
