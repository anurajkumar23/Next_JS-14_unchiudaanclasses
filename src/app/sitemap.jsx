

export default async function sitemap(){
    const  baseurl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}`


    const response1 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/currentaffairs`) 
    const data1 = await response1.json()
    const affairs = data1.data.affairs;
    const affairsUrl = affairs.map((affairs) => ({
        url: `${baseurl}/currentaffairs/${affairs._id}`,
        lastModified: affairs.updatedAt,
    }));


    const response2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/News`) 
    const data2 = await response2.json()
    const news = data2.data.news;
    const newsUrl = news.map((news) => ({
        url: `${baseurl}/News/${news._id}`,
        lastModified: news.updatedAt,
    }));

    const response3 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pdfs`) 
    const data3 = await response3.json()
    const pdf = data3.data.pdf;
    const pdfUrl = pdf.map((pdf) => ({
        url: `${baseurl}/pdfs/${pdf._id}`,
        lastModified: pdf.updatedAt,
    }));

    const response4 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test`) 
    const data4 = await response4.json()
    const tests = data4.data.tests;
    const testsUrl = tests.map((tests) => ({
        url: `${baseurl}/test/${tests._id}`,
        lastModified: tests.createdAt,
    }));

    return [
        {
            url: baseurl,
            lastModified: new Date()
        },
        {
            url: `${baseurl}/test`,
            lastModified: new Date()
        },
        {
            url: `${baseurl}/Currentaffairs`,
            lastModified: new Date()
        },
        {
            url: `${baseurl}/News`,
            lastModified: new Date()
        },
        {
            url: `${baseurl}/pdfs`,
            lastModified: new Date()
        },
        {
            url: `${baseurl}/login`,
            lastModified: new Date()
        },
        {
            url: `${baseurl}/signup`,
            lastModified: new Date()
        },

        ...affairsUrl,
        ...newsUrl,
        ...pdfUrl,
        ...testsUrl,
       
    ]
    
}