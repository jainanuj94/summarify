// app/api/extract/route.ts
import {NextResponse} from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
    const {url} = await req.json();

    try {
        // Fetch the webpage
        const response = await axios.get(url);
        const html = response.data;

        // Load the HTML with Cheerio
        const $ = cheerio.load(html);

        let mainContent = $("main").text().trim(); // Simplified for demonstration
        if (!(!!mainContent)) {
            mainContent = $.text().trim()
        }
        return NextResponse.json({content: JSON.stringify(mainContent)});
    } catch (error: never) {
        console.log("failed");
        return NextResponse.json({error: 'Failed to extract content'}, {status: 500});
    }
}
