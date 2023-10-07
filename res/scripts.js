document.addEventListener('readystatechange', e => {
    if (e.target.readyState === "complete") {
        init();
        translate_init();
        initComp();
    }
}, false);

function updateButtonLabels() {
    document.querySelectorAll('label.lbl_cnt').forEach((div) => {
        div.setAttribute('data-content', document.querySelector(`#${div.getAttribute('for')}`).value);
    });

    document.querySelectorAll('input').forEach((div) => {
        div.addEventListener("input", (event) => {
            document.querySelector(`#${div.id}_lbl`).setAttribute('data-content', div.value);
        }); 
    });
}

function setPreset(_id) {
    switch(_id) {
        default:
            document.querySelector('#inp_fntClr').value = '#7f00ff';
            document.querySelector('#inp_texBld').value = 6;
            document.querySelector('#inp_texOpa').value = .6;
            break;

        case 2:
            document.querySelector('#inp_fntClr').value = '#ffffff';
            document.querySelector('#inp_texBld').value = 5;
            document.querySelector('#inp_texOpa').value = .6;
            break;

        case 3:
            document.querySelector('#inp_fntClr').value = '#000000';
            document.querySelector('#inp_texBld').value = 11;
            document.querySelector('#inp_texOpa').value = 1;
            break;

        case 4:
            document.querySelector('#inp_fntClr').value = '#ffffff';
            document.querySelector('#inp_texBld').value = 5;
            document.querySelector('#inp_texOpa').value = .6;
            break;

        case 5:
            document.querySelector('#inp_fntClr').value = '#ffffff';
            document.querySelector('#inp_texBld').value = 1;
            document.querySelector('#inp_texOpa').value = .5;
            break;
    }

    updateButtonLabels();
}

function reset() {
    setPreset('1');
    document.querySelector('#inp_filPck').value = null;
    document.querySelector('#inp_fntSiz').value = 15;
    document.querySelector('#inp_linSpc').value = 1;
    document.querySelector('#inp_texRec').value = '';
    document.querySelector('#inp_texSbj').value = '';
    document.querySelector('#inp_imgQly').value = 2;
    document.querySelector('#inp_date').value = new Date().toISOString().substring(0, 10);

    updateButtonLabels();

    document.querySelector('#inp_prev').setAttribute('disabled', 'disabled');
    document.querySelector('#inp_save').setAttribute('disabled', 'disabled');
}

function init() {
    reset();

    document.querySelector('#yearNow').textContent = (new Date()).getFullYear();
    
    document.querySelector('#inp_filPck').addEventListener("input", (event) => {
        const btn = [document.querySelector('#inp_prev'), document.querySelector('#inp_save')];

        if (document.querySelector('#inp_filPck').files.length === 0) {
            btn[0].setAttribute('disabled', 'disabled');
            btn[1].setAttribute('disabled', 'disabled');
        }
        else {
            btn[0].removeAttribute('disabled');
            btn[1].removeAttribute('disabled');
        }
    });
}

function initComp() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger : 'hover'
        });
    })
}

function translate_init() {
    document.querySelector('#inp_texRec').placeholder = translate('inp_texRec_pch');
    document.querySelector('#inp_texSbj').placeholder = translate('inp_texSbj_pch');
    document.querySelector('#alrt_xprt').innerHTML = translate('alrt_xprt');
    document.querySelector('#inp_texBld_dsc').innerHTML = translate('inp_texBld_dsc');

    document.querySelector('#tltp_imgQly').setAttribute('data-bs-title', translate('tltp_imgQly'));
    document.querySelector('#inp_prev').setAttribute('data-bs-title', translate('inp_prev_pvr'));
    document.querySelector('#inp_save').setAttribute('data-bs-title', translate('inp_save_pvr'));

    document.querySelectorAll('.prset_dsc').forEach((div) => {
        div.setAttribute('data-bs-title', translate(div.id));
    });

    document.getElementById('img_example').src = translate('img_example');
    
    document.querySelectorAll('.trans').forEach((div) => {
        div.textContent = translate(div.id);
    });
}

function translate(_name) {
    let arrTexts = {};
    const lang = navigator.language || navigator.userLanguage;
    switch(lang) {
        case 'fr':
            arrTexts = {
                bdy_ttl: 'Appliquer un filigrane sur un PDF',
                bdy_dsc: 'L\'ensemble du processus est traité sur votre ordinateur personnel, aucune de vos données ne transite ailleurs.',
                bdy_add: 'Pour cette raison, l\'application du filigrane peut être lent en fonction de votre materiel informatique, de la taille et du nombre de pages de votre document, ainsi que la qualité d\'image sélectionnée.',
                inp_filPck_lbl: 'Le PDF auquel appliquer le filigrane',
                inp_fntClr_lbl: 'Couleur de la police',
                inp_texBld_lbl: 'Mode de fusion',
                slc_nrml: 'Normal',
                slc_diff: 'Différence',
                slc_xclu: 'Exclusion',
                slc_mlti: 'Produit',
                slc_ovrl: 'Incrustation',
                slc_scrn: 'Superposition',
                slc_clrb: 'Densité couleur +',
                slc_clrd: 'Densité couleur -',
                slc_drkn: 'Obscurcir',
                slc_ligh: 'Lumière crue',
                slc_ligt: 'Eclaircir',
                slc_ligs: 'Lumière tamisée',
                inp_fntSiz_lbl: 'Taille du texte',
                inp_linSpc_lbl: 'Facteur d\'espacement des lignes',
                inp_texOpa_lbl: 'Opacité du texte',
                inp_texRec_lbl: 'Texte 1',
                inp_texRec_pch: 'Destinataire',
                inp_texSbj_lbl: 'Texte 2',
                inp_texSbj_pch: 'Sujet',
                inp_imgQly_lbl: 'Qualité de l\'image',
                tltp_imgQly: 'Cette option impacte grandement la durée de traitement.',
                inp_date_lbl: 'Date',
                btn_presets: 'Pré-réglages',
                txt_prev: 'Prévisualisation :',
                inp_prev: 'Prévisualiser',
                inp_prev_pvr: 'Prévisualise la première page du PDF avec filigrane.',
                inp_save: 'Sauvegarder',
                inp_save_pvr: 'Enregistre le PDF avec filigrane.',
                bar_progress_finish: 'Terminé !',
                alrt_xprt: '<p class="p_alert">Veuillez patientez, même si la page se fige.</p>',
                inp_texBld_dsc: '(explications)',
                img_example:'res/img/example_fr.jpg',
                prset1_dsc: 'Défaut',
                prset2_dsc: 'Document coloré',
                prset3_dsc: 'Document aux tons clairs',
                prset4_dsc: 'Document aux tons foncés',
                prset5_dsc: 'Document aux couleurs contrastées',
            };
            break;

        default:
            arrTexts = {
                bdy_ttl: 'Apply Watermark on a PDF',
                bdy_dsc: 'The entire process is handled on your personal computer, none of your data is sent anywhere else.',
                bdy_add: 'For this reason, watermarking can be slow depending on your computer hardware, the size and number of pages of your document, and the image quality selected.',
                inp_filPck_lbl: 'The PDF to watermark',
                inp_fntClr_lbl: 'Font color',
                inp_texBld_lbl: 'Blend mode',
                slc_nrml: 'Normal',
                slc_diff: 'Difference',
                slc_xclu: 'Exclusion',
                slc_mlti: 'Multiply',
                slc_ovrl: 'Overlay',
                slc_scrn: 'Screen',
                slc_clrb: 'ColorBurn',
                slc_clrd: 'ColorDodge',
                slc_drkn: 'Darken',
                slc_ligh: 'HardLight',
                slc_ligt: 'Lighten',
                slc_ligs: 'SoftLight',
                inp_fntSiz_lbl: 'Font size',
                inp_linSpc_lbl: 'Line spacing factor',
                inp_texOpa_lbl: 'Text opacity',
                inp_texRec_lbl: 'Text 1',
                inp_texRec_pch: 'Recipient',
                inp_texSbj_lbl: 'Text 2',
                inp_texSbj_pch: 'Subject',
                inp_imgQly_lbl: 'Quality',
                tltp_imgQly: 'This option has a major impact on processing duration.',
                inp_date_lbl: 'Date',
                btn_presets: 'Presets',
                txt_prev: 'Preview:',
                inp_prev: 'Preview',
                inp_prev_pvr: 'Preview the first page of the watermarked PDF.',
                inp_save: 'Save',
                inp_save_pvr: 'Saves PDF with watermark.',
                bar_progress_finish: 'Finished!',
                alrt_xprt: '<p class="p_alert">Please wait, even if the page freezes.<p>',
                inp_texBld_dsc: '(explanations)',
                img_example:'res/img/example_en.jpg',
                prset1_dsc: 'Default',
                prset2_dsc: 'Colorful document',
                prset3_dsc: 'Document with light tones',
                prset4_dsc: 'Dark-toned document',
                prset5_dsc: 'Document with contrasting colors',
            };
            break;
    }

    return arrTexts[_name];
}

async function updateProgressBar() {
    let valueProgress = ((++window.progressBarCur / window.progressBarMax) * 100).toFixed(0);
    let prcntProgress = `${valueProgress}%`;
    
    document.querySelector('#bar_progress').style.width = prcntProgress;
    document.querySelector('#bar_progress').textContent = prcntProgress;
}

// Modified, original from 1047797/david, https://stackoverflow.com/a/11508164
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

async function proc(_preview) {
    document.querySelector('#bar_progress').classList.remove('bg-success');
    document.querySelector('#bar_progress').classList.add('bg-danger');
    document.querySelector('#bar_progress').classList.add('progress-bar-animated');

    document.querySelectorAll('input, select, button').forEach((button) => {
        button.setAttribute('disabled', 'disabled');
    });

    if (_preview)
        document.querySelector('#canvas').innerHTML = '';

    document.querySelector('#bar_progress').classList.remove('progress-bar');
    document.querySelector('#bar_progress').style.width = '0%';
    document.querySelector('#bar_progress').textContent = '0%';

    window.requestAnimationFrame(async function() {
        document.querySelector('#bar_progress').classList.add('progress-bar');
        window.progressBarCur = 0;

        window.pageProcessedCount = 0;
        
        let userFile = document.querySelector('#inp_filPck').files[0];
        window.userFile = userFile;
    
        var reader = await new FileReader();
        
        reader.onload = async (readerEvent) => {
            // Watermark the PDF, convert PDF pages to PNGs, embed PNGs to a new PDF, download the PDF
            await pdfProcess(_preview, readerEvent);
        };
    
        await reader.readAsArrayBuffer(userFile);
    });
}

async function pdfProcess(_preview, _readerEvent) {
    // Import PDF-Lib
        const PDFLib = window['PDFLib'];

        // Retrieve pdf content
        const content = await _readerEvent.target.result;

        // Create the new pdf
        const pdfDoc = await PDFLib.PDFDocument.load(content);
        
        // Retrieve font
        const helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

        // Get the pages to watermark
        const pages = await pdfDoc.getPages();

        // Store the maximum number of steps for the progress bar
        if (_preview)
            window.progressBarMax = 3;
        else
            window.progressBarMax = pages.length * 4;

        // Get date
        let dateNow = document.querySelector('#inp_date').value;

        // Format the user text
        let to = document.querySelector('#inp_texRec').value || '****************',
            about = document.querySelector('#inp_texSbj').value || '****************';
        let textUserFormat = [
            `- ${to} - ${about} - ${dateNow} `.split('').join(' ').repeat(4).toUpperCase(),
            `- ${dateNow} - ${to} - ${about} `.split('').join(' ').repeat(4).toUpperCase(),
            `- ${about} - ${dateNow} - ${to} `.split('').join(' ').repeat(4).toUpperCase(),
        ];

        // Declare text specifications
        const textSize = parseInt(document.querySelector('#inp_fntSiz').value);
        const textWidth = helveticaFont.widthOfTextAtSize(textUserFormat[0], textSize);
        const textHeight = helveticaFont.heightAtSize(textSize);
        
        // Write text on all pages
        const pagesCount = _preview ? 1 : pages.length;
        for (let i = 0; i < pagesCount; ++i) {
            // 
            await updateProgressBar();

            // Get first page
            const currentPage = await pages[i];

            // Retrieve page size
            const { width, height } = currentPage.getSize();

            // Convert color
            const arrColor = hexToRgb(document.querySelector('#inp_fntClr').value);

            // Set watermark options
            let heightCurr = -height;
            let idLine = 0;
            while (heightCurr < height) {
                currentPage.drawText(textUserFormat[(++idLine) % 3], {
                    x: 0,
                    y: heightCurr,
                    size: textSize,
                    font: helveticaFont,
                    color: PDFLib.rgb(arrColor.r, arrColor.g, arrColor.b),
                    blendMode: blendMode_IdToString(document.querySelector('#inp_texBld').value),
                    opacity: parseFloat(document.querySelector('#inp_texOpa').value),
                    rotate: PDFLib.degrees(45),
                });
                heightCurr += (textSize * 5) * parseFloat(document.querySelector('#inp_linSpc').value);
            }
        }

        // Convert pdf object to bytes array
        const pdfBytes = await pdfDoc.save();

        // Convert watermarked pdf pages to png
        await pdfToPng(_preview, pdfBytes);
}

function blendMode_IdToString(_val) {
    let ret = '';
    switch (_val) {
        case '1':   ret = 'Difference'; break;
        case '2':   ret = 'Exclusion';  break;
        case '3':   ret = 'Multiply';   break;
        case '4':   ret = 'Overlay';    break;
        case '5':   ret = 'Screen';     break;
        case '6':   ret = 'ColorBurn';  break;
        case '7':   ret = 'ColorDodge'; break;
        case '8':   ret = 'Darken';     break;
        case '9':   ret = 'HardLight';  break;
        case '10':  ret = 'Lighten';    break;
        case '11':  ret = 'SoftLight';  break;
        default:    ret = 'Normal';     break;
    }
    return ret;
}

async function pdfToPng(_preview, _pdfBytes) {
    // 
    window.data = [];
    window.totalPages = 0;
    var PDFJS = window['pdfjs-dist/build/pdf'];

    PDFJS.GlobalWorkerOptions.workerSrc = 'res/dep/pdfjs/pdf.worker.js';

    var loadingTask = await PDFJS.getDocument(_pdfBytes);

    await loadingTask.promise.then(async function(pdf) {
        var canvasdiv = document.getElementById('canvas');
        window.totalPages = pdf.numPages;

        const pagesMax = _preview ? 1 : window.totalPages;
        for (let pageNumber = 1; pageNumber <= pagesMax; ++pageNumber) {
            // 
            await updateProgressBar();

            // 
            await pdf.getPage(pageNumber).then(async function(page) {
                var scale = parseFloat(document.querySelector('#inp_imgQly').value);
                var viewport = page.getViewport({ scale: scale });

                var canvas = document.createElement('canvas');

                if (_preview)
                    canvasdiv.appendChild(canvas);

                // Prepare canvas using PDF page dimensions
                var context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                if (window.devicePixelRatio > 1) {
                    canvas.width *= window.devicePixelRatio;
                    canvas.height *= window.devicePixelRatio;

                    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
                }

                window.pageWidth = viewport.width;
                window.pageHeight = viewport.height;

                // Render PDF page into canvas context
                var renderContext = { canvasContext: context, viewport: viewport };

                // 
                var renderTask = await page.render(renderContext);
                
                // 
                await renderTask.promise.then(async function() {
                    // 
                    window.data[pageNumber - 1] = canvas.toDataURL('image/png');

                    // 
                    if (++window.pageProcessedCount == pagesMax) {
                        // 
                        showAlertExport(true);

                        // 
                        window.requestAnimationFrame(async function() {

                            // Download pdf file
                            if (!_preview){    
                                // 
                                const pdfBytesSave = await pngToPdf(_preview);

                                //
                                await pdfDownload(_preview, pdfBytesSave);
                            }
                            
                            buttonsDefaultState();
                        });
                    }
                    else
                        // 
                        await updateProgressBar();
                });
            });
        }
    }, function(reason) {
        console.error(`An error occured: ${reason}`);
    });
}

function buttonsDefaultState() {
    showAlertExport(false);

    document.querySelectorAll('input, select, button').forEach((button) => {
        button.removeAttribute('disabled', 'disabled');
    });

    document.querySelector('#bar_progress').classList.remove('progress-bar-animated');
    document.querySelector('#bar_progress').classList.remove('bg-danger');
    document.querySelector('#bar_progress').classList.add('bg-success');
    document.querySelector('#bar_progress').textContent = translate('bar_progress_finish');
    document.querySelector('#bar_progress').style.width = '100%';
}

function showAlertExport(_show) {
    if (_show)
        document.querySelector('#alrt_xprt').style.display = 'block';
    else
        document.querySelector('#alrt_xprt').style.display = 'none';
}

async function pngToPdf(_preview) {
    let DateNowSave = new Date();
    const pdfDocSave = await PDFLib.PDFDocument.create();
    pdfDocSave.setTitle('');
    pdfDocSave.setAuthor('');
    pdfDocSave.setSubject('');
    pdfDocSave.setKeywords(['']);
    pdfDocSave.setProducer('');
    pdfDocSave.setCreator('');
    pdfDocSave.setCreationDate(DateNowSave);
    pdfDocSave.setModificationDate(DateNowSave);
    
    let idImage = 0;
    const pagesCount = _preview ? 1 : window.totalPages;
    for (let i = 0; i < pagesCount; ++i) {
        // 
        await updateProgressBar();

        // 
        const newPage = await pdfDocSave.addPage([window.pageWidth, window.pageHeight]);
        
        const img = await pdfDocSave.embedPng(window.data[idImage]);
        
        newPage.drawImage(img, {
            x: 0,
            y: 0,
            width: window.pageWidth,
            height: window.pageHeight,
            blendMode: 'Normal',
        });

        ++idImage;
    }

    return await pdfDocSave.save()
}

async function pdfDownload(_preview, _pdfBytes) {
    if (_preview === false) {
        let filename = window.userFile.name;
        filename = `${filename.substring(0, filename.lastIndexOf('.'))}__watermark.pdf`;

        var blob = new Blob([_pdfBytes], {type: "application/pdf"});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
}