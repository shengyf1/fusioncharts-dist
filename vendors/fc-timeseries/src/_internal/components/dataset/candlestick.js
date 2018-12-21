import Column from'./column';import{pluck,pluckNumber,defined,safeMin,extend2,convertColor,UNDEF,safeMax,DEFAULT_FT_FONT}from'../../../../../fc-core/src/lib';import isValidNumber from'../../../../../fc-utils/src/type/is-valid-number';const mathMax=Math.max,mathMin=Math.min;class CandleStick extends Column{constructor(){super(),this.getHoverInConfig=function(a){let b=this.config;return{style:{"stroke-width":pluckNumber(b['stroke-width'],2)},index:a,hovered:!0}},this.getHoverOutConfig=function(a){let b=this.config;return{style:{"stroke-width":pluckNumber(b['stroke-width'],b['default-stroke-width'])},index:a,hovered:!1}},this.config.hoverInfo=[]}__setDefaultConfig(){var a=this,b=a.config,c=b.bullConfig||(b.bullConfig={}),d=b.bearConfig||(b.bearConfig={});b.plotSpacePercent=40,b['default-stroke-width']=1,b['default-stroke-linecap']='square',b['default-stroke-linejoin']='miter',b['default-stroke-dasharray']='none',b['default-opacity']=100,d['default-stroke']='000000',d['default-fill']='868AC8',d['default-opacity']=100,c['default-stroke']='000000',c['default-fill']='ffffff',c['default-opacity']=100,b.visibility='visible',b.prevBoundaryInfo={},b.prevDataInfo=[],this.config.legendDefaultTextStyle={"font-family":DEFAULT_FT_FONT,"font-weight":'normal',"font-style":'normal',"font-size":'12px',fill:'#5F5F5F'},b.strokeColor='#464E56'}configureAttributes(a){let b,c=this,d=c.getFromEnv('dataSource'),e=c.getFromEnv('getStyleDef'),f=d.legend,g=e(f&&f.item&&f.item.style&&f.item.style.text),h=c.config;if(h.mergedLegendStyle=extend2(extend2({},h.legendDefaultTextStyle),g),a.hasOwnProperty('index'))h.hoverInfo.push(a);else{for(b in a)if('primaryColor'===b){let b=d.plotconfig&&d.plotconfig[a.type]||{},c=h.bullConfig,f=h.bearConfig,g=e(b.bear)||{},i=e(b.bull)||{};c.plotBorderColor=convertColor(pluck(i.stroke,c['default-stroke']),pluckNumber(i['stroke-opacity'],c['default-opacity'])),c.plotColor=convertColor(pluck(i.fill,c['default-fill']),pluckNumber(i['fill-opacity'],c['default-opacity'])),c.strokeLineCap=pluck(i['stroke-linecap'],h['default-stroke-linecap']),c.strokeLineJoin=pluck(i['stroke-linejoin'],h['default-stroke-linejoin']),c.strokeDasharray=pluck(i['stroke-dasharray'],h['default-stroke-dasharray']),f.plotBorderColor=convertColor(pluck(g.stroke,f['default-stroke']),pluckNumber(g['stroke-opacity'],f['default-opacity'])),f.plotColor=convertColor(pluck(g.fill,f['default-fill']),pluckNumber(g['fill-opacity'],f['default-opacity'])),f.strokeLineCap=pluck(g['stroke-linecap'],h['default-stroke-linecap']),f.strokeLineJoin=pluck(g['stroke-linejoin'],h['default-stroke-linejoin']),f.strokeDasharray=pluck(g['stroke-dasharray'],h['default-stroke-dasharray']),h.plotBorderThickness=f.strokeWidth=c.strokeWidth=pluckNumber(safeMin([+i['stroke-width'],+g['stroke-width']]),h['default-stroke-width'])}else h[b]=a[b];h.limit=c._calculateLimits();const f=c.getFromEnv('chart');f.setYScaleLimit(h.scaleY.getId(),c.getId(),h.limit.y,h.limit.baseRequired),f.setXScaleLimit(h.scaleX.getId(),c.getId(),h.limit.x)}}_calculateLimits(){let{indices:a,data:b}=this.config,c=b[0],d=b[b.length-1],e='visible'===this.config.visibility;return{x:e?[c&&c[a[0]].start,d&&d[a[0]].end]:UNDEF,y:e?[safeMin(b,a=>mathMin(a[1],a[2],a[3],a[4])),safeMax(b,a=>mathMax(a[1],a[2],a[3],a[4]))]:UNDEF,baseRequired:!1}}_createContainer(){let a=this,b=a.config,c=b.bullConfig,d=b.bearConfig;a.addGraphicalElement({el:'group',container:{id:'meso',label:'group',isParent:!0},component:a,label:'group',id:'meso',attr:{name:'candlestick-dataset-meso'}}),a.addGraphicalElement({el:'group',container:{id:'meso',label:'group'},component:a,label:'group',id:'meso-bull',attr:{name:'bullGroup-meso',"stroke-width":c.strokeWidth||b['default-stroke-width'],stroke:c.plotBorderColor||convertColor(c['default-fill'],c['default-opacity']),fill:c.plotColor||convertColor(c['default-stroke'],c['default-opacity']),"stroke-linecap":c.strokeLineCap||b['default-stroke-linecap'],"stroke-linejoin":c.strokeLineJoin||b['default-stroke-linejoin'],"stroke-dasharray":c.strokeDasharray||b['default-stroke-dasharray'],visibility:b.visibility}}),a.addGraphicalElement({el:'group',container:{id:'meso',label:'group'},component:a,label:'group',id:'meso-bear',attr:{name:'bearGroup-meso',"stroke-width":d.strokeWidth||b['default-stroke-width'],stroke:d.plotBorderColor||convertColor(d['default-stroke'],d['default-opacity']),fill:d.plotColor||convertColor(d['default-fill'],d['default-opacity']),visibility:b.visibility,"stroke-linecap":d.strokeLineCap||b['default-stroke-linecap'],"stroke-linejoin":d.strokeLineJoin||b['default-stroke-linejoin'],"stroke-dasharray":d.strokeDasharray||b['default-stroke-dasharray']}})}getName(){return'candlestick'}allocatePosition(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,z,A=Math.max,B=this,C=B.getFromEnv('xScale'),D=B.getFromEnv('yScale'),E=B.config,[F,G,H,I,J]=E.indices,K=E.dataInfo,L=C.getRangeThreshold()[2],[M,N]=C.getDomain(),O=E.data;B._isRepositioningNeeded()&&(E.timeStampGap=o=L,t=C.getRangeValue(L)-C.getRangeValue(0),b=A(t*(1-E.plotSpacePercent/100)-E.plotBorderThickness,1),z=+C.getDomainValue(t*(E.plotSpacePercent/200))-+C.getDomainValue(0),E.actualStartDomain=+M+z,E.actualEndDomain=+N-z,K=E.dataInfo=[],O.forEach((t,u)=>{c=t[F],j=t[G],k=t[J],l=t[H],m=t[I],u||(p=E.firstTimeStamp=c.start),w=D.getRangeValue(k),v=D.getRangeValue(j),s=D.getRangeValue(l),r=D.getRangeValue(m),isValidNumber(v)&&isValidNumber(w)&&isValidNumber(s)&&isValidNumber(r)&&(j>k?(h=w,g=v,i='bull'):(g=w,h=v,i='bear'),f=1>=c.end-c.start?C.getRangeValue(new Date(c.start)):(C.getRangeValue(new Date(c.end))+C.getRangeValue(new Date(c.start)))/2,d=f-b/2,a=A(Math.abs(h-g),1),e=g>h?h:g,n={startDate:c.start,endDate:c.end},n.x=d,n.midX=f,n.colHeight=a,n.colY=e,n.y=n.highStickYExtend=s,n.width=b,n.openValue=j,n.closeValue=k,n.highValue=l,n.lowValue=m,n.lowStickYEntend=r,n.height=r-s,n.groupId=i,n['stroke-opacity']=pluckNumber(E['stroke-opacity'],E['default-opacity'],100)/100,n['fill-opacity']=pluckNumber(E['fill-opacity'],E['default-opacity'],100)/100,n['stroke-width']=pluckNumber(E['stroke-width'],E['default-stroke-width'],1),n.groupConfig='bull'===i?'bullConfig':'bearConfig',q=Math.round((c.start-p)/o),K[q]=n)})),(u=E.hoverInfo)&&u.forEach(a=>{'object'==typeof K[a.index]&&'object'==typeof a.style&&(K[a.index]['stroke-opacity']=a.style['stroke-opacity']/100,K[a.index]['fill-opacity']=a.style['fill-opacity']/100,K[a.index]['stroke-width']=a.style['stroke-width'])})}_drawPlot(){var a=this,b=a.config,c=b.dataInfo;c.forEach(b=>{b.groupConfig&&(a.addGraphicalElement({el:'rect',container:{label:'group',id:'meso-'+b.groupId},label:'rect',attr:{x:b.x,y:b.colY,height:b.colHeight,width:b.width,"fill-opacity":b['fill-opacity'],"stroke-opacity":b['stroke-opacity'],"stroke-width":b['stroke-width']}},!0),a.addGraphicalElement({el:'path',container:{label:'group',id:'meso-'+b.groupId},label:'high',attr:{path:`M${b.midX},${b.colY},V${b.highStickYExtend}`,"fill-opacity":b['fill-opacity'],"stroke-opacity":b['stroke-opacity'],"stroke-width":b['stroke-width']}},!0),a.addGraphicalElement({el:'path',container:{label:'group',id:'meso-'+b.groupId},label:'low',attr:{path:`M${b.midX},${b.colY+b.colHeight},V${b.lowStickYEntend}`,"fill-opacity":b['fill-opacity'],"stroke-opacity":b['stroke-opacity'],"stroke-width":b['stroke-width']}},!0))})}_getTooltext(a,b,c){var d,e,f=this,g=f.config,h=g.dataInfo,i=h[c],j=a?b?1:.5:1;return f._isInvalidTooltext(i)?'':(d=defined(i.groupConfig),e=`<div style='margin-top:5px; margin-bottom:4px; height: 14px; opacity: color:#5F5F5F; font-size: 10px;${j}'>
      <div style='float: left; font-size: 23px; line-height: 0.5; color:#464E56; clear: both'>■&nbsp</div>
      <div style='float: left;'>${g.series}&nbsp</div>
      </div>`,d?(g.series?e:'')+['open','high','low','close'].reduce((a,b)=>a+`<div style = 'clear: both'>
        <div style = 'float: left; font-size: 10px; color:#5F5F5F'>${b}</div>
        <div style = 'float: right; font-size: 10px; color:#5F5F5F'>
        ${i[b+'TooltipValue']||(i[b+'TooltipValue']=g.formatterFn({value:i[b+'Value'],type:'tooltip',prefix:g.prefix,suffix:g.suffix}))}
       </div>
       </div>`,''):e)}}export default CandleStick;