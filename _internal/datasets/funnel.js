import{stubFN,pluckNumber,setLineHeight}from'../lib/lib';import FunnelPyramidBaseDataset from'./funnelpyramidbase';import{priorityList}from'../schedular';import FunnelPoint from'../data/funnel-point';var UNDEF,ROLLOVER='DataPlotRollOver',ROLLOUT='DataPlotRollOut';class FunnelDataset extends FunnelPyramidBaseDataset{constructor(){super(),this.config.pointInContext=FunnelPoint,this.config.LABEL_PLACEMENT_ITERATOR_INDEX_START=1}getType(){return'dataset'}getName(){return'funnel'}configure(a){if(!a)return!1;this.config.JSONData=a;var b,c,d,e,f=this,g=f.getFromEnv('chart'),h=f.getFromEnv('number-formatter'),i=f.utils(f),j=i.sortObjArrByKey,k=g.getFromEnv('dataSource')?g.getFromEnv('dataSource').chart:{},l=f.config.JSONData.data;if(f._checkValidData(l)){for(c=0,e=l.length;c<e;c++)d=l[c],d&&d.value!==UNDEF&&(d.value=h.getCleanValue(d.value,!0));b=f.config.streamLinedData=pluckNumber(k.streamlineddata,1),f.config.JSONData.data=b?j(l,'value'):l,f._configure(),l=f.getChildren('data'),b&&(l[0].pseudoPoint=!0),g.config.showLegend&&f.addLegend()}}configureSpecifics(){var a=this,b=a.getFromEnv('chart'),c=a.config,d=b.getFromEnv('dataSource')?b.getFromEnv('dataSource').chart:{},e=a.utils(a),f=e.copyProperties;f(d,c,[['funnelyscale','yScale',pluckNumber,UNDEF,function(a){var b=a.yScale;a.yScale=0<=b&&40>=b?b/200:.2}],['usesameslantangle','useSameSlantAngle',pluckNumber,function(a){return a.streamLinedData?0:1}],['ishollow','isHollow',pluckNumber,UNDEF,function(a){var b=a.isHollow;b===UNDEF&&(a.isHollow=a.streamLinedData?1:0)}]])}prePointProcessingHookFn(a){var b,c,d,e,f=this,g=f.getFromEnv('chart'),h=g.config,i=f.config,j=h.canvasWidth,k=g.getFromEnv('smartLabel'),l=!i.streamLinedData;b=a[0],b&&(b.pseudoPoint=!0),b&&b.displayValue&&(k.useEllipsesOnOverflow(g.config.useEllipsesWhenOverflow),k.setStyle(b.style),setLineHeight(b.style),c=parseFloat(b.style.lineHeight.match(/^\d+/)[0]||i.lineHeight,10),e=k.getOriSize(b.displayValue).height,d=k.getSmartText(b.displayValue,j,e),b.displayValue=d.text,d.tooltext&&(b.originalText=d.tooltext),b.labelWidth=k.getOriSize(d.text).width,h.marginTop+=c+4),i.totalValue=l?a[0].y-a[1].y:0,i.offsetVal=function(c){return l?-(a[c+1]&&a[c+1].y||0):b.y}}datasetCalculations(a){var b,c,d,e,f=this,g=f.config,h=f.getFromEnv('number-formatter'),i={},j=g.streamLinedData,k=g.percentOfPrevious;for(i.highestValue=Number.NEGATIVE_INFINITY,i.refreshedData=[],i.sumValue=i.countPoint=0,(b=0,c=a.length);b<c;b++)(d=a[b],!d.vline)&&(d.cleanValue=e=Math.abs(h.getCleanValue(d.value,!0)),null!==e&&(i.hasValidPoint=!0,i.highestValue=i.highestValue||e,i.refreshedData.push(d),i.sumValue+=e,i.countPoint+=1,i.highestValue=Math.max(i.highestValue,e)));return j&&(i.sumValue=i.highestValue,k&&(i.prevPerValReq=!0)),i}calculatePositionOfPlots(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u=this,v=u.getFromEnv('chart'),w=v.config,x=u.config,y=u.utils(u),z=y.getSumValueOfObjArrByKey,A=y.DistributionMatrix,B=u.calculatePositionCoordinate,C=x.psmMargin,D=u.getChildren('data'),E=x.streamLinedData,F=2,G=u.getDataLength(),H=x.maxValue=D[0].y,I=x.minValue=D[G-1].y,J=0,K=0,L=x.lineHeight,M=Math.floor;if(x.sumValue&&(u.postPlotCallback=stubFN,w.canvasTop+=w.marginTop-C.top,w.effCanvasHeight=e=w.canvasHeight-(w.marginTop+w.marginBottom)+(C.top+C.bottom),w.effCanvasWidth=f=w.width-(w.marginLeft+w.marginRight),g=x.drawingRadius=f/F,x.x=g+w.canvasLeft,!(E&&2>G))){for(E?(d=e/(H-I),h=z(D,'value'),j=h?e/h:e):j=d=H?e/H:e,x.unitHeight=d,x.lastRadius=g,x.globalMinXShift=0,i=x.alignmentType={},i['default']=1,i.alternate=2,t=new A(M(e/L)),(a=0,b=G);a<b;a++)if(c=D[a],!c.getState('removed')){if(!E&&0===a||!E&&a===b-1){t.forcePush(c,a);continue}J=c.y*j,K+=c.y*j,l=K-J+J/2,k=M(l/L),t.push(c,k)}if(m=t.getDistributedResult(),D.length=0,m.matrix[1]===UNDEF)[].push.apply(D,m.matrix[0]);else for(n=m.matrix[0],o=m.matrix[1],b=Math.max(n.length,o.length),a=0;a<b;a++)q=n[a],p=o[a],D.push(q||p);if(r=Object.keys(m.forceMatrix),0<r.length)for(s in m.forceMatrix)[].splice.apply(D,[parseInt(s,10),0].concat(m.forceMatrix[s]));switch(m.suggestion){case i['default']:B.call(u,D,!1);break;case i.alternate:x.labelAlignment=i.alternate,F=3,g=f/F,w.canvasLeft=w.canvasWidth/2-g,x.x=w.canvasLeft+g,B.call(u,D,!0);}}}draw(){var a,b,c,d,e,f,g,h=this,i=h.getFromEnv('chart'),j=h.config,k=h.config.trackerArgs=[],l=h.getChildren('data'),m=i.getChildContainer('datalabelsGroup'),n=j.streamLinedData,o=l.length,p=Math.min;if(h.config.labelDrawingConfig=h.config.labelDrawingConfig||[],h.config.labelDrawingConfig.length=0,!!j.sumValue){if(h.rolloverResponseSetter=function(a,b){return function(c){var d=this;a.attr(b),i.plotEventHandler(d,c,ROLLOVER)}},h.rolloutResponseSetter=function(a,b){return function(c){var d=this;a.attr(b),i.plotEventHandler(d,c,ROLLOUT)}},h.animateFunction=function(a){return function(){a.attr({opacity:1})}},c=j.slicingDistance,e=c/2,n&&2>o)return void h.hide(h.getChildren('data'),o);for(a=0,b=l.length;a<b;a++)l[a]&&l[a].shapeArgs&&!l[a].getState('removed')&&(l[a].shapeArgs.renderer=i.getFromEnv('paper'));for(d=j.noOfGap,d&&(j.perGapDistance=p(1.5*e,c/d),j.distanceAvailed=e),a=l.length,j.alreadyPlotted&&(h.postPlotCallback=function(){g||(g=!0,h.animateFunction(m)())});a--;)f=l[a],f.index=a,f.syncDraw();for(j.oldLastData=Object.assign({},l[l.length-1].shapeArgs),h.hide(h.getChildren('data'),o),j.connectorEndSwitchHistoryY={},a=l.length;a--;)l[a].getState('removed')||k.push(l[a]);h.addJob('labelDrawID',h.drawAllLabels.bind(h),priorityList.label),h.addJob('trackerDrawID',h.drawAllTrackers.bind(h),priorityList.tracker),h.removePlots(),j.alreadyPlotted=!0,j.prevIs2d=j.is2d}}getTooltipMacroStub(a){var b,c,d=this,e=d.config,f=d.getFromEnv('number-formatter');return e.streamLinedData&&(c=e.percentOfPrevious?a.pValue:f.percentValue(100*(a.dataValue/a.prevValue))),b=super.getTooltipMacroStub(a),b.percentValue=e.percentOfPrevious?f.percentValue(100*(a.dataValue/a.highestValue)):a.pValue,b.percentOfPrevValue=c,b}}export default FunnelDataset;