const express = require('express')
const axios = require('axios')

var session = require('express-session')
const app = express()
const port = 3000
const baseURL = "https://www.ecfr.gov"
const endpoints = Object.freeze({
    //ADMIN SERVICE
    Agencies:"/api/admin/v1/agencies.json",
    Corrections:"/api/admin/v1/corrections.json",
    Titles:"/api/versioner/v1/titles.json",
    TitleSelector: "/api/versioner/v1/full/2025-04-01/title-"


});

function titleObject(number,title)
{
  this.key = number;
  this.title = title;
}

function agencyObject(key,name,shortName,cfrReference)
{
  this.key = key;
  this.name = name;
  this.shortName = shortName;
  this.cfrReference = cfrReference;
}

function correctionsObject(CFRReference,correctiveAction,dateErrorOccurred,dateErrorCorrected)
{
  this.CFRReference = CFRReference;
  this.correctiveAction = correctiveAction;
  this.dateErrorOccurred = dateErrorOccurred;
  this.dateErrorCorrected = dateErrorCorrected;
}

app.use(session({
  secret:'mySecret',
}))

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8081');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

app.get('/corrections{/:startIndex}{/:endIndex}',(req,res)=>{

  var startIndex = req.params.startIndex
  var endIndex = req.params.endIndex
  console.log(startIndex+" "+endIndex);
  if(!req.session.correctionsList)
  {
    axios.get(baseURL+endpoints.Corrections).then(response=>{
      var correctionsList = [];
      for(var i=response.data.ecfr_corrections.length-1;i>0;i--)
      {
        correctionsList.push(new correctionsObject(response.data.ecfr_corrections[i].cfr_references[0].cfr_reference,response.data.ecfr_corrections[i].corrective_action,response.data.ecfr_corrections[i].error_occurred,response.data.ecfr_corrections[i].error_corrected));
      }
      req.session.correctionsList = correctionsList;
      req.session.correctionsList.length=correctionsList.length;
      startIndex = req.params.startIndex?req.params.startIndex:0;
      console.log(req.session.correctionsList.length);
      endIndex = req.params.endIndex?req.params.endIndex:req.session.correctionsList.length-1;
      if(endIndex > req.session.correctionsList.length-1)
        endIndex = req.session.correctionsList.length-1;
      console.log(startIndex+" "+endIndex);
      //console.log("Loaded "+req.session.correctionsList[endIndex].CFRReference);
      res.send(Array.from(req.session.correctionsList).slice(startIndex,endIndex));
    });
  }
  else
  {
    startIndex = req.params.startIndex?req.params.startIndex:0;
      console.log(req.session.correctionsList.length);
      endIndex = req.params.endIndex?req.params.endIndex:req.session.correctionsList.length-1;
      if(endIndex > req.session.correctionsList.length-1)
        endIndex = req.session.correctionsList.length-1;
      console.log(startIndex+" "+endIndex);
    res.send(Array.from(req.session.correctionsList).slice(startIndex,endIndex));
  }
 




  
})



app.get('/agencies',(req,res)=>{
  req.session.agencies = null
  if(!req.session.agencies)
  {
    axios.get(baseURL+endpoints.Agencies).then(response=>{
      var agencyList = [];
      for(var i=0;i<response.data.agencies.length;i++)
      {
        agencyList.push(new agencyObject(i,response.data.agencies[i].name,response.data.agencies[i].short_name,response.data.agencies[i].cfr_references));
      }
      req.session.agencies = agencyList;
      res.send(agencyList);
    })
  }
  else
    res.send(req.session.agencies);
})

app.get('/titles',(req,res)=>{
  if(!req.session.titles)
  {
    axios.get(baseURL+endpoints.Titles).then(response=>{
      var titleList = [];
      for(var i=0;i<response.data.titles.length;i++)
      {
        titleList.push(new titleObject(response.data.titles[i].number,response.data.titles[i].name))
      }
      req.session.titles=titleList
      res.send(titleList)});
  }
  else
  {
    res.send(req.session.titleList);
  }
  
})

app.get('/',(req, res) => {
    console.log("It ran")
    
    axios.get(baseURL+endpoints.Agencies).then(response=>res.send(response.data));
    
    //res.send("tada")
  //res.send(baseURL+endpoints.Agencies)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})