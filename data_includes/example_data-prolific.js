var Parameters = {},
    URLParameters = window.location.search.replace("?", "").split("&");

for (parameter in URLParameters) Parameters[URLParameters[parameter].split("=")[0]] = URLParameters[parameter].split("=")[1];

assert(Parameters.hasOwnProperty("id") == true, "Oops! It looks like something's gone wrong with your URL. Please return to Prolific and try the link again!");

var id = Parameters.id;




var shuffleSequence = seq("consent","setcounter","instructions",startsWith("Practice"),"cont",rshuffle(startsWith("experiment")),"post-exp");
//var shuffleSequence = seq("setcounter","consent","instructions",startsWith("Practice"),"cont","post-exp");
var practiceItemTypes = ["Practice1", "Practice2"];
var manualSendResults = true;
var showProgressBar = true;


var defaults = [
    "Separator", {
      //  transfer: 1000,
        normalMessage: "Please wait for the next sentence.",
        continueMessage: "Click here to continue."
      //  errorMessage: "Wrong. Please wait for the next sentence."
    },
    "Message", {
        transfer: 4000,
        hideProgressBar: true,
        continueMessage: "Click here to continue."
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true,
        continueMessage: "Click here to continue."
    }
];

define_ibex_controller({
    name: "WrittenJudgement",
    jqueryWidget: {
        _init: function () {
         //  console.log(this.options);
          //  console.log(this.options.question);
         //   this.options.transfer = null; // Remove â€™click to continue messageâ€™.
            
            
            this.element.VBox({
                options: this.options,
                triggers: [1],
                children: [
                    "Message", { html: '<html><div ><b><p>'+this.options.Background+'</p></b><br /><p>'+this.options.Xsays+'<i>'+this.options.Stimuli+'</i></p></div></html>', transfer: null},
                    //"Message", { html: '<html><div align="left"><p><i>'+this.options.stims+'</i></p></div></html>', transfer: 2000},
                  //  "Message", {html: '<html><div align="left"><p>It is...</p></div></html>', transfer: null},
                    "Form", {html: {include: "form.html"}, transfer: null}
                  //  "Message", { html: '<html><div align="left"><p>'+this.options.question+'</p></div></html>', transfer: null}
                ]
            });
             $("input[name=ItemName]").val(this.options.ItemName);
             $("input[name=polarity]").val(this.options.polarity);
             $("input[name=lemma]").val(this.options.lemma);
             $("input[name=EmbPred]").val(this.options.EmbPred);
             $("input[name=Tense]").val(this.options.Tense);     
             $("input[name=Expt]").val(this.options.Expt);
             $("input[name=ExptType]").val(this.options.ExptType);           
             $("input[name=ItemNo]").val(this.options.ItemNo);            
             $("input[name=NoExpt]").val(this.options.NoExpt);
             $("input[name=SubjectGroup]").val(this.options.SubjectGroup);
             $("input[name=PredicateType]").val(this.options.PredicateType);
             $("input[name=Stimuli]").val(this.options.Stimuli);
             $("input[name=Xsays]").val(this.options.Xsays);
             $("input[name=mcpred]").val(this.options.mcpred);
             $("input[name=continuation]").val(this.options.continuation);
             $("input[name=AHbeliefQuestion]").val(this.options.AHbeliefQuestion);
             $("input[name=EcsubjectCol]").val(this.options.EcsubjectCol);
             $("input[name=Topic]").val(this.options.Topic);
             $("input[name=Background]").val(this.options.Background);
             $("input[name=id]").val(this.options.id);
             $("p[name=Background]").text(this.options.Background);
             $("p[name=Stimuli]").text(this.options.Stimuli);
             $("p[name=Xsays]").text(this.options.Xsays);
             $("span[name=q]").html(this.options.AHbeliefQuestion);     
             $("span[name=r]").html(this.options.EcsubjectCol);            
             $("span[name=p]").html(this.options.continuation);       
             $("#leftScale").html(this.options.leftScale);
             $("#rightScale").html(this.options.rightScale);
             $("#midScale").html(this.options.midScale);
        }
    },
    properties: { }
});


var items = GetItemsFrom(data, null, {
  
    
    
  ItemGroup: ["ItemNo", "SubjectGroup"],
  
  Elements: [
    
      
      //function(row){ return [row.ItemName, row.polarity, row.lemma, row.Group, row.HTclass, row.stims, row.mcpred, row.ECcont, row.topic, row.question, row.background].join('+'); },
      function(row){return row.Expt}, "Message", {
         html: function(row){return '<html><div align="left"><p><b>'+row.Background+'</b></p><br /><p>'+row.Xsays+'<i>'+row.Stimuli+'</i></p></div></html>'},
        transfer:3500  
          
      // LIKELY OLD      
      },"WrittenJudgement", {
          Background: function(row){ return row.Background; },
          Stimuli: function(row){ return row.Stimuli; },
          Xsays: function(row){ return row.Xsays; },
          AHbeliefQuestion: function(row){ return row.AHbeliefQuestion; },
          EcsubjectCol: function(row){ return row.EcsubjectCol; },      
          ItemName: function(row){return row.ItemName;},
          polarity: function(row){return row.polarity;},
          lemma: function(row){return row.lemma;},
          EmbPred: function(row){return row.EmbPred;},
          Tense: function(row){return row.Tense;},
          Expt: function(row){return row.Expt;},
          ExptType: function(row){return row.ExptType;},
          ItemNo: function(row){return row.ItemNo;},     
          NoExpt: function(row){return row.NoExpt;},   
          SubjectGroup: function(row){return row.SubjectGroup;},
          PredicateType: function(row){return row.PredicateType;},
          mcpred: function(row){return row.mcpred;},
          continuation: function(row){return row.continuation;},
          Topic: function(row){return row.Topic;},
          leftScale: function(row){return "<b>definitely didn't</b> ";},
          rightScale: function(row){return "<b>definitely did</b>";},   
          midScale: function(row){return "<b>possibly did</b> ";},
          id: id
      }   
  ]
    
}).concat(


  [   
    ["setcounter", "__SetCounter__", { } ],    
    ["consent", "Form", { html: {include: "IbexConsentProlific.html"} } ],       
    ["instructions", "Form", { html: {include: "IbexInstructions.html"} } ],    
    ["cont", "Message", { html: '<html><div align="center"><p>The actual experiment is about to begin.</p><p> Please turn off any possible distractions and complete the experiment in one sitting.</p></div></html>'}],    
    ["practice", "Separator", { transfer: "keypress", normalMessage: "Thanks. Please click here, or press any key to proceed to the experiment." } ],
    ["post-exp", "Form", { html: {include: "IbexFeedbackPreConfirmationProlific.html"} } ],
    ["post-exp", "__SendResults__", {} ],                       
    ["post-exp", "Message", { transfer:null, html: {include: "IbexConfirmationProlific.html"} } ]  
    //["post-exp", "Form", {html: {include: "IbexDebriefing.html"} } ],
    //["post-exp", "Message", {html: '<html><div align="center"><p><b>The results were successfully sent to the server. Thanks!</b></p></div></html>'}]
  ]
      
    
);
console.log(items[1][2]);