import { chromium } from 'playwright';

// generar resultados de Google

async function getResultsFromGoogle(query){

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    await page.type('input[name="q"]', query);
    await page.keyboard.press('Enter');

    await page.waitForNavigation({ waitUntil:'networkidle' }); // Se espera hasta que el navegador complete todas las solicitudes
       
    const listadoResultados = await page.evaluate(() => {
        let resultados = [];
        document
            .querySelectorAll('div [data-header-feature] div a')
            .forEach((anchor, index) => {
                resultados.push({
                    index: index,
                    title: anchor.innerText,
                    url: anchor.href,
                });
            });

        return resultados;    
    });

    console.log(listadoResultados);
    await browser.close();
}
