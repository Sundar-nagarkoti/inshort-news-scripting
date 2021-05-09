const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");

request("https://inshorts.com/en/read/",callback);

let HeadingArr = [];
let Summery = [];
let NewsLinks = [];
let MyNews = [];
function callback(err,res,html){
    if(!err){
        let $=cheerio.load(html);
        let NewsHeading = $("a.clickable");
        for(let i = 0 ; i < NewsHeading.length;i++){
            let Heading = $(NewsHeading[i]).text();
            let Links = $(NewsHeading[i]).attr("href");
            let MyLinks = "https://inshorts.com"+Links;
            NewsLinks.push(MyLinks);
            let hd = Heading.trim();
            HeadingArr.push(hd);
        }

        let des = $(".news-card-content.news-right-box div");
        for(let i = 0 ; i < des.length;i = i+2){
            let newsdes = $(des[i]).text();
            Summery.push(newsdes);
        }



        for(let i = 0; i < 25; i++){
            MyNews.push({
                "NEWSN0" : i+1,
                "NEWSHEADING" : HeadingArr[i],
                "NEWSUMMERY" : Summery[i],
                "NEWSLINKS" : NewsLinks[i]
            })
        }
        for(let i=0;i<25;i++){
            console.log(MyNews[i]);
        }
        
        fs.writeFileSync("mynews.json",JSON.stringify(MyNews));
    }
}