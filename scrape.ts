import {cheerio} from 'https://deno.land/x/cheerio@1.0.4/mod.ts';

// Load document
const res = await fetch('https://scholar.google.com/citations?user=aasVZFYAAAAJ&hl=en');
const html = await res.text();
const $ = cheerio.load(html);

// Iterate over table rows
const data = $('.gsc_a_tr')
    .map((_, row) => {
        const title = $(row).find('.gsc_a_at').text();
        const citations = parseInt($(row).find('.gsc_a_c').text(), 10) || 0;
        const year = $(row).find('.gsc_a_y').text();
        return {title, citations, year};
    })
    .get();

console.log(data);
