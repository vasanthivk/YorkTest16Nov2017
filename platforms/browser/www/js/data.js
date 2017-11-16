var proddata=new Object();

var appStatus=new Object();

appStatus.mode='shopping';

var proddata={};
proddata.lastBarcode='';

var lastPosition='nogps';

var barcodeStore=new Object();

var lastCompare=new Object();

var appdata=new Object();

var appsignup=new Object();

var userdata=new Object();
userdata.email='';
userdata.userid='';

var feedbackCache=new Object();
feedbackCache.list=[];

var barcodecache={};


feedbackCache.add=function(message){
  var fbl=feedbackCache.list;
  fbl.push(message);
}

feedbackCache.showlist=function(){
  for(idx in feedbackCache.list){
  }
}

feedbackCache.send=function(){

}


appStatus.setWorkingMode=function(mode,t,routePage){
  routePage=(routePage==undefined)? true : routePage;
  store.put('appStatus:workingMode',mode);
  var b4=$('.targ-bay4');
  var scan=$('.scan-btn');
  switch(mode){
    case 'shopping':
      b4.find('i').removeClass('fa-cutlery').addClass('fa-shopping-cart');
      b4.find('.tab-label').text('Shopping');
      scan.text('SCAN').data('extra','shopping');
      b4.data('extra','shopping');

      appStatus.mode='shopping';
      $('.scan-btn').removeClass('scan-btn-shop').html('SCAN');
      if(routePage){
          page.route('retail',t,'shopping');
      }
      break;
    case 'eating':
      b4.find('i').removeClass('fa-shopping-cart').addClass('fa-cutlery');
      b4.find('.tab-label').text('Eating');
      scan.text('MENU').data('extra','eating');
      b4.data('extra','eating');

      appStatus.mode='eating';
      $('.scan-btn').addClass('scan-btn-shop');
      $('.scan-btn').html('<i class="fa fa-map-o" aria-hidden="true"></i>MENU');
      if(routePage){
          page.route('retail',t,'eating');
      }
      break;
    
  }

}




appdata.device='';

appdata.loadBarcodeCache=function(cmd){
  cmd=(cmd==undefined)?'loadcache':cmd;
  if(connect.connected()){
    msg.show('Loading barcode data',9000,true);
    api.call(cmd,'',function(data){
      store.put('barcodecache',data);
      barcodecache=JSON.parse(data);
      msg.show('Loaded data '+Object.keys(barcodecache).length,1000);
    });
  }else{
    msg.show('No network',2000);
  }
}

appsignup.put=function(state){
  store.put('app.signup.state',state);
}

appsignup.get=function(){
  if(store.get('app.signup.state')==''){
    return 'new';
  }else{
    return store.get('app.signup.state');
  }
}

appsignup.showOld=function(){
  state=appsignup.get();
  switch(state){
    case 'new':

    appsignup.put('allergens');
    appdata.showTerms('#signup-terms');
    $('.signup-allergens').remove();



      break;
    case 'allergens':
    appdata.showAllergens('#signup-allergens');

      break;
    case 'completed':
    $('.signup-panel').remove();
      break;
  }
}

appsignup.show=function(){
  state=appsignup.get();
  state='completed';
  switch(state){
    case 'new':
    //appsignup.put('allergens');
    appdata.showTerms('#signup-terms');
    $('.signup-allergens').remove();
      break;
    case 'allergens':
      appdata.showAllergens('#signup-allergens');
      break;
    case 'completed':
    $('.signup-panel').remove();
      break;
  }
}



appdata.state={};
appdata.state.profileNo=1;
appdata.default={};

appdata.allergens={};
appdata.intolerances={};
appdata.intolerances.count=0;

appdata.userProfiles=[];
appdata.userProfiles[1]={name:'General',ingredients:'',calories:220,totalfat:16.5,saturatedfat:3.3,salt:1.9,sugar:9,protein:21,carbs:9.3,fibre:5,cholesterol:37};
appdata.userProfiles[2]={name:'#DELETED#'};
appdata.userProfiles[3]={name:'#DELETED#'};
appdata.userProfiles[4]={name:'#DELETED#'};
appdata.userProfiles[5]={name:'#DELETED#'};
appdata.userProfiles[6]={name:'#DELETED#'};
appdata.userProfiles[7]={name:'#DELETED#'};
appdata.userProfiles[8]={name:'#DELETED#'};
appdata.userProfiles[9]={name:'#DELETED#'};
appdata.userProfiles[10]={name:'#DELETED#'};
appdata.userProfiles[11]={name:'#DELETED#'};
appdata.userProfiles[12]={name:'#DELETED#'};
appdata.userProfiles[13]={name:'#DELETED#'};
appdata.userProfiles[14]={name:'#DELETED#'};
appdata.userProfiles[15]={name:'#DELETED#'};

appdata.default.userProfiles={name:'New profile',calories:0,totalfat:0,saturatedfat:0,salt:0,sugar:0,protein:0,carbs:0,fibre:0,cholesterol:0,ingredients:''};


appdata.shortcuts={};
appdata.shortcuts[1]={ref:1,name:'Profile 1'};
//appdata.shortcuts[2]={ref:2,name:'Profile 2'};
//appdata.shortcuts[3]={ref:3,name:'Profile 3'};

appdata.user={};
appdata.user.allergens='';
appdata.user.intolerances={};

appdata.slider={};
appdata.slider.calories={label:'calories',below:100,mid:200,above:300,max:450,start:0,unit:'Kcal'};
appdata.slider.totalfat={label:'total fat',below:3,mid:15,above:25,max:35,start:0,unit:'g'};
appdata.slider.saturatedfat={label:'saturated fat',below:1.5,mid:3,above:5,max:7,start:0,unit:'g'};
appdata.slider.salt={label:'salt',below:0.3,mid:0.9,above:1.5,max:4,start:0,unit:'g'};
appdata.slider.sugar={label:'sugar',below:5,mid:10,above:15,max:20,start:0,unit:'g'};
appdata.slider.protein={label:'protein',below:8,mid:21,above:35,max:40,start:0,unit:'g'};
appdata.slider.carbs={label:'carbs (Starch)',below:9,mid:12,above:15,max:20,start:0,unit:'g'};
appdata.slider.fibre={label:'fibre',below:3,mid:4.5,above:6,max:10,start:0,unit:'g'};
appdata.slider.cholesterol={label:'cholesterol',below:15,mid:35,above:60,max:80,start:0,unit:'mg'};


data=new Object();
data.check=function(){
  //check for missing data and insert defaults if required
  if(appdata.shortcuts[1]==undefined){
    data.resetShortcuts();
    appdata.saveShortcuts();
  }
}

data.resetShortcuts=function(){
  return;
  appdata.shortcuts[1]={ref:1,name:'General'};
  //appdata.shortcuts[2]={ref:2,name:'Profile 2'};
  //appdata.shortcuts[3]={ref:3,name:'Profile 3'};

}

appdata.findFirstActive=function(){
    var idx=0;
    for(idx in appdata.userProfiles){
        if(appdata.userProfiles[idx]['name']!='#DELETED#'){
          return idx;
        }
    }
    return -1;
}


appdata.findFreeProfile=function(){
    var idx=0;
    for(idx in appdata.userProfiles){
        if(appdata.userProfiles[idx]['name']=='#DELETED#'){
          return idx;
        }
    }
    popup.show('No free profiles. Please delete an existing profile','OK');
    return -1;
}

appdata.makeCopy=function(inRef){
    var newCopy = jQuery.extend(true, {}, appdata.userProfiles[inRef]);
    newCopy.preset=false;
    newCopy.name='My '+newCopy.name;
    var free=appdata.findFreeProfile();
    appdata.insert(newCopy);
    appdata.state.profileName=newCopy.title;
    appdata.state.profileNo=1;
    newslide.updateStore();
    page.route('profile','list');
    first=$('.act-download-menu:first');
    first.find('.toggle').trigger('click');
    first.find('.act-profile-title').trigger('click');
}

appdata.removeDeleted=function(){
  var tmp = jQuery.extend(true, {}, appdata.userProfiles);
  var cc=1;
  for(var tt=1;tt<=29;tt++){
    if(tmp[tt]!=undefined){
      if(tmp[tt]['name']!='#DELETED#' && tmp[tt]['name']!=undefined){
        var nw = jQuery.extend(true, {}, tmp[tt]);
        appdata.userProfiles[cc]=nw;
        cc++;
      }

    }
  }
}

appdata.insert=function(inData){
  appdata.removeDeleted();
  for(tt=29;tt>1;tt--){
      if(appdata.userProfiles[tt-1]==undefined){
        var newProfile={name:'#DELETED#',calories:0,totalfat:0,saturatedfat:0,salt:0,sugar:0,protein:0,carbs:0,fibre:0,cholesterol:0,ingredients:''};
        appdata.userProfiles[tt-1]=newProfile;
      }
      var copy = jQuery.extend(true, {}, appdata.userProfiles[tt-1]);
      appdata.userProfiles[tt]=copy;
  }
  appdata.userProfiles[1]=inData;

}

appdata.showShortcuts=function(){
  for(idx in appdata.shortcuts){
    g=appdata.shortcuts[idx];
    if(appdata.userProfiles[g.ref]!=undefined){
      prof=appdata.userProfiles[g.ref];
      if(prof.name!='#DELETED#'){
        $('.fave-item-'+idx).html('<div class="cc">'+prof.name+'</div>');
        $('.fave-item-'+idx).attr('href','#'+g.ref);
      }else{
        $('.fave-item-'+idx).html('<span></span>').attr('href','#-1');
      }

    }else{
        $('.fave-item-'+idx).html('<span></span>').attr('href','#-1');
    }
  }
}




appdata.saveShortcuts=function(){
  store.put('appdata.shortcuts',JSON.stringify(appdata.shortcuts));
  appdata.showShortcuts();
}

appdata.loadShortcuts=function(){
    appdata.shortcuts=safeJson.parse(store.get('appdata.shortcuts'));
    appdata.showShortcuts();
}

appdata.showProfiles=function(){
  appdata.setFixedProfiles();
  var op='';
  //op+='<a href="#" class="btn-profile-edit act-profile-edit-start" dtat-mode="notedit">Edit</a>';
  var idx;
  iconlist.setIcon('icon-compose');
  for(idx in appdata.userProfiles){
    pp=appdata.userProfiles[idx];
    if(pp.name!='#DELETED#'){
      pos=appdata.isShortcut(idx);
        op+=iconlist.item(pp.name,'act-download-menu',idx,pos);
    }

  }
  return op;
}

appdata.isShortcut=function(inRef){
  var idx1;
  for(idx1 in appdata.shortcuts){
    if(appdata.shortcuts[idx1]['ref']==inRef){
      return idx1;
    }
  }
  return -1;
}

appdata.loadallergens=function(){
  if(connect.connected()){
    api.call('allergens','',function(data){
      appdata.allergens=safeJson.parse(data);
      store.put('appdata.allergens',data);
      console.log('---------- allergen---------');
      console.log(data);
    });
  }else{
      msg.show('loading from cache',2000);
      appdata.allergens=safeJson.parse(store.get('appdata.allergens'));
  }
}

appdata.loadprofiles=function(){
  api.call('profiles','',function(data){
    appdata.profiles=safeJson.parse(data);
    appdata.setFixedProfiles();
    profileTools.loadCurrent();
  });
}

appdata.saveprofiles=function(){

}

appdata.setFixedProfiles=function(){
  slot=1;
  for(idx in appdata.profiles){
    var tp=appdata.profiles[idx];
    tp.preset=true;
    appdata.userProfiles[slot]=tp;
    slot++;
  }
  console.log(appdata.userProfiles);

}

appdata.getProfileItem=function(item){
  try {
	    return appdata.userProfiles[appdata.state.profileNo][item];
	}
	catch(err) {
	    return '';
	}

}

appdata.showIngredients=function(){
  op='<h4>Excluded Ingredients</h4>';
  op+=appdata.getProfileItem('ingredients');
  $('#subtab-ingredients').html(op);
  return op;
}

appdata.communities='';

appdata.showCategories=function(inTarget){
  var op='';
  var comms=['Arthritis','Babies','Cancer','Coeliacs','Dementia','Diabetics','Family Friendly','Fine Dining','Fit or Getting Fitter','Food Allergies','Heart Disease','Silver Surfers','Toddlers'];
  op+=picker.start('','',true);
  op+=picker.startList();

  for(var idx in comms){
    //op+=comms[idx]+',';
    op+=picker.add(comms[idx],true,appdata.communities,'comm-toggle');
  }
  op+=picker.stopList();
  op+=picker.close();

  $(inTarget).html(op);
}

appdata.updateComms=function(){
  var comm='';
  $('.comm-toggle.active').each(function(){
    var p=$(this).parent();
    comm+=p.text()+',';
    console.log(p.text());
  });
  appdata.communities=comm.slice(0, -1);
  store.put('appdata.communities',appdata.communities);
}

appdata.loadCommunities=function(){
appdata.communities=store.get('appdata.communities');
}


appdata.showAllergens=function(inTarget){
  inTarget=(inTarget==undefined)?'#allergenlist':inTarget;
  op='';
  op+=picker.start('','',true);
  op+=picker.startList();
    for(idx in appdata.allergens.A){
      op+=picker.add(appdata.allergens.A[idx]['title'],true,appdata.user.allergens,'allergen-toggle');
    }
    op+=picker.stopList();
    op+=picker.close();
    $(inTarget).html(op);
}

appdata.showIntolerances=function(){
  op='';
    for(idx in appdata.allergens.I){
      var itemName=appdata.tryIntolerance(idx);
      op+=picker.startIntol(appdata.allergens.I[idx]['title']);
      bd=appdata.allergens.I[idx]['breakdown'];
      if(bd!=null){
        op+=picker.startList('hide');
        bdl=bd.split(',');
        op+=picker.addIntol('Select All',itemName,'targ-intol-item act-select-all');
        for(idx in bdl){
            op+=picker.addIntol(bdl[idx],itemName,'targ-intol-item');
        }
        op+=picker.stopList();
        op+=picker.close();

      }else{
          op+=picker.close();
      }
    }
    $('.intolerances-dislikes').html(op);
    appdata.intoleranceCount();
}

appdata.setUnderline=function(){
  const ctab=$('.act-intol-tab.selected');
  const ww=ctab.width();
  let pos=ctab.offset();
  $('.intol-tab-underline').css({left:pos.left,width:ww});
}

appdata.showLikes=function(){
  op='';
  console.log(appdata.allergens.L);
  for(idx in appdata.allergens.L){
    var itemName=appdata.tryLikes(idx);
    op+=picker.startIntol(appdata.allergens.L[idx]['title']);
    bd=appdata.allergens.L[idx]['breakdown'];
    if(bd!=null){
      op+=picker.startList('hide');
      bdl=bd.split(',');
      //op+=picker.addIntol('Select All',itemName,'targ-intol-item act-select-all');
      for(idx in bdl){
          op+=picker.addIntol(bdl[idx],itemName,'targ-like-item');
      }
      op+=picker.stopList();
      op+=picker.close();

    }else{
        op+=picker.close();
    }
  }
    for(idx in appdata.allergens.I){
      //var itemName=appdata.tryIntolerance(idx);
      var itemName=appdata.tryLikes(idx);
      op+=picker.startIntol(appdata.allergens.I[idx]['title']);
      bd=appdata.allergens.I[idx]['breakdown'];
      if(bd!=null){
        op+=picker.startList('hide');
        bdl=bd.split(',');
        op+=picker.addIntol('Select All',itemName,'targ-like-item act-select-all');
        for(idx in bdl){
            op+=picker.addIntol(bdl[idx],itemName,'targ-like-item');
        }
        op+=picker.stopList();
        op+=picker.close();

      }else{
          op+=picker.close();
      }
    }
    $('.intolerances-likes').html(op);
    appdata.intoleranceCount();
}





appdata.intoleranceCount=function(){
    $('.intolerances-dislikes').find('.intolerance-lists').each(function(){
    var t=$(this);
    actives=t.find('.targ-intol-item.active');
    if(actives.length>0){
        t.addClass('hasitems');
    }else{
      t.removeClass('hasitems');
    }
  });

}

appdata.tryIntolerance=function(idx){
  try {
      return appdata.user.intolerances[idx];
  }
  catch(err) {
      return '';
  }
}

appdata.tidyList=function(inList){
  let dd=inList.split(',');
  let op='';
  for(let idx in dd){
    if(dd[idx]!=''){
      op+=dd[idx]+',';
    }
  }
  return op;
}

appdata.checkLikesIngredients=function(data){
  let ret='';
  const ingredients=data.ingredients.toLowerCase();
  console.log(data);
  console.log(appdata.user.likes);
  console.log(appdata.user.intolerances);
  for(let idx in appdata.user.likes){
    if(idx!='Nutrition' && idx!='Ethically Sourced'){
        let dd=appdata.user.likes[idx].split(',');
        for(let subidx in dd){
          let needle=dd[subidx].toLowerCase();
          if(needle!=''){
            console.log('Look for '+needle);
            if(ingredients.indexOf(needle)>-1){
              console.log('found '+needle);
              ret+=needle+',';
            }
          }
        }

    }
  }
  return ret;
}

appdata.checkLikesSource=function(data){
    let ret='';
    const source=appdata.user.likes['Ethically Sourced'];
    const title=data.title.toLowerCase();
    const ingredients=data.ingredients.toLowerCase();
    if(source!='' && source !=undefined){

      const exp=source.split(',');
      for(let idx in exp){
        if(exp!=''){
          if(title.indexOf(exp[idx].toLowerCase())>-1){
            ret+=exp[idx]+',';
          }else{
            if(ingredients.indexOf(exp[idx].toLowerCase())>-1){
              ret+=exp[idx]+',';
            }
          }
        }
      }
    }
    return ret;
}


appdata.checkLikesNutrition=function(data){
  console.log('Starting likes');
  console.log(appdata.user.likes);
    let nut=appdata.user.likes['Nutrition'];
    let op='';
    if(nut!=undefined){
      op+=appdata.isHigh(nut,data,'protein','Protein');
      op+=appdata.isHigh(nut,data,'fibre','Fibre');
      op+=appdata.isLow(nut,data,'totalfat','Fat');
      op+=appdata.isLow(nut,data,'salt','Salt');
      op+=appdata.isLow(nut,data,'cholesterol','Cholesterol');
      op+=appdata.isLow(nut,data,'sugar','Sugar');
    }
    return op;
}

appdata.isHigh=function(nut,data,itemName,title){
  console.log('--- ishigh ---');
  console.log('nut');
  console.log(nut);
  console.log('data');
  console.log(data);
  console.log('item');
  console.log(itemName);
  console.log('title');
  console.log(title);
  console.log('--------');
  let ret='';
  let targ=appdata.slider[itemName];
  if(nut.indexOf('Low '+title)>-1){
    if(data[itemName]>=targ.mid){
      ret = 'High '+title+',';
    }
  }
  return ret;
}


appdata.isLow=function(nut,data,itemName,title){
  let ret='';
  let targ=appdata.slider[itemName];
  if(nut.indexOf('Low '+title)>-1){
    if(data[itemName]<=targ.below){
      ret = 'Low '+title+',';
    }
  }
  return ret;
}



appdata.tryLikes=function(idx){
  try {
      return appdata.user.likes[idx];
  }
  catch(err) {
      return '';
  }
}

appdata.loadIntolerancePrefs=function(){
  if(store.get('appdata.user.intolerances')!=''){
      appdata.user.intolerances=JSON.parse(store.get('appdata.user.intolerances'));
  }else{
      appdata.user.intolerances={};
  }
}

appdata.loadLikesPrefs=function(){
  if(store.get('appdata.user.likes')!=''){
      appdata.user.likes=JSON.parse(store.get('appdata.user.likes'));
  }else{
      appdata.user.likes={};
  }
}

appdata.saveIntolerancePrefs=function(){
  appdata.intoleranceCount();
  appdata.user.intolerances={};
  console.log('---- appdata.user.intolerances-----');
  $('.intolerance-lists').each(function(){
    var subList='';
    var t=$(this);
    listIdx=t.find('h5').text();
    t.find('.targ-intol-item.active').each(function(){
      var tt=$(this);
      subList+=tt.data('ref')+',';
    });
    if(subList!=''){
        appdata.user.intolerances[listIdx]=subList;
    }
  });


  console.log(appdata.user.intolerances);
  console.log(appdata.user.likes);

  store.put('appdata.user.intolerances',JSON.stringify(appdata.user.intolerances));
}

appdata.saveLikePrefs=function(){
  appdata.likeCount();
  appdata.user.likes={};
  $('.intolerance-lists').each(function(){
    var subList='';
    var t=$(this);
    listIdx=t.find('h5').text();
    t.find('.targ-like-item.active').each(function(){
      var tt=$(this);
      subList+=tt.data('ref')+',';
    });
    if(subList!=''){
        appdata.user.likes[listIdx]=subList;
    }
  });
  console.log('---- appdata.user.likes-----');
  console.log(appdata.user.likes);
  console.log(appdata.user.intolerances);
  store.put('appdata.user.likes',JSON.stringify(appdata.user.likes));
}

appdata.likeCount=function(){
  $('.intolerances-likes').find('.intolerance-lists').each(function(){
    var t=$(this);
    actives=t.find('.targ-like-item.active');
    if(actives.length>0){
        t.addClass('hasitems');
    }else{
      t.removeClass('hasitems');
    }
  });

}



appdata.showTerms=function(inTarget,inText){
  var inText=(inText==undefined)?'':inText;
      $(inTarget).load('terms.html');
      $('.targ-terms-pre').html(inText);

}

appdata.showProfileSlides=function(data){
  op=engine.plotSlider('calories',data['calories']);
  op+=engine.plotSlider('totalfat',data['totalfat']);
  op+=engine.plotSlider('saturatedfat',data['saturatedfat']);
  op+=engine.plotSlider('salt',data['salt']);
  op+=engine.plotSlider('sugar',data['sugar']);
  op+=engine.plotSlider('protein',data['protein']);
  op+=engine.plotSlider('fibre',data['fibre']);
  op+=engine.plotSlider('cholesterol',data['cholesterol']);
  return op;
}

appdata.showDownloads=function(){
  op='';
  iconlist.setIcon('icon-plus');
  console.log(appdata.profiles);
  for(idx in appdata.profiles){
    item=appdata.profiles[idx];

    op+=iconlist.itemDownload(item,'act-download-selected');
  }
  return op;

}


//YorkTest-NM start


  //Baburao code Start
    appdata.showReactios=function(inTarget){
      var consumptionDetails = {};
    var op='';
    consumptionDetails['userid'] = 2;
    api.invoke('getfaqsByCustomerId',consumptionDetails,function(data){
      //console.log(data);




      //var comms= [{"ParentCategory":"glutensss","ChaildCategory":[{"FaqId":5,"AllergenId":1,"Questions":"What are common symptoms?sssss","Answers":"No. For those without celiac disease, but who are gluten sensitive nevertheless, throwing out your cookware isn\u2019t at all necessary."},{"FaqId":6,"AllergenId":1,"Questions":"What are common symptoms?","Answers":"No. For those without celiac disease, but who are gluten sensitive nevertheless, throwing out your cookware isn\u2019t at all necessary."}]},{"ParentCategory":"glutens","ChaildCategory":[{"FaqId":1,"AllergenId":24,"Questions":"Is it true that nobody can properly metabolize gluten?","Answers":"It is likely that 100% of humans activate zonulin when exposed to gluten, and this increases gut permeability. This is thought to play an important role in autoimmunity."}]}];
      var comms = data;
      for(idx in comms){
      var itemName=appdata.tryIntolerance(idx);
      bdans=comms[idx]['ParentCategory'];
    //if(comms[idx]['ParentCategory']!=null){
      
    
      op+=picker.YTstartIntol(comms[idx]['ParentCategory']);
    //}
      if(comms[idx]['ChaildCategory']!=null){
      bdans=comms[idx]['ChaildCategory'];
      if(bdans!=null){
        op+=picker.YTstartList('hide');
        //bdl=bd.split(',');
        //bdlans=bdans.split(',');
        //op+=picker.addIntol('Select All',itemName,'targ-intol-item act-select-all');
        for(idx in bdans){
          //op+=picker.addIntol(bdl[idx],itemName,'hide','','');
          var name = bdans[idx]['Answers'];
          //for(idx1 in bdlans){
            //var name1 = idx1;
            //if(name==name1){
            op+=picker.YTaddIntol(bdans[idx]['Questions'],itemName,'hide','',bdans[idx]['Answers']);
            //}

            //}
        }
      }
        op+=picker.YTstopList();
        op+=picker.YTclose();

      }else{
          op+=picker.YTclose();
      }
    }
    $('.intolerances-dislikes').html(op);
    })

    //appdata.intoleranceCount();
    }
    appdata.showNoReactios=function(inTarget){
      
    var op='';
    var consumptionDetails = {};
    consumptionDetails['userid'] = 2;
    //  var comms=[{ref: "35", type: "I", section: "", title: "mustard", breakdown: "What is mustard?,What food is it found in?",beanQA:"mustard is a general name for the proteins found Gluten can be found in many types of foods.,Gluten is a general name for the proteins found Gluten can be found in many types of foods."},
    //  {ref: "36", type: "I", section: "", title: "lupin", breakdown: "What is lupin,Feature of lupin",beanQA:"lupin is a general name for the proteins found Gluten can be found in many types of foods.,Gluten is a general name for the proteins found Gluten can be found in many types of foods."},
    //  {ref: "37", type: "I", section: "", title: "yeast", breakdown: "What is yeast?,What food is it found in?",beanQA:"yeast is a general name for the proteins found Gluten can be found in many types of foods.,Gluten is a general name for the proteins found Gluten can be found in many types of foods."}]
    api.invoke('getnoreactionsfaqsByCustomerId',consumptionDetails,function(data){
      var comms = data;
      for(idx in comms){
      var itemName=appdata.tryIntolerance(idx);
      bdans=comms[idx]['ParentCategory'];
    //if(comms[idx]['ParentCategory']!=null){
      
    
      op+=picker.YTstartIntol(comms[idx]['ParentCategory']);
    //}
      if(comms[idx]['ChaildCategory']!=null){
      bdans=comms[idx]['ChaildCategory'];
      if(bdans!=null){
        op+=picker.YTstartList('hide');
        //bdl=bd.split(',');
        //bdlans=bdans.split(',');
        //op+=picker.addIntol('Select All',itemName,'targ-intol-item act-select-all');
        for(idx in bdans){
          //op+=picker.addIntol(bdl[idx],itemName,'hide','','');
          var name = bdans[idx]['Answers'];
          //for(idx1 in bdlans){
            //var name1 = idx1;
            //if(name==name1){
            op+=picker.YTaddIntol(bdans[idx]['Questions'],itemName,'hide','',bdans[idx]['Answers']);
            //}

            //}
        }
      }
        op+=picker.YTstopList();
        op+=picker.YTclose();

      }else{
          op+=picker.YTclose();
      }
    }
    $('.noreactions').html(op);
    })
    //appdata.intoleranceCount();
    }
    
    appdata.showBorderLine=function(inTarget){
      
      var op='';
      var consumptionDetails = {};
      consumptionDetails['userid'] = 2;
      api.invoke('getborderlinefaqsByCustomerId',consumptionDetails,function(data){
        var comms = data;
        for(idx in comms){
        var itemName=appdata.tryIntolerance(idx);
        bdans=comms[idx]['ParentCategory'];
      //if(comms[idx]['ParentCategory']!=null){
        
      
        op+=picker.YTstartIntol(comms[idx]['ParentCategory']);
      //}
        if(comms[idx]['ChaildCategory']!=null){
        bdans=comms[idx]['ChaildCategory'];
        if(bdans!=null){
          op+=picker.YTstartList('hide');
          //bdl=bd.split(',');
          //bdlans=bdans.split(',');
          //op+=picker.addIntol('Select All',itemName,'targ-intol-item act-select-all');
          for(idx in bdans){
            //op+=picker.addIntol(bdl[idx],itemName,'hide','','');
            var name = bdans[idx]['Answers'];
            //for(idx1 in bdlans){
              //var name1 = idx1;
              //if(name==name1){
                
              op+=picker.YTaddIntol(bdans[idx]['Questions'],itemName,'hide','',bdans[idx]['Answers']);
              
              //}
      
              //}
          }
        }
          op+=picker.YTstopList();
          op+=picker.YTclose();
      
        }else{
            op+=picker.YTclose();
        }
      }
    $('.borderline').html(op);
    })
    //appdata.intoleranceCount();
    }
    appdata.showEmptyReactios=function(inTarget){
      
      var op='';
      
      $('.intolerances-dislikes').html(op);
      $('.borderline').html(op);
      $('.noreactions').html(op);
    }
  //Baburao code End

  // Vasanthi code Start
  
    appdata.showWeeklyRecords=function(){
      
        var weeklyRecordDates=['11/13/2017','11/14/2017','11/15/2017','11/16/2017','11/17/2017'];
        var weeklyRecordsHtml='';

        for(wrd in weeklyRecordDates){
          weeklyRecordsHtml+="<div class='weekly-records-menu'><a href='#daily-records' class='act-menu'>"+weeklyRecordDates[wrd]+"<i class='fa fa-caret-down' aria-hidden='true'></i></a></div>";
        }
        $('.weekly-records-sub').html(weeklyRecordsHtml);
    }


    appdata.showWeeklyRecordDays=function(wdate){
      
      // var weeklyRecordDays=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        var weeklyRecordDays=['Monday'];
      
      var weeklyRecordDaysHtml= 
        "<h2>Week["+wdate+"]</h2>"+  
        "<div style='position:relative'>"+
            "<table class='record-grid'>"+
              "<tr>"+
                "<th>Day</th>"+
                "<th>Food</th>"+
                "<th>Feeling</th> "+                         
              "</tr>";

        for(wrda in weeklyRecordDays){
          weeklyRecordDaysHtml+="<tr>"+
          "<td>"+weeklyRecordDays[wrda]+"</td>"+
          "<td><a href='#meal-tracker' class='act-menu'><i class='fa fa-circle' aria-hidden='true'></i></a></td>"+
          "<td><a href='#' class='popup-cont'><i class='fa fa-circle' aria-hidden='true'></i></a></td>"+                          
        "</tr>" ;
        }
        weeklyRecordDaysHtml+="</table>"+
        "</div>";

        $('.weekly-records-cont').html(weeklyRecordDaysHtml);
    }
                                  
  // Vasanthi code End    
   
//YorkTest-NM end