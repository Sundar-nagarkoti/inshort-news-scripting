const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");

request("https://inshorts.com/en/read/",callback);

let headingarr = [];
let summery = [];
let newlinks = [];
let mynews = [];
function callback(err,res,html){
    if(!err){
        let $=cheerio.load(html);
        let newsheading = $("a.clickable");
        for(let i = 0 ; i < newsheading.length;i++){
            let heading = $(newsheading[i]).text();
            let newslinks = $(newsheading[i]).attr("href");
            let mylinks = "https://inshorts.com"+newslinks;
            newlinks.push(mylinks);
            let hd = heading.trim();
            headingarr.push(hd);
        }

        let des = $(".news-card-content.news-right-box div");
        for(let i = 0 ; i < des.length;i = i+2){
            let newsdes = $(des[i]).text();
            summery.push(newsdes);
        }



        for(let i = 0; i < 25; i++){
            mynews.push({
                "NEWSHEADING" : headingarr[i],
                "NEWSUMMERY" : summery[i],
                "NEWSLINKS" : newlinks[i]
            })
        }
        for(let i=0;i<25;i++){
            console.log(mynews[i]);
        }
        
        fs.writeFileSync("mynews.json",JSON.stringify(mynews));
    }
}