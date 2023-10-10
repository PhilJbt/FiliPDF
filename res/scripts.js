
/**
 * Fired up when the loading state of the page changes
 * Engage all initializations
 */
document.addEventListener('readystatechange', e => {
    // If the page is fully loaded
    if (e.target.readyState === "complete") {
        reset();    
        init();
    }
}, false);


/**
 * @updateButtonsUsable
 * Set if the preview and export buttons are disabled or not,
 * depending on if the user file selected exists and the length of the value of the subject text input
 */
function updateButtonsUsable() {
    const btn = [document.querySelector('#inp_prvw'), document.querySelector('#inp_save')];

    if (document.querySelector('#inp_filPck').value.length > 0
        && document.querySelector('#inp_txtLin').value.length > 0) {
        if (btn[0].hasAttribute('disabled'))
            btn[0].removeAttribute('disabled');
        if (btn[1].hasAttribute('disabled'))
            btn[1].removeAttribute('disabled');
    }
    else {
        if (!btn[0].hasAttribute('disabled'))
            btn[0].setAttribute('disabled', 'disabled');
        if (!btn[1].hasAttribute('disabled'))
            btn[1].setAttribute('disabled', 'disabled');
    }
}

/**
 * @reset
 * Set UI in its starting state
 */
function reset() {
    // Bypass browser cache
    document.querySelector('#inp_filPck').value = null;
    document.querySelector('#inp_fntSiz').value = 15;
    document.querySelector('#inp_linSpc').value = 1;
    document.querySelector('#inp_txtLin').value = '';
    document.querySelector('#inp_imgQly').value = 2;
    document.querySelector('#inp_date').value = new Date().toISOString().substring(0, 10);

    updateButtonsUsable();

    // Load the color/blend mode/opacity default preset
    setOptionsPreset('1');
}

/**
 * @init
 * Runs all necessary initializations (bootstrap, events listeners, translation process)
 */
function init() {
    // Declare the global array of FiliPDF data
    window['filipdf'] = {
        progressTick: {
            current: 0,
            maximum: 0,
        },
        userFile: null,
        document :{
            images: {
                // data: [], // Byte array of the png image
                // width: 0, // The width of the specificed original PDF page
                // height: 0, // The height of the specified original PDF page
            },
            pages: {
                total: 0,
            },
        },
    };

    init_buttons();
    init_translate();
    init_components();
}

/**
 * @init_buttons
 * Initialize the file input button to enable or disable depending on if the user selected a file
 */
function init_buttons() {
    // Input file picker function binding
    document.querySelector('#inp_filPck').addEventListener("input", (event) => {
        updateButtonsUsable();
    });

    // Input text subject function binding
    document.querySelector('#inp_txtLin').addEventListener("input", (event) => {
        updateButtonsUsable();
    });
}

/**
 * @init_translate
 * Fill the DOM with the localized text
 */
function init_translate() {
    /* ! Some nodes have multiple translation classes, do not add 'else' statement, this is not a mistake.
    * For example, the Preview button has both text (textContent) and label (data-bs-title).
    */
    document.querySelectorAll('.trans-txc, .trans-plh, .trans-inh, .trans-dat, .trans-src').forEach((div) => {
        if (div.classList.contains('trans-txc'))
            div.textContent = translate(div.id);
        if (div.classList.contains('trans-inh'))
            div.innerHTML = translate(div.id);
        if (div.classList.contains('trans-dat'))
            div.setAttribute('data-bs-title', translate(`${div.id}_tlp`));
        if (div.classList.contains('trans-src'))
            div.src = translate(div.id);
    });
}

/**
 * @init_components
 * Initialization of all bootstrap components
 */
function init_components() {
    // Tooltips initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger : 'hover'
        });
    });

    // Labels initialization and event listener binding
    document.querySelectorAll('input').forEach((div) => {
        document.querySelector(`#${div.id}_lbl`).setAttribute('data-content', div.value);
        div.addEventListener("input", (event) => {
            document.querySelector(`#${div.id}_lbl`).setAttribute('data-content', div.value);
        }); 
    });
}

/**
 * @setOptionsPreset
 * Load options values
 * @param {number} _id      ID of the options preset selected
 */
function setOptionsPreset(_id) {
    switch(_id) {
        // Common document
        default:
            document.querySelector('#inp_fntClr').value = '#dfff00';
            document.querySelector('#inp_texBld').value = 4;
            document.querySelector('#inp_texOpa').value = 1;
            break;
        // Colorful document
        case 2:
            document.querySelector('#inp_fntClr').value = '#ffffff';
            document.querySelector('#inp_texBld').value = 5;
            document.querySelector('#inp_texOpa').value = .6;
            break;
        // Bright document
        case 3:
            document.querySelector('#inp_fntClr').value = '#000000';
            document.querySelector('#inp_texBld').value = 11;
            document.querySelector('#inp_texOpa').value = 1;
            break;
        // Darken document
        case 4:
            document.querySelector('#inp_fntClr').value = '#ffffff';
            document.querySelector('#inp_texBld').value = 5;
            document.querySelector('#inp_texOpa').value = .6;
            break;
        // Contrasted document
        case 5:
            document.querySelector('#inp_fntClr').value = '#ffffff';
            document.querySelector('#inp_texBld').value = 1;
            document.querySelector('#inp_texOpa').value = .5;
            break;
    }
}

/**
 * @
 * 
 * @param {string} _id      ID of the div
 */
function translate(_id) {
    // Retrieve the ISO 639-1 language code
    const lang = (navigator.language || navigator.userLanguage).substring(0, 2);

    // Depending on the browser language
    switch(lang) {
        // French
        case 'fr':
            switch (_id) {
                case 'bdy_ttl':             return 'Appliquer un filigrane sur un PDF';
                case 'bdy_dsc':             return 'L\'ensemble du processus est traité sur votre ordinateur personnel, aucune de vos données ne transite ailleurs.';
                case 'bdy_add':             return 'Pour cette raison, l\'application du filigrane peut être lent en fonction de votre materiel informatique, de la taille et du nombre de pages de votre document, ainsi que la qualité d\'image sélectionnée.';
                case 'inp_filPck_lbl':      return 'Le PDF auquel appliquer le filigrane';
                case 'inp_fntClr_lbl':      return 'Couleur de la police';
                case 'inp_texBld_lbl':      return 'Mode de fusion';
                case 'slc_nrml':            return 'Normal';
                case 'slc_diff':            return 'Différence';
                case 'slc_xclu':            return 'Exclusion';
                case 'slc_mlti':            return 'Produit';
                case 'slc_ovrl':            return 'Incrustation';
                case 'slc_scrn':            return 'Superposition';
                case 'slc_clrb':            return 'Densité couleur +';
                case 'slc_clrd':            return 'Densité couleur -';
                case 'slc_drkn':            return 'Obscurcir';
                case 'slc_ligh':            return 'Lumière crue';
                case 'slc_ligt':            return 'Eclaircir';
                case 'slc_ligs':            return 'Lumière tamisée';
                case 'inp_fntSiz_lbl':      return 'Taille du texte';
                case 'inp_linSpc_lbl':      return 'Facteur d\'espacement des lignes';
                case 'inp_texOpa_lbl':      return 'Opacité du texte';
                case 'inp_txtLin_lbl':      return 'Texte';
                case 'inp_txtLin_dsc':      return 'Les lignes multiples sont prises en charge';
                case 'inp_imgQly_lbl':      return 'Qualité de l\'image';
                case 'tltp_imgQly_tlp':     return 'Cette option impacte grandement la durée de traitement.';
                case 'inp_date_lbl':        return 'Date';
                case 'btn_presets':         return 'Pré-réglages';
                case 'txt_prvw':            return 'Prévisualisation :';
                case 'inp_prvw':            return 'Prévisualiser';
                case 'inp_prvw_tlp':        return 'Prévisualise la première page du PDF avec filigrane.';
                case 'inp_save':            return 'Sauvegarder';
                case 'inp_save_tlp':        return 'Enregistre le PDF avec filigrane.';
                case 'bar_progress_finish': return 'Terminé !';
                case 'bar_progress_init':   return 'Lancement...';
                case 'alert_export':        return 'Veuillez patienter, même si la page se fige.<br/>Pour plus d\'efficacité, ne réduisez pas cette page pendant le traitement.';
                case 'alert_error':         return 'Une erreur s\'est produite';
                case 'alert_glyph':         return 'Certains caractères peuvent ne pas être pris en charge.';
                case 'inp_texBld_dsc':      return '(explications)';
                case 'img_example':         return 'res/img/example_fr.jpg';
                case 'prset1_tlp':          return 'Défaut';
                case 'prset2_tlp':          return 'Document coloré';
                case 'prset3_tlp':          return 'Document aux tons clairs';
                case 'prset4_tlp':          return 'Document aux tons foncés';
                case 'prset5_tlp':          return 'Document aux couleurs contrastées';
            }
            break;

        // Any other language
        default:
            switch (_id) {
                case 'bdy_ttl':             return 'Apply Watermark on a PDF';
                case 'bdy_dsc':             return 'The entire process is handled on your personal computer, none of your data is sent anywhere else.';
                case 'bdy_add':             return 'For this reason, watermarking can be slow depending on your computer hardware, the size and number of pages of your document, and the image quality selected.';
                case 'inp_filPck_lbl':      return 'The PDF to watermark';
                case 'inp_fntClr_lbl':      return 'Font color';
                case 'inp_texBld_lbl':      return 'Blend mode';
                case 'slc_nrml':            return 'Normal';
                case 'slc_diff':            return 'Difference';
                case 'slc_xclu':            return 'Exclusion';
                case 'slc_mlti':            return 'Multiply';
                case 'slc_ovrl':            return 'Overlay';
                case 'slc_scrn':            return 'Screen';
                case 'slc_clrb':            return 'ColorBurn';
                case 'slc_clrd':            return 'ColorDodge';
                case 'slc_drkn':            return 'Darken';
                case 'slc_ligh':            return 'HardLight';
                case 'slc_ligt':            return 'Lighten';
                case 'slc_ligs':            return 'SoftLight';
                case 'inp_fntSiz_lbl':      return 'Font size';
                case 'inp_linSpc_lbl':      return 'Line spacing factor';
                case 'inp_texOpa_lbl':      return 'Text opacity';
                case 'inp_txtLin_lbl':      return 'Text lines';
                case 'inp_txtLin_dsc':      return 'Multiple lines are supported';
                case 'inp_imgQly_lbl':      return 'Quality';
                case 'tltp_imgQly_tlp':     return 'This option has a major impact on processing duration.';
                case 'inp_date_lbl':        return 'Date';
                case 'btn_presets':         return 'Presets';
                case 'txt_prvw':            return 'Preview:';
                case 'inp_prvw':            return 'Preview';
                case 'inp_prvw_tlp':        return 'Preview the first page of the watermarked PDF.';
                case 'inp_save':            return 'Save';
                case 'inp_save_tlp':        return 'Saves PDF with watermark.';
                case 'bar_progress_finish': return 'Finished!';
                case 'bar_progress_init':   return 'Initializing...';
                case 'alert_export':        return 'Please wait, even if the page freezes.<br/>For best results, do not reduce this page during the process.';
                case 'alert_error':         return 'An error occured';
                case 'alert_glyph':         return 'Some characters could not been supported.';
                case 'inp_texBld_dsc':      return '(explanations)';
                case 'img_example':         return 'res/img/example_en.jpg';
                case 'prset1_tlp':          return 'Default';
                case 'prset2_tlp':          return 'Colorful document';
                case 'prset3_tlp':          return 'Document with light tones';
                case 'prset4_tlp':          return 'Dark-toned document';
                case 'prset5_tlp':          return 'Document with contrasting colors';
            }
            break;
    }
}

/**
 * @progressBar
 * Modifies the progress bar (init, update, etc)
 * @param {string} _pass    Type of action to be applied to progress bar 
 */
function progressBar(_pass) {
    let bar = document.querySelector('#bar_progress');

    // Before each new processing
    if (_pass === 'reset') {
        bar.classList.remove('bg-success');
        bar.classList.remove('bg-info');
        bar.classList.add('bg-danger');

        bar.classList.add('progress-bar-animated');
        bar.classList.add('progress-bar-striped');

        bar.style.width = '100%';
        bar.textContent = '0%';
    }
    // At the start of each new treatment
    else if (_pass === 'engage') {   
        bar.classList.remove('bg-success');
        bar.classList.remove('bg-info');
        bar.classList.add('bg-danger');

        bar.classList.add('progress-bar'); // Enable back width transition after reset width in 1 frame
    }
    // Update the width of the progress bar
    else if (_pass === 'update') {
        bar.classList.remove('bg-success');
        bar.classList.remove('bg-info');
        bar.classList.add('bg-danger');

        let valueProgress = ((++window['filipdf'].progressTick.current / window['filipdf'].progressTick.maximum) * 100).toFixed(0);
        bar.textContent = `${valueProgress}%`;
    }
    // Show the progress bar in its final state
    else if (_pass === 'finish') {
        bar.classList.remove('progress-bar-animated');
        bar.classList.remove('progress-bar-striped');

        bar.classList.remove('bg-danger');
        bar.classList.remove('bg-warning');
        bar.classList.add('bg-success');

        bar.textContent = translate('bar_progress_finish');
    }
    // 
    else {
        bar.classList.remove('bg-danger');
        bar.classList.remove('bg-success');
        bar.classList.add('bg-info');

        bar.classList.add('progress-bar');

        bar.textContent = _pass;
    }
}

/**
 * @hexToRgb
 * Converts a hexadecimal to a rgb color
 * @param {string} _id      ID of the div
 * @author <1047797/david>
 * @see {@link https://stackoverflow.com/a/11508164}
 */
function hexToRgb(hex) {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let arrRes = {
        r: parseFloat(parseInt(result[1], 16)) / 255,
        g: parseFloat(parseInt(result[2], 16)) / 255,
        b: parseFloat(parseInt(result[3], 16)) / 255,
    };
    
    return arrRes;
}

/**
 * @processing
 * Apply text to each pages of the PDF provided, converts all pages to images, embed images into a new pdf document, engage download of the latter
 * @param {bool} _preview      If true: process the first page and do not engage download, if false: process all pages and engage download
 */
async function processing(_preview) {
    // Reset components to their initial states
    progressBar('reset');
    progressBar(translate('bar_progress_init'));

    // 
    notificate(translate('alert_export'), 'primary');

    // Disable all inputs
    document.querySelectorAll('input, select, button').forEach((button) => {
        button.setAttribute('disabled', 'disabled');
    });

    // Prepare for a preview image update
    if (_preview)
        document.querySelector('#canvas-container').innerHTML = '';

    // Once a new frame has been drawn (with the progress bar empty)
    await window.requestAnimationFrame(async function() {
        // Retrieve the user file
        let userFile = document.querySelector('#inp_filPck').files[0];

        // Release the previously generated or stored data
        window['filipdf'].userFile = userFile;
        window['filipdf'].progressTick.current = 0;
    
        // Start the PDF global processing
        var reader = await new FileReader();
        reader.onload = async (readerEvent) => {
            await processing_TextToPdf(_preview, readerEvent); // Watermark the PDF, convert PDF pages to PNGs, embed PNGs to a new PDF, download the PDF
        };
        await reader.readAsArrayBuffer(userFile);
    });
}

/**
 * @processing_TextToPdf
 * Apply the desired text to every pages of a PDF document
 * @param {bool}   _preview         If true: process the first page and do not engage download, if false: process all pages and engage download
 * @param {object} _readerEvent     The PDF data represented as a byte array
 */
async function processing_TextToPdf(_preview, _readerEvent) {
    // Import libs
    const PDFLib = window['PDFLib'];
    const Fontkit = window['fontkit'];

    // Retrieve pdf content
    const content = await _readerEvent.target.result;

    // Create the new pdf
    const pdfDoc = await PDFLib.PDFDocument.load(content);
    
    // Register Fontkit to PdfLib
    pdfDoc.registerFontkit(Fontkit);

    // Retrieve font
    const notoFont = await pdfDoc.embedFont(fntNoto);

    // Get the pages to watermark
    const pages = await pdfDoc.getPages();

    // Store the maximum number of ticks for the progress bar
    // depending on the type of action (first page preview or full export)
    if (_preview)
        window['filipdf'].progressTick.maximum = 2;
    else
        window['filipdf'].progressTick.maximum = pages.length * 3;

    // Get the current day date
    let dateNow = (new Date(document.querySelector('#inp_date').value)).toLocaleDateString();

    // Declare text specifications
    const textSize = parseInt(document.querySelector('#inp_fntSiz').value);
    
    // Get the height of the text with the chosen font size
    const textHeight = notoFont.heightAtSize(textSize);

    // Calculate the wider page of the PDF
    const pagesCount = _preview ? 1 : pages.length;
    let widthMax = 0;
    for (let i = 0; i < pagesCount; ++i)
        if (widthMax < pages[i].getSize().width)
            widthMax = pages[i].getSize().width;

    // Retrieve the user text lines
    const delimiter = '\u00B7';
    let textLinesRaw = [];
    document.querySelector('#inp_txtLin').value.split(/\r\n|\n|\r/).forEach((line) => {
        if (line.length !== 0) 
            textLinesRaw.push(line);
    });
    textLinesRaw.push(dateNow);

    // Format text lines
    const textRotate = 30;
    let textLinesFormat = [];
    textLinesRaw.forEach((line) => {
        let lineBase   = `${line}\t${delimiter}\t`,
            lineConcat = '';

        try {
            const test = notoFont.encodeText(lineBase);
        }
        catch(e) {
            buttonsDefaultState();
            notificate(`${translate('alert_error')}: ${e}`, 'danger');
            return;
        }

        // Duplicate the text until the width of the line exceed the width of the page
        let textWidthRotated = 0;
        do {
            const textWidthHorizontal = notoFont.widthOfTextAtSize(lineConcat, textSize);
            textWidthRotated = textWidthHorizontal * Math.abs(Math.cos(textRotate)) + textHeight * Math.abs(Math.sin(textRotate));   
            lineConcat += lineBase;
        } while (textWidthRotated < widthMax);
        textLinesFormat.push(lineConcat);
    });

    progressBar('engage'); // Add its class to enable the width back

    // Write text on all pages
    for (let i = 0; i < pagesCount; ++i) {
        // Get first page
        const currentPage = await pages[i];

        // Retrieve page size
        const { width, height } = currentPage.getSize();

        // Retrieve the HEXA user selected color, and convert it to RGB form
        const arrColor = hexToRgb(document.querySelector('#inp_fntClr').value);

        // Set watermark options
        let heightCurr = -height;
        let idLine = 0;

        // Continue drawing text lines to the current page until the desired height is reached
        while (heightCurr < height) {
            try {
                currentPage.drawText(textLinesFormat[(++idLine) % textLinesFormat.length], {
                    x: 0,
                    y: heightCurr,
                    size: textSize,
                    font: notoFont,
                    color: PDFLib.rgb(arrColor.r, arrColor.g, arrColor.b),
                    blendMode: blendMode_IdToString(document.querySelector('#inp_texBld').value),
                    opacity: parseFloat(document.querySelector('#inp_texOpa').value),
                    rotate: PDFLib.degrees(textRotate),
                });
            }
            catch(e) {
                buttonsDefaultState();
                notificate(`${translate('alert_error')}: ${e}`, 'danger');
                return;
            }

            // Update the current line height
            heightCurr += (textSize * 5) * parseFloat(document.querySelector('#inp_linSpc').value);
        }

        progressBar('update');
    }

    // Convert pdf object to bytes array
    const pdfBytes = await pdfDoc.save();

    // Convert watermarked pdf pages to png
    await processing_PdfToPng(_preview, pdfBytes);
}

/**
 * @blendMode_IdToString
 * Converts a value to the PDFLib expected value
 * @param {string} _val      The select DOM value to convert 
 */
function blendMode_IdToString(_val) {
    switch (_val) {
        case '1':   return 'Difference';
        case '2':   return 'Exclusion';
        case '3':   return 'Multiply';
        case '4':   return 'Overlay';
        case '5':   return 'Screen';
        case '6':   return 'ColorBurn';
        case '7':   return 'ColorDodge';
        case '8':   return 'Darken';
        case '9':   return 'HardLight';
        case '10':  return 'Lighten';
        case '11':  return 'SoftLight';
        default:    return 'Normal';
    }
}

/**
 * @processing_PdfToPng
 * Converts every pages of a PDF to images
 * @param {bool}      _preview      If true: process the first page and do not engage download, if false: process all pages and engage download
 * @param {bytearray} _pdfBytes     The PDF data represented as a byte array
 */
async function processing_PdfToPng(_preview, _pdfBytes) {
    // Import the PDFjs lib
    var PDFJS = window['pdfjs-dist/build/pdf'];
    PDFJS.GlobalWorkerOptions.workerSrc = 'res/dep/pdfjs/pdf.worker.js';

    // Reset data stored from the previous processing
    window['filipdf'].document.images = {};
    window['filipdf'].document.pages.total = 0;

    // Retrieve the PDF document
    var task = await PDFJS.getDocument(_pdfBytes);

    // When loaded, convert each PDF pages to images
    await task.promise.then(async function(pdf) {
        // Store the number of pages for the future images processing
        window['filipdf'].document.pages.total = pdf.numPages;
        
        // Get the HTML canvas container
        var canvasdiv = document.getElementById('canvas-container');

        // Retrieve the user specified page size factor
        var scale = parseFloat(document.querySelector('#inp_imgQly').value);

        // For the first page if preview, else for all the pages
        const pagesMax = _preview ? 1 : window['filipdf'].document.pages.total;
        for (let pageID = 1; pageID <= pagesMax; ++pageID) { // The first page is referenced as 1
            // Process the specified PDF page
            await pdf.getPage(pageID).then(async function(page) {
                // Create a HTML canvas
                var img = document.createElement('canvas');

                // If only processing a preview (so the number of pages processed is capped to 1)
                if (_preview)
                    // Push the generated image to the HTML canvas container div
                    canvasdiv.appendChild(img);

                // Retrieve the size of the viewport in accordance with the applied scale
                var viewport = page.getViewport({ scale: scale });

                // Prepare canvas using PDF page dimensions
                var imgctx = img.getContext('2d');
                img.width = viewport.width;
                img.height = viewport.height;

                // Render PDF page into canvas context
                var rndctx = { canvasContext: imgctx, viewport: viewport };
                
                progressBar('update');

                // Engage conversion
                var renderTask = await page.render(rndctx);

                // Convert the PDF page to an image
                await renderTask.promise.then(async function() {
                    // Store the page data and details
                    window['filipdf'].document.images[pageID - 1] = {};
                    window['filipdf'].document.images[pageID - 1].width = viewport.width;
                    window['filipdf'].document.images[pageID - 1].height = viewport.height;
                    window['filipdf'].document.images[pageID - 1].data = img.toDataURL('image/png');

                    // For the last page processing
                    if (pageID == pagesMax) {
                        // Wait for the next frame to display the alert
                        await window.requestAnimationFrame(async function() {

                            // If the export button has been clicked
                            if (!_preview){
                                const pdfBytesSave = await processing_PngToPdf(_preview);
                                await pdfDownload(_preview, pdfBytesSave);
                            }
                            
                            buttonsDefaultState();

                            // Hide all notidications
                            $('.toast').hide();
                        });
                    }
                });
            });
        }
    }, function(e) {
        console.error(`An error occured: ${e}`);
    });
}

/**
 * @buttonsDefaultState
 * Reset alerts, progress bar and buttons to their initial states
 */
function buttonsDefaultState() {
    document.querySelectorAll('input, select, button').forEach((button) => {
        button.removeAttribute('disabled', 'disabled');
    });

    progressBar('finish');
}

/**
 * @processing_PngToPdf
 * Converts an image into an PDF embeded image
 * @param {bool} _preview      If true: process the first page and do not engage download, if false: process all pages and engage download
 */
async function processing_PngToPdf(_preview) {
    // Retrieve the current date
    let DateNowSave = new Date();

    // Create a new PDF document
    const pdfDocSave = await PDFLib.PDFDocument.create();

    // Override meta data, in case the user does not want to share them to somebody,
    // which is probably the case since the user want to add a watermark to the document to share
    pdfDocSave.setTitle('');
    pdfDocSave.setAuthor('');
    pdfDocSave.setSubject('');
    pdfDocSave.setKeywords(['']);
    pdfDocSave.setProducer('');
    pdfDocSave.setCreator('');
    pdfDocSave.setCreationDate(DateNowSave);
    pdfDocSave.setModificationDate(DateNowSave);
    
    // Draw all images onto the new PDF pages
    const pagesCount = _preview ? 1 : window['filipdf'].document.pages.total;
    for (let i = 0; i < pagesCount; ++i) {
        // Add a new page to the new PDF document
        const newPage = await pdfDocSave.addPage([window['filipdf'].document.images[i].width, window['filipdf'].document.images[i].height]);
        // Retrieve an embedPng object
        const img = await pdfDocSave.embedPng(window['filipdf'].document.images[i].data);
        
        // Embed the embedPng to the new page
        newPage.drawImage(img, {
            x: 0,
            y: 0,
            width: window['filipdf'].document.images[i].width,
            height: window['filipdf'].document.images[i].height,
            blendMode: 'Normal',
        });

        progressBar('update');
    }

    return await pdfDocSave.save();
}

/**
 * @pdfDownload
 * Force the download of the new generated PDF document
 * @param {bool}       _preview     If true: process the first page and do not engage download, if false: process all pages and engage download
 * @param {bytesarray} _pdfBytes    The new PDF document under a bytes array form
 */
async function pdfDownload(_preview, _pdfBytes) {
    // If the export button has been clicked
    if (_preview === false) {
        // Retrieve the name of the original PDF document
        let filename = window['filipdf'].userFile.name;
        // Add a label to differentiate the original and the watermarked documents
        filename = `${filename.substring(0, filename.lastIndexOf('.'))}__watermark.pdf`;

        // Engage the download of the generated PDF
        var blob = new Blob([_pdfBytes], {type: "application/pdf"});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
}

/**
 * @notificate
 * Notify the user with a important message
 * @param {string} _text    Message to display
 * @param {string} _type    Type of the notification, has to fit text-bg-* toast bootstrap class name
 */
function notificate(_text, _type) {
    // Get div containign all toasts
    const container = document.querySelector('.toast-container');

    // Create a new HTML element
    let frag = document.createElement("div");
    frag.innerHTML = `
    <div class="toast show align-items-center text-bg-${_type} border-0 m-2" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
        <div class="toast-body">
            ${_text}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
    `.trim();

    // Bind functions depending on toast actions
    const toast = container.insertAdjacentElement("afterbegin", frag);
    const script = bootstrap.Toast.getOrCreateInstance(toast, {
        delay: 15000,
    });
    toast.addEventListener('shown.bs.toast', () => {
        toast.classList.add('show');
    });
    toast.addEventListener('hide.bs.toast', () => {
        toast.classList.remove('show');
    });
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
    script.show();
}